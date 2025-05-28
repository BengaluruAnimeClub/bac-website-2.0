import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { fetchBlogPosts as fetchContentfulPosts } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "BAC · Blog",
  description: "Blogs and articles published by BAC members.",
};

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search?.toLowerCase() || "";

  // Fetch Contentful posts
  const contentfulRaw = await fetchContentfulPosts();
  // Normalize Contentful posts to match local post structure
  const contentfulPosts = contentfulRaw.map((entry: any) => ({
    slug: entry.fields.slug,
    slugAsParams: entry.fields.slug, // for search index compatibility
    date: entry.fields.date,
    title: entry.fields.title,
    description: entry.fields.description || "",
    tags: Array.isArray(entry.fields.tags) ? entry.fields.tags : [],
    published: true, // assume all Contentful posts are published
    body: "", // Add dummy body for type compatibility
  }));

  // Only use Contentful posts
  let allPosts = contentfulPosts;

  // Filter by search
  if (search) {
    allPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(search) ||
      (post.description && post.description.toLowerCase().includes(search))
    );
  }

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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sortedTagNames.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-6">
        {paginatedPosts.map((post) => (
          <PostItem
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            basePath="/blog/"
          />
        ))}
      </div>
      <QueryPagination totalPages={totalPages} />
    </div>
  );
}
