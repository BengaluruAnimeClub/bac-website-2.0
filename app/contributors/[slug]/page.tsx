import { notFound } from "next/navigation";
import { getAuthorWithPosts } from "@/lib/contentful-api";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaGlobe } from "react-icons/fa";
import { SiMyanimelist, SiAnilist } from "react-icons/si";
import { PiXLogoBold } from "react-icons/pi";
import { Metadata } from 'next';

interface AuthorPageProps {
  params: { slug: string };
}

// Helper to check if an object is a Contentful Entry with fields
function hasContentfulFields(obj: any): obj is { fields: any } {
  return obj && typeof obj === "object" && "fields" in obj && typeof obj.fields === "object";
}

// Add dynamic metadata for browser tab title
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = await getAuthorWithPosts(params.slug);
  if (!result || !result.author || !result.author.fields || typeof result.author.fields.name !== 'string') {
    return { title: 'Contributor' };
  }
  const name = result.author.fields.name;
  const bio = typeof result.author.fields.bio === 'string' ? result.author.fields.bio : '';
  // Only use bio for description
  let description = bio && bio.length > 0 ? bio : undefined;
  return {
    title: name,
    description,
  };
}

// Helper to format date in IST (Indian Standard Time)
function formatDateIST(date: Date | null): string {
  if (!date) return '';
  // Convert to IST by adding 5 hours 30 minutes (19800000 ms)
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffsetMs);
  const day = istDate.getUTCDate().toString().padStart(2, '0');
  const month = (istDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = istDate.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const result = await getAuthorWithPosts(params.slug);
  if (!result || !result.author || !result.author.fields) return notFound();

  const { author, blogPosts, eventPosts, spotlightPosts, allBlogPosts } = result;

  // Author fields
  const { name, avatar, bio, socialLinks } = author.fields;

  // Use cached blog posts data instead of making another API call
  // const allBlogPosts = await fetchBlogPosts(); // REMOVED - now using cached data

  // Filter posts by this author (already optimized from Contentful query)
  const authoredBlogs = blogPosts;
  const authoredEvents = eventPosts;
  let authoredSpotlights = spotlightPosts;
  // Sort by parent blog date descending (if available)
  authoredSpotlights = authoredSpotlights.sort((a: any, b: any) => {
    const aParent = a.fields.parentBlog;
    const bParent = b.fields.parentBlog;
    const aDate = (hasContentfulFields(aParent) && aParent.fields.date) ? new Date(aParent.fields.date) : null;
    const bDate = (hasContentfulFields(bParent) && bParent.fields.date) ? new Date(bParent.fields.date) : null;
    if (aDate && bDate) return bDate.getTime() - aDate.getTime();
    if (aDate) return -1;
    if (bDate) return 1;
    return 0;
  });

  // Combine blogs and spotlights for unified display
  const combinedBlogs = [
    ...authoredBlogs.map((post: any) => ({
      type: "blog",
      date: post.fields.date ? new Date(post.fields.date) : null,
      title: post.fields.title,
      slug: post.fields.slug,
      parentTitle: "",
      hasParent: false,
    })),
    ...authoredSpotlights.map((spotlight: any) => {
      // Use spotlight's own date field if available
      let spotlightDate: Date | null = null;
      if (spotlight.fields && spotlight.fields.date) {
        spotlightDate = new Date(spotlight.fields.date);
      }
      // Find the parent blogPost that references this spotlight in its entries
      const parentBlog = allBlogPosts.find((blog: any) => {
        const entries = blog.fields.entries;
        if (Array.isArray(entries)) {
          return entries.some((entry: any) =>
            entry && typeof entry === 'object' && 'sys' in entry && spotlight && 'sys' in spotlight && entry.sys.id === spotlight.sys.id
          );
        }
        return false;
      });
      let parentSlug: string | undefined = undefined;
      let parentTitle: string = "";
      let hasParent = false;
      if (parentBlog && parentBlog.fields) {
        const slugVal = parentBlog.fields.slug;
        const titleVal = parentBlog.fields.title;
        if (typeof slugVal === 'string') parentSlug = slugVal;
        if (typeof titleVal === 'string') parentTitle = titleVal;
        hasParent = !!parentSlug;
      }
      return {
        type: "spotlight",
        date: spotlightDate, // use spotlight's own date
        title: typeof spotlight.fields.title === 'string' ? spotlight.fields.title : '',
        slug: parentSlug, // always use parent blog's slug
        parentTitle: parentTitle,
        hasParent,
      };
    }).filter((spotlight) => spotlight.hasParent) // Only include spotlights with valid parent blogs
  ].sort((a, b) => {
    // Sort strictly by date descending, regardless of type
    if (a.date && b.date) return b.date.getTime() - a.date.getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

  // Type guards for avatar, name, bio
  let avatarUrl: string | null = null;
  if (
    avatar &&
    typeof avatar === 'object' &&
    'fields' in avatar &&
    avatar.fields &&
    typeof avatar.fields === 'object' &&
    'file' in avatar.fields &&
    avatar.fields.file &&
    typeof avatar.fields.file === 'object' &&
    'url' in avatar.fields.file &&
    typeof avatar.fields.file.url === 'string'
  ) {
    avatarUrl = avatar.fields.file.url.startsWith('http')
      ? avatar.fields.file.url
      : `https:${avatar.fields.file.url}`;
  }
  const displayName = typeof name === 'string' ? name : '';
  const displayBio = typeof bio === 'string' ? bio : '';

  return (
    <div className="container max-w-2xl py-8 px-4 mx-auto">
      <div className="flex flex-col items-center mb-4">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={128}
            height={128}
            className="rounded-full mb-2"
            style={{ objectFit: 'cover', width: 128, height: 128 }}
          />
        )}
        <h1 className="text-3xl font-bold mb-0">{displayName}</h1>
        
        {/* Social Links Section */}
        {socialLinks && typeof socialLinks === 'object' && !Array.isArray(socialLinks) && (() => {
          const links = socialLinks as { [key: string]: string };
          return (
            <div className="flex gap-4 mt-2 mb-1">
              {links['MyAnimeList'] && (
                <a href={links['MyAnimeList']} target="_blank" rel="noopener noreferrer" title="MyAnimeList" className="text-xl flex items-center text-[#ea4167] dark:text-[#ea4167]">
                  <span style={{ fontSize: '2.2rem', marginTop: '-4px', display: 'inline-flex', alignItems: 'center' }}>
                    <SiMyanimelist />
                  </span>
                </a>
              )}
              {links['Anilist'] && (
                <a href={links['Anilist']} target="_blank" rel="noopener noreferrer" title="Anilist" className="text-2xl text-[#ea4167] dark:text-[#ea4167]">
                  <SiAnilist />
                </a>
              )}
              {links['Twitter'] && (
                <a href={links['Twitter']} target="_blank" rel="noopener noreferrer" title="Twitter" className="text-2xl text-[#ea4167] dark:text-[#ea4167]">
                  <PiXLogoBold />
                </a>
              )}
              {links['Instagram'] && (
                <a href={links['Instagram']} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-2xl text-[#ea4167] dark:text-[#ea4167]">
                  <FaInstagram />
                </a>
              )}
              {links['Website'] && (
                <a href={links['Website']} target="_blank" rel="noopener noreferrer" title="Website" className="text-2xl text-[#ea4167] dark:text-[#ea4167]">
                  <FaGlobe />
                </a>
              )}
            </div>
          );
        })()}

        {displayBio && 
          <div className="flex flex-col items-center w-full">
            <div className="inline-block bg-white dark:bg-zinc-900 rounded-xl p-1" style={{ border: 'none' }}>
              <p className="text-justify text-muted-foreground">{displayBio}</p>
            </div>
          </div>
        }
      </div>
      {/* <hr className="mb-2 mt-2" /> */}
      <div className="flex flex-col items-center w-full">
        <div className="inline-block bg-white dark:bg-zinc-900 rounded-xl p-2" style={{ border: 'none' }}>
          <h2 className="text-2xl font-semibold mb-3 text-center">Blog Posts</h2>
          {combinedBlogs.length === 0 ? <p className="text-center">No blog posts found.</p> : (
            <ul className="mb-6 text-left">
              {combinedBlogs.map((post, idx) => (
                <li key={post.title + idx} className="mb-2">
                  {post.type === "blog" ? (
                    <>
                      <Link href={`/blog/${post.slug}`} className="underline transition-colors duration-100 hover:text-[#ea4167] focus:text-[#ea4167] active:text-[#ea4167]">
                        <span className="font-medium">{post.title}</span>
                      </Link>
                      {post.date && (
                        <span className="ml-2 text-xs text-muted-foreground">{
                          formatDateIST(post.date)
                        }</span>
                      )}
                    </>
                  ) : post.hasParent ? (
                    <>
                      <Link href={`/blog/${post.slug}`} className="underline transition-colors duration-100 hover:text-[#ea4167] focus:text-[#ea4167] active:text-[#ea4167]">
                        <span className="font-medium">{post.title}</span>
                      </Link>
                      {post.parentTitle && (
                        <>
                          <span className="text-muted-foreground"> in </span>
                          <span>{post.parentTitle}</span>
                        </>
                      )}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {formatDateIST(post.date) || 'No date'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">{post.title}</span>
                      {post.date && (
                        <span className="ml-2 text-xs text-muted-foreground">{
                          formatDateIST(post.date)
                        }</span>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Only show Event Reports section if there are any */}
      {authoredEvents.length > 0 && (
        <div className="flex flex-col items-center w-full mt-8">
          <div className="inline-block bg-white dark:bg-zinc-900 rounded-xl p-6" style={{ border: 'none' }}>
            <h2 className="text-2xl font-semibold mb-3 text-center">Event Reports</h2>
            <ul className="text-left">
              {authoredEvents.map((post: any) => (
                <li key={post.fields.slug} className="mb-2">
                  <Link href={`/past-events/${post.fields.slug}`} className="underline transition-colors duration-100 hover:text-[#ea4167] focus:text-[#ea4167] active:text-[#ea4167]">
                    {post.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="mt-1">
        <center>
          For a list of all contributors to the site, check out <Link href="/contributors" className="underline transition-colors duration-100 hover:text-[#ea4167] focus:text-[#ea4167] active:text-[#ea4167]">this page</Link>.
        </center>
      </div>
    </div>
  );
}
