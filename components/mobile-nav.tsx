"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-4 mt-3">
          <MobileLink className={("text-xl font-bold")} onOpenChange={setOpen} href="/">
            Home
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/blog">
            Blog
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/past-events">
            Looking BAC
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/upcoming-events">
            Events
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/art">
            Art
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/gallery">
            Gallery
          </MobileLink>
          {/* <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/terumin">
            Terumin
          </MobileLink> */}
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/game">
            Love Story
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/socials">
            Socials
          </MobileLink>
          <MobileLink className={cn("text-xl font-normal")} onOpenChange={setOpen} href="/contact-us">
            Contact Us
          </MobileLink>
          <div className="mt-4">
            {session ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
              >
                Logout ({session.user?.name})
              </Button>
            ) : (
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  window.location.href = '/login';
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
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
