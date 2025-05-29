import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper to add proper caching for Contentful fetches with ISR
function withCache<T>(promise: Promise<T>, tags: string[] = []): Promise<T> {
  // For Next.js App Router ISR, we want to cache the results until revalidation
  // The Contentful SDK doesn't expose fetch options, so we'll rely on Next.js caching
  // and use revalidatePath in our webhook to invalidate when content changes
  return promise;
}

// Fetch all authors
export async function fetchAuthors() {
  const entries = await withCache(contentfulClient.getEntries({
    content_type: 'author',
    order: ['fields.name'],
  }), ['author']);
  return entries.items;
}

// Fetch author by slug
export async function fetchAuthorBySlug(slug: string) {
  const entries = await withCache(contentfulClient.getEntries({
    content_type: 'author',
    'fields.slug': slug,
    limit: 1,
  }), ['author']);
  return entries.items[0] || null;
}

// Optimized function to get author with their posts in minimal API calls
export async function getAuthorWithPosts(slug: string) {
  // Get the author first
  const author = await fetchAuthorBySlug(slug);
  if (!author) return null;

  // Fetch posts by this author directly from Contentful (much more efficient than fetching all posts)
  const [blogPosts, eventPosts, spotlightPosts] = await Promise.all([
    // Blog posts by author
    withCache(contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.author.sys.id': author.sys.id,
      order: ['-fields.date'] as any,
    }), ['blogPost']),
    
    // Event report posts by author  
    withCache(contentfulClient.getEntries({
      content_type: 'eventReportPost',
      'fields.author.sys.id': author.sys.id,
      order: ['-fields.date'] as any,
    }), ['eventReportPost']),
    
    // Spotlight posts by author
    withCache(contentfulClient.getEntries({
      content_type: 'spotlightEntry',
      'fields.author.sys.id': author.sys.id,
      order: ['-fields.date'] as any,
      include: 1 // Include parent blog for spotlight posts
    }), ['spotlightEntry'])
  ]);

  return {
    author,
    blogPosts: blogPosts.items,
    eventPosts: eventPosts.items,
    spotlightPosts: spotlightPosts.items
  };
}
