import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  BookOpen,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getBlogPostBySlug as getStaticPost,
  blogPosts,
} from "@/lib/blog";

import ShareArticleButton from "@/components/blog/ShareArticleButton";
import ArticleContent, {
  extractHeadings,
} from "@/components/blog/ArticleContent";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedArticles from "@/components/blog/RelatedArticles";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.nexorastaffingllp.com";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ArticlePost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
};

async function getPublishedPost(
  slug: string
): Promise<ArticlePost | null> {
  try {
    const db = prisma as unknown as {
      blogPost?: {
        findFirst: (args: unknown) => Promise<Record<string, unknown> | null>;
      };
    };

    if (db.blogPost?.findFirst) {
      const databasePost = await db.blogPost.findFirst({
        where: {
          slug,
          published: true,
        },
      });

      if (databasePost) {
        const rawDate = databasePost.date;
        const formattedDate =
          typeof rawDate === "string"
            ? rawDate
            : rawDate instanceof Date
            ? rawDate.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
            : String(rawDate || "");

        return {
          slug: String(databasePost.slug || slug),
          title: String(databasePost.title || ""),
          excerpt: String(databasePost.excerpt || ""),
          content: String(databasePost.content || ""),
          image: String(databasePost.image || "/images/blog/career-tips.svg"),
          category: String(databasePost.category || "Career Tips"),
          date: formattedDate,
          readTime: String(databasePost.readTime || "5 min read"),
          authorName: String(databasePost.authorName || "Nexora Team"),
          authorRole: String(databasePost.authorRole || "Content Team"),
          authorAvatar: String(
            databasePost.authorAvatar || "/images/default-avatar.svg"
          ),
        };
      }
    }
  } catch (error) {
    console.error("Unable to load blog post from database:", error);
  }

  const staticPost = getStaticPost(slug);

  if (!staticPost) {
    return null;
  }

  return {
    slug: staticPost.slug,
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    content: staticPost.content,
    image: staticPost.image,
    category: staticPost.category,
    date: staticPost.date,
    readTime: staticPost.readTime,
    authorName: staticPost.author.name,
    authorRole: staticPost.author.role,
    authorAvatar:
      staticPost.author.avatar || "/images/default-avatar.svg",
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  if (!isAdmin) {
    return {
      title: "Article Not Found | Nexora",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Nexora",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | Nexora Insights`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: "Nexora Staffing LLP",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps) {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  if (!isAdmin) {
    notFound();
  }

  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  const relatedPosts = blogPosts.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    image: item.image,
    category: item.category,
    date: item.date,
  }));

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Nexora Staffing LLP",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <main className="overflow-x-clip bg-white text-[#171717]">
      {/* Admin preview notice */}
      <div className="bg-[#171717] text-[#F5F1E8] px-4 py-2.5 text-xs text-center border-b border-[#F26A21]/30 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#F26A21] animate-pulse" />
        <span className="font-semibold text-[#F26A21]">Admin Preview Mode:</span>
        <span>Nexora articles are currently disabled for public and regular users. Only administrators can view this page.</span>
      </div>

      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Editorial hero */}
      <section className="bg-[#F5F1E8] px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12 lg:pb-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="
              mb-10 inline-flex items-center gap-2
              text-sm font-medium text-[#77736D]
              transition-colors hover:text-[#F26A21]
              sm:mb-14
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to insights
          </Link>

          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-[#F26A21]/20 bg-white/70
                  px-4 py-2 text-[10px] font-bold uppercase
                  tracking-[0.17em] text-[#C94F12]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#F26A21]" />
                {post.category}
              </span>

              <span className="text-xs text-[#77736D]">
                Nexora Insights
              </span>
            </div>

            <h1
              className="
                mb-7 font-['Space_Grotesk',sans-serif]
                text-4xl font-bold leading-[1.08]
                tracking-[-0.045em] text-[#171717]
                sm:text-5xl md:text-6xl
                lg:text-[68px]
              "
            >
              {post.title}
            </h1>

            <p
              className="
                max-w-3xl text-base leading-8 text-[#77736D]
                sm:text-lg sm:leading-9
              "
            >
              {post.excerpt}
            </p>

            {/* Author and article actions */}
            <div
              className="
                mt-9 flex flex-col gap-5 border-t
                border-black/10 pt-6
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    relative h-12 w-12 shrink-0 overflow-hidden
                    rounded-full border border-black/[0.07]
                    bg-white
                  "
                >
                  <Image
                    src={post.authorAvatar}
                    alt={`${post.authorName}'s avatar`}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#171717]">
                    {post.authorName}
                  </p>

                  <p className="mt-1 text-xs text-[#77736D]">
                    {post.authorRole}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="inline-flex items-center gap-2 text-xs text-[#77736D]">
                  <CalendarDays className="h-4 w-4 text-[#F26A21]" />
                  <time>{post.date}</time>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-[#77736D]">
                  <Clock3 className="h-4 w-4 text-[#F26A21]" />
                  {post.readTime}
                </div>

                <ShareArticleButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <section className="px-5 pt-8 sm:px-8 sm:pt-12 lg:pt-16">
        <div
          className="
            relative mx-auto aspect-[16/9] max-w-6xl
            overflow-hidden rounded-2xl
            border border-black/[0.06] bg-[#E9E2D6]
            sm:rounded-3xl
          "
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              1200px
            "
            className="object-cover"
            unoptimized
          />

          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t from-black/15 via-transparent to-transparent
            "
          />
        </div>
      </section>

      {/* Article body */}
      <section className="px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:pb-24">
        <div
          className="
            mx-auto grid max-w-6xl grid-cols-1
            gap-10 lg:grid-cols-[240px_minmax(0,720px)]
            lg:justify-center lg:gap-16
          "
        >
          {/* Sidebar */}
          <aside className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <TableOfContents headings={headings} />

              <div
                className="
                  mt-5 hidden rounded-2xl
                  bg-[#171717] p-6 text-white lg:block
                "
              >
                <p
                  className="
                    mb-3 text-[10px] font-bold uppercase
                    tracking-[0.18em] text-[#F6C2A5]
                  "
                >
                  People · Trust · Growth
                </p>

                <h3
                  className="
                    mb-3 font-['Space_Grotesk',sans-serif]
                    text-xl font-bold leading-tight
                  "
                >
                  Your next step starts with the right insight.
                </h3>

                <p className="mb-5 text-sm leading-6 text-white/65">
                  Explore opportunities and resources to help
                  you move forward.
                </p>

                <Link
                  href="/contact"
                  className="
                    inline-flex items-center gap-2
                    text-sm font-semibold text-[#F6C2A5]
                    transition-colors hover:text-white
                  "
                >
                  Talk to Nexora
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="order-1 min-w-0 lg:order-2">
            <div
              className="
                mb-8 flex items-center gap-2
                text-[11px] font-bold uppercase
                tracking-[0.16em] text-[#77736D]
              "
            >
              <BookOpen className="h-4 w-4 text-[#F26A21]" />
              Article
            </div>

            <ArticleContent content={post.content} />

            {/* End of article */}
            <div
              className="
                mt-14 rounded-2xl border border-[#F26A21]/15
                bg-[#F5F1E8] p-6 sm:p-8
              "
            >
              <p
                className="
                  mb-3 text-[10px] font-bold uppercase
                  tracking-[0.18em] text-[#C94F12]
                "
              >
                Continue your journey
              </p>

              <h2
                className="
                  mb-3 font-['Space_Grotesk',sans-serif]
                  text-2xl font-bold leading-tight text-[#171717]
                  sm:text-3xl
                "
              >
                Have a question about your next step?
              </h2>

              <p className="mb-6 max-w-xl text-sm leading-7 text-[#77736D]">
                Connect with the Nexora team to discuss your
                goals, explore our services, and find the right
                way forward.
              </p>

              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full bg-[#F26A21] px-6 py-3.5
                  text-sm font-semibold text-white
                  shadow-lg shadow-[#F26A21]/15
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#D95714]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#F26A21]
                  focus-visible:ring-offset-2
                "
              >
                Talk to Nexora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <RelatedArticles
        posts={relatedPosts}
        currentSlug={post.slug}
        currentCategory={post.category}
      />
    </main>
  );
}
