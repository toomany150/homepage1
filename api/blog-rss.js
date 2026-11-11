const https = require('https');
const fs = require('fs');
const path = require('path');

// Verified HD graphic mapping for official real-estate analysis columns
const HD_COLUMN_MAP = {
  "224473465592": { thumbnail: "images/blog_post_hd_15.webp", section: "상가", category: "상가계약·법인실무" },
  "224468505667": { thumbnail: "images/blog_post_hd_14.webp", section: "상가", category: "상가세무·부가세실무" },
  "224440466912": { thumbnail: "images/blog_post_hd_01.webp", section: "주택", category: "주택 임대차 법률" },
  "224408527081": { thumbnail: "images/blog_post_hd_02.webp", section: "주택", category: "주택 세무/행정" },
  "224408279136": { thumbnail: "images/blog_post_hd_03.webp", section: "주택", category: "주택 권리분석" },
  "224408180316": { thumbnail: "images/blog_post_hd_04.webp", section: "주택", category: "주택 권리분석" },
  "224443605792": { thumbnail: "images/blog_post_hd_05.webp", section: "상가", category: "상가 권리분석" },
  "224435278374": { thumbnail: "images/blog_post_hd_06.webp", section: "상가", category: "상가 인허가 실무" },
  "224427503920": { thumbnail: "images/blog_post_hd_07.webp", section: "상가", category: "상가 소방/안전" },
  "224368079641": { thumbnail: "images/blog_post_hd_08.webp", section: "상가", category: "상가 양도양수" },
  "224353086495": { thumbnail: "images/blog_post_hd_09.webp", section: "상가", category: "상가 대장분석" },
  "224346247074": { thumbnail: "images/blog_post_hd_10.webp", section: "상가", category: "상가 창업가이드" },
  "224448195780": { thumbnail: "images/blog_post_hd_11.webp", section: "기타", category: "정책/공공임대" },
  "224411354836": { thumbnail: "images/blog_post_hd_12.webp", section: "기타", category: "부동산 상식" },
  "224361375888": { thumbnail: "images/blog_post_hd_13.webp", section: "기타", category: "부동산 법률/정책" }
};

