"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Search, Clock, ArrowRight } from "lucide-react";
import { blogPosts as staticBlogPosts, type BlogCategory } from "@/lib/blog";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [posts, setPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          // fallback to static data
          setPosts(staticBlogPosts);
        }
        setLoaded(true);
      })
      .catch(() => {
        setPosts(staticBlogPosts);
        setLoaded(true);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "All" || post.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category, posts]);

  return (
    <main className="overflow-x-hidden pb-24">
      <div className="container-wide">
        {/* Hero */}
        <section className="text-center pt-8 sm:pt-12 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00F2FE]/30 bg-[#00F2FE]/5 px-3 py-1 text-[8px] font-semibold text-[#00F2FE] mb-5">
            <Sparkles className="w-2.5 h-2.5" />
            Insights & Resources
          </div>

          <h1
            className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            The Nexora <span className="text-[#00F2FE]">Blog</span>
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
            Expert advice, industry trends, and practical guides to help you navigate your tech career.
          </p>
        </section>

        {/* Filters & Search */}
        <section className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#1e2b38] pb-6">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-[#00F2FE] text-[#061018]"
                    : "text-[#94A3B8] bg-[#121923] border border-[#203548] hover:border-[#00F2FE]/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101821] border border-[#203548] rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00F2FE]/50 transition-colors"
            />
          </div>
        </section>

        {/* Blog Grid */}
        {!loaded ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8]">Loading articles...</p>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-10 h-10 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">No articles found</h3>
            <p className="text-sm text-[#64748B] mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl bg-[#121923] border border-[#203548] overflow-hidden hover:border-[#00F2FE]/40 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#0a111a]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-md border border-[#00F2FE]/40 bg-[#07151d]/80 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] text-[#64748B] mb-3">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-2 group-hover:text-[#00F2FE] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#203548]">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorAvatar || post.author?.avatar || "https://i.pravatar.cc/150?img=2"}
                        alt={post.authorName || post.author?.name || "Author"}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-[10px] text-[#CBD5E1] font-medium">
                        {post.authorName || post.author?.name || "Nexora Team"}
                      </span>
                    </div>
                    
                    <span className="text-[10px] text-[#00F2FE] font-bold flex items-center gap-1">
                      Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
