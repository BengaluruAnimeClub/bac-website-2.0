import { notFound } from "next/navigation";
import { fetchAuthorBySlug } from "@/lib/contentful-authors";
import { fetchBlogPosts, fetchEventReportPosts, fetchSpotlightPosts } from "@/lib/contentful";
import Image from "next/image";
import Link from "next/link";

interface AuthorPageProps {
  params: { slug: string };
}

// Helper to check if an object is a Contentful Entry with fields
function hasContentfulFields(obj: any): obj is { fields: any } {
  return obj && typeof obj === "object" && "fields" in obj && typeof obj.fields === "object";
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await fetchAuthorBySlug(params.slug);
  if (!author || !author.fields) return notFound();

  // Author fields
  const { name, avatar, bio, socialLinks } = author.fields;

  // Find all posts by this author
  const [blogPosts, eventPosts, spotlightPosts] = await Promise.all([
    fetchBlogPosts(),
    fetchEventReportPosts(),
    fetchSpotlightPosts(),
  ]);
  // Blog posts
  const authoredBlogs = blogPosts.filter((post: any) => {
    const a = post.fields.author;
    if (Array.isArray(a)) return a.some((x: any) => hasContentfulFields(x) && x.fields.slug === params.slug);
    return hasContentfulFields(a) && a.fields.slug === params.slug;
  });
  // Event posts
  const authoredEvents = eventPosts.filter((post: any) => {
    const a = post.fields.author;
    if (Array.isArray(a)) return a.some((x: any) => hasContentfulFields(x) && x.fields.slug === params.slug);
    return hasContentfulFields(a) && a.fields.slug === params.slug;
  });
  // Spotlight posts
  let authoredSpotlights = spotlightPosts.filter((post: any) => {
    const a = post.fields.author;
    return hasContentfulFields(a) && a.fields.slug === params.slug;
  });
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
      // Find the parent blogPost that references this spotlight in its entries
      const parentBlog = blogPosts.find((blog: any) => {
        const entries = blog.fields.entries;
        if (Array.isArray(entries)) {
          return entries.some((entry: any) =>
            entry && typeof entry === 'object' && 'sys' in entry && spotlight && 'sys' in spotlight && entry.sys.id === spotlight.sys.id
          );
        }
        return false;
      });
      let parentDate: Date | null = null;
      let parentSlug: string | undefined = undefined;
      let parentTitle: string = "";
      let hasParent = false;
      if (parentBlog && parentBlog.fields) {
        const dateVal = parentBlog.fields.date;
        const slugVal = parentBlog.fields.slug;
        const titleVal = parentBlog.fields.title;
        if (typeof dateVal === 'string' || typeof dateVal === 'number') parentDate = new Date(dateVal);
        if (typeof slugVal === 'string') parentSlug = slugVal;
        if (typeof titleVal === 'string') parentTitle = titleVal;
        hasParent = !!parentSlug;
      }
      return {
        type: "spotlight",
        date: parentDate,
        title: typeof spotlight.fields.title === 'string' ? spotlight.fields.title : '',
        slug: parentSlug, // always use parent blog's slug
        parentTitle: parentTitle,
        hasParent,
      };
    })
  ].sort((a, b) => {
    // Sort strictly by date descending, regardless of type
    if (a.date && b.date) return b.date.getTime() - a.date.getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

  // Debug: print combinedBlogs to check date values
  console.log('combinedBlogs', combinedBlogs);

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
      <div className="flex flex-col items-center mb-6">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={128}
            height={128}
            className="rounded-full mb-2"
          />
        )}
        <h1 className="text-3xl font-bold mb-1">{displayName}</h1>
        {displayBio && <p className="text-center text-muted-foreground mb-2">{displayBio}</p>}
        {socialLinks && Array.isArray(socialLinks) && socialLinks.length > 0 && (
          <div className="flex gap-3 mt-2">
            {socialLinks.map((link: any, i: number) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                {link.label || link.url}
              </a>
            ))}
          </div>
        )}
      </div>
      <hr className="my-6" />
      <h2 className="text-2xl font-semibold mb-3">Blog Posts</h2>
      {combinedBlogs.length === 0 ? <p>No blog posts found.</p> : (
        <ul className="mb-6">
          {combinedBlogs.map((post, idx) => (
            <li key={post.title + idx} className="mb-2">
              {post.type === "blog" ? (
                <>
                  <Link href={`/blog/${post.slug}`} className="underline">
                    {post.title}
                  </Link>
                  {post.date && (
                    <span className="ml-2 text-xs text-muted-foreground">{post.date.toLocaleDateString()}</span>
                  )}
                </>
              ) : post.hasParent ? (
                <>
                  <Link href={`/blog/${post.slug}`} className="underline">
                    <span className="font-medium">{post.title}</span>
                    {post.parentTitle && (
                      <>
                        <span className="text-muted-foreground"> in </span>
                        <span>{post.parentTitle}</span>
                      </>
                    )}
                  </Link>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {post.date ? post.date.toLocaleDateString() : 'No date'}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-medium">{post.title}</span>
                  {post.date && (
                    <span className="ml-2 text-xs text-muted-foreground">{post.date.toLocaleDateString()}</span>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* Only show Event Reports section if there are any */}
      {authoredEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Event Reports</h2>
          <ul>
            {authoredEvents.map((post: any) => (
              <li key={post.fields.slug} className="mb-2">
                <Link href={`/past-events/${post.fields.slug}`} className="underline">
                  {post.fields.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
