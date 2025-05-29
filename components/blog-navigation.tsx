import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogNavigationProps {
  previousPost?: {
    slug: string;
    title: string;
  } | null;
  nextPost?: {
    slug: string;
    title: string;
  } | null;
  basePath?: string;
}

export function BlogNavigation({ previousPost, nextPost, basePath = "/blog" }: BlogNavigationProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-4 my-2 not-prose">
      {/* Newer post (left side) */}
      <div className="flex-1 w-full">
        {nextPost ? (
          <Link 
            href={`${basePath}/${nextPost.slug}`}
            className="group flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Newer</div>
              {/* Show title only on desktop */}
              <div className="font-medium text-sm group-hover:text-foreground hidden sm:block">
                <div className="line-clamp-1">
                  {nextPost.title}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Older post (right side) */}
      <div className="flex-1 w-full">
        {previousPost ? (
          <Link 
            href={`${basePath}/${previousPost.slug}`}
            className="group flex items-center gap-2 justify-end p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Older</div>
              {/* Show title only on desktop */}
              <div className="font-medium text-sm group-hover:text-foreground hidden sm:block">
                <div className="line-clamp-1">
                  {previousPost.title}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
