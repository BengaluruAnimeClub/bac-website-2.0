import { upcomingEventsPosts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/comment-section"; // Import CommentSection
import { fetchAnnouncementPostBySlugWithEntries, fetchAnnouncementPosts } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { sortPosts } from "@/lib/utils";

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

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  // Try local first
  let post = upcomingEventsPosts.find((post) => post.slugAsParams === slug);
  if (post) return { ...post, source: "local" };
  // Try Contentful
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

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  // Local MDX posts
  const localParams = upcomingEventsPosts.map((post) => ({ slug: post.slugAsParams.split("/") }));
  // Contentful posts
  const contentfulRaw = await fetchAnnouncementPosts();
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

  const sortedPosts = sortPosts(upcomingEventsPosts.filter((post) => post.published));
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = sortedPosts[currentIndex - 1];
  const nextPost = sortedPosts[currentIndex + 1];
  
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl px-4">
      <h1 className="mb-2 text-3xl lg:text-4xl">{post.title}</h1>
      {post.description ? (
        <p className="text-lg mt-0 mb-1 text-muted-foreground">{post.description}</p>
      ) : null}
      <div className="flex justify-between mb-0">
        {prevPost ? (
          <a href={prevPost.slugAsParams} className="no-underline text-md hover:text-[#EA4168]">
            ◄ Previous
          </a>
        ) : (
          <div />
        )}
        {nextPost ? (
          <a href={nextPost.slugAsParams} className="no-underline text-md hover:text-[#EA4168]">
            Next ►
          </a>
        ) : (
          <div />
        )}
      </div>
      <hr className="my-4 mt-2 mb-4" />
      {/* Only show date for Contentful posts */}
      {post.source === "contentful" && post.date && (
        <div className="text-base text-muted-foreground mb-4 mt-4">
          📅 <b>Date:</b> {(new Date(post.date)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>
      )}
      {/* Render Contentful or MDX content */}
      {post.source === "contentful" && isContentfulDocument(post.body) ? (
        <div>{documentToReactComponents(post.body, contentfulRenderOptions)}</div>
      ) : (
        <MDXContent code={String(post.body)} />
      )}
      <CommentSection slug={post.slugAsParams} /> {/* Add CommentSection */}
    </article>
  );
}
