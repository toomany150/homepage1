const {
  ADMIN_PASSWORD,
  createAdminToken,
  verifyAdminToken,
  getBoardData,
  saveBoardData,
  getDbStatus
} = require('./github-db');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const queryAction = req.query.action || (req.body && req.body.action) || 'stats';

  // 1. Admin Login (Does not require prior authentication)
  if (req.method === 'POST' && queryAction === 'login') {
    const { password } = req.body || {};
    if (!password) {
      return res.status(400).json({ success: false, message: '관리자 비밀번호를 입력해 주세요.' });
    }

    if (password === ADMIN_PASSWORD) {
      const token = createAdminToken();
      return res.status(200).json({
        success: true,
        message: '관리자 인증에 성공했습니다.',
        token,
        adminName: '신제환 대표 공인중개사'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: '관리자 비밀번호가 일치하지 않습니다.'
      });
    }
  }

  // All other admin actions REQUIRE valid Bearer Token
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';
  const adminPayload = verifyAdminToken(token);

  if (!adminPayload) {
    return res.status(401).json({
      success: false,
      message: '관리자 권한이 유효하지 않거나 만료되었습니다. 다시 로그인해 주세요.'
    });
  }

  try {
    // -------------------------------------------------------------------------
    // GET Actions
    // -------------------------------------------------------------------------
    if (req.method === 'GET') {
      // Action: Verify Token
      if (queryAction === 'verify') {
        return res.status(200).json({
          success: true,
          admin: adminPayload
        });
      }

      // Action: Stats & Dashboard
      if (queryAction === 'stats') {
        const { data } = await getBoardData(true);
        const posts = data.posts || [];
        const status = await getDbStatus();

        const todayStr = new Date().toISOString().slice(0, 10);
        let todayCount = 0;
        let pendingRepliesCount = 0;
        let totalViews = 0;
        let totalLikes = 0;
        const categoryCounts = {};

        posts.forEach(p => {
          if (p.createdAt && p.createdAt.startsWith(todayStr)) {
            todayCount++;
          }
          const hasAdminReply = (p.replies || []).some(r => r.isAdmin);
          if (!hasAdminReply && p.category !== '공지사항') {
            pendingRepliesCount++;
          }
          totalViews += (p.views || 0);
          totalLikes += (p.likes || 0);

          const cat = p.category || '기타';
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        return res.status(200).json({
          success: true,
          stats: {
            totalPosts: posts.length,
            todayPosts: todayCount,
            pendingRepliesCount,
            totalViews,
            totalLikes,
            categoryCounts
          },
          dbStatus: status,
          settings: data.settings || {}
        });
      }

      // Action: Download Raw Backup
      if (queryAction === 'backup') {
        const { data } = await getBoardData(true);
        res.setHeader('Content-Disposition', `attachment; filename="board_backup_${Date.now()}.json"`);
        return res.status(200).json(data);
      }
    }

    // -------------------------------------------------------------------------
    // POST Actions
    // -------------------------------------------------------------------------
    if (req.method === 'POST') {
      const { data } = await getBoardData(true);

      // Action: Toggle Pin Status
      if (queryAction === 'pin') {
        const { postId } = req.body || {};
        const post = (data.posts || []).find(p => String(p.id) === String(postId));
        if (!post) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        post.isPinned = !post.isPinned;
        const stateWord = post.isPinned ? '상단 고정' : '고정 해제';
        const saveRes = await saveBoardData(data, `[Admin DB] Toggle pin: ${stateWord} on post #${postId}`);

        return res.status(200).json({
          success: true,
          message: `게시글이 ${stateWord}되었습니다.`,
          isPinned: post.isPinned,
          saveInfo: saveRes
        });
      }

      // Action: Official Admin Reply
      if (queryAction === 'reply') {
        const { postId, content } = req.body || {};
        if (!postId || !content || !content.trim()) {
          return res.status(400).json({ success: false, message: '답변 내용을 입력해 주세요.' });
        }

        const post = (data.posts || []).find(p => String(p.id) === String(postId));
        if (!post) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        post.replies = post.replies || [];
        const adminReply = {
          id: `rep_admin_${Date.now()}`,
          author: '참좋은부동산 (대표 신제환)',
          isAdmin: true,
          content: content.trim(),
          createdAt: new Date().toISOString()
        };

        post.replies.push(adminReply);
        const saveRes = await saveBoardData(data, `[Admin DB] Add official reply to post #${postId}`);

        return res.status(200).json({
          success: true,
          message: '대표 공인중개사 공식 답변이 성공적으로 등록되었습니다.',
          reply: adminReply,
          saveInfo: saveRes
        });
      }

      // Action: Admin Delete Post
      if (queryAction === 'delete-post') {
        const { postId } = req.body || {};
        const postIndex = (data.posts || []).findIndex(p => String(p.id) === String(postId));
        if (postIndex === -1) {
          return res.status(404).json({ success: false, message: '삭제할 게시글을 찾을 수 없습니다.' });
        }

        const removed = data.posts.splice(postIndex, 1)[0];
        const saveRes = await saveBoardData(data, `[Admin DB] Force delete post #${postId} ("${removed.title.slice(0, 25)}")`);

        return res.status(200).json({
          success: true,
          message: '관리자 권한으로 게시글이 영구 삭제되었습니다.',
          saveInfo: saveRes
        });
      }

      // Action: Admin Delete Reply
      if (queryAction === 'delete-reply') {
        const { postId, replyId } = req.body || {};
        const post = (data.posts || []).find(p => String(p.id) === String(postId));
        if (!post) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        const replyIndex = (post.replies || []).findIndex(r => String(r.id) === String(replyId));
        if (replyIndex === -1) {
          return res.status(404).json({ success: false, message: '답변을 찾을 수 없습니다.' });
        }

        post.replies.splice(replyIndex, 1);
        const saveRes = await saveBoardData(data, `[Admin DB] Delete reply #${replyId} from post #${postId}`);

        return res.status(200).json({
          success: true,
          message: '답변이 성공적으로 삭제되었습니다.',
          saveInfo: saveRes
        });
      }

      // Action: Update Board Settings
      if (queryAction === 'settings') {
        const { boardTitle, notice, categories, allowPublicWrite } = req.body || {};
        data.settings = data.settings || {};

        if (boardTitle) data.settings.boardTitle = boardTitle.trim();
        if (notice !== undefined) data.settings.notice = notice.trim();
        if (Array.isArray(categories)) data.settings.categories = categories;
        if (allowPublicWrite !== undefined) data.settings.allowPublicWrite = Boolean(allowPublicWrite);

        const saveRes = await saveBoardData(data, '[Admin DB] Update board settings');

        return res.status(200).json({
          success: true,
          message: '게시판 설정이 성공적으로 저장되었습니다.',
          settings: data.settings,
          saveInfo: saveRes
        });
      }

      // Action: Restore Backup
      if (queryAction === 'restore') {
        const { restoreData } = req.body || {};
        if (!restoreData || !Array.isArray(restoreData.posts)) {
          return res.status(400).json({ success: false, message: '유효한 게시판 데이터 형식이 아닙니다.' });
        }

        const saveRes = await saveBoardData(restoreData, '[Admin DB] Restore board data from backup');
        return res.status(200).json({
          success: true,
          message: '게시판 데이터가 성공적으로 복원되었습니다.',
          saveInfo: saveRes
        });
      }
    }

    return res.status(400).json({ success: false, message: '지원하지 않는 관리자 명령입니다.' });
  } catch (error) {
    console.error('[API Admin Error]', error);
    return res.status(500).json({
      success: false,
      message: '관리자 작업 중 오류가 발생했습니다.',
      error: error.message
    });
  }
};
