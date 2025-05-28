"use client";
import { useState, useEffect } from "react";
import { FaXTwitter, FaFacebookF, FaShare } from "react-icons/fa6";

export function ShareButtons({ url }: { url?: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);

  return (
    <div className="flex items-center gap-3 ml-4">
      {/* Social Share Icons (react-icons, minimal, blend in both themes) */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Check out this blog by Bengaluru Anime Club (BAC) : ${shareUrl}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="hover:text-primary transition-colors text-inherit"
      >
        <FaXTwitter className="w-5 h-5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="hover:text-primary transition-colors text-inherit"
      >
        <FaFacebookF className="w-5 h-5" />
      </a>
      <button
        type="button"
        aria-label="Copy blog URL"
        className="hover:text-primary transition-colors text-inherit"
        onClick={async () => {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
      >
        <FaShare className="w-5 h-5" />
        <span className="sr-only">Copy URL</span>
        {copied && <span className="ml-2 text-xs text-green-600">Copied!</span>}
      </button>
    </div>
  );
}
