#!/usr/bin/env node
// Auto-generate blog-search-index.ts from MDX blog files
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../content/blog');
const OUT_FILE = path.join(__dirname, '../components/blog-search-index.ts');

function getFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return {};
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^['"]|['"]$/g, '');
  });
  return fm;
}

function getHeaders(content) {
  // Match #, ##, ###, or <div> with # or ## inside
  const headers = [];
  const regex = /^(#+)\s*(.*)|<div[^>]*>\s*#*\s*\*\*?([^<\n*]+)\*\*?/gim;
  let match;
  while ((match = regex.exec(content))) {
    if (match[2]) headers.push(match[2].replace(/\*\*/g, '').trim());
    else if (match[3]) headers.push(match[3].replace(/\*\*/g, '').trim());
  }
  return headers;
}

function getAllMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdxFiles(filePath));
    } else if (file.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

function slugFromFilePath(filePath) {
  return path.basename(filePath).replace(/\.mdx$/, '');
}

function main() {
  const files = getAllMdxFiles(BLOG_DIR);
  const index = files.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const fm = getFrontmatter(content);
    const headers = getHeaders(content);
    return {
      title: fm.title || path.basename(filePath),
      slug: slugFromFilePath(filePath),
      headers: headers.slice(0, 5),
    };
  });
  const out = `// Blog search index for main-nav search bar\n// This file is auto-generated. Do not edit manually.\n\nexport const blogSearchIndex = ${JSON.stringify(index, null, 2)};\n`;
  fs.writeFileSync(OUT_FILE, out);
  console.log(`Wrote ${index.length} blog entries to blog-search-index.ts`);
}

main();
