import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { sortPosts } from "@/lib/utils";
import { CommentSection } from "@/components/comment-section";
import { fetchBlogPostBySlugWithEntries, fetchBlogPosts as fetchContentfulPosts } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { extractFirstImageSrc } from "@/lib/utils";
import matter from "gray-matter";
import { BLOCKS } from "./contentful-blocks-enum";

// Helper: force-cast to Document type for Contentful rich text
import type { Document } from "@contentful/rich-text-types";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  let post = posts.find((post) => post.slugAsParams === slug);

  if (post) return { ...post, source: "local" };

  // Try Contentful if not found locally
  const entry = await fetchBlogPostBySlugWithEntries(slug);
  if (entry && entry.fields) {
    const fields = entry.fields;
    // spotlightEntries: array of spotlightEntry references
    let spotlightEntries: any[] = [];
    if (Array.isArray(fields.entries)) {
      spotlightEntries = fields.entries.map((e: any) => {
        if (e.fields) {
          return {
            title: e.fields.title || "",
            content: e.fields.content || null,
            author: e.fields.author?.fields?.name || "",
          };
        }
        return null;
      }).filter(Boolean);
    }
    return {
      slug: String(fields.slug ?? ""),
      slugAsParams: String(fields.slug ?? ""),
      date: String(fields.date ?? ""),
      title: String(fields.title ?? ""),
      description: typeof fields.description === "string" ? fields.description : "",
      tags: Array.isArray(fields.tags) ? fields.tags.filter((t) => typeof t === "string") : [],
      published: true,
      body: fields.content ?? null, // rich text document or null
      spotlightEntries,
      source: "contentful",
      image: typeof fields.image === "string" ? fields.image : undefined, // <-- add image field
    } as { [key: string]: any; image?: string };
  }
  return null;
}

function isContentfulDocument(doc: any): doc is { nodeType: typeof BLOCKS.DOCUMENT; content: any[]; data: any } {
  return (
    doc &&
    typeof doc === "object" &&
    doc.nodeType === BLOCKS.DOCUMENT &&
    Array.isArray(doc.content) &&
    ("data" in doc)
  );
}

