const {
  getContentData,
  saveContentData,
  verifyAdminToken
} = require('./github-db');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // -------------------------------------------------------------------------
    // GET: Fetch current site content
    // -------------------------------------------------------------------------
    if (req.method === 'GET') {
      const { data, sha, source } = await getContentData();
      return res.status(200).json({
        success: true,
        data,
        source
      });
    }

    // -------------------------------------------------------------------------
    // POST / PUT: Content mutations (Requires Admin Authentication)
    // -------------------------------------------------------------------------
    if (req.method === 'POST' || req.method === 'PUT') {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';
      const adminPayload = verifyAdminToken(token);

      if (!adminPayload) {
        return res.status(401).json({
          success: false,
          message: '관리자 인증이 필요합니다. 관리자 로그인 후 다시 시도해 주세요.'
        });
      }

      const body = req.body || {};
      const action = body.action || req.query.action || 'update-full';
      const { data } = await getContentData(true);

      // 1. Save / Update Property
      if (action === 'save-property') {
        const prop = body.property;
        if (!prop || !prop.title) {
          return res.status(400).json({ success: false, message: '매물 정보(제목 필수)가 올바르지 않습니다.' });
        }

        data.properties = data.properties || [];
        let isNew = false;

        if (prop.id) {
          const idx = data.properties.findIndex(p => String(p.id) === String(prop.id));
          if (idx > -1) {
            data.properties[idx] = { ...data.properties[idx], ...prop };
          } else {
            isNew = true;
            data.properties.unshift(prop);
          }
        } else {
          isNew = true;
          prop.id = `PROP-${Date.now()}`;
          data.properties.unshift(prop);
        }

        const msg = isNew ? `[CMS] 새 매물 등록: "${prop.title}"` : `[CMS] 매물 수정: "${prop.title}"`;
        const saveRes = await saveContentData(data, msg);

        return res.status(200).json({
          success: true,
          message: isNew ? '새 매물이 성공적으로 등록되었습니다.' : '매물 정보가 수정되었습니다.',
          property: prop,
          saveInfo: saveRes
        });
      }

      // 2. Delete Property
      if (action === 'delete-property') {
        const { id } = body;
        data.properties = data.properties || [];
        const idx = data.properties.findIndex(p => String(p.id) === String(id));
        if (idx === -1) {
          return res.status(404).json({ success: false, message: '삭제할 매물을 찾을 수 없습니다.' });
        }

        const removed = data.properties.splice(idx, 1)[0];
        const saveRes = await saveContentData(data, `[CMS] 매물 삭제: #${id} ("${removed.title}")`);

        return res.status(200).json({
          success: true,
          message: '매물이 삭제되었습니다.',
          saveInfo: saveRes
        });
      }

      // 3. Save / Update Blog Post
      if (action === 'save-blog') {
        const post = body.post;
        if (!post || !post.title) {
          return res.status(400).json({ success: false, message: '블로그 포스팅 제목을 입력해 주세요.' });
        }

        data.blogPosts = data.blogPosts || [];
        let isNew = false;
        if (post.id) {
          const idx = data.blogPosts.findIndex(b => String(b.id) === String(post.id));
          if (idx > -1) {
            data.blogPosts[idx] = { ...data.blogPosts[idx], ...post };
          } else {
            isNew = true;
            data.blogPosts.unshift(post);
          }
        } else {
          isNew = true;
          post.id = `BLOG-${Date.now()}`;
          data.blogPosts.unshift(post);
        }

        const saveRes = await saveContentData(data, `[CMS] 블로그 포스팅 저장: "${post.title}"`);
        return res.status(200).json({
          success: true,
          message: '블로그 포스팅이 저장되었습니다.',
          post,
          saveInfo: saveRes
        });
      }

      // 4. Delete Blog Post
      if (action === 'delete-blog') {
        const { id } = body;
        data.blogPosts = data.blogPosts || [];
        const idx = data.blogPosts.findIndex(b => String(b.id) === String(id));
        if (idx > -1) {
          data.blogPosts.splice(idx, 1);
          await saveContentData(data, `[CMS] 블로그 포스팅 삭제: #${id}`);
          return res.status(200).json({ success: true, message: '블로그 포스팅이 삭제되었습니다.' });
        }
        return res.status(404).json({ success: false, message: '포스팅을 찾을 수 없습니다.' });
      }

      // 5. Save / Update News
      if (action === 'save-news') {
        const news = body.news;
        if (!news || !news.title) {
          return res.status(400).json({ success: false, message: '뉴스 제목을 입력해 주세요.' });
        }

        data.newsList = data.newsList || data.news || [];
        let isNew = false;
        if (news.id) {
          const idx = data.newsList.findIndex(n => String(n.id) === String(news.id));
          if (idx > -1) {
            data.newsList[idx] = { ...data.newsList[idx], ...news };
          } else {
            isNew = true;
            data.newsList.unshift(news);
          }
        } else {
          isNew = true;
          news.id = `NEWS-${Date.now()}`;
          data.newsList.unshift(news);
        }

        const saveRes = await saveContentData(data, `[CMS] 부동산 뉴스 저장: "${news.title}"`);
        return res.status(200).json({
          success: true,
          message: '부동산 뉴스가 저장되었습니다.',
          news,
          saveInfo: saveRes
        });
      }

      // 6. Delete News
      if (action === 'delete-news') {
        const { id } = body;
        data.newsList = data.newsList || data.news || [];
        const idx = data.newsList.findIndex(n => String(n.id) === String(id));
        if (idx > -1) {
          data.newsList.splice(idx, 1);
          await saveContentData(data, `[CMS] 부동산 뉴스 삭제: #${id}`);
          return res.status(200).json({ success: true, message: '뉴스가 삭제되었습니다.' });
        }
        return res.status(404).json({ success: false, message: '뉴스를 찾을 수 없습니다.' });
      }

      // 7. Update Office & Broker Information
      if (action === 'update-office') {
        const office = body.officeInfo || {};
        data.officeInfo = { ...(data.officeInfo || {}), ...office };
        const saveRes = await saveContentData(data, '[CMS] 공인중개사 대표 및 사무소 정보 수정');

        return res.status(200).json({
          success: true,
          message: '사무소 및 대표자 정보가 성공적으로 반영되었습니다.',
          officeInfo: data.officeInfo,
          saveInfo: saveRes
        });
      }

      // 8. Full Content Update
      if (action === 'update-full') {
        const newFullData = body.data;
        if (!newFullData || typeof newFullData !== 'object') {
          return res.status(400).json({ success: false, message: '유효한 데이터 형식이 아닙니다.' });
        }

        const saveRes = await saveContentData(newFullData, '[CMS] 전체 웹사이트 콘텐츠 일괄 업데이트');
        return res.status(200).json({
          success: true,
          message: '전체 콘텐츠가 성공적으로 저장되었습니다.',
          saveInfo: saveRes
        });
      }

      return res.status(400).json({ success: false, message: '지원하지 않는 콘텐츠 액션입니다.' });
    }

    return res.status(405).json({ success: false, message: '지원하지 않는 메서드입니다.' });
  } catch (error) {
    console.error('[API Content Error]', error);
    return res.status(500).json({
      success: false,
      message: '콘텐츠 처리 중 서버 오류가 발생했습니다.',
      error: error.message
    });
  }
};
