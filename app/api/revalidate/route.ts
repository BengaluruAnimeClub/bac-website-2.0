import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Set this secret in your Contentful webhook and as an env var
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  // Ignore the 'path' param, always revalidate the homepage and all main sections
  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate the homepage and all main dynamic sections
    await Promise.all([
      revalidatePath('/'),
      revalidatePath('/blog'),
      revalidatePath('/past-events'),
      revalidatePath('/upcoming-events'),
      revalidatePath('/search'),
      revalidatePath('/tags'),
      // Optionally, revalidate all blog, past-events, and upcoming-events dynamic routes
      revalidatePath('/blog', 'layout'),
      revalidatePath('/past-events', 'layout'),
      revalidatePath('/upcoming-events', 'layout'),
    ]);
    return NextResponse.json({ revalidated: true, now: Date.now(), paths: ['/', '/blog', '/past-events', '/upcoming-events', '/search', '/tags'] });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 });
  }
}
