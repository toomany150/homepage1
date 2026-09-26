/**
 * 참좋은부동산 (부산 사상구) - UI/UX PRO MAX 인터랙티브 스크립트
 * Airbnb (주거 감성) + Stripe (상가/공장 데이터) 하이브리드 인터랙션
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentCategory: 'all',
    currentDealType: 'all',
    currentSort: 'recommended',
    selectedDistrict: 'all',
    likes: JSON.parse(localStorage.getItem('cham_joeun_likes') || '[]'),
    userReviews: JSON.parse(localStorage.getItem('cham_joeun_user_reviews') || '[]'),
    userConsultations: JSON.parse(localStorage.getItem('cham_joeun_user_consultations') || '[]'),
    activeReviewCat: 'all'
  };

  // SVG Helper Icons
  const ICONS = {
    heart: `<svg class="icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    star: `<svg class="icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    pin: `<svg class="icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg class="icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    arrowRight: `<svg class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    check: `<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  // Toast System
  window.showToast = function (message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" style="color:var(--primary-gold);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove after 3.2s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // DOM Elements
  const propertyGrid = document.getElementById('propertyGrid');
  const propCount = document.getElementById('propCount');
  const propSortSelect = document.getElementById('propSortSelect');
  const blogGrid = document.getElementById('blogGrid');
  const newsGrid = document.getElementById('newsGrid');
  const reviewsGrid = document.getElementById('reviewsGrid');
  const recentInquiryList = document.getElementById('recentInquiryList');
  const likesCounter = document.getElementById('likesCounter');
  const mobileLikesCount = document.getElementById('mobileLikesCount');

  // Modals
  const propertyDetailModal = document.getElementById('propertyDetailModal');
  const modalPropertyTitle = document.getElementById('modalPropertyTitle');
  const modalPropertyContent = document.getElementById('modalPropertyContent');
  const writeReviewModal = document.getElementById('writeReviewModal');
  const favoritesModal = document.getElementById('favoritesModal');
  const favoritesListContent = document.getElementById('favoritesListContent');

  // Mobile Drawer
  const btnHamburger = document.getElementById('btnHamburger');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  // Initialize
  function init() {
    renderProperties();
    renderBlogPosts();
    renderNews();
    renderReviews();
    renderConsultationTicker();
    updateLikesCount();
    bindEvents();
  }

  // 1. Render Properties Grid
  function renderProperties() {
    if (!propertyGrid) return;

    let items = [...REAL_ESTATE_DATA.properties];

    // Filter by Category
    if (state.currentCategory !== 'all') {
      items = items.filter(p => p.category === state.currentCategory);
    }

    // Filter by District
    if (state.selectedDistrict !== 'all') {
      if (state.selectedDistrict === '기타구') {
        items = items.filter(p => p.district.includes('기타구') || (!p.district.includes('사상구') && !['괘법동','감전동','주례동','학장동','엄궁동','모라동','삼락동','덕포동'].some(d => p.district.includes(d))));
      } else {
        items = items.filter(p => p.district.includes(state.selectedDistrict) || p.district === '사상구 전역');
      }
    }

    // Filter by Deal Type
    if (state.currentDealType !== 'all') {
      items = items.filter(p => p.dealType === state.currentDealType);
    }

    // Sort
    if (state.currentSort === 'priceDesc') {
      items.sort((a, b) => b.priceValue - a.priceValue);
    } else if (state.currentSort === 'priceAsc') {
      items.sort((a, b) => a.priceValue - b.priceValue);
    }

    if (propCount) {
      propCount.textContent = items.length;
    }

    if (items.length === 0) {
      propertyGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background:#fff; border-radius:14px; border:1px dashed var(--hairline);">
          <svg class="icon" viewBox="0 0 24 24" style="width:48px; height:48px; color:var(--ink-500); margin-bottom:12px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--ink-900); margin-bottom:6px;">해당 조건의 매물이 없습니다</h3>
          <p style="font-size:0.9rem; color:var(--ink-600); margin-bottom:16px;">다른 지역 또는 거래 유형을 선택해 보시거나 1:1 맞춤 매물 의뢰를 남겨주세요.</p>
          <button class="deal-chip" onclick="window.resetFilters();" style="display:inline-block;">필터 초기화</button>
        </div>
      `;
      return;
    }

    propertyGrid.innerHTML = items.map(item => {
      const isLiked = state.likes.includes(item.id);

      // A. Residential: Apartment & House
      if (item.category === 'apartment' || item.category === 'house') {
        return `
          <article class="prop-card" onclick="window.openPropertyDetail('${item.id}')" role="button" tabindex="0" aria-label="${item.title}">
            <div class="prop-thumb-box">
              <img src="${item.image}" alt="${item.title}" class="prop-thumb-img" loading="lazy">
              ${item.isFeatured ? `<span class="prop-badge-featured">추천매물</span>` : ''}
              <button class="btn-prop-like ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); window.toggleLike('${item.id}');" aria-label="관심매물 찜하기">
                ${ICONS.heart}
              </button>
              <span class="prop-deal-badge">${item.dealType}</span>
            </div>
            <div class="prop-card-body">
              <div class="prop-meta-row">
                <span class="prop-district">${ICONS.pin} ${item.district}</span>
                <span class="prop-rating">${ICONS.star} ${item.rating}</span>
              </div>
              <h3 class="prop-title">${item.title}</h3>
              <div class="prop-price">
                ${item.price}
                <span class="prop-price-sub">${item.floor || ''}</span>
              </div>
              <div class="airbnb-specs">
                <div class="airbnb-spec-item">
                  <svg class="icon" viewBox="0 0 24 24" style="width:16px; height:16px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  <span>${item.rooms || '전용 84㎡'}</span>
                </div>
                <div class="airbnb-spec-item">
                  <svg class="icon" viewBox="0 0 24 24" style="width:16px; height:16px;"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  <span>${item.area}</span>
                </div>
              </div>
              <div class="prop-tags">
                ${item.tags.map(t => `<span class="prop-tag">${t}</span>`).join('')}
              </div>
            </div>
          </article>
        `;
      }

      // C. Commercial / Factory / Land (Stripe Style Spec Table)
      return `
        <article class="prop-card" onclick="window.openPropertyDetail('${item.id}')" role="button" tabindex="0" aria-label="${item.title}">
          <div class="prop-thumb-box">
            <img src="${item.image}" alt="${item.title}" class="prop-thumb-img" loading="lazy">
            ${item.isFeatured ? `<span class="prop-badge-featured">${item.category === 'factory' ? '사상공단 실매물' : '특급 상권'}</span>` : ''}
            <button class="btn-prop-like ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); window.toggleLike('${item.id}');" aria-label="관심매물 찜하기">
              ${ICONS.heart}
            </button>
            <span class="prop-deal-badge" style="background:var(--ink-900); color:var(--primary-gold);">${item.dealType}</span>
          </div>
          <div class="prop-card-body">
            <div class="prop-meta-row">
              <span class="prop-district">${ICONS.pin} ${item.district}</span>
              <span class="prop-rating" style="color:var(--primary-gold-dark);">${item.categoryName}</span>
            </div>
            <h3 class="prop-title">${item.title}</h3>
            <div class="prop-price">
              ${item.price}
            </div>

            <!-- Stripe Style Data Table Preview -->
            <table class="stripe-table">
              <tbody>
                ${item.category === 'factory' ? `
                  <tr>
                    <th>유효 층고</th>
                    <td>${item.ceilingHeight || 'H=9m'}</td>
                  </tr>
                  <tr>
                    <th>호이스트</th>
                    <td>${item.hoist || '5톤 1기'}</td>
                  </tr>
                  <tr>
                    <th>전력 용량</th>
                    <td>${item.powerCapacity || '250kW'}</td>
                  </tr>
                ` : item.category === 'store' ? `
                  <tr>
                    <th>전용 면적</th>
                    <td>${item.area}</td>
                  </tr>
                  <tr>
                    <th>추천 업종</th>
                    <td>카페/음식점/의원</td>
                  </tr>
                  <tr>
                    <th>수익률</th>
                    <td><strong style="color:var(--accent-emerald);">${item.expectedYield || '5.8%'}</strong></td>
                  </tr>
                ` : `
                  <tr>
                    <th>토지 면적</th>
                    <td>${item.area}</td>
                  </tr>
                  <tr>
                    <th>용도 지역</th>
                    <td>${item.zoning || '준공업지역'}</td>
                  </tr>
                  <tr>
                    <th>도로 접면</th>
                    <td>${item.roadContact || '6m 도로 접'}</td>
                  </tr>
                `}
              </tbody>
            </table>

            <div class="prop-tags">
              ${item.tags.map(t => `<span class="prop-tag">${t}</span>`).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 2. Render Naver Blog Posts (썸네일 + 요약내용)
  function renderBlogPosts() {
    if (!blogGrid) return;

    blogGrid.innerHTML = REAL_ESTATE_DATA.blogPosts.map(post => `
      <article class="blog-card" onclick="window.open('${post.link}', '_blank')" role="link" tabindex="0" aria-label="${post.title}">
        <div class="blog-thumb-box">
          <img src="${post.thumbnail}" alt="${post.title}" class="blog-thumb-img" loading="lazy">
          <span class="blog-category-badge">${post.category}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-meta-row">
            <span>${post.date}</span>
            <span>조회 ${post.views}</span>
          </div>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div class="blog-card-footer">
            <span>작성자: ${post.author}</span>
            <span class="blog-btn-more">
              블로그 전문보기
              ${ICONS.arrowRight}
            </span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // 3. Render Real Estate News Board
  function renderNews() {
    if (!newsGrid) return;

    newsGrid.innerHTML = REAL_ESTATE_DATA.newsList.map(news => `
      <article class="news-card" onclick="window.showNewsModal('${news.id}')" role="button" tabindex="0" aria-label="${news.title}">
        <div>
          <div class="news-card-header">
            <span class="news-badge ${news.badgeColor}">${news.badge}</span>
            <span class="news-source">${news.source}</span>
            <span class="news-date">${news.date}</span>
          </div>
          <h3 class="news-card-title">${news.title}</h3>
          <p class="news-card-summary">${news.summary}</p>
        </div>
        <div class="news-card-footer">
          <span>공인중개사 분석 브리핑 읽기</span>
          ${ICONS.arrowRight}
        </div>
      </article>
    `).join('');
  }

  // 4. Render Customer Reviews Board
  function renderReviews() {
    if (!reviewsGrid) return;

    let allReviews = [...state.userReviews, ...REAL_ESTATE_DATA.reviews];

    if (state.activeReviewCat !== 'all') {
      allReviews = allReviews.filter(r => r.category === state.activeReviewCat);
    }

    reviewsGrid.innerHTML = allReviews.map(r => `
      <div class="review-card">
        <div>
          <div class="review-card-top">
            <span class="review-author">${r.name}</span>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="stars-row" style="margin-bottom:8px;">
            ${Array.from({ length: r.rating || 5 }).map(() => ICONS.star).join('')}
          </div>
          <span class="review-contract-badge">
            ${ICONS.check}
            ${r.verifiedBadge || '실거래 인증 완료'}
          </span>
          <p class="review-text">"${r.content}"</p>
        </div>
        <div class="review-card-footer">
          <span class="review-property-tag">${r.propertyTitle || r.dealType}</span>
          <span style="font-size:0.75rem; color:var(--ink-500);">${r.dealType}</span>
        </div>
      </div>
    `).join('');
  }

  // 5. Render Consultation Ticker
  function renderConsultationTicker() {
    if (!recentInquiryList) return;

    const list = [...state.userConsultations, ...REAL_ESTATE_DATA.recentConsultations];

    recentInquiryList.innerHTML = list.slice(0, 5).map(item => `
      <div class="inquiry-item">
        <div class="inquiry-client-info">
          <span class="inquiry-client-name">${item.name}</span>
          <span class="inquiry-target">${item.target}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:0.75rem; color:var(--ink-500);">${item.time}</span>
          <span class="inquiry-status-badge ${item.time.includes('방금') ? 'new' : ''}">${item.status}</span>
        </div>
      </div>
    `).join('');
  }

  // 6. Favorites Management (찜하기)
  window.toggleLike = function (propId) {
    const idx = state.likes.indexOf(propId);
    if (idx > -1) {
      state.likes.splice(idx, 1);
      window.showToast('관심 매물에서 제외되었습니다.');
    } else {
      state.likes.push(propId);
      window.showToast('관심 매물에 저장되었습니다! 상단 하트에서 확인하세요.');
    }
    localStorage.setItem('cham_joeun_likes', JSON.stringify(state.likes));
    updateLikesCount();
    renderProperties();
  };

  function updateLikesCount() {
    const count = state.likes.length;
    if (likesCounter) likesCounter.textContent = count;
    if (mobileLikesCount) mobileLikesCount.textContent = count;
  }

  // Open Favorites Modal
  window.openFavoritesModal = function () {
    if (!favoritesListContent || !favoritesModal) return;

    const likedItems = REAL_ESTATE_DATA.properties.filter(p => state.likes.includes(p.id));

    if (likedItems.length === 0) {
      favoritesListContent.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
          <svg class="icon" viewBox="0 0 24 24" style="width:48px; height:48px; color:var(--hairline-dark); margin-bottom:12px;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p style="font-size:1rem; font-weight:700; color:var(--ink-800);">아직 찜한 매물이 없습니다.</p>
          <p style="font-size:0.85rem; color:var(--ink-500); margin-top:4px;">마음에 드는 매물 사진의 하트 버튼을 눌러 관심 매물로 등록해 보세요.</p>
        </div>
      `;
    } else {
      favoritesListContent.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${likedItems.map(p => `
            <div style="display:flex; align-items:center; gap:14px; padding:12px; background:var(--surface-soft); border-radius:8px; border:1px solid var(--hairline);">
              <img src="${p.image}" alt="${p.title}" style="width:72px; height:60px; object-fit:cover; border-radius:6px;">
              <div style="flex:1;">
                <span style="font-size:0.75rem; font-weight:700; color:var(--primary-gold-dark);">${p.categoryName} · ${p.district}</span>
                <h4 style="font-size:0.95rem; font-weight:800; color:var(--ink-900); cursor:pointer;" onclick="propertyDetailModal.close(); window.openPropertyDetail('${p.id}');">${p.title}</h4>
                <span style="font-size:0.95rem; font-weight:800; color:var(--ink-900);">${p.price}</span>
              </div>
              <button onclick="window.toggleLike('${p.id}'); window.openFavoritesModal();" style="color:var(--accent-rose); padding:8px;" aria-label="삭제">
                ${ICONS.heart}
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }
    favoritesModal.showModal();
  };

  // 7. Property Detail Modal
  window.openPropertyDetail = function (propId) {
    const item = REAL_ESTATE_DATA.properties.find(p => p.id === propId);
    if (!item || !propertyDetailModal) return;

    modalPropertyTitle.textContent = item.title;

    // Check if Info Guide
    if (item.category === 'info') {
      modalPropertyContent.innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="width:100%; max-height:300px; object-fit:cover; border-radius:12px; margin-bottom:20px;">
        <div style="display:flex; gap:8px; margin-bottom:12px;">
          <span class="prop-deal-badge" style="position:static; display:inline-block;">${item.categoryName}</span>
          <span class="prop-tag">${item.readTime}</span>
        </div>
        <p style="font-size:1.05rem; line-height:1.7; color:var(--ink-800); margin-bottom:24px;">${item.description}</p>
        <div style="background:var(--surface-soft); border:1px solid var(--hairline); border-radius:10px; padding:20px; margin-bottom:20px;">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--ink-900); margin-bottom:14px;">핵심 브리핑 포인트</h4>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${(item.infoPoints || []).map(pt => `
              <div>
                <strong style="color:var(--primary-gold-dark); font-size:0.92rem;">${pt.title}</strong>
                <p style="font-size:0.88rem; color:var(--ink-700); margin-top:2px;">${pt.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="padding:16px; background:var(--primary-gold-light); border-radius:8px; font-size:0.88rem; color:var(--primary-gold-dark); font-weight:600;">
          💡 <strong>공인중개사 팁:</strong> ${item.agentNotes}
        </div>
      `;
      propertyDetailModal.showModal();
      return;
    }

    // Residential (Airbnb Layout)
    if (item.category === 'apartment' || item.category === 'house') {
      modalPropertyContent.innerHTML = `
        <div style="position:relative; margin-bottom:20px; border-radius:14px; overflow:hidden;">
          <img src="${item.image}" alt="${item.title}" style="width:100%; max-height:360px; object-fit:cover;">
          <span class="prop-deal-badge">${item.dealType}</span>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div>
            <span style="font-size:0.85rem; font-weight:700; color:var(--ink-500);">${item.district} · ${item.location}</span>
            <div style="font-size:1.6rem; font-weight:800; color:var(--primary-gold-dark); margin-top:2px;">${item.price}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.1rem; font-weight:800; color:var(--ink-900);">${item.area}</div>
            <span style="font-size:0.85rem; color:var(--ink-500);">${item.floor || ''}</span>
          </div>
        </div>

        <p style="font-size:0.95rem; color:var(--ink-700); line-height:1.7; margin-bottom:20px;">
          ${item.description}
        </p>

        <!-- Airbnb 2-Col Amenity Grid -->
        <h4 style="font-size:1.05rem; font-weight:800; color:var(--ink-900); margin-bottom:12px;">공간 구성 및 주요 옵션</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:24px;">
          ${(item.amenities || []).map(am => `
            <div style="display:flex; align-items:center; gap:8px; padding:10px 14px; background:var(--surface-soft); border-radius:8px; font-size:0.88rem; color:var(--ink-800);">
              <span style="color:var(--accent-emerald);">${ICONS.check}</span>
              <span>${am.label}</span>
            </div>
          `).join('')}
        </div>

        <div style="padding:16px; background:var(--primary-gold-light); border-radius:8px; font-size:0.88rem; color:var(--primary-gold-dark); font-weight:600;">
          💡 <strong>공인중개사 코멘트:</strong> ${item.agentNotes}
        </div>
      `;
    } else {
      // Commercial & Industrial (Stripe Layout)
      modalPropertyContent.innerHTML = `
        <div style="position:relative; margin-bottom:20px; border-radius:14px; overflow:hidden;">
          <img src="${item.image}" alt="${item.title}" style="width:100%; max-height:360px; object-fit:cover;">
          <span class="prop-deal-badge" style="background:var(--ink-900); color:var(--primary-gold);">${item.dealType}</span>
        </div>

        <div style="margin-bottom:16px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--ink-500);">${item.district} · ${item.location}</span>
          <div style="font-size:1.6rem; font-weight:800; color:var(--primary-gold-dark); margin-top:2px;">${item.price}</div>
        </div>

        <p style="font-size:0.95rem; color:var(--ink-700); line-height:1.7; margin-bottom:20px;">
          ${item.description}
        </p>

        <!-- Stripe Financial / Industrial Spec Sheet Table -->
        <h4 style="font-size:1.05rem; font-weight:800; color:var(--ink-900); margin-bottom:12px;">핵심 스펙 및 계약 데이터 브리핑</h4>
        <table class="stripe-table" style="font-size:0.9rem; margin-bottom:24px;">
          <tbody>
            ${(item.stripeSpecs || []).map(spec => `
              <tr>
                <th style="padding:10px 14px; width:45%;">${spec.label}</th>
                <td style="padding:10px 14px;">${spec.value}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="padding:16px; background:var(--surface-alt); border-left:4px solid var(--ink-900); border-radius:4px; font-size:0.88rem; color:var(--ink-800); font-weight:600;">
          💼 <strong>공인중개사 중개 전략:</strong> ${item.agentNotes}
        </div>
      `;
    }

    propertyDetailModal.showModal();
  };

  // 8. News Detail Modal
  window.showNewsModal = function (newsId) {
    const item = REAL_ESTATE_DATA.newsList.find(n => n.id === newsId);
    if (!item || !propertyDetailModal) return;

    modalPropertyTitle.textContent = item.title;
    modalPropertyContent.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
        <span class="news-badge ${item.badgeColor}">${item.badge}</span>
        <span style="font-size:0.85rem; color:var(--ink-500);">${item.source} · ${item.date}</span>
      </div>
      <p style="font-size:1.05rem; font-weight:700; color:var(--ink-900); line-height:1.6; margin-bottom:16px;">
        ${item.summary}
      </p>
      <div style="font-size:0.95rem; color:var(--ink-700); line-height:1.8; margin-bottom:24px;">
        ${item.content}
      </div>
      <div style="background:var(--primary-gold-light); padding:16px; border-radius:8px; border:1px solid rgba(212,175,55,0.3);">
        <strong style="color:var(--primary-gold-dark); font-size:0.92rem;">참좋은공인중개사 리서치 브리핑</strong>
        <p style="font-size:0.88rem; color:var(--ink-800); margin-top:4px;">
          본 정책 및 인프라 확충에 따른 사상구 인근(괘법, 감전, 엄궁) 실물 부동산 영향에 대해 궁금하신 점은 1:1 상담 또는 유선으로 맞춤 권리분석을 받아보실 수 있습니다.
        </p>
      </div>
    `;
    propertyDetailModal.showModal();
  };

  // 9. Hero Search Handler
  window.handleHeroSearch = function () {
    const district = document.getElementById('searchDistrict').value;
    const category = document.getElementById('searchCategory').value;
    const dealType = document.getElementById('searchDealType').value;

    state.selectedDistrict = district;
    state.currentCategory = category;
    state.currentDealType = dealType;

    // Sync Category Tab UI
    document.querySelectorAll('.category-tab').forEach(tab => {
      if (tab.getAttribute('data-category') === category) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // Sync Deal Chip UI
    document.querySelectorAll('.deal-chip').forEach(chip => {
      if (chip.getAttribute('data-deal') === dealType) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    renderProperties();

    // Scroll to properties
    const target = document.getElementById('propertiesSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    window.showToast(`검색 완료: 총 ${propCount.textContent}건의 매물을 찾았습니다!`);
  };

  // 10. Modal Openers & Submissions (매물접수, 매수의뢰, 후기작성)
  window.openPropertyRegisterModal = function () {
    const modal = document.getElementById('modalPropertyRegister');
    if (modal) modal.showModal();
  };

  window.openPropertyBuyRequestModal = function () {
    const modal = document.getElementById('modalPropertyBuyRequest');
    if (modal) modal.showModal();
  };

  window.openWriteReviewModal = function () {
    if (writeReviewModal) writeReviewModal.showModal();
  };

  window.handlePropertyRegisterSubmit = function () {
    const name = document.getElementById('regName')?.value.trim() || '고객';
    const phone = document.getElementById('regPhone')?.value.trim();
    const cat = document.getElementById('regCategory')?.value || '매물';
    const type = document.getElementById('regType')?.value || '매도';
    const loc = document.getElementById('regLocation')?.value.trim() || '';

    const modal = document.getElementById('modalPropertyRegister');
    if (modal) modal.close();

    document.getElementById('formPropertyRegister')?.reset();
    window.showToast(`${name} 님, ${cat} (${type}) 매물접수가 완료되었습니다! 담당 공인중개사가 신속히 연락드리겠습니다.`);
  };

  window.handlePropertyBuyRequestSubmit = function () {
    const name = document.getElementById('buyName')?.value.trim() || '고객';
    const phone = document.getElementById('buyPhone')?.value.trim();
    const cat = document.getElementById('buyCategory')?.value || '매물';
    const type = document.getElementById('buyType')?.value || '매수';
    const loc = document.getElementById('buyLocation')?.value.trim() || '';

    const modal = document.getElementById('modalPropertyBuyRequest');
    if (modal) modal.close();

    document.getElementById('formPropertyBuyRequest')?.reset();
    window.showToast(`${name} 님, ${cat} (${type}) 의뢰가 접수되었습니다! 최적의 매물을 찾아 연락드리겠습니다.`);
  };

  // 11. Review Writing & Submission
  window.handleReviewSubmit = function () {
    const author = document.getElementById('reviewAuthor').value.trim();
    const cat = document.getElementById('reviewCategory').value;
    const propTitle = document.getElementById('reviewPropertyTitle').value.trim();
    const score = parseInt(document.getElementById('selectedStarScore').value, 10) || 5;
    const content = document.getElementById('reviewContent').value.trim();

    if (!author || !content) {
      window.showToast('성함과 후기 내용을 입력해 주세요.');
      return;
    }

    const newReview = {
      id: 'REV-USER-' + Date.now(),
      name: author,
      dealType: cat === 'factory' ? '공장 매매' : cat === 'store' ? '상가·사무실 임대' : '아파트 매매',
      category: cat,
      rating: score,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      propertyTitle: propTitle,
      content: content,
      verifiedBadge: '실거래 검증 완료'
    };

    state.userReviews.unshift(newReview);
    localStorage.setItem('cham_joeun_user_reviews', JSON.stringify(state.userReviews));

    renderReviews();
    writeReviewModal.close();
    document.getElementById('writeReviewForm').reset();
    window.showToast('소중한 거래 후기가 정상 등록되었습니다. 감사합니다!');
  };

  // Reset Filters Helper
  window.resetFilters = function () {
    state.currentCategory = 'all';
    state.currentDealType = 'all';
    state.selectedDistrict = 'all';

    document.querySelectorAll('.category-tab').forEach((t, i) => t.classList.toggle('active', i === 0));
    document.querySelectorAll('.deal-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
    document.getElementById('searchDistrict').value = 'all';
    document.getElementById('searchCategory').value = 'all';
    document.getElementById('searchDealType').value = 'all';

    renderProperties();
    window.showToast('필터가 초기화되었습니다.');
  };

  // Scroll Helpers
  window.scrollToConsultation = function () {
    const el = document.getElementById('consultationSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closeDrawer();
  };

  window.scrollToProperties = function () {
    const el = document.getElementById('propertiesSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closeDrawer();
  };

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
  }

  // Bind DOM Events
  function bindEvents() {
    // Category Tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        state.currentCategory = tab.getAttribute('data-category');
        renderProperties();
      });
    });

    // Deal Type Chips
    document.querySelectorAll('.deal-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.deal-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.currentDealType = chip.getAttribute('data-deal');
        renderProperties();
      });
    });

    // Sort Dropdown
    if (propSortSelect) {
      propSortSelect.addEventListener('change', (e) => {
        state.currentSort = e.target.value;
        renderProperties();
      });
    }

    // Review Filter Chips
    document.querySelectorAll('.review-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.review-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activeReviewCat = chip.getAttribute('data-review-cat') || chip.getAttribute('data-rev-cat') || 'all';
        renderReviews();
      });
    });

    // Star Rating in Review Modal
    const starContainer = document.getElementById('starRatingSelect');
    if (starContainer) {
      starContainer.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = parseInt(btn.getAttribute('data-val'), 10);
          document.getElementById('selectedStarScore').value = val;
          starContainer.querySelectorAll('.star-btn').forEach(s => {
            const sVal = parseInt(s.getAttribute('data-val'), 10);
            s.style.color = sVal <= val ? '#eab308' : '#cbd5e1';
          });
        });
      });
    }

    // Modal Close Buttons
    document.getElementById('btnClosePropModal')?.addEventListener('click', () => propertyDetailModal?.close());
    document.getElementById('btnCloseReviewModal')?.addEventListener('click', () => writeReviewModal?.close());
    document.getElementById('btnCloseFavModal')?.addEventListener('click', () => favoritesModal?.close());
    document.getElementById('btnOpenWriteReview')?.addEventListener('click', () => writeReviewModal?.showModal());
    document.getElementById('btnOpenFavorites')?.addEventListener('click', window.openFavoritesModal);
    document.getElementById('btnMobileFavorites')?.addEventListener('click', window.openFavoritesModal);

    // Share Button in Modal
    document.getElementById('btnModalShare')?.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      window.showToast('매물 링크가 클립보드에 복사되었습니다!');
    });

    // Mobile Drawer
    btnHamburger?.addEventListener('click', () => {
      mobileDrawer?.classList.add('active');
      drawerOverlay?.classList.add('active');
    });

    btnCloseDrawer?.addEventListener('click', closeDrawer);
    drawerOverlay?.addEventListener('click', closeDrawer);

    // Mobile Drawer category links
    document.querySelectorAll('.drawer-link[data-cat]').forEach(link => {
      link.addEventListener('click', (e) => {
        const cat = link.getAttribute('data-cat');
        state.currentCategory = cat;
        document.querySelectorAll('.category-tab').forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-category') === cat);
        });
        renderProperties();
        closeDrawer();
      });
    });

    // Light dismiss for dialogs
    [
      propertyDetailModal,
      writeReviewModal,
      favoritesModal,
      document.getElementById('newsDetailModal'),
      document.getElementById('modalPropertyRegister'),
      document.getElementById('modalPropertyBuyRequest')
    ].forEach(dlg => {
      if (!dlg) return;
      dlg.addEventListener('click', (e) => {
        const rect = dlg.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          dlg.close();
        }
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
