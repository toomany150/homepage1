"""
참좋은부동산 블로그 매물 & 칼럼 자동 등록 스크립트
사용법:
  python auto_register.py --url <네이버블로그주소> --type <property 또는 blog> --category <아파트/주택/상가/공장/토지 등> --agent "담당자이름" --phone "010-XXXX-XXXX"
"""

import sys
import os
import re
import json
import argparse
import urllib.request
from PIL import Image

def get_blog_info(url):
    # Extract logNo and blogId from url
    # e.g. https://blog.naver.com/toomany22/224456954842
    # or https://blog.naver.com/PostView.naver?blogId=...&logNo=...
    log_no_match = re.search(r'logNo=(\d+)', url) or re.search(r'/([a-zA-Z0-9_-]+)/(\d+)', url)
    if not log_no_match:
        raise ValueError(f"올바른 네이버 블로그 주소가 아닙니다: {url}")
    
    if 'logNo=' in url:
        log_no = re.search(r'logNo=(\d+)', url).group(1)
        blog_id = re.search(r'blogId=([a-zA-Z0-9_-]+)', url).group(1)
    else:
        parts = re.search(r'/([a-zA-Z0-9_-]+)/(\d+)', url)
        blog_id = parts.group(1)
        log_no = parts.group(2)
        
    fetch_url = f"https://blog.naver.com/PostView.naver?blogId={blog_id}&logNo={log_no}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    req = urllib.request.Request(fetch_url, headers=headers)
    html = urllib.request.urlopen(req, timeout=10).read().decode("utf-8", errors="ignore")
    
    # Extract title
    title_match = re.search(r'<meta property="og:title" content="([^"]+)"', html) or re.search(r'<title>([^<]+)</title>', html)
    title = title_match.group(1).replace("&quot;", '"').replace("&amp;", '&') if title_match else f"매물 안내 ({log_no})"
    if " : 네이버 블로그" in title:
        title = title.replace(" : 네이버 블로그", "").strip()
        
    # Extract images
    matches = re.findall(r'https://postfiles\.pstatic\.net/[^\s"\'<>]+', html)
    target_img_url = None
    for m in matches:
        if "w966" in m:
            target_img_url = m
            break
    if not target_img_url and matches:
        target_img_url = matches[0]
        
    return {
        "blog_id": blog_id,
        "log_no": log_no,
        "title": title,
        "img_url": target_img_url,
        "canonical_url": f"https://blog.naver.com/{blog_id}/{log_no}"
    }

def process_image(img_url, output_path, is_property=True):
    if not img_url:
        return None
    headers = {"User-Agent": "Mozilla/5.0"}
    req = urllib.request.Request(img_url, headers=headers)
    img_data = urllib.request.urlopen(req, timeout=10).read()
    temp_raw = output_path + "_raw"
    with open(temp_raw, "wb") as f:
        f.write(img_data)
        
    img = Image.open(temp_raw).convert("RGB")
    w, h = img.size
    
    if is_property:
        # Check if bottom dark bar exists (around y=896)
        if h >= 900:
            # Crop at 895 to remove bottom dark bar if present
            img = img.crop((0, 0, w, 895))
    img.save(output_path, "WEBP", quality=86, method=6)
    if os.path.exists(temp_raw):
        os.remove(temp_raw)
    return output_path

print("Helper loaded.")

