import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts, upcomingEventsPosts } from "#site/content";
import { pastEventsPosts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import { fetchBlogPosts, fetchAnnouncementPosts, fetchEventReportPosts } from "@/lib/contentful";

export default async function Home() {
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
      body: fields.content ?? "",
      _type: "blog",
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
      body: fields.content ?? "",
      _type: "upcoming-event",
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
      body: fields.content ?? "",
      _type: "past-event",
    };
  });

  // Merge all posts for latestPosts (blogs, announcements, event reports, both local and Contentful)
  const allBlogPosts = posts.map((p) => ({ ...p, _type: "blog" })).concat(normalizedBlogs);
  const allPastEventsPosts = pastEventsPosts.map((p) => ({ ...p, _type: "past-event" })).concat(normalizedEventReports);
  const allUpcomingEventsPosts = upcomingEventsPosts.map((p) => ({ ...p, _type: "upcoming-event" })).concat(normalizedAnnouncements);
  // For latestPosts, include only blogs and past events (exclude upcoming events)
  const allLatestPosts = [
    ...allBlogPosts,
    ...allPastEventsPosts,
  ];
  const latestPosts = sortPosts(allLatestPosts.filter((p) => p.published)).slice(0, 5);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-10">

        <div style= {{'display': 'flex', 'justifyContent': 'center'}}>
          <img src="/images/logo-full-2.svg" alt="BAC Logo" className="w-3/4 md:w-1/2 lg:w-1/2 block dark:hidden"/>
          <img src="/images/logo-light-full.svg" alt="BAC Logo" className="w-3/4 md:w-1/2 lg:w-1/2 hidden dark:block"/>
        </div>

        <div className="container flex flex-col gap-4 text-center">
          
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            <span style={{ color: '#ea4167' }}>Nyamaskara!</span> Welcome to the anime and manga headquarters of Nyamma Bengaluru. Looking for events, contests, cosplay, fanart, recommendations, or just a space for discourse and connecting with fellow fans? <span style={{ color: '#ea4167' }}>We&#39;ve got you covered.</span>
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row max-sm:hidden">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Blog
            </Link>
            <Link
              href={siteConfig.links.linktree}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Join BAC
            </Link>
            <Link
              href="/game"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit") + " !text-white hover:!text-white focus:!text-white active:!text-white"}
            >
              Love Story
            </Link>
          </div>
        </div>

        <div className="container flex flex-col gap-4 text-center sm:hidden">
          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Blog
            </Link>
            <Link
              href={siteConfig.links.linktree}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Join BAC
            </Link>
          </div>

          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/game"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit") + " !text-white hover:!text-white focus:!text-white active:!text-white"}
            >
              Love Story
            </Link>
          </div>
        </div>
      </section>

      {allUpcomingEventsPosts.some((post) => post.published && post.date >= today) && (
        <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-0">
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-center -mb-4">
            Upcoming
          </h2>
          <ul className="flex flex-col">
            {allUpcomingEventsPosts.map((post) => (
              post.published && 
              post.date >= today && (
                <li key={post.slug} className="first:border-t first:pt-3 mt-3">
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    basePath="/upcoming-events/"
                  />
                </li>
              )
            ))}
          </ul>
        </section>
      )}

      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-0">
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-center -mb-4">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => {
            let basePath = "/blog/";
            // Use _type if present, else infer from slug
            const type = (post as any)._type;
            if (type === "upcoming-event" || post.slug.includes("upcoming-events")) {
              basePath = "/upcoming-events/";
            } else if (type === "past-event" || post.slug.includes("past-events")) {
              basePath = "/past-events/";
            }
            return (
              post.published && (
                <li key={post.slugAsParams} className="first:border-t first:pt-3 mt-3">
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                    basePath={basePath}
                  />
                </li>
              )
            );
          })}
        </ul>
      </section>
    </>
  );
}
