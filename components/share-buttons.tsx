"use client";
import { useState, useEffect } from "react";
import { FaXTwitter, FaWhatsapp, FaShare } from "react-icons/fa6";

export function ShareButtons({ url, type = "blog" }: { url?: string, type?: "blog" | "event" }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);

  const shareText = type === "event"
    ? `Check out this event by Bengaluru Anime Club (BAC)!\n${shareUrl}`
    : `Check out this blog by Bengaluru Anime Club (BAC)!\n${shareUrl}`;

  return (
    <div className="flex items-center gap-4 ml-4">
      {/* Social Share Icons (react-icons, minimal, blend in both themes) */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="hover:text-primary transition-colors text-inherit"
      >
        <FaXTwitter className="w-5 h-5" />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="hover:text-primary transition-colors text-inherit"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
      <button
        type="button"
        aria-label={type === "event" ? "Copy event URL" : "Copy blog URL"}
        className="hover:text-primary transition-colors text-inherit relative"
        onClick={async () => {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
      >
        <FaShare className="w-5 h-5" />
        <span className="sr-only">Copy URL</span>
        {copied && (
          <span
            className="absolute -left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-green-600 text-white text-sm shadow z-10 whitespace-nowrap animate-fade-in"
            style={{ pointerEvents: 'none' }}
          >
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
