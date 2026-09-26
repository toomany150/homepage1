const {
  getBoardData,
  saveBoardData,
  hashPassword,
  verifyAdminToken,
  getDbStatus
} = require('./github-db');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Helper for admin check from headers
  const authHeader = req.headers.authorization || '';
  const adminToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';
  const isAdmin = Boolean(verifyAdminToken(adminToken));

  try {
    // -------------------------------------------------------------------------
    // GET: List posts or single post detail
    // -------------------------------------------------------------------------
    if (req.method === 'GET') {
      const { id, category, search, page = 1, limit = 10 } = req.query;
      const { data, sha, source } = await getBoardData();
      const settings = data.settings || {};
      let posts = [...(data.posts || [])];

      // Single Post View
      if (id) {
        const postIndex = posts.findIndex(p => String(p.id) === String(id));
        if (postIndex === -1) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        const post = { ...posts[postIndex] };

        // Increment view count
        posts[postIndex].views = (posts[postIndex].views || 0) + 1;
        // Asynchronously save updated views
        saveBoardData(data, `[Board DB] Increment view on post #${id}`).catch(() => {});

        // Mask secret post if not admin
        if (post.isSecret && !isAdmin) {
          post.content = '비밀글입니다. 작성자 본인 비밀번호를 입력하거나 관리자 로그인 후 열람하실 수 있습니다.';
          delete post.secretRawContent;
        }
        delete post.passwordHash;

        return res.status(200).json({
          success: true,
          post,
          isAdmin,
          source
        });
      }

      // Filter by Category
      if (category && category !== '전체' && category !== 'all') {
        posts = posts.filter(p => p.category === category);
      }

      // Filter by Search Query
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        posts = posts.filter(p =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.content && p.content.toLowerCase().includes(q)) ||
          (p.author && p.author.toLowerCase().includes(q))
        );
      }

      // Sort: Pinned posts first, then createdAt descending
      posts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const total = posts.length;
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = limit === 'all' ? total : (parseInt(limit, 10) || 10);
      const totalPages = Math.ceil(total / limitNum) || 1;
      const offset = (pageNum - 1) * limitNum;
      const paginatedPosts = limit === 'all' ? posts : posts.slice(offset, offset + limitNum);

      // Clean response (mask secrets, strip hashes)
      const sanitizedPosts = paginatedPosts.map(p => {
        const clone = { ...p };
        if (clone.isSecret && !isAdmin) {
          clone.content = '비밀글입니다. 작성자와 관리자만 확인하실 수 있습니다.';
          delete clone.secretRawContent;
        }
        delete clone.passwordHash;
        return clone;
      });

      const status = await getDbStatus();

      return res.status(200).json({
        success: true,
        posts: sanitizedPosts,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages
        },
        categories: settings.categories || ["전체", "공지사항", "매물문의", "상담신청", "계약후기", "자유질문"],
        settings,
        dbStatus: status
      });
    }

    // -------------------------------------------------------------------------
    // POST: Create post, reply, unlock secret, or like
    // -------------------------------------------------------------------------
    if (req.method === 'POST') {
      const body = req.body || {};
      const action = body.action || 'create';
      const { data } = await getBoardData(true);

      // Action 1: Create New Post
      if (action === 'create') {
        const { title, author, category, content, password, isSecret, contact } = body;

        if (!title || !title.trim()) {
          return res.status(400).json({ success: false, message: '제목을 입력해 주세요.' });
        }
        if (!author || !author.trim()) {
          return res.status(400).json({ success: false, message: '작성자 성함을 입력해 주세요.' });
        }
        if (!content || !content.trim()) {
          return res.status(400).json({ success: false, message: '내용을 입력해 주세요.' });
        }

        const isUserSecret = Boolean(isSecret);
        if (isUserSecret && !password) {
          return res.status(400).json({ success: false, message: '비밀글 작성 시 조회/수정을 위한 비밀번호가 필수입니다.' });
        }

        const newPost = {
          id: `post_${Date.now()}`,
          category: category || '자유질문',
          title: title.trim(),
          author: isAdmin ? '참좋은부동산 (대표 신제환)' : author.trim(),
          authorRole: isAdmin ? 'admin' : 'user',
          content: content.trim(),
          contact: contact ? contact.trim() : '',
          createdAt: new Date().toISOString(),
          views: 0,
          likes: 0,
          isPinned: isAdmin && Boolean(body.isPinned),
          isSecret: isUserSecret,
          passwordHash: password ? hashPassword(password) : '',
          secretRawContent: isUserSecret ? content.trim() : undefined,
          replies: []
        };

        data.posts = data.posts || [];
        data.posts.unshift(newPost);

        const saveRes = await saveBoardData(data, `[Board DB] Add post: "${title.trim().slice(0, 30)}" by ${author}`);

        return res.status(201).json({
          success: true,
          message: '게시글이 성공적으로 등록되었습니다.',
          post: {
            ...newPost,
            passwordHash: undefined
          },
          saveInfo: saveRes
        });
      }

      // Action 2: Add Reply / Comment
      if (action === 'reply') {
        const { postId, author, content, password } = body;
        if (!postId || !content || !content.trim()) {
          return res.status(400).json({ success: false, message: '게시글 ID와 답변 내용을 입력해 주세요.' });
        }

        const post = (data.posts || []).find(p => String(p.id) === String(postId));
        if (!post) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        post.replies = post.replies || [];
        const newReply = {
          id: `rep_${Date.now()}`,
          author: isAdmin ? '참좋은부동산 (대표 신제환)' : (author || '방문자'),
          isAdmin: Boolean(isAdmin),
          content: content.trim(),
          createdAt: new Date().toISOString(),
          passwordHash: password ? hashPassword(password) : ''
        };

        post.replies.push(newReply);

        const saveRes = await saveBoardData(data, `[Board DB] Add reply to post #${postId} by ${newReply.author}`);

        return res.status(200).json({
          success: true,
          message: '답변/댓글이 성공적으로 등록되었습니다.',
          reply: {
            ...newReply,
            passwordHash: undefined
          },
          saveInfo: saveRes
        });
      }

      // Action 3: Unlock Secret Post
      if (action === 'unlock') {
        const { postId, password } = body;
        const post = (data.posts || []).find(p => String(p.id) === String(postId));
        if (!post) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        if (isAdmin) {
          return res.status(200).json({
            success: true,
            rawContent: post.secretRawContent || post.content,
            contact: post.contact || ''
          });
        }

        if (!password) {
          return res.status(400).json({ success: false, message: '비밀번호를 입력해 주세요.' });
        }

        const inputHash = hashPassword(password);
        if (post.passwordHash && post.passwordHash === inputHash) {
          return res.status(200).json({
            success: true,
            rawContent: post.secretRawContent || post.content,
            contact: post.contact || ''
          });
        } else {
          return res.status(403).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }
      }

      // Action 4: Like Post
      if (action === 'like') {
        const { postId } = body;
        const post = (data.posts || []).find(p => String(p.id) === String(postId));
        if (!post) {
          return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }

        post.likes = (post.likes || 0) + 1;
        saveBoardData(data, `[Board DB] Like on post #${postId}`).catch(() => {});

        return res.status(200).json({
          success: true,
          likes: post.likes
        });
      }

      return res.status(400).json({ success: false, message: '알 수 없는 요청입니다.' });
    }

    // -------------------------------------------------------------------------
    // PUT: Update post
    // -------------------------------------------------------------------------
    if (req.method === 'PUT') {
      const { id, title, content, category, password } = req.body || {};
      const { data } = await getBoardData(true);
      const post = (data.posts || []).find(p => String(p.id) === String(id));

      if (!post) {
        return res.status(404).json({ success: false, message: '수정할 게시글을 찾을 수 없습니다.' });
      }

      // Auth validation: Admin OR matching password
      if (!isAdmin) {
        if (!password || hashPassword(password) !== post.passwordHash) {
          return res.status(403).json({ success: false, message: '비밀번호가 일치하지 않아 수정할 수 없습니다.' });
        }
      }

      if (title && title.trim()) post.title = title.trim();
      if (category) post.category = category;
      if (content && content.trim()) {
        post.content = content.trim();
        if (post.isSecret) {
          post.secretRawContent = content.trim();
        }
      }
      post.updatedAt = new Date().toISOString();

      const saveRes = await saveBoardData(data, `[Board DB] Edit post #${id}`);

      return res.status(200).json({
        success: true,
        message: '게시글이 성공적으로 수정되었습니다.',
        saveInfo: saveRes
      });
    }

    // -------------------------------------------------------------------------
    // DELETE: Delete post
    // -------------------------------------------------------------------------
    if (req.method === 'DELETE') {
      const { id, password } = req.body || {};
      const { data } = await getBoardData(true);
      const postIndex = (data.posts || []).findIndex(p => String(p.id) === String(id));

      if (postIndex === -1) {
        return res.status(404).json({ success: false, message: '삭제할 게시글을 찾을 수 없습니다.' });
      }

      const post = data.posts[postIndex];

      // Auth validation: Admin OR matching password
      if (!isAdmin) {
        if (!password || hashPassword(password) !== post.passwordHash) {
          return res.status(403).json({ success: false, message: '비밀번호가 일치하지 않아 삭제할 수 없습니다.' });
        }
      }

      const removed = data.posts.splice(postIndex, 1)[0];
      const saveRes = await saveBoardData(data, `[Board DB] Delete post #${id} ("${removed.title.slice(0, 25)}")`);

      return res.status(200).json({
        success: true,
        message: '게시글이 성공적으로 삭제되었습니다.',
        saveInfo: saveRes
      });
    }

    return res.status(405).json({ success: false, message: '지원하지 않는 메서드입니다.' });
  } catch (error) {
    console.error('[API Board Error]', error);
    return res.status(500).json({
      success: false,
      message: '서버 내부 오류가 발생했습니다.',
      error: error.message
    });
  }
};
