"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { UIProvider } from "@/context/ui-context"; // Import UIProvider

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UIProvider>{/* Wrap with UIProvider */}
          {children}
        </UIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
