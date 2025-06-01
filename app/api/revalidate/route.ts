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
    const slug = body?.fields?.slug?.en; // Extract the specific slug that was edited
    
    // Ultra-granular invalidation based on specific content and slug
    const invalidatedTags = [];
    const invalidatedPaths = [];
    
    // Always invalidate the general contentful tag since something changed
    revalidateTag('contentful');
    invalidatedTags.push('contentful');
    
    if (slug && contentType) {
      // ULTRA-GRANULAR: Only invalidate the specific post's cache
      switch (contentType) {
        case 'blogPost':
          // Only invalidate this specific blog post's cache
          revalidateTag(`blogPost-${slug}`);
          invalidatedTags.push(`blogPost-${slug}`);
          
          // Invalidate listing caches (lightweight) but preserve other individual posts
          revalidateTag('blogPost-listing');
          invalidatedTags.push('blogPost-listing');
          
          // Only revalidate paths that show this specific post or listings
          invalidatedPaths.push(`/blog/${slug}`, '/blog', '/', '/search');
          break;
          
        case 'announcementPost':
          revalidateTag(`announcementPost-${slug}`);
          revalidateTag('announcementPost-listing');
          invalidatedTags.push(`announcementPost-${slug}`, 'announcementPost-listing');
          invalidatedPaths.push(`/upcoming-events/${slug}`, '/upcoming-events', '/', '/search');
          break;
          
        case 'eventReportPost':
          revalidateTag(`eventReportPost-${slug}`);
          revalidateTag('eventReportPost-listing');
          invalidatedTags.push(`eventReportPost-${slug}`, 'eventReportPost-listing');
          invalidatedPaths.push(`/past-events/${slug}`, '/past-events', '/', '/search');
          break;
          
        case 'author':
          revalidateTag(`author-${slug}`);
          invalidatedTags.push(`author-${slug}`);
          invalidatedPaths.push(`/contributors/${slug}`, '/contributors');
          
          // Authors affect posts that reference them, but only listing caches
          revalidateTag('blogPost-listing');
          revalidateTag('announcementPost-listing');
          revalidateTag('eventReportPost-listing');
          invalidatedTags.push('blogPost-listing', 'announcementPost-listing', 'eventReportPost-listing');
          invalidatedPaths.push('/blog', '/past-events', '/upcoming-events');
          break;
          
        case 'spotlightEntry':
          revalidateTag('spotlightEntry');
          invalidatedTags.push('spotlightEntry');
          invalidatedPaths.push('/');
          break;
          
        default:
          // Unknown content type - fall back to slug-based invalidation if possible
          if (slug) {
            revalidateTag(`${contentType}-${slug}`);
            invalidatedTags.push(`${contentType}-${slug}`);
          }
      }
    } else {
      // Fallback to content-type level invalidation if no slug available
      switch (contentType) {
        case 'blogPost':
          revalidateTag('blogPost');
          revalidateTag('blogPost-listing');
          invalidatedTags.push('blogPost', 'blogPost-listing');
          invalidatedPaths.push('/', '/blog', '/search', '/tags');
          break;
          
        case 'announcementPost':
          revalidateTag('announcementPost');
          revalidateTag('announcementPost-listing');
          invalidatedTags.push('announcementPost', 'announcementPost-listing');
          invalidatedPaths.push('/', '/upcoming-events', '/search', '/tags');
          break;
          
        case 'eventReportPost':
          revalidateTag('eventReportPost');
          revalidateTag('eventReportPost-listing');
          invalidatedTags.push('eventReportPost', 'eventReportPost-listing');
          invalidatedPaths.push('/', '/past-events', '/search', '/tags');
          break;
          
        case 'author':
          revalidateTag('author');
          invalidatedTags.push('author');
          invalidatedPaths.push('/contributors', '/blog', '/past-events', '/upcoming-events');
          break;
          
        default:
          // Complete fallback to blanket invalidation
          revalidateTag('blogPost');
          revalidateTag('announcementPost');
          revalidateTag('eventReportPost');
          revalidateTag('spotlightEntry');
          revalidateTag('author');
          invalidatedTags.push('blogPost', 'announcementPost', 'eventReportPost', 'spotlightEntry', 'author');
          invalidatedPaths.push('/', '/blog', '/past-events', '/upcoming-events', '/contributors', '/search', '/tags');
      }
    }
    
    // Revalidate only the affected paths
    await Promise.all(invalidatedPaths.map(path => revalidatePath(path)));
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(), 
      contentType,
      slug,
      invalidatedTags,
      invalidatedPaths,
      granular: slug && contentType ? 'ultra-granular' : contentType ? 'content-type' : 'fallback'
    });
    
  } catch (err) {
    // Fallback to listing-level invalidation on error (safer than blanket)
    revalidateTag('contentful');
    revalidateTag('blogPost-listing');
    revalidateTag('announcementPost-listing');
    revalidateTag('eventReportPost-listing');
    revalidateTag('author');
    revalidateTag('spotlightEntry');

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
      message: 'Error during granular revalidation, performed listing-level invalidation', 
      error: String(err),
      revalidated: true,
      granular: 'fallback-listing'
    }, { status: 200 });
  }
}
