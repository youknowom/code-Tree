import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        const existing = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email));

        if (existing.length === 0) {
          await db.insert(usersTable).values({
            name: user.name || "Learner",
            email: user.email,
            points: 0,
          });
        }
      } catch (e) {
        console.error("Error ensuring user exists in db on sign-in:", e);
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
