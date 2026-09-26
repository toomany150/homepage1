/**
 * 로컬 개발용 경량 Vercel 서버리스 시뮬레이션 서버
 * 외부 라이브러리 설치 없이 순수 Node.js 내장 모듈로 구동됩니다.
 * 실행 방법: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const boardHandler = require('./api/board');
const adminHandler = require('./api/admin');
const contentHandler = require('./api/content');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const reqHost = req.headers.host || `localhost:${PORT}`;
  const parsedUrl = new URL(req.url, `http://${reqHost}`);
  const pathname = parsedUrl.pathname;
  const searchParams = Object.fromEntries(parsedUrl.searchParams.entries());

  // Enhance res with Express/Vercel-like helpers
  res.status = function (code) {
    this.statusCode = code;
    return this;
  };
  res.json = function (obj) {
    this.setHeader('Content-Type', 'application/json; charset=utf-8');
    this.end(JSON.stringify(obj));
    return this;
  };

  // Helper to parse JSON body
  const parseBody = () => {
    return new Promise((resolve) => {
      let bodyData = '';
      req.on('data', chunk => {
        bodyData += chunk;
      });
      req.on('end', () => {
        try {
          if (bodyData && (req.headers['content-type'] || '').includes('application/json')) {
            resolve(JSON.parse(bodyData));
          } else {
            resolve({});
          }
        } catch (e) {
          resolve({});
        }
      });
    });
  };

  // 1. API Route: /api/board
  if (pathname === '/api/board' || pathname === '/api/board.js') {
    req.query = searchParams;
    req.body = await parseBody();
    return boardHandler(req, res);
  }

  // 2. API Route: /api/admin
  if (pathname === '/api/admin' || pathname === '/api/admin.js') {
    req.query = searchParams;
    req.body = await parseBody();
    return adminHandler(req, res);
  }

  // 3. API Route: /api/content
  if (pathname === '/api/content' || pathname === '/api/content.js') {
    req.query = searchParams;
    req.body = await parseBody();
    return contentHandler(req, res);
  }

  // 3. Static File Server
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log(`🚀 참좋은부동산 서버리스 로컬 개발 서버가 구동되었습니다!`);
  console.log(`👉 홈페이지 접속:    http://localhost:${PORT}`);
  console.log(`👉 소통게시판 접속:  http://localhost:${PORT}/board.html`);
  console.log(`👉 관리자 대시보드:  http://localhost:${PORT}/admin.html`);
  console.log(`👉 게시판 API 엔드포인트: http://localhost:${PORT}/api/board`);
  console.log('================================================================');
});
