import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Set this secret in your Contentful webhook and as an env var
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }
  if (!path) {
    return NextResponse.json({ message: 'Missing path' }, { status: 400 });
  }

  try {
    await revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now(), path });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 });
  }
}
