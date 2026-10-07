import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { getBlogPostBySlug as getStaticPost, blogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {}
  if (!post) post = getStaticPost(slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Nexora Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });
  } catch {}

  // Fallback to static data
  if (!post) {
    const staticPost = getStaticPost(slug);
    if (!staticPost) notFound();
    post = {
      ...staticPost,
      authorName: staticPost!.author.name,
      authorRole: staticPost!.author.role,
      authorAvatar: staticPost!.author.avatar,
    };
  }

  return (
    <main className="overflow-x-clip pt-8 pb-24">
      {/* Article Header */}
      <div className="container-narrow mb-10">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#F26A21] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center rounded-md border border-[#F26A21]/40 bg-[#07151d] px-2.5 py-1 text-[10px] font-bold text-[#F26A21]">
            {post.category}
          </span>
          <span className="text-[11px] text-[#64748B] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="text-[11px] text-[#64748B] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] leading-tight mb-8"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {post.title}
        </h1>

        <div className="flex items-center justify-between border-t border-b border-[#203548] py-4">
          <div className="flex items-center gap-3">
            <Image
              src={post.authorAvatar || "/images/default-avatar.svg"}
              alt={`${post.authorName || "Author"}'s avatar`}
              width={40}
              height={40}
              className="rounded-full border border-[#F26A21]/20"
              unoptimized
            />
            <div>
              <p className="text-sm font-semibold text-[#171717]">{post.authorName || "Nexora Team"}</p>
              <p className="text-[10px] text-[#64748B]">{post.authorRole || "Content Team"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#203548] flex items-center justify-center text-[#64748B] hover:text-[#F26A21] hover:border-[#F26A21]/40 transition-colors">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container-wide mb-12">
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden relative border border-[#203548]">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow">
        <article className="prose prose-invert prose-headings:font-['Space_Grotesk'] prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#77736D] prose-p:leading-relaxed prose-a:text-[#F26A21] prose-li:text-[#77736D] max-w-none">
          {post.content.split('\n\n').map((paragraph: string, i: number) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.match(/^[0-9]+\. /)) {
              return (
                <div key={i} className="mb-4">
                  {paragraph.split('\n').map((line: string, j: number) => {
                    const parts = line.split('**');
                    return (
                      <p key={j} className="text-[#77736D] mb-2">
                        {parts.map((part: string, k: number) => (k % 2 === 1 ? <strong key={k} className="text-[#171717]">{part}</strong> : part))}
                      </p>
                    );
                  })}
                </div>
              );
            }
            return <p key={i} className="text-[#77736D] mb-4">{paragraph}</p>;
          })}
        </article>
      </div>
    </main>
  );
}
