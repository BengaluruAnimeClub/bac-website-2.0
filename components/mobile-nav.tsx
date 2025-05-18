"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Search, X } from "lucide-react"; // Added Search and X icons
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUI } from "@/context/ui-context"; // Import useUI hook
import { Input } from "./ui/input"; // Added Input component

export function MobileNav() {
  const [openSheet, setOpenSheet] = useState(false); // Renamed from 'open'
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const { openLoginModal } = useUI();
  const router = useRouter();

  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery.trim())}`); // Use /search for global search
      setSearchQuery("");
      setIsSearchVisible(false);
      if (openSheet) setOpenSheet(false);
    }
  };

  const toggleSearch = () => {
    const newSearchVisibleState = !isSearchVisible;
    setIsSearchVisible(newSearchVisibleState);
    if (newSearchVisibleState && openSheet) {
      setOpenSheet(false); // Close sheet if opening search
    }
  };

  const toggleSheet = (isOpen: boolean) => {
    setOpenSheet(isOpen);
    if (isOpen && isSearchVisible) {
      setIsSearchVisible(false); // Close search if opening sheet
    }
  };

  return (
    // This div wraps the icons and is hidden on sm screens and up
    <div className="sm:hidden flex items-center gap-2 relative">
      {/* Search Icon Button */}
      <Button
        variant="outline"
        className="w-10 px-0"
        onClick={toggleSearch}
        aria-label={isSearchVisible ? "Close search bar" : "Open search bar"}
      >
        {isSearchVisible ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
      </Button>

      {/* Hamburger Menu Button and Sheet */}
      <Sheet open={openSheet} onOpenChange={toggleSheet}>
        <SheetTrigger asChild>
          {/* className="sm:hidden" removed from here, handled by parent div */}
          <Button variant="outline" className="w-10 px-0">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 mt-3">
            <MobileLink className={("text-xl font-bold")} onOpenChange={setOpenSheet} href="/">
              Home
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/about">
              About
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/blog">
              Blog
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/past-events">
              Looking BAC
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/upcoming-events">
              Events
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/art">
              Art
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/gallery">
              Gallery
            </MobileLink>
            {/* <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/terumin">
              Terumin
            </MobileLink> */}
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/game">
              Love Story
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/socials">
              Socials
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/contact-us">
              Contact
            </MobileLink>
            <div className="mt-4">
              {session ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    signOut();
                    setOpenSheet(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    setOpenSheet(false);
                    openLoginModal();
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dropdown Search Bar */}
      {isSearchVisible && (
        <div
          className="absolute top-full mt-2 right-0 w-[90vw] max-w-lg z-50 bg-background shadow-lg p-4 border-b border-border"
          // 'top-full' positions it below the parent div (icons row). 'mt-2' adds a small gap.
          // 'right-0' aligns it to the right of the icon container.
          // 'w-[90vw]' makes it 90% of viewport width.
          // 'max-w-lg' caps the width on larger mobile screens.
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search blog..." // Changed placeholder to match desktop
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
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
