"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUI } from "@/context/ui-context"; // Import useUI
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openLoginModal } = useUI(); // Get openLoginModal function
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <nav className="flex items-center space-x-4 lg:space-x-5">
      <Link href="/" className="mr-1 flex items-center space-x-2">
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
      {/* <Link
        href="/terumin"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/terumin" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Terumin
      </Link> */}
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
      {/* Search bar with search params */}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (search.trim()) {
            router.push(`/search?search=${encodeURIComponent(search)}`); // Use /search for global search
            setSearch("");
          }
        }}
        className="relative hidden sm:block"
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
      <div className="ml-4 hidden sm:block">
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
