"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Search, X, ChevronDown } from "lucide-react"; // Added Search, X, and ChevronDown icons
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
  const [galleryOpen, setGalleryOpen] = useState(false); // State for Gallery dropdown
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
              Archives
            </MobileLink>
            <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpenSheet} href="/upcoming-events">
              Upcoming
            </MobileLink>
            {/* Gallery Dropdown */}
            <button
              type="button"
              className={cn(
                "text-xl font-normal flex items-center w-full focus:outline-none",
                galleryOpen && "font-semibold"
              )}
              onClick={() => setGalleryOpen((prev) => !prev)}
              aria-expanded={galleryOpen}
              aria-controls="mobile-gallery-dropdown"
            >
              Gallery
              <ChevronDown
                className={cn(
                  "ml-2 h-5 w-5 transition-transform duration-200",
                  galleryOpen ? "-rotate-180" : "rotate-0"
                )}
                // strokeWidth={1.5}
              />
            </button>
            <div
              id="mobile-gallery-dropdown"
              className={cn(
                "overflow-hidden transition-all duration-300 ml-5 flex flex-col gap-3",
                galleryOpen ? "max-h-32 opacity-100 mt-0 mb-4" : "max-h-0 opacity-0 m-0 gap-0"
              )}
              style={{ pointerEvents: galleryOpen ? "auto" : "none" }}
            >
              <MobileLink className="text-xl pl-2" onOpenChange={setOpenSheet} href="/art">
                Art
              </MobileLink>
              <MobileLink className="text-xl pl-2" onOpenChange={setOpenSheet} href="/gallery">
                Cosplay
              </MobileLink>
            </div>
            <MobileLink className={cn("text-xl font-normal -mt-4")} onOpenChange={setOpenSheet} href="/game">
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
          className="fixed left-0 right-0 top-[100%] mt-2 w-screen max-w-none z-50 bg-background shadow-lg p-4 border-b border-border"
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search blogs & events" // Changed placeholder to match desktop
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
