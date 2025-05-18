import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { blogSearchIndex } from "@/components/blog-search-index";
import { useSearchParams } from "next/navigation";
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

  // Combine local and Contentful posts
  let allPosts = [
    ...posts.map(post => ({
      ...post,
      // Remove leading 'blog/' from slug if present
      slug: post.slug.replace(/^blog\//, ''),
      slugAsParams: post.slugAsParams.replace(/^blog\//, ''),
    })),
    ...contentfulPosts
  ];
  allPosts = sortPosts(allPosts.filter((post) => post.published));

  let filteredPosts = allPosts;
  if (search) {
    const searchWords = search.split(/\s+/).filter(Boolean);
    const matchingSlugs = blogSearchIndex
      .filter((b) => {
        const title = b.title.toLowerCase();
        const description = (b.description || "").toLowerCase();
        const headers = b.headers.map((h) => h.toLowerCase());
        return searchWords.every(word =>
          title.includes(word) ||
          headers.some(h => h.includes(word))
        );
      })
      .map((b) => b.slug);
    filteredPosts = allPosts.filter((post) => matchingSlugs.includes(post.slugAsParams));
  }

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  // Tags from both sources
  const tags = getAllTags(allPosts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
        </div>
      </div>
      {search && displayPosts.length > 0 && (
        <div className="mb-4 mt-6 text-muted-foreground text-base">
          <i>
            Showing results for
            "{searchParams?.search}"
          </i>
        </div>
      )}
      <div className="grid grid-cols-12 gap-3 mt-4">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>{search ? `No results for "${search}"` : "Nothing to see here yet!"}</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="mt-4"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 hidden sm:block">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
