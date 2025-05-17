import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure image is always present in session.user
      if (session.user && token) {
        session.user.image = typeof token.picture === "string" ? token.picture : session.user.image || null;
      }
      return session;
    },
    async jwt({ token, profile }) {
      // Persist the GitHub or Google profile picture in the token
      if (profile && typeof profile === "object") {
        if ("avatar_url" in profile && typeof profile.avatar_url === "string") {
          token.picture = profile.avatar_url;
        } else if ("picture" in profile && typeof profile.picture === "string") {
          token.picture = profile.picture;
        }
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };