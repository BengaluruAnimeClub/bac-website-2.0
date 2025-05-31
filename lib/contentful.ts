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

export async function fetchBlogPosts() {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'blogPost', // Make sure this matches your Contentful content type API ID
    order: ['-fields.date'], // Most recent first
  }), 'blogPosts', ['blogPost']);
  return entries.items;
}

export async function fetchBlogPostBySlug(slug: string) {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  }), `blogPost-${slug}`, ['blogPost']);
  return entries.items[0] || null;
}

export async function fetchBlogPostBySlugWithEntries(slug: string) {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2, // fetch linked spotlight entries and authors
    limit: 1,
  }), `blogPostWithEntries-${slug}`, ['blogPost']);
  return entries.items[0] || null;
}

export async function fetchAnnouncementPosts() {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'announcementPost',
    order: ['-fields.date'],
  }), 'announcementPosts', ['announcementPost']);
  return entries.items;
}

export async function fetchAnnouncementPostBySlug(slug: string) {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'announcementPost',
    'fields.slug': slug,
    limit: 1,
  }), `announcementPost-${slug}`, ['announcementPost']);
  return entries.items[0] || null;
}

export async function fetchAnnouncementPostBySlugWithEntries(slug: string) {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'announcementPost',
    'fields.slug': slug,
    include: 2, // fetch linked authors, etc.
    limit: 1,
  }), `announcementPostWithEntries-${slug}`, ['announcementPost']);
  return entries.items[0] || null;
}

export async function fetchEventReportPosts() {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'eventReportPost',
    order: ['-fields.date'],
  }), 'eventReportPosts', ['eventReportPost']);
  return entries.items;
}

export async function fetchEventReportPostBySlugWithEntries(slug: string) {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'eventReportPost',
    'fields.slug': slug,
    include: 2, // fetch linked authors, etc.
    limit: 1,
  }), `eventReportPostWithEntries-${slug}`, ['eventReportPost']);
  return entries.items[0] || null;
}

export async function fetchSpotlightPosts() {
  const entries = await withCache(() => contentfulClient.getEntries({
    content_type: 'spotlightEntry',
    // No order field, since spotlightEntry has no date
  }), 'spotlightPosts', ['spotlightEntry']);
  return entries.items;
}

// Helper functions for blog post processing
function hasContentfulFields(obj: any): obj is { fields: any } {
  return obj && typeof obj === "object" && "fields" in obj && typeof obj.fields === "object";
}

function isAuthorFields(fields: any): fields is { name: string; slug?: string } {
  return fields && typeof fields.name === "string";
}

function processBlogPostEntry(entry: any) {
  if (!entry || !entry.fields) return null;
  
  const fields = entry.fields;
  let spotlightEntries: any[] = [];
  if (Array.isArray(fields.entries)) {
    spotlightEntries = fields.entries.map((e: any) => {
      if (e.fields) {
        let author = null;
        if (hasContentfulFields(e.fields.author) && isAuthorFields(e.fields.author.fields)) {
          author = {
            name: e.fields.author.fields.name,
            slug: e.fields.author.fields.slug || undefined,
          };
        }
        return {
          title: e.fields.title || "",
          content: e.fields.content || null,
          author,
        };
      }
      return null;
    }).filter(Boolean);
  }
  
  // Support multiple authors for the main blog post
  let authors: any[] = [];
  if (fields.author) {
    if (Array.isArray(fields.author)) {
      authors = fields.author.map((a: any) => hasContentfulFields(a) && isAuthorFields(a.fields) ? { name: a.fields.name, slug: a.fields.slug } : null).filter(Boolean);
    } else if (hasContentfulFields(fields.author) && isAuthorFields(fields.author.fields)) {
      authors = [{ name: fields.author.fields.name, slug: fields.author.fields.slug }];
    }
  }
  
  return {
    slug: String(fields.slug ?? ""),
    slugAsParams: String(fields.slug ?? ""),
    date: String(fields.date ?? ""),
    title: String(fields.title ?? ""),
    description: typeof fields.description === "string" ? fields.description : "",
    tags: Array.isArray(fields.tags) ? fields.tags.filter((t: any) => typeof t === "string") : [],
    published: true,
    body: fields.content ?? null,
    header: fields.header ?? null,
    footer: fields.footer ?? null,
    spotlightEntries,
    source: "contentful",
    image: typeof fields.image === "string" ? fields.image : undefined,
    authors,
  } as { [key: string]: any; image?: string };
}

// Optimized function to get blog post with adjacent posts in minimal API calls
export async function getBlogPostWithNavigation(slug: string) {
  // Get the current post with full content
  const currentPostEntry = await fetchBlogPostBySlugWithEntries(slug);
  if (!currentPostEntry) return null;

  // Process the current post
  const currentPost = processBlogPostEntry(currentPostEntry);
  if (!currentPost) return null;

  // Get all posts for navigation (this is cached by ISR)
  const allPosts = await fetchBlogPosts();
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === slug);
  
  if (currentIndex === -1) {
    return { post: currentPost, navigation: { previousPost: null, nextPost: null } };
  }

  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return {
    post: currentPost,
    navigation: {
      previousPost: previousPost && previousPost.fields.slug && previousPost.fields.title ? {
        slug: String(previousPost.fields.slug),
        title: String(previousPost.fields.title)
      } : null,
      nextPost: nextPost && nextPost.fields.slug && nextPost.fields.title ? {
        slug: String(nextPost.fields.slug),
        title: String(nextPost.fields.title)
      } : null
    }
  };
}

