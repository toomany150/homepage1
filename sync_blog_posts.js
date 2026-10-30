const fs = require('fs');
const path = require('path');
const handler = require('./api/blog-rss.js');

async function sync() {
  const req = { method: 'GET' };
  let resultData = null;

  const res = {
    statusCode: 200,
    headers: {},
    setHeader() {},
    status(code) { this.statusCode = code; return this; },
    json(data) { resultData = data; }
  };

  await handler(req, res);

  if (!resultData || !resultData.success || !Array.isArray(resultData.posts)) {
    console.error('Failed to fetch blog RSS posts');
    process.exit(1);
  }

  const posts = resultData.posts;
  console.log(`Fetched ${posts.length} posts from Naver Blog RSS.`);

  // 1. Update data/content.json
  const contentPath = path.join(__dirname, 'data', 'content.json');
  if (fs.existsSync(contentPath)) {
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    content.blogPosts = posts;
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf-8');
    console.log('Updated data/content.json successfully!');
  }

  // 2. Update data.js
  const dataJsPath = path.join(__dirname, 'data.js');
  if (fs.existsSync(dataJsPath)) {
    let dataJsText = fs.readFileSync(dataJsPath, 'utf-8');
    const startMarker = 'blogPosts: [';
    const startIdx = dataJsText.indexOf(startMarker);
    if (startIdx !== -1) {
      // Find the end of blogPosts array
      let openBrackets = 0;
      let endIdx = -1;
      for (let i = startIdx + startMarker.length - 1; i < dataJsText.length; i++) {
        if (dataJsText[i] === '[') openBrackets++;
        else if (dataJsText[i] === ']') {
          openBrackets--;
          if (openBrackets === 0) {
            endIdx = i;
            break;
          }
        }
      }

      if (endIdx !== -1) {
        const postsJsonStr = JSON.stringify(posts, null, 2)
          .split('\n')
          .map((line, idx) => idx === 0 ? line : '    ' + line)
          .join('\n');
        
        dataJsText = dataJsText.substring(0, startIdx + 'blogPosts: '.length) +
          postsJsonStr +
          dataJsText.substring(endIdx + 1);

        fs.writeFileSync(dataJsPath, dataJsText, 'utf-8');
        console.log('Updated data.js successfully!');
      }
    }
  }

  console.log('Blog posts sync completed!');
}

sync();
