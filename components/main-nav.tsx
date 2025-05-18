"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUI } from "@/context/ui-context"; // Import useUI
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openLoginModal } = useUI(); // Get openLoginModal function
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Add a handler for search submit (to match MobileNav)
  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (search.trim()) {
      router.push(`/search?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowSearchDropdown(false);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full relative">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-8 w-8" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href="/past-events"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/past-events" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Looking BAC
      </Link>
      <Link
        href="/upcoming-events"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/upcoming-events" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Events
      </Link>
      <Link
        href="/art"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/art" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Art
      </Link>
      <Link
        href="/gallery"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/gallery" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Gallery
      </Link>
      <Link
        href="/game"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/game" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Love Story
      </Link>
      <Link
        href="/socials"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/socials" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Socials
      </Link>
      <Link
        href="/contact-us"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/contact-us" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Contact
      </Link>
      {/* Desktop search bar (hidden below xl) */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative hidden xl:block"
      >
        <Input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search blogs & events"
          className="min-w-[180px]"
        />
      </form>
      {/* Search icon for desktop only, when below xl (not on mobile) */}
      <div className="hidden md:block xl:hidden relative">
        <Button
          variant="outline"
          className="w-10 px-0"
          onClick={() => {
            setShowSearchDropdown(v => !v);
            setTimeout(() => searchInputRef.current?.focus(), 100);
          }}
          aria-label={showSearchDropdown ? "Close search bar" : "Open search bar"}
        >
          {showSearchDropdown ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
        </Button>
        {showSearchDropdown && (
          <div
            className="absolute top-full mt-2 right-0 w-[90vw] max-w-lg z-50 bg-background shadow-lg p-4 border-b border-border"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <Input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search blogs & events"
                className="flex-grow h-10"
                autoFocus
              />
              <Button type="submit" variant="default" size="icon" className="h-10 w-10 flex-shrink-0">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={openLoginModal}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm font-medium hover:bg-primary/80 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