// Custom renderer for Contentful rich text
const contentfulRenderOptions = {
  renderNode: {
    'embedded-asset-block': (node: any) => {
      const { file, title, description } = node.data.target.fields;
      const url = file?.url?.startsWith('http') ? file.url : `https:${file.url}`;
      return (
        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <img
            src={url}
            alt={title || description || ''}
            style={{ maxWidth: '100%', borderRadius: '0.5rem', margin: '0 auto' }}
          />
        </div>
      );
    },
    'hr': () => <hr className="my-4 mt-8 mb-8 border-t-2" />,
    'paragraph': (node: any, children: any) => {
      if (node.content.length === 1 && node.content[0].value === '\n') {
        return <br />;
      }
      return <p>{children}</p>;
    },
  },
  renderText: (text: string) => {
    return text.split('\n').reduce((acc, segment, i) => {
      if (i === 0) return [segment];
      return [...acc, <br key={i} />, segment];
    }, [] as (string | JSX.Element)[]);
  },
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  // Try to extract og:image from frontmatter if present
  let ogImage: string | undefined;
  if (post.source === "local") {
    // Use post.image directly if available (frontmatter is already parsed)
    if (post.image) {
      ogImage = post.image;
      if (ogImage && ogImage.startsWith("/")) {
        ogImage = `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${ogImage}`;
      }
    }
    // If not in frontmatter, try to extract from content
    if (!ogImage && typeof post.body === "string") {
      ogImage = extractFirstImageSrc(post.body);
      if (ogImage && ogImage.startsWith("/")) {
        ogImage = `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${ogImage}`;
      }
    }
  }
  // For Contentful, extract from spotlightEntries or body if available
  if (!ogImage && post.source === "contentful" && Array.isArray(post.spotlightEntries)) {
    for (const entry of post.spotlightEntries) {
      if (entry.content && typeof entry.content === "object") {
        const contentStr = JSON.stringify(entry.content);
        // Match https://, http://, or protocol-relative (//) image URLs
        const imgMatch = contentStr.match(/(https?:)?\/\/(?:[^"'\\\s]+)\.(webp|png|jpg|jpeg|gif)/i);
        if (imgMatch) {
          ogImage = imgMatch[0].startsWith('//') ? `https:${imgMatch[0]}` : imgMatch[0];
          break;
        }
      }
    }
  }
  if (!ogImage && post.source === "contentful" && post.body && typeof post.body === "object") {
    const contentStr = JSON.stringify(post.body);
    const imgMatch = contentStr.match(/(https?:)?\/\/(?:[^"'\\\s]+)\.(webp|png|jpg|jpeg|gif)/i);
    if (imgMatch) {
      ogImage = imgMatch[0].startsWith('//') ? `https:${imgMatch[0]}` : imgMatch[0];
    }
  }

  // Debug: log the ogImage value to verify extraction
  console.log('OG IMAGE DEBUG', ogImage);

  // Fallback to no image if none found
  // ogImage will be undefined if nothing is found

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  // Local MDX posts
  const localParams = posts.map((post) => ({ slug: post.slugAsParams.split("/") }));

  // Contentful posts
  const contentfulRaw = await fetchContentfulPosts();
  const contentfulParams = contentfulRaw
    .map((entry: any) => entry.fields?.slug)
    .filter((slug: any) => typeof slug === "string" && slug.length > 0)
    .map((slug: string) => ({ slug: slug.split("/") }));

  return [...localParams, ...contentfulParams];
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl px-4">
      <h1 className="mb-2 text-3xl lg:text-4xl">{String(post.title)}</h1>
      <div className="flex gap-2 mb-2">
        {Array.isArray(post.tags) && post.tags.map((tag) =>
          typeof tag === "string" ? <Tag tag={tag} key={tag} /> : null
        )}
      </div>
      {post.description ? (
        <p className="text-lg mt-0 mb-1 text-muted-foreground">{String(post.description)}</p>
      ) : null}
      <hr className="my-4 mt-2 mb-4" />
      {/* Show date as first element inside the first spotlight entry */}
      {post.source === "contentful" && post.date && (
        <div className="text-base text-muted-foreground mb-4 mt-4">
          📅 <b>Date:</b> {(new Date(post.date)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>
      )}
      {post.source === "contentful" && Array.isArray(post.spotlightEntries) && post.spotlightEntries.length > 0 ? (
        <div>
          {post.spotlightEntries.map((entry, idx) => (
            <div key={idx} style={{marginBottom: '32px'}}>
              <div style={{marginBottom: '-10px', marginTop: '0px'}}>
                <h1 className="text-3xl font-extrabold">{entry.title}</h1>
              </div>
              
              {entry.content && isContentfulDocument(entry.content) && (
                <div className="mb-2">
                  {documentToReactComponents(entry.content, contentfulRenderOptions)}
                </div>
              )}
              {entry.author && (
                <div className="text-base text-muted-foreground mb-2">
                  <b>Credits:</b> {entry.author}
                </div>
              )}
              <hr className="my-4 mt-8 mb-8 border-t-2" />
            </div>
          ))}
        </div>
      ) : null}
      {/* For Contentful blogs without spotlight entries, insert date as first element inside content */}
      {post.source === "contentful" && isContentfulDocument(post.body) && (!post.spotlightEntries || post.spotlightEntries.length === 0) && (
        <>
          {post.date && (
            <div className="text-base text-muted-foreground mb-2">
              📅 <b>Last Updated:</b> {(new Date(post.date)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          )}
          {documentToReactComponents({ ...post.body, data: post.body.data ?? {} } as unknown as Document, contentfulRenderOptions)}
        </>
      )}
      {post.source !== "contentful" && <MDXContent code={String(post.body)} />}
      <p className="text-md mt-2 mb-0 text-muted-foreground text-justify">
        <i>All content on this website is protected by copyright and may not be copied, distributed, or reproduced in any form without the express written consent from <span className="font-semibold">team@bac.moe</span>.</i>
      </p>
      <CommentSection slug={String(post.slug)} />
    </article>
  );
}
