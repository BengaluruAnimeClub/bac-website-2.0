import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Add more providers here
  ],
  // Add more NextAuth config here if needed
});

export { handler as GET, handler as POST };