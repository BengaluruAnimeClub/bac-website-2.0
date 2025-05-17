"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUI } from "@/context/ui-context"; // Import useUI

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openLoginModal } = useUI(); // Get openLoginModal function

  return (
    <nav className="flex items-center space-x-4 lg:space-x-8">
      <Link href="/" className="mr-10 flex items-center space-x-2">
        <Icons.logo className="h-5 w-5" />
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
        Contact Us
      </Link>
      <div className="ml-4">
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="hidden sm:inline">{session.user?.name || "Logout"} (Logout)</span>
            <span className="inline sm:hidden">Logout</span>
          </button>
        ) : (
          <button
            onClick={openLoginModal} // Call openLoginModal onClick
            className="px-3 py-1 rounded bg-primary text-white text-sm font-medium hover:bg-primary/80 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
