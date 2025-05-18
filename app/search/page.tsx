import { posts, pastEventsPosts, upcomingEventsPosts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { blogSearchIndex } from "@/components/blog-search-index";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";
import { fetchBlogPosts, fetchAnnouncementPosts, fetchEventReportPosts } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Search | BAC",
  description: "Search within blogs, events, and archives from BAC.",
};

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: {
    search?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const search = searchParams?.search?.toLowerCase() || "";
  // Fetch Contentful posts
  const [contentfulBlogs, contentfulAnnouncements, contentfulEventReports] = await Promise.all([
    fetchBlogPosts(),
    fetchAnnouncementPosts(),
    fetchEventReportPosts(),
  ]);
  // Normalize Contentful posts
  const normalizedBlogs = contentfulBlogs.map((entry: any) => {
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
      _section: "Blog",
    };
  });
  const normalizedAnnouncements = contentfulAnnouncements.map((entry: any) => {
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
      _section: "Events",
    };
  });
  const normalizedEventReports = contentfulEventReports.map((entry: any) => {
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
      _section: "Looking BAC",
    };
  });
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
    },
    {
      slug: "game",
      slugAsParams: "game",
      title: "BAC Love Story (Game)",
      description: "Play BAC Love Story, the Valentine's Day Game!",
      date: "2025-02-14",
      tags: [],
      published: true,
      body: "",
      _section: "Game"
    }
  ];
  const allPosts: PostWithSection[] = [
    ...posts.map((p) => ({ ...p, _section: "Blog" })),
    ...upcomingEventsPosts.map((p) => ({ ...p, _section: "Events" })),
    ...pastEventsPosts.map((p) => ({ ...p, _section: "Looking BAC" })),
    ...normalizedBlogs,
    ...normalizedAnnouncements,
    ...normalizedEventReports,
    ...virtualPosts
  ];
  let filteredPosts = sortPosts(allPosts.filter((post) => post.published)) as typeof allPosts;

  // Deduplicate by slugAsParams (Contentful and local may overlap)
  const seen = new Set();
  filteredPosts = filteredPosts.filter((post) => {
    if (seen.has(post.slugAsParams)) return false;
    seen.add(post.slugAsParams);
    return true;
  });

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
    filteredPosts = filteredPosts.filter((post) => {
      // For local posts, use the static index
      if (!post.body && (post._section === "Blog" || post._section === "Looking BAC" || post._section === "Events")) {
        return matchingSlugs.includes(post.slugAsParams) || matchingSlugs.includes(post.slug);
      }
      // For Contentful posts, match title/description/tags
      const text = `${post.title} ${post.description} ${(post.tags || []).join(" ")}`.toLowerCase();
      return searchWords.every(word => text.includes(word));
    });
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
                basePath={
                  post._section === "Events" ? "/upcoming-events/" :
                  post._section === "Looking BAC" ? "/past-events/" :
                  post._section === "Blog" ? "/blog/" :
                  post._section === "Game" ? "/game/" :
                  post._section === "Info" ? "/" :
                  "/blog/"
                }
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
