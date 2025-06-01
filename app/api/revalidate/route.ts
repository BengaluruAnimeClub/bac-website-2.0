import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Set this secret in your Contentful webhook and as an env var
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  
  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Parse the webhook payload to understand what changed
    const body = await req.json();
    const contentType = body?.fields?.entryType?.en || body?.sys?.contentType?.sys?.id;
    
    // Surgical invalidation based on content type
    const invalidatedTags = [];
    const invalidatedPaths = [];
    
    // Always invalidate the general contentful tag since something changed
    revalidateTag('contentful');
    invalidatedTags.push('contentful');
    
    switch (contentType) {
      case 'blogPost':
        revalidateTag('blogPost');
        invalidatedTags.push('blogPost');
        invalidatedPaths.push('/', '/blog', '/search', '/tags');
        break;
        
      case 'announcementPost':
        revalidateTag('announcementPost');
        invalidatedTags.push('announcementPost');
        invalidatedPaths.push('/', '/upcoming-events', '/search', '/tags');
        break;
        
      case 'eventReportPost':
        revalidateTag('eventReportPost');
        invalidatedTags.push('eventReportPost');
        invalidatedPaths.push('/', '/past-events', '/search', '/tags');
        break;
        
      case 'author':
        revalidateTag('author');
        invalidatedTags.push('author');
        invalidatedPaths.push('/contributors', '/blog', '/past-events', '/upcoming-events');
        break;
        
      case 'spotlightEntry':
        revalidateTag('spotlightEntry');
        invalidatedTags.push('spotlightEntry');
        invalidatedPaths.push('/');
        break;
        
      default:
        // Fallback to blanket invalidation for unknown content types
        revalidateTag('blogPost');
        revalidateTag('announcementPost');
        revalidateTag('eventReportPost');
        revalidateTag('spotlightEntry');
        revalidateTag('author');
        invalidatedTags.push('blogPost', 'announcementPost', 'eventReportPost', 'spotlightEntry', 'author');
        invalidatedPaths.push('/', '/blog', '/past-events', '/upcoming-events', '/contributors', '/search', '/tags');
    }
    
    // Revalidate only the affected paths
    await Promise.all(invalidatedPaths.map(path => revalidatePath(path)));
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(), 
      contentType,
      invalidatedTags,
      invalidatedPaths,
      surgical: contentType !== undefined
    });
    
  } catch (err) {
    // Fallback to blanket invalidation on error
    revalidateTag('contentful');
    revalidateTag('blogPost');
    revalidateTag('announcementPost');
    revalidateTag('eventReportPost');
    revalidateTag('spotlightEntry');
    revalidateTag('author');

    await Promise.all([
      revalidatePath('/'),
      revalidatePath('/blog'),
      revalidatePath('/past-events'),
      revalidatePath('/upcoming-events'),
      revalidatePath('/contributors'),
      revalidatePath('/search'),
      revalidatePath('/tags'),
    ]);
    
    return NextResponse.json({ 
      message: 'Error during surgical revalidation, performed blanket invalidation', 
      error: String(err),
      revalidated: true,
      surgical: false
    }, { status: 200 });
  }
}
