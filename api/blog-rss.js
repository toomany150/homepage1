const https = require('https');
const fs = require('fs');
const path = require('path');

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
    let category = decodeHtml(getTag('category')) || '부동산 정보';
    let pubDateStr = getTag('pubDate');
    let rawTag = decodeHtml(getTag('tag'));
    let desc = getTag('description');

    // Extract logNo from link or guid
    const logMatch = (link || guid).match(/\/(\d+)(\?|$)/) || (link || guid).match(/logNo=(\d+)/);
    const logNo = logMatch ? logMatch[1] : Date.now().toString();
    const cleanLink = `https://blog.naver.com/${source.id}/${logNo}`;

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

    // Extract thumbnail
    let thumbnail = '';
    if (desc) {
      const imgMatch = desc.match(/https:\/\/(?:blogthumb|postfiles)\.pstatic\.net\/[^\s"'>]+/);
      if (imgMatch) {
        let rawImg = imgMatch[0].split('?')[0];
        thumbnail = `${rawImg}?type=w800`;
      }
    }
    if (!thumbnail) {
      thumbnail = 'images/blog_post_hd_01.webp';
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
      section: 'column',
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
