"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle Theme">
      <Sun className={
        "h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all" +
        (isDark ? " dark:-rotate-90 dark:scale-0" : "")
      } />
      <Moon className={
        "absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all" +
        (isDark ? " dark:rotate-0 dark:scale-100" : "")
      } />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
