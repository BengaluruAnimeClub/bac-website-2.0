import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

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
    // Revalidate cache tags (for unstable_cache)
    revalidateTag('contentful');
    revalidateTag('blogPost');
    revalidateTag('announcementPost');
    revalidateTag('eventReportPost');
    revalidateTag('spotlightEntry');
    revalidateTag('author');

    // Revalidate the homepage and all main dynamic sections
    await Promise.all([
      revalidatePath('/'),
      revalidatePath('/blog'),
      revalidatePath('/past-events'),
      revalidatePath('/upcoming-events'),
      revalidatePath('/contributors'),
      revalidatePath('/search'),
      revalidatePath('/tags'),
      // Optionally, revalidate all blog, past-events, and upcoming-events dynamic routes
      revalidatePath('/blog', 'layout'),
      revalidatePath('/past-events', 'layout'),
      revalidatePath('/upcoming-events', 'layout'),
      revalidatePath('/contributors', 'layout'),
    ]);
    return NextResponse.json({ revalidated: true, now: Date.now(), paths: ['/', '/blog', '/past-events', '/upcoming-events', '/contributors', '/search', '/tags'] });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 });
  }
}
