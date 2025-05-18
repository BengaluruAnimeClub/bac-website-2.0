import { posts, pastEventsPosts, upcomingEventsPosts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { blogSearchIndex } from "@/components/blog-search-index";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | BAC",
  description: "Search within blogs, events, and archives from BAC.",
};

interface SearchPageProps {
  searchParams: {
    search?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const search = searchParams?.search?.toLowerCase() || "";
  // Explicitly type posts with _section
  type PostWithSection = (typeof posts[number] & { _section: string });
  // Add virtual posts for Socials and Contact
  const virtualPosts: PostWithSection[] = [
    {
      slug: "socials",
      slugAsParams: "socials",
      title: "Join BAC",
      description: "Instagram, WhatsApp, Discord, Twitter, Facebook, YouTube, Bluesky, Telegram, and more",
      date: "2025-01-01",
      tags: [],
      published: true,
      body: "",
      _section: "Info"
    },
    {
      slug: "contact-us",
      slugAsParams: "contact-us",
      title: "Contact BAC",
      description: "Support, email, feedback, help, collaborations, events, general inquiries",
      date: "2025-01-01",
      tags: [],
      published: true,
      body: "",
      _section: "Info"
    }
  ];
  const allPosts: PostWithSection[] = [
    ...posts.map((p) => ({ ...p, _section: "Blog" })),
    ...upcomingEventsPosts.map((p) => ({ ...p, _section: "Events" })),
    ...pastEventsPosts.map((p) => ({ ...p, _section: "Looking BAC" })),
    ...virtualPosts
  ];
  let filteredPosts = sortPosts(allPosts.filter((post) => post.published)) as typeof allPosts;

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
    filteredPosts = filteredPosts.filter((post) =>
      matchingSlugs.includes(post.slugAsParams) || matchingSlugs.includes(post.slug)
    );
  }

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      {/* <h1 className="font-black text-4xl lg:text-5xl mb-4">Search Results</h1> */}
      {search && (
        <div className="mb-4 text-muted-foreground text-base">
          <h3>Showing results for "{searchParams?.search}"</h3>
        </div>
      )}
      {/* <hr className="my-0 mt-2 border-t mb-4" /> */}
      {filteredPosts.length > 0 ? (
        <ul className="flex flex-col" >
          {filteredPosts.map((post) => (
            <li key={post.slug} className="mb-4">
              <div className="text-xs text-muted-foreground mb-1">{post._section}</div>
              <PostItem
                slug={post.slug}
                date={post.date}
                title={post.title}
                description={post.description}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
