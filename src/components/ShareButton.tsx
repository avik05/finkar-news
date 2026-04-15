"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Finkar News: ${title}`,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipbard error:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-full hover:bg-zinc-800 text-muted hover:text-accent transition-colors border border-transparent hover:border-zinc-700 active:scale-95"
      title="Share article"
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}
