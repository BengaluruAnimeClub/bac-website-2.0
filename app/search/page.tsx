import { PostItem } from "@/components/post-item";
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
  type PostWithSection = {
    slug: string;
    slugAsParams: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
    published: boolean;
    body: any;
    _section: string;
  };
  const normalizedBlogs: PostWithSection[] = contentfulBlogs.map((entry: any) => {
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
  const normalizedAnnouncements: PostWithSection[] = contentfulAnnouncements.map((entry: any) => {
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
  const normalizedEventReports: PostWithSection[] = contentfulEventReports.map((entry: any) => {
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
    ...normalizedBlogs,
    ...normalizedAnnouncements,
    ...normalizedEventReports,
    ...virtualPosts
  ];
  // Sort by date descending (newest first)
  let filteredPosts: PostWithSection[] = allPosts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  if (search) {
    const searchWords = search.split(/\s+/).filter(Boolean);
    filteredPosts = filteredPosts.filter((post) => {
      const text = `${post.title} ${post.description} ${(post.tags || []).join(" ")}`.toLowerCase();
      return searchWords.every(word => text.includes(word));
    });
  }

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      {search && (
        <div className="mb-4 text-muted-foreground text-base">
          <h3>Showing results for "{searchParams?.search}"</h3>
        </div>
      )}
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
