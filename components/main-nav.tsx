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

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openLoginModal } = useUI(); // Get openLoginModal function
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        onSubmit={e => {
          e.preventDefault();
          if (search.trim()) {
            router.push(`/search?search=${encodeURIComponent(search)}`);
            setSearch("");
            setShowSearchDropdown(false);
          }
        }}
        className="relative hidden xl:block"
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search blogs & events"
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          style={{ minWidth: 180 }}
        />
      </form>
      {/* Search icon for desktop only, when below xl (not on mobile) */}
      <div className="hidden md:block xl:hidden relative">
        <button
          type="button"
          aria-label="Open search"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => {
            setShowSearchDropdown(v => !v);
            setTimeout(() => searchInputRef.current?.focus(), 100);
          }}
        >
          {/* Inline SVG for search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-700 dark:text-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </button>
        {showSearchDropdown && (
          <div className="absolute right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-2 w-64">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (search.trim()) {
                  router.push(`/search?search=${encodeURIComponent(search)}`);
                  setSearch("");
                  setShowSearchDropdown(false);
                }
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search blogs & events"
                className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-900"
                style={{ minWidth: 180 }}
              />
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
