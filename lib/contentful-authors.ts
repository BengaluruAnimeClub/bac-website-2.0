import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Fetch all authors
export async function fetchAuthors() {
  const entries = await contentfulClient.getEntries({
    content_type: 'author',
    order: ['fields.name'],
  });
  return entries.items;
}

// Fetch author by slug
export async function fetchAuthorBySlug(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: 'author',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}
