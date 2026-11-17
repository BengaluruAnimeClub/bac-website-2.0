import { NextRequest, NextResponse } from "next/server";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const COMMENTS_PREFIX = "comments:";

async function fetchRedis(method: string, path: string, body?: any) {
  const url = `${redisUrl}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${redisToken}`,
    "Content-Type": "application/json",
  };
  const options: RequestInit = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Redis request failed");
  return res.json();
}

export async function GET(req: NextRequest) {
  if (!redisUrl || !redisToken) {
    return NextResponse.json({ comments: [], error: "Redis not configured." }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) return NextResponse.json({ comments: [] });
    const key = `${COMMENTS_PREFIX}${slug}`;
    // Get all comments for this slug
    const redisRes = await fetch(`${redisUrl}/lrange/${encodeURIComponent(key)}/0/-1`, {
      headers: { Authorization: `Bearer ${redisToken}` },
      cache: "no-store",
    });
    if (!redisRes.ok) {
      return NextResponse.json({ comments: [], error: `Redis error: ${redisRes.statusText}` }, { status: 502 });
    }
    const arr = await redisRes.json();
    const comments = Array.isArray(arr.result)
      ? arr.result.map((c: string) => JSON.parse(c))
      : [];
    // Fix: flatten and parse nested arrays of JSON strings
    let flatComments: any[] = [];
    for (const entry of comments) {
      if (typeof entry === 'string') {
        try {
          flatComments.push(JSON.parse(entry));
        } catch {
          // skip
        }
      } else if (Array.isArray(entry)) {
        for (const sub of entry) {
          try {
            flatComments.push(JSON.parse(sub));
          } catch {
            // skip
          }
        }
      }
    }
    flatComments.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return NextResponse.json({ comments: flatComments });
  } catch (err: any) {
    console.error("Comments GET error:", err);
    return NextResponse.json({ comments: [], error: "Database service unreachable." }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  if (!redisUrl || !redisToken) {
    return NextResponse.json({ error: "Redis not configured." }, { status: 503 });
  }
  try {
    const { slug, name, message, image } = await req.json();
    if (!slug || !message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }
    const comment = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: name?.trim().slice(0, 32) || "",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      image: image || null,
    };
    const key = `${COMMENTS_PREFIX}${slug}`;
    // Push to Redis list
    const pushRes = await fetch(`${redisUrl}/rpush/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${redisToken}` },
      body: JSON.stringify([JSON.stringify(comment)]),
      cache: "no-store",
    });
    if (!pushRes.ok) {
      return NextResponse.json({ error: `Redis error: ${pushRes.statusText}` }, { status: 502 });
    }
    // Return updated comments
    const redisRes = await fetch(`${redisUrl}/lrange/${encodeURIComponent(key)}/0/-1`, {
      headers: { Authorization: `Bearer ${redisToken}` },
      cache: "no-store",
    });
    if (!redisRes.ok) {
      return NextResponse.json({ error: `Redis error: ${redisRes.statusText}` }, { status: 502 });
    }
    const arr = await redisRes.json();
    const comments = Array.isArray(arr.result)
      ? arr.result.map((c: string) => JSON.parse(c))
      : [];
    // Fix: flatten and parse nested arrays of JSON strings
    let flatComments: any[] = [];
    for (const entry of comments) {
      if (typeof entry === 'string') {
        try {
          flatComments.push(JSON.parse(entry));
        } catch {
          // skip
        }
      } else if (Array.isArray(entry)) {
        for (const sub of entry) {
          try {
            flatComments.push(JSON.parse(sub));
          } catch {
            // skip
          }
        }
      }
    }
    flatComments.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return NextResponse.json({ comments: flatComments });
  } catch (err: any) {
    console.error("Comments POST error:", err);
    return NextResponse.json({ error: "Database service unreachable. Please verify UPSTASH_REDIS_REST_URL in .env.local" }, { status: 502 });
  }
}
