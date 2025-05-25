import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "#site/content";
import { slug } from "github-slugger";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  // If input is a string in YYYY-MM-DD or YYYY-MM-DDTHH:mm format, always treat as local date (no timezone shift)
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}/.test(input)) {
    // Extract only the date part
    const [year, month, day] = input.split("T")[0].split("-");
    // Create a date object in local time
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  // fallback to default
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      })
    }
  })

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter(post => {
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag))
    return slugifiedTags.includes(tag)
  })
}

/**
 * Returns the fallback preview image as an absolute URL.
 */
export function getFallbackOgImage(): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;
  return `${base}/images/preview.png`;
}

/**
 * Extracts the first image src from a string of HTML/MDX content.
 * Returns fallback if no image is found.
 */
export function extractFirstImageSrcWithFallback(content: string): string {
  const imgTagMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgTagMatch) {
    let src = imgTagMatch[1];
    if (src.startsWith('/')) {
      const base = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;
      src = `${base}${src}`;
    }
    return src;
  }
  return getFallbackOgImage();
}

/**
 * Extracts the first image URL from a Contentful rich text body (object).
 * Returns the first image URL if found, else fallback.
 */
export function extractOgImageFromContentfulBodyWithFallback(body: any): string {
  if (!body || typeof body !== 'object') return getFallbackOgImage();
  const contentStr = JSON.stringify(body);
  const imgMatch = contentStr.match(/(https?:)?\/\/(?:[^"'\\\s]+)\.(webp|png|jpg|jpeg|gif)/i);
  if (imgMatch) {
    let url = imgMatch[0].startsWith('//') ? `https:${imgMatch[0]}` : imgMatch[0];
    return url;
  }
  return getFallbackOgImage();
}

/**
 * Extracts the first image src from a string of HTML/MDX content.
 * Returns undefined if no image is found.
 */
export function extractFirstImageSrc(content: string): string | undefined {
  const imgTagMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgTagMatch) {
    return imgTagMatch[1];
  }
  return undefined;
}