import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest } from "next/server";

const nextAuthHandler = NextAuth(authOptions);

const handler = async (req: NextRequest, context: any) => {
  if (context?.params && typeof context.params.then === "function") {
    context = { ...context, params: await context.params };
  }
  return nextAuthHandler(req, context);
};

export { handler as GET, handler as POST };
