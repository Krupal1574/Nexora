import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest insights, career advice, and industry trends from the Nexora team for tech professionals.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
