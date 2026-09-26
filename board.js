/**
 * 참좋은부동산 - 서버리스 소통게시판 클라이언트 스크립트 (board.js)
 * Vercel Serverless Function (/api/board) & GitHub DB 연동
 * 정적 호스팅 / 오프라인 환경에서도 data/board.json + localStorage 자동 폴백 지원
 */

(function () {
  'use strict';

  // Guard against server-side / Node.js execution
  if (typeof window === 'undefined') return;

  const BoardApp = {
    state: {
      category: '전체',
      search: '',
      page: 1,
      limit: 10,
      posts: [],
      categories: ['전체', '공지사항', '매물문의', '상담신청', '계약후기', '자유질문'],
      total: 0,
      totalPages: 1,
      currentPost: null,
      isOffline: false,
      adminToken: (typeof window !== 'undefined' && window.localStorage) ? (localStorage.getItem('chamgood_admin_token') || '') : ''
    },

    init: async function () {
      this.bindEvents();
      await this.loadPosts();
    },

    /**
     * API Request with offline/fallback resilience
     */
    apiFetch: async function (endpoint, options = {}) {
      try {
        const headers = options.headers || {};
        if (this.state.adminToken) {
          headers['Authorization'] = `Bearer ${this.state.adminToken}`;
        }
        options.headers = headers;

        const res = await fetch(endpoint, options);
        if (res.ok) {
          return await res.json();
        } else if (res.status === 404 && endpoint.startsWith('/api/board')) {
          // Vercel serverless function not running (e.g. pure static preview)
          return await this.fallbackLoad();
        } else {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `서버 응답 오류 (${res.status})`);
        }
      } catch (err) {
        console.warn('[Board API] Using fallback data store:', err.message);
        return await this.fallbackLoad();
      }
    },

    /**
     * Fallback for static server or file:/// preview
     */
    fallbackLoad: async function () {
      this.state.isOffline = true;
      try {
        const hasStorage = typeof window !== 'undefined' && window.localStorage;
        const localData = hasStorage ? localStorage.getItem('chamgood_board_offline_cache') : null;
        if (localData) {
          const parsed = JSON.parse(localData);
          return { success: true, posts: parsed.posts || [], categories: parsed.settings?.categories || this.state.categories };
        }
        const res = await fetch('data/board.json');
        if (res.ok) {
          const parsed = await res.json();
          if (hasStorage) {
            localStorage.setItem('chamgood_board_offline_cache', JSON.stringify(parsed));
          }
          return { success: true, posts: parsed.posts || [], categories: parsed.settings?.categories || this.state.categories };
        }
      } catch (e) {
        console.error('Fallback load error:', e);
      }
      return { success: true, posts: [], categories: this.state.categories };
    },

    /**
     * Load posts from /api/board
     */
    loadPosts: async function () {
      const container = document.getElementById('boardPostList');
      if (!container) return;

      container.innerHTML = `
        <div style="text-align:center; padding: 40px; color:#94a3b8;">
          <div class="spinner-gold" style="width:32px; height:32px; border:3px solid #e2e8f0; border-top-color:#d4af37; border-radius:50%; animation:spin 0.8s linear infinite; margin: 0 auto 12px;"></div>
          <span>게시글을 불러오는 중입니다...</span>
        </div>
      `;

      try {
        const queryParams = new URLSearchParams({
          category: this.state.category,
          search: this.state.search,
          page: this.state.page,
          limit: this.state.limit
        });

        const data = await this.apiFetch(`/api/board?${queryParams.toString()}`);
        if (data && data.posts) {
          this.state.posts = data.posts;
          if (data.categories) this.state.categories = data.categories;
          if (data.pagination) {
            this.state.total = data.pagination.total;
            this.state.totalPages = data.pagination.totalPages;
          }
          this.renderCategories();
          this.renderPosts(this.state.posts);
          this.renderNotice(data.settings?.notice);
        }
      } catch (err) {
        container.innerHTML = `
          <div style="text-align:center; padding: 32px; color:#ef4444; background:#fff; border-radius:12px; border:1px solid #fee2e2;">
            <p style="font-weight:700; margin-bottom:6px;">게시글을 불러오지 못했습니다.</p>
            <p style="font-size:0.88rem; color:#64748b;">${err.message}</p>
            <button onclick="window.BoardApp.loadPosts()" style="margin-top:12px; padding:6px 14px; background:#d4af37; color:#fff; border:none; border-radius:8px; cursor:pointer;">다시 시도</button>
          </div>
        `;
      }
    },

    /**
     * Render category pills
     */
    renderCategories: function () {
      const catContainer = document.getElementById('boardCategories');
      if (!catContainer) return;

      catContainer.innerHTML = this.state.categories.map(cat => {
        const isActive = this.state.category === cat ? 'active' : '';
        return `
          <button class="board-cat-btn ${isActive}" data-category="${cat}">
            ${cat}
          </button>
        `;
      }).join('');

      catContainer.querySelectorAll('.board-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.state.category = e.currentTarget.dataset.category;
          this.state.page = 1;
          this.loadPosts();
        });
      });
    },

    /**
     * Render notice text
     */
    renderNotice: function (noticeText) {
      const noticeBox = document.getElementById('boardNoticeText');
      if (noticeBox && noticeText) {
        noticeBox.textContent = noticeText;
      }
    },

    /**
     * Render post cards list
     */
    renderPosts: function (posts) {
      const container = document.getElementById('boardPostList');
      if (!container) return;

      if (!posts || posts.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding: 60px 20px; background:#ffffff; border-radius:16px; border:1px dashed #cbd5e1;">
            <svg style="width:48px; height:48px; color:#cbd5e1; margin-bottom:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h4 style="font-size:1.1rem; color:#334155; margin-bottom:6px;">등록된 게시글이 없습니다.</h4>
            <p style="font-size:0.9rem; color:#94a3b8; margin-bottom:16px;">첫 번째 질문이나 상담 글을 남겨보세요!</p>
            <button class="btn-board-primary" onclick="window.BoardApp.openWriteModal()">
              새 문의글 작성하기
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = posts.map(p => {
        const isPinned = Boolean(p.isPinned);
        const isSecret = Boolean(p.isSecret);
        const hasReplies = Array.isArray(p.replies) && p.replies.length > 0;
        const officialReply = (p.replies || []).find(r => r.isAdmin);

        // Status badge
        let statusBadge = '';
        if (p.category !== '공지사항') {
          if (hasReplies || officialReply) {
            statusBadge = `<span class="badge-reply-status answered">✓ 답변완료</span>`;
          } else {
            statusBadge = `<span class="badge-reply-status waiting">답변대기</span>`;
          }
        }

        // Relative date
        const dateStr = this.formatDate(p.createdAt);

        return `
          <article class="board-post-card ${isPinned ? 'pinned' : ''}" onclick="window.BoardApp.openPostDetail('${p.id}')" data-id="${p.id}">
            <div class="board-post-meta-row">
              <div class="board-meta-left">
                ${isPinned ? '<span class="badge-pinned">📌 공지</span>' : ''}
                <span class="badge-category">${p.category || '일반'}</span>
                ${isSecret ? '<span class="badge-secret">🔒 비밀글</span>' : ''}
                ${statusBadge}
              </div>
              <div class="board-meta-right">
                <span>${dateStr}</span>
              </div>
            </div>

            <h3 class="board-post-title">${this.escapeHtml(p.title)}</h3>
            <p class="board-post-preview">${this.escapeHtml(p.content)}</p>

            ${officialReply ? `
              <div class="board-official-answer-bubble">
                <svg class="official-seal-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div class="official-answer-text">
                  <div class="official-answer-author">참좋은공인중개사 대표 신제환 답변</div>
                  <div>${this.escapeHtml(officialReply.content.slice(0, 95))}${officialReply.content.length > 95 ? '...' : ''}</div>
                </div>
              </div>
            ` : ''}

            <div class="board-post-footer">
              <div class="board-author-box">
                <div class="board-author-avatar ${p.authorRole === 'admin' ? 'admin' : ''}">
                  ${p.author ? p.author.charAt(0) : '방'}
                </div>
                <span>${this.escapeHtml(p.author || '익명')}</span>
              </div>
              <div class="board-stats-box">
                <span class="stat-item" title="조회수">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  ${p.views || 0}
                </span>
                <span class="stat-item" title="좋아요">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  ${p.likes || 0}
                </span>
                <span class="stat-item" title="답변/댓글">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  ${(p.replies || []).length}
                </span>
              </div>
            </div>
          </article>
        `;
      }).join('');
    },

    /**
     * Open post detail in modal
     */
    openPostDetail: async function (postId) {
      const modal = document.getElementById('modalBoardDetail');
      if (!modal) return;

      modal.showModal();
      const body = document.getElementById('boardDetailBody');
      body.innerHTML = `
        <div style="text-align:center; padding: 40px; color:#94a3b8;">
          <div class="spinner-gold" style="width:28px; height:28px; border:3px solid #e2e8f0; border-top-color:#d4af37; border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 10px;"></div>
          <span>내용을 불러오는 중...</span>
        </div>
      `;

      try {
        const res = await this.apiFetch(`/api/board?id=${postId}`);
        if (!res || !res.post) throw new Error('게시글을 찾을 수 없습니다.');
        const post = res.post;
        this.state.currentPost = post;

        let secretUnlockHtml = '';
        if (post.isSecret && !res.isAdmin) {
          secretUnlockHtml = `
            <div id="secretUnlockBox" style="margin: 20px 0; padding: 18px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px;">
              <div style="font-weight: 700; color: #b45309; margin-bottom: 8px;">🔒 비밀글 잠금 해제</div>
              <p style="font-size: 0.88rem; color: #92400e; margin-bottom: 12px;">작성 시 설정하신 비밀번호를 입력하시면 내용을 확인하실 수 있습니다.</p>
              <div style="display:flex; gap:8px;">
                <input type="password" id="secretPasswordInput" placeholder="비밀번호 입력" style="flex:1; padding:8px 12px; border:1px solid #d1d5db; border-radius:8px;">
                <button onclick="window.BoardApp.unlockSecret('${post.id}')" style="padding:8px 16px; background:#b45309; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">확인</button>
              </div>
              <p id="secretErrorMsg" style="color:#dc2626; font-size:0.82rem; margin-top:6px; display:none;"></p>
            </div>
          `;
        }

        body.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            ${post.isPinned ? '<span class="badge-pinned">📌 공지</span>' : ''}
            <span class="badge-category">${post.category}</span>
            ${post.isSecret ? '<span class="badge-secret">🔒 비밀글</span>' : ''}
          </div>

          <h2 style="font-size:1.45rem; font-weight:800; color:#0f172a; line-height:1.4; margin-bottom:14px;">
            ${this.escapeHtml(post.title)}
          </h2>

          <div style="display:flex; align-items:center; justify-content:space-between; padding-bottom:16px; border-bottom:1px solid #e2e8f0; font-size:0.88rem; color:#64748b;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-weight:700; color:#0f172a;">${this.escapeHtml(post.author)}</span>
              <span>·</span>
              <span>${this.formatDate(post.createdAt)}</span>
            </div>
            <div style="display:flex; gap:12px;">
              <span>조회 ${post.views || 0}</span>
              <span>좋아요 ${post.likes || 0}</span>
            </div>
          </div>

          ${secretUnlockHtml}

          <div id="postContentDisplay" style="margin:20px 0; font-size:1rem; line-height:1.75; color:#1e293b; white-space:pre-wrap;">${this.escapeHtml(post.content)}</div>

          <div style="display:flex; justify-content:center; margin:28px 0;">
            <button id="btnLikePost" onclick="window.BoardApp.likePost('${post.id}')" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; background:#fff; border:1px solid #e2e8f0; border-radius:9999px; font-weight:700; color:#ef4444; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.05); transition:all 0.2s;">
              <svg style="width:18px; height:18px; fill:currentColor;" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span id="likeCountSpan">좋아요 ${post.likes || 0}</span>
            </button>
          </div>

          <!-- Replies / Official Answers Section -->
          <div class="board-replies-section">
            <h4 class="board-replies-title">
              <span>답변 및 댓글</span>
              <span style="color:#d4af37;">(${(post.replies || []).length})</span>
            </h4>

            <div id="repliesList">
              ${(post.replies && post.replies.length > 0) ? post.replies.map(r => `
                <div class="reply-item-card ${r.isAdmin ? 'admin-reply' : ''}">
                  <div class="reply-header">
                    <span class="reply-author ${r.isAdmin ? 'admin' : ''}">
                      ${r.isAdmin ? '★ 참좋은부동산 (대표 신제환)' : this.escapeHtml(r.author || '방문자')}
                    </span>
                    <span style="color:#94a3b8; font-size:0.8rem;">${this.formatDate(r.createdAt)}</span>
                  </div>
                  <div class="reply-content">${this.escapeHtml(r.content)}</div>
                </div>
              `).join('') : '<p style="color:#94a3b8; font-size:0.9rem; padding:12px 0;">아직 등록된 답변이 없습니다.</p>'}
            </div>

            <!-- Reply Form -->
            <form id="replyForm" onsubmit="event.preventDefault(); window.BoardApp.submitReply('${post.id}');" style="margin-top:20px; background:#f8fafc; padding:16px; border-radius:14px; border:1px solid #e2e8f0;">
              <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="text" id="replyAuthor" placeholder="작성자 성함 (기본: 방문자)" style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; font-size:0.88rem;">
                <input type="password" id="replyPassword" placeholder="비밀번호(선택)" style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; font-size:0.88rem;">
              </div>
              <textarea id="replyContent" required rows="3" placeholder="질문이나 추가 문의사항을 남겨주세요." style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:8px; font-size:0.92rem; margin-bottom:10px; resize:vertical;"></textarea>
              <div style="display:flex; justify-content:flex-end;">
                <button type="submit" class="btn-board-primary" style="padding:8px 18px; font-size:0.88rem;">
                  답변/댓글 등록
                </button>
              </div>
            </form>
          </div>
        `;
      } catch (err) {
        body.innerHTML = `
          <div style="padding:24px; color:#ef4444; text-align:center;">
            ${err.message}
          </div>
        `;
      }
    },

    /**
     * Unlock secret post with password
     */
    unlockSecret: async function (postId) {
      const passInput = document.getElementById('secretPasswordInput');
      const errorMsg = document.getElementById('secretErrorMsg');
      if (!passInput || !passInput.value) {
        if (errorMsg) {
          errorMsg.textContent = '비밀번호를 입력해 주세요.';
          errorMsg.style.display = 'block';
        }
        return;
      }

      try {
        const res = await this.apiFetch('/api/board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'unlock',
            postId,
            password: passInput.value
          })
        });

        if (res.success && res.rawContent) {
          const display = document.getElementById('postContentDisplay');
          const unlockBox = document.getElementById('secretUnlockBox');
          if (display) display.textContent = res.rawContent;
          if (unlockBox) {
            unlockBox.innerHTML = `
              <div style="color:#059669; font-weight:700;">✓ 비밀글이 정상적으로 열람되었습니다.</div>
              ${res.contact ? `<div style="font-size:0.88rem; color:#475569; margin-top:4px;">연락처: ${this.escapeHtml(res.contact)}</div>` : ''}
            `;
          }
          if (window.showToast) window.showToast('비밀글이 해제되었습니다.', 'success');
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = err.message || '비밀번호가 일치하지 않습니다.';
          errorMsg.style.display = 'block';
        }
      }
    },

    /**
     * Like a post
     */
    likePost: async function (postId) {
      try {
        const res = await this.apiFetch('/api/board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'like', postId })
        });
        if (res.success) {
          const span = document.getElementById('likeCountSpan');
          if (span) span.textContent = `좋아요 ${res.likes}`;
          if (window.showToast) window.showToast('게시글을 추천했습니다!', 'success');
        }
      } catch (e) {
        console.error('Like error:', e);
      }
    },

    /**
     * Submit a reply
     */
    submitReply: async function (postId) {
      const author = document.getElementById('replyAuthor').value.trim();
      const content = document.getElementById('replyContent').value.trim();
      const password = document.getElementById('replyPassword').value;

      if (!content) return;

      try {
        const res = await this.apiFetch('/api/board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'reply',
            postId,
            author,
            content,
            password
          })
        });

        if (res.success) {
          if (window.showToast) window.showToast(res.message || '답변이 등록되었습니다!', 'success');
          // Reload detail
          this.openPostDetail(postId);
          this.loadPosts();
        }
      } catch (err) {
        alert(err.message || '등록 실패');
      }
    },

    /**
     * Open Write Modal
     */
    openWriteModal: function () {
      const modal = document.getElementById('modalBoardWrite');
      if (!modal) return;

      const form = document.getElementById('formBoardWrite');
      if (form) form.reset();

      const passGroup = document.getElementById('writePasswordGroup');
      if (passGroup) passGroup.style.display = 'none';

      modal.showModal();
    },

    /**
     * Handle New Post Submit
     */
    handleWriteSubmit: async function () {
      const title = document.getElementById('writeTitle').value.trim();
      const author = document.getElementById('writeAuthor').value.trim();
      const category = document.getElementById('writeCategory').value;
      const content = document.getElementById('writeContent').value.trim();
      const contact = document.getElementById('writeContact') ? document.getElementById('writeContact').value.trim() : '';
      const isSecret = document.getElementById('writeSecretCheck') ? document.getElementById('writeSecretCheck').checked : false;
      const password = document.getElementById('writePassword') ? document.getElementById('writePassword').value : '';

      if (!title || !author || !content) {
        alert('필수 입력 항목(제목, 작성자, 내용)을 모두 작성해 주세요.');
        return;
      }

      if (isSecret && !password) {
        alert('비밀글로 등록 시 비밀번호 입력이 필수입니다.');
        return;
      }

      const submitBtn = document.getElementById('btnSubmitPost');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'GitHub DB 커밋 중...';
      }

      try {
        const res = await this.apiFetch('/api/board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create',
            title,
            author,
            category,
            content,
            contact,
            isSecret,
            password
          })
        });

        if (res.success) {
          document.getElementById('modalBoardWrite').close();
          if (window.showToast) {
            window.showToast(res.message || '게시글이 성공적으로 영구 보존되었습니다.', 'success');
          }
          await this.loadPosts();
        }
      } catch (err) {
        alert(err.message || '게시글 등록 중 오류가 발생했습니다.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '게시글 등록 완료';
        }
      }
    },

    /**
     * Helper: Bind UI events
     */
    bindEvents: function () {
      const searchInput = document.getElementById('boardSearchInput');
      if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.state.search = e.target.value;
            this.state.page = 1;
            this.loadPosts();
          }, 350);
        });
      }

      const secretCheck = document.getElementById('writeSecretCheck');
      if (secretCheck) {
        secretCheck.addEventListener('change', (e) => {
          const passGroup = document.getElementById('writePasswordGroup');
          if (passGroup) {
            passGroup.style.display = e.target.checked ? 'block' : 'none';
          }
        });
      }
    },

    /**
     * Helper: Format Date
     */
    formatDate: function (isoString) {
      if (!isoString) return '';
      try {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) {
          const diffMins = Math.floor(diffMs / (1000 * 60));
          return diffMins <= 0 ? '방금 전' : `${diffMins}분 전`;
        }
        if (diffHours < 24) {
          return `${diffHours}시간 전`;
        }
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}.${m}.${d}`;
      } catch (e) {
        return isoString;
      }
    },

    /**
     * Helper: Escape HTML
     */
    escapeHtml: function (str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  };

  // Expose to window
  window.BoardApp = BoardApp;

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BoardApp.init());
  } else {
    BoardApp.init();
  }
})();
