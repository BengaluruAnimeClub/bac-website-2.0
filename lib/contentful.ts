import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchBlogPosts() {
  const entries = await contentfulClient.getEntries({
    content_type: 'blogPost', // Make sure this matches your Contentful content type API ID
    order: ['-fields.date'], // Most recent first
  });
  return entries.items;
}

export async function fetchBlogPostBySlug(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}

export async function fetchBlogPostBySlugWithEntries(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2, // fetch linked spotlight entries and authors
    limit: 1,
  });
  return entries.items[0] || null;
}

export async function fetchAnnouncementPosts() {
  const entries = await contentfulClient.getEntries({
    content_type: 'announcementPost',
    order: ['-fields.date'],
  });
  return entries.items;
}

export async function fetchAnnouncementPostBySlug(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: 'announcementPost',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}

export async function fetchAnnouncementPostBySlugWithEntries(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: 'announcementPost',
    'fields.slug': slug,
    include: 2, // fetch linked authors, etc.
    limit: 1,
  });
  return entries.items[0] || null;
}
