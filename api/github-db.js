const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_PAT || '';
const GITHUB_REPO = process.env.GITHUB_REPO || 'toomany150/homepage1';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH || 'data/board.json';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chamgood2026!';
const JWT_SECRET = process.env.JWT_SECRET || 'chamgood_realestate_secret_2026_busan';

// In-memory cache for GET requests (TTL: 10 seconds)
let memoryCache = {
  data: null,
  sha: null,
  timestamp: 0,
  source: 'none'
};

const CACHE_TTL_MS = 10 * 1000;

/**
 * Hash password with SHA-256
 */
function hashPassword(plainText) {
  if (!plainText) return '';
  return crypto.createHash('sha256').update(String(plainText)).digest('hex');
}

/**
 * Create Admin Auth Session Token
 */
function createAdminToken() {
  const payload = {
    role: 'admin',
    adminName: '신제환 대표 공인중개사',
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

/**
 * Verify Admin Token
 */
function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [payloadStr, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');
    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (Date.now() > payload.expiresAt) return false;
    return payload;
  } catch (err) {
    return false;
  }
}

/**
 * Get board data from GitHub Repository or local fallback
 */
async function getBoardData(forceFresh = false) {
  const now = Date.now();
  if (!forceFresh && memoryCache.data && (now - memoryCache.timestamp < CACHE_TTL_MS)) {
    return {
      data: memoryCache.data,
      sha: memoryCache.sha,
      source: `${memoryCache.source}-cache`
    };
  }

  // 1. Try GitHub Contents API if GITHUB_TOKEN is available
  if (GITHUB_TOKEN && GITHUB_REPO) {
    try {
      const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ChamGood-Serverless-Board'
        }
      });

      if (res.ok) {
        const jsonRes = await res.json();
        const contentStr = Buffer.from(jsonRes.content, 'base64').toString('utf8');
        const parsed = JSON.parse(contentStr);

        memoryCache = {
          data: parsed,
          sha: jsonRes.sha,
          timestamp: now,
          source: 'github'
        };

        return {
          data: parsed,
          sha: jsonRes.sha,
          source: 'github'
        };
      } else {
        console.warn(`[GitHub DB] API returned status ${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      console.error('[GitHub DB] Error fetching from GitHub API:', err.message);
    }
  }

  // 2. Fallback to local filesystem data/board.json
  try {
    const localFilePath = path.join(process.cwd(), GITHUB_FILE_PATH);
    if (fs.existsSync(localFilePath)) {
      const raw = fs.readFileSync(localFilePath, 'utf8');
      const parsed = JSON.parse(raw);
      memoryCache = {
        data: parsed,
        sha: 'local-file-sha',
        timestamp: now,
        source: 'local'
      };
      return {
        data: parsed,
        sha: 'local-file-sha',
        source: 'local'
      };
    }
  } catch (err) {
    console.error('[GitHub DB] Error reading local file:', err.message);
  }

  // Default empty structure if nothing is found
  return {
    data: {
      settings: {
        boardTitle: "참좋은 고객 소통 & 상담 게시판",
        notice: "부동산 매물 문의, 권리분석 및 시세 상담글을 남겨주시면 대표 공인중개사가 직접 답변해 드립니다.",
        categories: ["전체", "공지사항", "매물문의", "상담신청", "계약후기", "자유질문"],
        allowPublicWrite: true
      },
      posts: []
    },
    sha: null,
    source: 'empty-fallback'
  };
}

/**
 * Save board data back to GitHub Repository (or local fallback)
 */
async function saveBoardData(newData, commitMessage = '[Board DB] Update data/board.json') {
  const jsonStr = JSON.stringify(newData, null, 2);
  const now = Date.now();

  // Invalidate cache immediately
  memoryCache.data = newData;
  memoryCache.timestamp = now;

  // 1. If GitHub Token is set, commit via GitHub REST API
  if (GITHUB_TOKEN && GITHUB_REPO) {
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts) {
      attempt++;
      try {
        // Fetch current file SHA
        const checkUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;
        const checkRes = await fetch(checkUrl, {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'ChamGood-Serverless-Board'
          }
        });

        let currentSha = null;
        if (checkRes.ok) {
          const checkJson = await checkRes.json();
          currentSha = checkJson.sha;
        }

        const base64Content = Buffer.from(jsonStr, 'utf8').toString('base64');
        const putBody = {
          message: commitMessage,
          content: base64Content,
          branch: GITHUB_BRANCH
        };
        if (currentSha) {
          putBody.sha = currentSha;
        }

        const putRes = await fetch(checkUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'ChamGood-Serverless-Board'
          },
          body: JSON.stringify(putBody)
        });

        if (putRes.ok) {
          const putJson = await putRes.json();
          memoryCache.sha = putJson.content ? putJson.content.sha : null;
          memoryCache.source = 'github';
          return {
            success: true,
            source: 'github',
            commitSha: putJson.commit ? putJson.commit.sha : null,
            message: 'GitHub 저장소(data/board.json)에 성공적으로 영구 커밋되었습니다.'
          };
        } else if (putRes.status === 409 && attempt < maxAttempts) {
          console.warn(`[GitHub DB] SHA mismatch (409 Conflict), retrying attempt ${attempt}...`);
          await new Promise(r => setTimeout(r, 600));
          continue;
        } else {
          const errBody = await putRes.text();
          console.error(`[GitHub DB] Failed to commit to GitHub: ${putRes.status} ${errBody}`);
          break;
        }
      } catch (err) {
        console.error('[GitHub DB] Error committing to GitHub:', err.message);
        break;
      }
    }
  }

  // 2. Local filesystem write fallback
  try {
    const localFilePath = path.join(process.cwd(), GITHUB_FILE_PATH);
    const dir = path.dirname(localFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localFilePath, jsonStr, 'utf8');
    memoryCache.source = 'local';
    return {
      success: true,
      source: 'local',
      message: '로컬 파일(data/board.json)에 저장되었습니다. (GitHub 환경변수 설정 시 GitHub 영구 커밋으로 전환됩니다)'
    };
  } catch (err) {
    console.error('[GitHub DB] Error writing local file:', err.message);
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * Diagnostic & status inspection
 */
async function getDbStatus() {
  const isConfigured = Boolean(GITHUB_TOKEN && GITHUB_REPO);
  let latestCommit = null;

  if (isConfigured) {
    try {
      const commitUrl = `https://api.github.com/repos/${GITHUB_REPO}/commits?path=${GITHUB_FILE_PATH}&per_page=1`;
      const res = await fetch(commitUrl, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ChamGood-Serverless-Board'
        }
      });
      if (res.ok) {
        const commits = await res.json();
        if (commits && commits.length > 0) {
          latestCommit = {
            sha: commits[0].sha.substring(0, 7),
            fullSha: commits[0].sha,
            author: commits[0].commit.author.name,
            date: commits[0].commit.author.date,
            message: commits[0].commit.message
          };
        }
      }
    } catch (err) {
      console.warn('[GitHub DB] Could not fetch latest commit:', err.message);
    }
  }

  return {
    isConfigured,
    repo: GITHUB_REPO,
    branch: GITHUB_BRANCH,
    filePath: GITHUB_FILE_PATH,
    source: isConfigured ? 'github' : 'local',
    latestCommit,
    hasToken: Boolean(GITHUB_TOKEN),
    adminConfigured: Boolean(process.env.ADMIN_PASSWORD)
  };
}

module.exports = {
  ADMIN_PASSWORD,
  hashPassword,
  createAdminToken,
  verifyAdminToken,
  getBoardData,
  saveBoardData,
  getDbStatus
};
