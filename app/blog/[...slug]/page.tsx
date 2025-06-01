import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { CommentSection } from "@/components/comment-section";
import { BlogNavigation } from "@/components/blog-navigation";
import { fetchBlogPostBySlugWithEntries, fetchBlogPosts as fetchContentfulPosts, getBlogPostWithNavigation } from "@/lib/contentful-api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { extractOgImageFromContentfulBodyWithFallback } from "@/lib/utils";
import { BLOCKS } from "./contentful-blocks-enum";
import parse from "html-react-parser";
import type { Document } from "@contentful/rich-text-types";
import { ShareButtons } from "@/components/share-buttons";
import "@/styles/mdx.css";
import { Calendar } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string[];
  };
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

const contentfulRenderOptions = {
  renderNode: {
    'embedded-entry-block': (node: any) => {
      const entry = node.data.target;
      if (entry && entry.sys && entry.sys.contentType?.sys?.id === 'imageWithSettings') {
        const { media, imageWidthDesktop, imageWidthMobile, caption, marginTop, marginBottom } = entry.fields;
        let imageUrl = '';
        let alt = '';
        if (media && media.fields && media.fields.file && media.fields.file.url) {
          imageUrl = media.fields.file.url.startsWith('http') ? media.fields.file.url : `https:${media.fields.file.url}`;
          alt = media.fields.title || '';
        }
        const widthDesktop = imageWidthDesktop ? `${imageWidthDesktop}%` : '100%';
        const widthMobile = imageWidthMobile ? `${imageWidthMobile}%` : '100%';
        const style: React.CSSProperties = {
          width: '100%',
          display: 'block',
          // @ts-ignore: CSS custom properties for responsive width
          '--contentful-img-mobile': widthMobile,
          // @ts-ignore: CSS custom properties for responsive width
          '--contentful-img-desktop': widthDesktop,
        };
        if (marginTop !== undefined && marginTop !== null && marginTop !== '') style.marginTop = `${marginTop}px`;
        if (!caption && marginBottom !== undefined && marginBottom !== null && marginBottom !== '') style.marginBottom = `${marginBottom}px`;
        let captionStyle: React.CSSProperties | undefined = undefined;
        if (caption && marginBottom !== undefined && marginBottom !== null && marginBottom !== '') {
          captionStyle = { marginBottom: `${marginBottom}px` };
        }
        if (imageUrl) {
          return (
            <div className="flex flex-col items-center my-6">
              <img
                src={imageUrl}
                alt={alt}
                className="mx-auto rounded contentful-img-responsive"
                style={style}
              />
              {caption && (
                <div
                  className="text-center text-sm text-muted-foreground max-w-full"
                  style={{ maxWidth: 'var(--contentful-img-desktop, 100%)', ...captionStyle, marginTop: '-20px' }}
                >
                  {caption}
                </div>
              )}
            </div>
          );
        }
        return (
          <div style={{color: 'red', fontSize: '0.9em'}}>
            imageWithSettings: Image not found<br />
            <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f8f8f8', padding: '8px', borderRadius: '4px', marginTop: '8px'}}>
              {String(JSON.stringify(entry, null, 2))}
            </pre>
          </div>
        );
      }
      return (
        <div style={{color: 'red', fontSize: '0.9em'}}>
          embedded-entry-block: Unhandled entry type or missing data<br />
          <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f8f8f8', padding: '8px', borderRadius: '4px', marginTop: '8px'}}>
            {String(JSON.stringify(node, null, 2))}
          </pre>
        </div>
      );
    },
    'embedded-entry-inline': (node: any) => {
      const entry = node.data.target;
      if (entry && entry.sys && entry.sys.contentType?.sys?.id === 'imageWithSettings') {
        const { media, imageWidthDesktop, imageWidthMobile } = entry.fields;
        let imageUrl = '';
        let alt = '';
        if (media && media.fields && media.fields.file && media.fields.file.url) {
          imageUrl = media.fields.file.url.startsWith('http') ? media.fields.file.url : `https:${media.fields.file.url}`;
          alt = media.fields.title || '';
        }
        const widthDesktop = imageWidthDesktop ? `${imageWidthDesktop}%` : '100%';
        const widthMobile = imageWidthMobile ? `${imageWidthMobile}%` : '100%';
        if (imageUrl) {
          return (
            <span className="inline-flex justify-center mx-2 align-middle">
              <img
                src={imageUrl}
                alt={alt}
                className="mx-auto rounded contentful-img-responsive"
                style={{
                  width: '100%',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  // @ts-ignore: allow custom CSS vars for responsive width
                  '--contentful-img-mobile': widthMobile,
                  // @ts-ignore: allow custom CSS vars for responsive width
                  '--contentful-img-desktop': widthDesktop,
                } as React.CSSProperties}
              />
            </span>
          );
        }
        return (
          <span style={{color: 'red', fontSize: '0.9em'}}>
            imageWithSettings (inline): Image not found<br />
            <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f8f8f8', padding: '8px', borderRadius: '4px', marginTop: '8px'}}>
              {String(JSON.stringify(entry, null, 2))}
            </pre>
          </span>
        );
      }
      return (
        <span style={{color: 'red', fontSize: '0.9em'}}>
          embedded-entry-inline: Unhandled entry type or missing data<br />
          <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f8f8f8', padding: '8px', borderRadius: '4px', marginTop: '8px'}}>
            {String(JSON.stringify(node, null, 2))}
          </pre>
        </span>
      );
    },
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
      if (
        node.content.length === 1 &&
        typeof node.content[0].value === "string" &&
        node.content[0].value.trim().startsWith("<") &&
        node.content[0].value.trim().endsWith(">")
      ) {
        return <>{parse(node.content[0].value)}</>;
      }
      if (node.content.length === 1 && node.content[0].value === '\n') {
        return <br />;
      }
      return <p>{children}</p>;
    },
    'code': (node: any) => {
      if (
        typeof node.content[0]?.value === "string" &&
        node.content[0].value.trim().startsWith("<") &&
        node.content[0].value.trim().endsWith(">")
      ) {
        return <>{parse(node.content[0].value)}</>;
      }
      return <pre><code>{node.content[0]?.value}</code></pre>;
    },
  },
  renderText: (text: string) => {
    return text.split('\n').reduce((acc, segment, i) => {
      if (i === 0) return [segment];
      return [...acc, <br key={i} />, segment];
    }, [] as (string | JSX.Element)[]);
  },
};

