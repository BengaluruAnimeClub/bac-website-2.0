import { createClient } from 'contentful';
import { unstable_cache } from 'next/cache';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper to add proper caching for Contentful fetches with ISR
function withCache<T>(promiseFactory: () => Promise<T>, cacheKey: string, tags: string[] = []): Promise<T> {
  const cachedFunction = unstable_cache(promiseFactory, [cacheKey], {
    tags: tags.length > 0 ? tags : ['contentful'],
    revalidate: false, // Only revalidate via webhook
  });
  return cachedFunction();
}

/**
 * Optimized function for homepage - fetches only recent posts from all content types
 * in a single efficient query, reducing API calls and processing time
 */
export async function fetchHomepageContent() {
  return withCache(async () => {
    // Fetch recent posts from all content types in parallel, but limit to reduce payload
    const [blogPosts, announcementPosts, eventReportPosts] = await Promise.all([
      contentfulClient.getEntries({
        content_type: 'blogPost',
        order: ['-fields.date'],
        limit: 10, // Only fetch recent posts instead of all
        select: ['fields.slug', 'fields.date', 'fields.title', 'fields.description', 'fields.tags'] // Only essential fields
      }),
      contentfulClient.getEntries({
        content_type: 'announcementPost', 
        order: ['-fields.date'],
        limit: 10, // Only fetch recent posts instead of all
        select: ['fields.slug', 'fields.date', 'fields.title', 'fields.description', 'fields.tags']
      }),
      contentfulClient.getEntries({
        content_type: 'eventReportPost',
        order: ['-fields.date'], 
        limit: 10, // Only fetch recent posts instead of all
        select: ['fields.slug', 'fields.date', 'fields.title', 'fields.description', 'fields.tags']
      })
    ]);

    // Normalize and return processed data
    return {
      blogPosts: blogPosts.items.map(normalizePost),
      announcementPosts: announcementPosts.items.map(normalizePost),
      eventReportPosts: eventReportPosts.items.map(normalizePost)
    };
  }, 'homepage-content', ['contentful', 'blogPost', 'announcementPost', 'eventReportPost']);
}

/**
 * Minimal post normalization for homepage use
 */
function normalizePost(entry: any) {
  const fields = entry.fields;
  return {
    slug: String(fields.slug ?? ""),
    slugAsParams: String(fields.slug ?? ""),
    date: String(fields.date ?? ""),
    title: String(fields.title ?? ""),
    description: typeof fields.description === "string" ? fields.description : "",
    tags: Array.isArray(fields.tags) ? fields.tags.filter((t: any) => typeof t === "string") : [],
    published: true,
  };
}
