import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "BAC Love Story (Game)",
  description: "A text-based RPG created with ❤️ by members of the Bengaluru Anime Club (BAC), on the occasion of Valentine's Day 2025. Play through a romantic adventure with multiple endings, featuring original artwork and story paths.",
};

const GameClient = dynamic(() => import("./GameClient"), { ssr: false });

export default function GamePage() {
  return <GameClient />;
}
