import { notFound } from "next/navigation";
import { fetchAnnouncementPostBySlugWithEntries, fetchAnnouncementPosts, getAdjacentAnnouncementPosts } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { extractOgImageFromContentfulBodyWithFallback } from "@/lib/utils";
import { Metadata } from "next";
import { CommentSection } from "@/components/comment-section";
import { BlogNavigation } from "@/components/blog-navigation";
import parse from "html-react-parser";
import { ShareButtons } from "@/components/share-buttons";
import { Calendar } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

function isContentfulDocument(doc: any): doc is { nodeType: string; content: any[] } {
  return (
    doc &&
    typeof doc === "object" &&
    doc.nodeType === "document" &&
    Array.isArray(doc.content)
  );
}

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
      if (
        node.content.length === 1 &&
        typeof node.content[0].value === "string" &&
        node.content[0].value.trim().startsWith("<") &&
        node.content[0].value.trim().endsWith(">")
      ) {
        return <>{parse(node.content[0].value)}</>;
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
            <span className="inline-flex flex-col items-center justify-center mx-2 align-middle">
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
              {entry.fields.caption && (
                <div className="text-center text-sm text-muted-foreground mt-2 max-w-full prose prose-sm dark:prose-invert">
                  {entry.fields.caption}
                </div>
              )}
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
  },
  renderText: (text: string) => {
    return text.split('\n').reduce((acc, segment, i) => {
      if (i === 0) return [segment];
      return [...acc, <br key={i} />, segment];
    }, [] as (string | JSX.Element)[]);
  },
};

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const entry = await fetchAnnouncementPostBySlugWithEntries(slug);
  if (entry && entry.fields) {
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
  if (!ogImage && post.source === "contentful") {
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
  const contentfulRaw = await fetchAnnouncementPosts();
  const contentfulParams = contentfulRaw
    .map((entry: any) => entry.fields?.slug)
    .filter((slug: any) => typeof slug === "string" && slug.length > 0)
    .map((slug: string) => ({ slug: slug.split("/") }));
  return contentfulParams;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post || !post.published) {
    notFound();
  }

  // Fetch adjacent posts for navigation
  const slug = params.slug.join("/");
  const adjacentPosts = await getAdjacentAnnouncementPosts(slug);

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl px-4">
      <h1 className="mb-2 text-3xl lg:text-4xl">{post.title}</h1>
      {post.description ? (
        <p className="text-lg mt-0 mb-1 text-muted-foreground">{post.description}</p>
      ) : null}
      <BlogNavigation 
        previousPost={adjacentPosts.previousPost}
        nextPost={adjacentPosts.nextPost}
        basePath="/upcoming-events"
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
            <ShareButtons url={''} type="event" />
          </div>
        </div>
      )}
      {post.source === "contentful" && isContentfulDocument(post.body) ? (
        <div>{documentToReactComponents(post.body, contentfulRenderOptions)}</div>
      ) : null}
      <CommentSection slug={post.slugAsParams} />
    </article>
  );
}