// Helper to check if an object is a Contentful Entry with fields
function hasContentfulFields(obj: any): obj is { fields: any } {
  return obj && typeof obj === "object" && "fields" in obj && typeof obj.fields === "object";
}
// Helper to check if fields has author info
function isAuthorFields(fields: any): fields is { name: string; slug?: string } {
  return fields && typeof fields.name === "string";
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const entry = await fetchBlogPostBySlugWithEntries(slug);
  if (entry && entry.fields) {
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
      tags: Array.isArray(fields.tags) ? fields.tags.filter((t) => typeof t === "string") : [],
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
  return null;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  if (!post) {
    return {};
  }
  let ogImage: string | undefined;
  if (!ogImage && post.source === "contentful" && Array.isArray(post.spotlightEntries)) {
    for (const entry of post.spotlightEntries) {
      if (entry.content && typeof entry.content === "object") {
        ogImage = extractOgImageFromContentfulBodyWithFallback(entry.content);
        if (ogImage) break;
      }
    }
  }
  if (!ogImage && post.source === "contentful" && post.body && typeof post.body === "object") {
    ogImage = extractOgImageFromContentfulBodyWithFallback(post.body);
  }
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
  const contentfulRaw = await fetchContentfulPosts();
  const contentfulParams = contentfulRaw
    .map((entry: any) => entry.fields?.slug)
    .filter((slug: any) => typeof slug === "string" && slug.length > 0)
    .map((slug: string) => ({ slug: slug.split("/") }));
  return contentfulParams;
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");
  const result = await getBlogPostWithNavigation(slug);
  
  if (!result || !result.post || !result.post.published) {
    notFound();
  }
  
  const { post, navigation } = result;
  
  // Get the blog URL for sharing (on client only)
  let blogUrl = '';
  if (typeof window !== 'undefined') {
    blogUrl = window.location.href;
  }
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl px-4">
      <h1 className="mb-2 text-3xl lg:text-4xl">{String(post.title)}</h1>
      {/* <div className="flex gap-2 mb-2">
        {Array.isArray(post.tags) && post.tags.map((tag) =>
          typeof tag === "string" ? <Tag tag={tag} key={tag} /> : null
        )}
      </div> */}
      {post.description ? (
        <p className="text-lg mt-0 mb-1 text-muted-foreground">{String(post.description)}</p>
      ) : null}
      
      {/* Blog Navigation */}
      <BlogNavigation 
        previousPost={navigation.previousPost} 
        nextPost={navigation.nextPost} 
      />
      
      {/* <hr className="my-4 mt-2 mb-4" /> */}
      {post.source === "contentful" && post.date && (
        <div className="flex items-center justify-between text-base text-muted-foreground mb-4 mt-4">
          <div className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{
              new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "Asia/Kolkata"
              })
            }</time>
          </div>
          <div className="flex-shrink-0 flex items-center ml-4">
            <ShareButtons url={''} />
          </div>
        </div>
      )}
      {/* Render blogPost header if present */}
      {post.source === "contentful" && post.header && isContentfulDocument(post.header) && (
        <div>
          {documentToReactComponents({ ...post.header, data: post.header.data ?? {} } as unknown as Document, contentfulRenderOptions)}
        </div>
      )}
      {/* Render spotlight entries if present */}
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
                  <b>Article by:</b>{' '}
                  {typeof entry.author === 'object' && entry.author !== null ? (
                    entry.author.slug ? (
                      <a href={`/contributors/${entry.author.slug}`} className="underline hover:text-blue-700">{entry.author.name}</a>
                    ) : (
                      entry.author.name
                    )
                  ) : (
                    String(entry.author)
                  )}
                </div>
              )}
              <hr className="my-4 mt-8 mb-8 border-t-2" />
            </div>
          ))}
        </div>
      ) : null}
      {/* Render blog content if present */}
      {post.source === "contentful" && isContentfulDocument(post.body) && (
        <>
          {documentToReactComponents({ ...post.body, data: post.body.data ?? {} } as unknown as Document, contentfulRenderOptions)}
        </>
      )}
      {/* Show authors at the end of the blog post */}
      {post.source === "contentful" && post.body && post.authors && Array.isArray(post.authors) && post.authors.length > 0 && (
        <div className="mt-4 mb-4">
          <b>Article by:</b>{' '}
          {post.authors.map((author: any, idx: number) => (
            <span key={author.slug || author.name}>
              {author.slug ? (
                <a href={`/contributors/${author.slug}`} className="underline hover:text-blue-700">{author.name}</a>
              ) : (
                <span>{author.name}</span>
              )}
              {idx < (post.authors?.length ?? 0) - 1 && ', '}
            </span>
          ))}
        </div>
      )}
      {/* Render blogPost footer if present */}
      {post.source === "contentful" && post.footer && isContentfulDocument(post.footer) && (
        <div>
          {documentToReactComponents({ ...post.footer, data: post.footer.data ?? {} } as unknown as Document, contentfulRenderOptions)}
        </div>
      )}
      {/* <hr className="my-4 mt-2 mb-4" /> */}
      <p className="text-md mt-2 mb-2 text-muted-foreground text-justify">
        <i>All content on this website is protected by copyright and may not be copied, distributed, or reproduced in any form without the express written consent from <span className="font-semibold">team@bac.moe</span>.</i>
      </p>
      
      {/* Blog Navigation at bottom */}
      <BlogNavigation 
        previousPost={navigation.previousPost} 
        nextPost={navigation.nextPost} 
      />
      
      <CommentSection slug={String(post.slug)} />
    </article>
  );
}
