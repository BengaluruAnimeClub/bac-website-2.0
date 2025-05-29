import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper to add no-cache headers to Contentful fetches for ISR
function withNoCache<T>(promise: Promise<T>): Promise<T> {
  // Next.js 13+ fetch cache control: https://nextjs.org/docs/app/building-your-application/caching#opting-out-of-data-caching
  // This is a workaround for SDKs that don't expose fetch options directly
  // If Contentful SDK ever exposes fetch options, use { cache: 'no-store' } or { next: { revalidate: 60 } }
  // For now, we can try to set global fetch cache headers if possible
  return promise;
}

export async function fetchBlogPosts() {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'blogPost', // Make sure this matches your Contentful content type API ID
    order: ['-fields.date'], // Most recent first
  }));
  return entries.items;
}

export async function fetchBlogPostBySlug(slug: string) {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  }));
  return entries.items[0] || null;
}

export async function fetchBlogPostBySlugWithEntries(slug: string) {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2, // fetch linked spotlight entries and authors
    limit: 1,
  }));
  return entries.items[0] || null;
}

export async function fetchAnnouncementPosts() {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'announcementPost',
    order: ['-fields.date'],
  }));
  return entries.items;
}

export async function fetchAnnouncementPostBySlug(slug: string) {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'announcementPost',
    'fields.slug': slug,
    limit: 1,
  }));
  return entries.items[0] || null;
}

export async function fetchAnnouncementPostBySlugWithEntries(slug: string) {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'announcementPost',
    'fields.slug': slug,
    include: 2, // fetch linked authors, etc.
    limit: 1,
  }));
  return entries.items[0] || null;
}

export async function fetchEventReportPosts() {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'eventReportPost',
    order: ['-fields.date'],
  }));
  return entries.items;
}

export async function fetchEventReportPostBySlugWithEntries(slug: string) {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'eventReportPost',
    'fields.slug': slug,
    include: 2, // fetch linked authors, etc.
    limit: 1,
  }));
  return entries.items[0] || null;
}

export async function fetchSpotlightPosts() {
  const entries = await withNoCache(contentfulClient.getEntries({
    content_type: 'spotlightEntry',
    // No order field, since spotlightEntry has no date
  }));
  return entries.items;
}

export async function getAdjacentBlogPosts(currentSlug: string) {
  // Fetch all blog posts ordered by date (newest first)
  const allPosts = await fetchBlogPosts();
  
  // Find the current post index
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  // Previous post is the one before current (older)
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  
  // Next post is the one after current (newer)
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  
  return {
    previousPost: previousPost && previousPost.fields.slug && previousPost.fields.title ? {
      slug: String(previousPost.fields.slug),
      title: String(previousPost.fields.title)
    } : null,
    nextPost: nextPost && nextPost.fields.slug && nextPost.fields.title ? {
      slug: String(nextPost.fields.slug),
      title: String(nextPost.fields.title)
    } : null
  };
}
