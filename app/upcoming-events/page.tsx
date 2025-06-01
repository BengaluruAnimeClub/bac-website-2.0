import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { fetchAnnouncementPostsOptimized } from "@/lib/contentful-api";

export const metadata: Metadata = {
  title: "BAC · Events",
  description: "Join our events and meetups in Bengaluru!",
};

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch Contentful announcement posts using optimized cache-shared approach
  // OPTIMIZATION: Uses shared cache instead of separate API call
  const contentfulAnnouncementPosts = await fetchAnnouncementPostsOptimized();
  
  // Normalize Contentful posts (posts are already normalized from optimized function)
  const normalizedContentful = contentfulAnnouncementPosts.map((post: any) => ({
    slug: String(post.slug ?? ""),
    slugAsParams: String(post.slug ?? ""),
    date: String(post.date ?? ""),
    title: String(post.title ?? ""),
    description: typeof post.description === "string" ? post.description : "",
    tags: Array.isArray(post.tags) ? post.tags.filter((t: any) => typeof t === "string") : [],
    published: true,
    body: post.content ?? null,
    author: post.author || "",
    source: "contentful",
  }));

  // Only use Contentful posts
  const allPosts = normalizedContentful;
  const sortedPosts = sortPosts(allPosts.filter((post) => post.published));
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

const tags = getAllTags(sortedPosts);
const sortedTagNames = sortTagsByCount(tags);
const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  return (
    <div className="container max-w-4xl py-6 px-4">
      <h1 className="inline-block font-black text-4xl lg:text-5xl mb-1">Upcoming</h1>
      <hr className="mt-4 mb-5" />
      <div className="flex flex-col gap-6 mb-6">
        {paginatedPosts.map((post) => (
          <PostItem
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            basePath="/upcoming-events/"
          />
        ))}
      </div>
      <QueryPagination totalPages={totalPages} />
    </div>
  );
}
