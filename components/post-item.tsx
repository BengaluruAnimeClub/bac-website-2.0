import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Tag } from "./tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
  basePath = "/blog/",
}: PostItemProps & { basePath?: string }) {
  // Remove leading "/blog/", "/upcoming-events/", or "/past-events/" from slug if present to avoid double segments in URL
  let normalizedSlug = slug;
  if (basePath === "/blog/" && slug.startsWith("blog/")) {
    normalizedSlug = slug.replace(/^blog\//, "");
  } else if (basePath === "/upcoming-events/" && slug.startsWith("upcoming-events/")) {
    normalizedSlug = slug.replace(/^upcoming-events\//, "");
  } else if (basePath === "/past-events/" && slug.startsWith("past-events/")) {
    normalizedSlug = slug.replace(/^past-events\//, "");
  }
  return (
    <article className="flex flex-col gap-2 border-border border-b pb-0 pt-0">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={basePath + normalizedSlug}>{title}</Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex justify-between items-center pb-3">
        {date && (
          <dl>
            <dt className="sr-only">Published On</dt>
            <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "Asia/Kolkata"
                })
              }</time>
            </dd>
          </dl>
        )}
        <Link
          href={basePath + normalizedSlug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