// Optimized function for announcement posts
export async function getAnnouncementPostWithNavigation(slug: string) {
  const currentPostEntry = await fetchAnnouncementPostBySlugWithEntries(slug);
  if (!currentPostEntry) return null;

  // Process the current post
  const currentPost = processAnnouncementPostEntry(currentPostEntry);
  if (!currentPost) return null;

  const allPosts = await fetchAnnouncementPosts();
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === slug);
  
  if (currentIndex === -1) {
    return { post: currentPost, navigation: { previousPost: null, nextPost: null } };
  }

  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return {
    post: currentPost,
    navigation: {
      previousPost: previousPost && previousPost.fields.slug && previousPost.fields.title ? {
        slug: String(previousPost.fields.slug),
        title: String(previousPost.fields.title)
      } : null,
      nextPost: nextPost && nextPost.fields.slug && nextPost.fields.title ? {
        slug: String(nextPost.fields.slug),
        title: String(nextPost.fields.title)
      } : null
    }
  };
}

function processAnnouncementPostEntry(entry: any) {
  if (!entry || !entry.fields) return null;
  
  const fields = entry.fields;
  let authorName = "";
  if (
    fields.author &&
    typeof fields.author === "object" &&
    'fields' in fields.author &&
    fields.author.fields &&
    typeof fields.author.fields === "object" &&
    'name' in fields.author.fields &&
    typeof fields.author.fields.name === "string"
  ) {
    authorName = fields.author.fields.name;
  }
  
  return {
    slug: String(fields.slug ?? ""),
    slugAsParams: String(fields.slug ?? ""),
    date: String(fields.date ?? ""),
    title: String(fields.title ?? ""),
    description: typeof fields.description === "string" ? fields.description : "",
    tags: Array.isArray(fields.tags) ? fields.tags.filter((t: any) => typeof t === "string") : [],
    published: true,
    body: fields.content ?? null,
    author: authorName,
    source: "contentful",
  };
}

function processEventReportPostEntry(entry: any) {
  if (!entry || !entry.fields) return null;
  
  const fields = entry.fields;
  let authorName = "";
  if (
    fields.author &&
    typeof fields.author === "object" &&
    'fields' in fields.author &&
    fields.author.fields &&
    typeof fields.author.fields === "object" &&
    'name' in fields.author.fields &&
    typeof fields.author.fields.name === "string"
  ) {
    authorName = fields.author.fields.name;
  }
  
  return {
    slug: String(fields.slug ?? ""),
    slugAsParams: String(fields.slug ?? ""),
    date: String(fields.date ?? ""),
    title: String(fields.title ?? ""),
    description: typeof fields.description === "string" ? fields.description : "",
    tags: Array.isArray(fields.tags) ? fields.tags.filter((t: any) => typeof t === "string") : [],
    published: true,
    body: fields.content ?? null,
    author: authorName,
    source: "contentful",
  };
}

// Optimized function for event report posts
export async function getEventReportPostWithNavigation(slug: string) {
  const currentPostEntry = await fetchEventReportPostBySlugWithEntries(slug);
  if (!currentPostEntry) return null;

  // Process the current post
  const currentPost = processEventReportPostEntry(currentPostEntry);
  if (!currentPost) return null;

  const allPosts = await fetchEventReportPosts();
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === slug);
  
  if (currentIndex === -1) {
    return { post: currentPost, navigation: { previousPost: null, nextPost: null } };
  }

  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return {
    post: currentPost,
    navigation: {
      previousPost: previousPost && previousPost.fields.slug && previousPost.fields.title ? {
        slug: String(previousPost.fields.slug),
        title: String(previousPost.fields.title)
      } : null,
      nextPost: nextPost && nextPost.fields.slug && nextPost.fields.title ? {
        slug: String(nextPost.fields.slug),
        title: String(nextPost.fields.title)
      } : null
    }
  };
}

// Legacy functions - keeping for backward compatibility but marking as deprecated
/** @deprecated Use getBlogPostWithNavigation instead */
export async function getAdjacentBlogPosts(currentSlug: string) {
  const allPosts = await fetchBlogPosts();
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
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

/** @deprecated Use getAnnouncementPostWithNavigation instead */
export async function getAdjacentAnnouncementPosts(currentSlug: string) {
  const allPosts = await fetchAnnouncementPosts();
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
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

/** @deprecated Use getEventReportPostWithNavigation instead */
export async function getAdjacentEventReportPosts(currentSlug: string) {
  const allPosts = await fetchEventReportPosts();
  const currentIndex = allPosts.findIndex((post: any) => post.fields.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
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
