import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts, upcomingEventsPosts } from "#site/content";
import { pastEventsPosts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const latestBlogPosts = sortPosts(posts).slice(0, 3);
  const latestPastEventsPosts = sortPosts(pastEventsPosts).slice(0, 3);
  const latestUpcomingEventsPosts = sortPosts(upcomingEventsPosts).slice(0, 4).reverse();
  const latestPosts = sortPosts(posts.concat(pastEventsPosts)).slice(0, 5);
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
              href="/upcoming-events"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Events
            </Link>
            <Link
              href={siteConfig.links.linktree}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Join BAC
            </Link>
            <Link
                href="/game"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
              >
              Love Story (Game)
            </Link>
          </div>
        </div>

        <div className="container flex flex-col gap-4 text-center sm:hidden">
          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/upcoming-events"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-fit")}
            >
              Events
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
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
              >
              Love Story (Game)
            </Link>
          </div>
        </div>
      </section>

      {latestUpcomingEventsPosts.some((post) => post.published && post.date >= today) && (
        <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-0">
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-center">
            Upcoming Events
          </h2>
          <ul className="flex flex-col">
            {latestUpcomingEventsPosts.map((post) => (
              post.published && 
              post.date >= today && (
                <li key={post.slug} className="first:border-t first:border-border">
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                  />
                </li>
              )
            ))}
          </ul>
        </section>
      )}

      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-0">
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            post.published && (
              <li key={post.slug} className="first:border-t first:border-border">
                <PostItem
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                />
              </li>
            )
          ))}
        </ul>
      </section>
    </>
  );
}
