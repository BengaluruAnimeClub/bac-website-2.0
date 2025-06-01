import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";
import { fetchBlogPosts as fetchContentfulPosts } from "@/lib/contentful-api";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on ${tag}`,
  };
}

export const generateStaticParams = async () => {
  const contentfulRaw = await fetchContentfulPosts();
  const contentfulPosts = contentfulRaw.map((entry: any) => ({
    slug: entry.fields.slug,
    slugAsParams: entry.fields.slug,
    date: entry.fields.date,
    title: entry.fields.title,
    description: entry.fields.description || "",
    tags: Array.isArray(entry.fields.tags) ? entry.fields.tags : [],
    published: true,
    body: "",
  }));
  const tags = getAllTags(contentfulPosts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  // Fetch and normalize Contentful posts
  const contentfulRaw = await fetchContentfulPosts();
  const contentfulPosts = contentfulRaw.map((entry: any) => ({
    slug: entry.fields.slug,
    slugAsParams: entry.fields.slug,
    date: entry.fields.date,
    title: entry.fields.title,
    description: entry.fields.description || "",
    tags: Array.isArray(entry.fields.tags) ? entry.fields.tags : [],
    published: true,
    body: "",
  }));

  const allPosts = getPostsByTagSlug(contentfulPosts, tag);
  const displayPosts = allPosts.filter(post => post.published);
  const tags = getAllTags(contentfulPosts);
  const sortedTagNames = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 px-4">
      <h1 className="inline-block font-black text-4xl lg:text-5xl mb-1 capitalize">
        {title}
      </h1>
      <div className="grid grid-cols-12 gap-3 mt-4">
        <div className="col-span-12 col-start-1 sm:col-span-9 mt-2">
          <hr className="mt-0 mb-4" />
          <div className="flex flex-col gap-6 mb-6">
            {displayPosts.length > 0 ? (
              displayPosts.map((post) => (
                <PostItem
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  basePath="/blog/"
                />
              ))
            ) : (
              <p>Nothing to see here yet</p>
            )}
          </div>
        </div>
        <Card className="col-span-12 row-start-0 sm:col-span-3 sm:col-start-10 sm:row-start-1 hidden sm:block border-none shadow-none">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            {[...sortedTagNames].sort((a, b) => a.localeCompare(b)).map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
