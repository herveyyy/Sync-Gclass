import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLASSROOM_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLASSROOM_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/classroom.coursework.me",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) return true;

      const googleId = profile.sub!;
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.googleId, googleId))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(users).values({
          googleId,
          email: user.email!,
          image: user.image || null,
          isOnboarded: false,
        });
      } else {
        await db
          .update(users)
          .set({ image: user.image || null, updatedAt: new Date() })
          .where(eq(users.googleId, googleId));
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account) {
        token.access_token = account.access_token;
      }
      if (profile) {
        token.google_id = profile.sub;
      }

      if (token.google_id) {
        const dbUser = await db
          .select({
            id: users.id,
            isOnboarded: users.isOnboarded,
            firstName: users.firstName,
          })
          .from(users)
          .where(eq(users.googleId, token.google_id as string))
          .limit(1);

        if (dbUser.length > 0) {
          token.db_user_id = dbUser[0].id;
          token.is_onboarded = dbUser[0].isOnboarded;
        }
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).access_token = token.access_token;
      (session as any).db_user_id = token.db_user_id;
      (session as any).is_onboarded = token.is_onboarded;
      (session as any).google_id = token.google_id;
      return session;
    },
  },
});
