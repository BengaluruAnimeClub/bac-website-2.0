import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { fetchEventReportPosts } from "@/lib/contentful-api";

export const metadata: Metadata = {
  title: "BAC · Archives",
  description: "An archive of past events organised by BAC",
};

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch Contentful event report posts
  const contentfulEventReportPosts = await fetchEventReportPosts();
  // Normalize Contentful posts
  const normalizedContentful = contentfulEventReportPosts.map((entry: any) => {
    const fields = entry.fields;
    return {
      slug: String(fields.slug ?? ""),
      slugAsParams: String(fields.slug ?? ""),
      date: String(fields.date ?? ""),
      title: String(fields.title ?? ""),
      description: typeof fields.description === "string" ? fields.description : "",
      tags: Array.isArray(fields.tags) ? fields.tags.filter((t: any) => typeof t === "string") : [],
      published: true,
      body: fields.content ?? null,
      author: fields.author?.fields?.name || "",
      source: "contentful",
    };
  });

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
      <h1 className="inline-block font-black text-4xl lg:text-5xl mb-1">Archives</h1>
      <hr className="mt-4 mb-5" />
      <div className="flex flex-col gap-6 mb-6">
        {paginatedPosts.map((post) => (
          <PostItem
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            basePath="/past-events/"
          />
        ))}
      </div>
      <QueryPagination totalPages={totalPages} />
    </div>
  );
}
