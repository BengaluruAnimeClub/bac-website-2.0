import { createClient } from 'contentful';
import { unstable_cache } from 'next/cache';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper to add proper caching for Contentful fetches with ISR
function withCache<T>(promiseFactory: () => Promise<T>, cacheKey: string, tags: string[] = []): Promise<T> {
  // Use Next.js unstable_cache to properly cache Contentful requests
  const cachedFunction = unstable_cache(promiseFactory, [cacheKey], {
    tags: tags.length > 0 ? tags : ['contentful'],
    revalidate: false, // Only revalidate via webhook
  });
  return cachedFunction();
}

// Fetch all authors
export async function fetchAuthors() {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'author',
    order: ['fields.name'],
  }), 'authors', ['author']);
  return entries.items;
}

// Fetch author by slug
export async function fetchAuthorBySlug(slug: string) {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'author',
    'fields.slug': slug,
    limit: 1,
  }), `author-${slug}`, ['author']);
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
    withCache(() => contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.author.sys.id': author.sys.id,
      order: ['-fields.date'] as any,
    }), `authorBlogPosts-${author.sys.id}`, ['blogPost']),
    
    // Event report posts by author  
    withCache(() => contentfulClient.getEntries({
      content_type: 'eventReportPost',
      'fields.author.sys.id': author.sys.id,
      order: ['-fields.date'] as any,
    }), `authorEventPosts-${author.sys.id}`, ['eventReportPost']),
    
    // Spotlight posts by author
    withCache(() => contentfulClient.getEntries({
      content_type: 'spotlightEntry',
      'fields.author.sys.id': author.sys.id,
      order: ['-fields.date'] as any,
      include: 1 // Include parent blog for spotlight posts
    }), `authorSpotlightPosts-${author.sys.id}`, ['spotlightEntry'])
  ]);

  return {
    author,
    blogPosts: blogPosts.items,
    eventPosts: eventPosts.items,
    spotlightPosts: spotlightPosts.items
  };
}