function fetchRss(blogId) {
  return new Promise((resolve) => {
    const url = `https://rss.blog.naver.com/${encodeURIComponent(blogId)}.xml`;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 6000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function parseNaverRss(xmlText, source) {
  if (!xmlText) return [];
  const items = [];
  const itemMatches = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const itemXml of itemMatches) {
    const getTag = (tag) => {
      const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`);
      const normalRegex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
      const m = itemXml.match(cdataRegex) || itemXml.match(normalRegex);
      return m ? m[1].trim() : '';
    };

    let title = decodeHtml(getTag('title')).replace(/\s*:\s*네이버\s*블로그$/, '').trim();
    let link = getTag('link');
    let guid = getTag('guid');
    let rawCategory = decodeHtml(getTag('category')) || '부동산 정보';
    let pubDateStr = getTag('pubDate');
    let rawTag = decodeHtml(getTag('tag'));
    let desc = getTag('description');

    // Extract logNo from link or guid
    const logMatch = (link || guid).match(/\/(\d+)(\?|$)/) || (link || guid).match(/logNo=(\d+)/);
    const logNo = logMatch ? logMatch[1] : Date.now().toString();

    // FILTER: If explicitly registered in HD_COLUMN_MAP, always include!
    if (!HD_COLUMN_MAP[logNo]) {
      // 1. FILTER OUT PROPERTY POSTS
      const isProperty = (
        rawCategory.includes('추천매물') ||
        rawCategory.includes('매물') ||
        rawCategory.includes('아파트') ||
        title.includes('아파트 매매') ||
        title.includes('탑층') ||
        title.includes('급매') ||
        title.includes('뻥뷰') ||
        title.includes('조경뷰')
      );
      if (isProperty) {
        continue;
      }

      // 2. FILTER OUT IRRELEVANT LIFE/RESTAURANT POSTS
      const isIrrelevantLife = (
        rawCategory.includes('맛집') ||
        rawCategory.includes('일상') ||
        rawCategory.includes('여행') ||
        title.includes('맛집') ||
        title.includes('시락국') ||
        title.includes('참치') ||
        title.includes('벚꽃') ||
        title.includes('야영장') ||
        title.includes('꼬막') ||
        title.includes('장어구이') ||
        title.includes('샤브막심') ||
        title.includes('손칼국수')
      );
      if (isIrrelevantLife) {
        continue;
      }
    }

    const cleanLink = `https://blog.naver.com/${source.id}/${logNo}`;

    // Determine section (주택 / 상가 / 기타)
    let section = '기타';
    if (rawCategory.includes('상가') || title.includes('상가') || title.includes('권리금') || title.includes('양도양수') || title.includes('업종') || title.includes('법인')) {
      section = '상가';
    } else if (rawCategory.includes('주택') || title.includes('주택') || title.includes('아파트') || title.includes('전월세') || title.includes('임대차')) {
      section = '주택';
    }

    // Format date YYYY.MM.DD
    let formattedDate = '';
    let timestamp = 0;
    if (pubDateStr) {
      const d = new Date(pubDateStr);
      if (!isNaN(d.getTime())) {
        timestamp = d.getTime();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        formattedDate = `${y}.${m}.${day}`;
      }
    }
    if (!formattedDate) {
      const now = new Date();
      timestamp = now.getTime();
      formattedDate = now.toISOString().substring(0, 10).replace(/-/g, '.');
    }

    // Extract tags
    let tags = [];
    if (rawTag) {
      tags = rawTag.split(',').map(t => t.trim()).filter(Boolean).map(t => t.startsWith('#') ? t : `#${t}`);
    }

    // High quality thumbnail resolution
    let thumbnail = '';
    let category = rawCategory.replace(/■|\[|\]/g, '').trim();

    if (HD_COLUMN_MAP[logNo]) {
      thumbnail = HD_COLUMN_MAP[logNo].thumbnail;
      section = HD_COLUMN_MAP[logNo].section;
      category = HD_COLUMN_MAP[logNo].category;
    } else {
      // Clean category fallback image
      if (section === '주택') thumbnail = 'images/blog_post_hd_01.webp';
      else if (section === '상가') thumbnail = 'images/blog_post_hd_05.webp';
      else thumbnail = 'images/blog_post_hd_11.webp';
    }

    // Extract excerpt
    let excerpt = '';
    if (desc) {
      const textOnly = desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      excerpt = decodeHtml(textOnly).substring(0, 140);
      if (textOnly.length > 140) excerpt += '...';
    }

    items.push({
      id: `BLOG-${logNo}`,
      logNo,
      section,
      title,
      category,
      date: formattedDate,
      timestamp,
      pubDate: pubDateStr,
      thumbnail,
      excerpt,
      tags: tags.slice(0, 5),
      author: source.agentName,
      agentPhone: source.phone,
      authorRole: source.role,
      link: cleanLink,
      sourceId: source.id
    });
  }

  return items;
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. Load blog sources
    let sources = [
      {
        id: "toomany22",
        agentName: "황금터잡이 신제환 대표",
        role: "대표 공인중개사",
        phone: "010-9667-4201",
        isRepresentative: true
      }
    ];

    try {
      const sourcesPath = path.join(process.cwd(), 'data', 'blog-sources.json');
      if (fs.existsSync(sourcesPath)) {
        sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf-8'));
      }
    } catch (e) {
      console.warn('Using default blog sources:', e.message);
    }

    // 2. Fetch all sources in parallel
    const fetchPromises = sources.map(async (source) => {
      const xml = await fetchRss(source.id);
      return parseNaverRss(xml, source);
    });

    const results = await Promise.all(fetchPromises);
    let allPosts = results.flat();

    // 3. Sort by date/timestamp descending
    allPosts.sort((a, b) => b.timestamp - a.timestamp);

    // 4. Set CDN Caching (60 seconds edge cache, 300 seconds stale-while-revalidate)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    return res.status(200).json({
      success: true,
      totalCount: allPosts.length,
      sourcesCount: sources.length,
      updatedAt: new Date().toISOString(),
      posts: allPosts
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
