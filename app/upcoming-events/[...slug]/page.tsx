import { upcomingEventsPosts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/comment-section"; // Import CommentSection

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { sortPosts } from "@/lib/utils";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = upcomingEventsPosts.find((post) => post.slugAsParams === slug);

  return post;
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
  return upcomingEventsPosts.map((post) => ({ slug: post.slugAsParams.split("/") }));
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
      <MDXContent code={post.body} />
      <CommentSection slug={post.slugAsParams} /> {/* Add CommentSection */}
    </article>
  );
}
