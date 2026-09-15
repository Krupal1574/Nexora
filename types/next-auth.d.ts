import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      jobTitle?: string;
      company?: string;
      phone?: string;
      headline?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    jobTitle?: string;
    company?: string;
    phone?: string;
    headline?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    jobTitle?: string;
    company?: string;
    phone?: string;
    headline?: string;
  }
}
