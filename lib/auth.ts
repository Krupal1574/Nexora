import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { candidateProfile: { select: { headline: true } } },
        });

        if (!user || !user.password) return null;

        const isValid = await argon2.verify(user.password, credentials.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone || undefined,
          headline: user.candidateProfile?.headline || undefined,
          image: user.image || undefined,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.jobTitle !== undefined) token.jobTitle = session.jobTitle;
        if (session.company !== undefined) token.company = session.company;
        if (session.phone !== undefined) token.phone = session.phone;
        if (session.headline !== undefined) token.headline = session.headline;
        if (session.image !== undefined) token.picture = session.image;
      }
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.jobTitle = (user as any).jobTitle;
        token.company = (user as any).company;
        token.phone = (user as any).phone;
        token.headline = (user as any).headline; // from authorize
        token.picture = user.image || token.picture; // Keep existing if set
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).jobTitle = token.jobTitle;
        (session.user as any).company = token.company;
        (session.user as any).phone = token.phone;
        (session.user as any).headline = token.headline;
        if (token.picture) session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
