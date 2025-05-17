import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import LoginModal from "@/components/login-modal"; // Import LoginModal

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  keywords: ['Bengaluru Anime Club', 'Bangalore Anime Club', 'BAC', 'Bengaluru', 'Bangalore', 'Anime', 'Manga', 'Light Novel', 'Cosplay', 'Club', 'bac moe', 'bac.moe', 'bac website', 'bac whatsapp', 'bac community', 'bac events', 'bac screening'],
  authors: [{name: 'Aravind', url: 'https://aravindg.com/'}, {name: 'Viraj', url: 'https://virajsazzala.dev/'}],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.preview_image,
      },
    ],
    type: 'website',
  },
  icons: {
    icon: siteConfig.icon_path,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.twitter_handle,
    creator: siteConfig.twitter_handle,
    images: [siteConfig.preview_image], 
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <GoogleAnalytics gaId="G-L2DW4HE25G" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <LoginModal /> {/* Add LoginModal here */}
          </div>
        </Providers>
      </body>
    </html>
  );
}

