import type { NextRequest } from "next/server";
import { handleFormSubmission } from "@/lib/forms";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return handleFormSubmission(request, "contact");
}
