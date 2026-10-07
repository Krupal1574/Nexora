"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/motion/PageHero";
import { Sparkles, Search, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { blogPosts as staticBlogPosts, type BlogCategory } from "@/lib/blog";

type Tab = "Nexora" | "Industry";

export default function BlogIndexPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Nexora");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Nexora Posts
  const [internalCategory, setInternalCategory] = useState<string>("All");
  const [internalPosts, setInternalPosts] = useState<any[]>([]);
  const [internalLoaded, setInternalLoaded] = useState(false);

  // Industry News
  const [externalCategory, setExternalCategory] = useState<string>("All");
  const [externalPosts, setExternalPosts] = useState<any[]>([]);
  const [externalLoaded, setExternalLoaded] = useState(false);

  useEffect(() => {
    // Fetch Internal Posts
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInternalPosts(data);
        } else {
          setInternalPosts(staticBlogPosts);
        }
        setInternalLoaded(true);
      })
      .catch(() => {
        setInternalPosts(staticBlogPosts);
        setInternalLoaded(true);
      });
  }, []);

  useEffect(() => {
    // Fetch External News when tab is active (or just fetch once)
    if (activeTab === "Industry" && !externalLoaded) {
      fetch("/api/news")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setExternalPosts(data);
          }
          setExternalLoaded(true);
        })
        .catch(() => {
          setExternalPosts([]);
          setExternalLoaded(true);
        });
    }
  }, [activeTab, externalLoaded]);

  const internalCategories = ["All", ...Array.from(new Set(internalPosts.map((p) => p.category)))];
  const externalCategories = ["All", ...Array.from(new Set(externalPosts.map((p) => p.category)))];

  const visibleInternalPosts = useMemo(() => {
    return internalPosts.filter((post) => {
      const matchesSearch =
        (post.title || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
        (post.excerpt || "").toLowerCase().includes((searchQuery || "").toLowerCase());
      const matchesCategory = internalCategory === "All" || post.category === internalCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, internalCategory, internalPosts]);

  const visibleExternalPosts = useMemo(() => {
    return externalPosts.filter((post) => {
      const matchesSearch =
        (post.title || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
        (post.description || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
        (post.source || "").toLowerCase().includes((searchQuery || "").toLowerCase());
      const matchesCategory = externalCategory === "All" || post.category === externalCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, externalCategory, externalPosts]);

  const isInternal = activeTab === "Nexora";
  const currentCategories = isInternal ? internalCategories : externalCategories;
  const currentCategory = isInternal ? internalCategory : externalCategory;
  const setCategory = isInternal ? setInternalCategory : setExternalCategory;
  const isLoaded = isInternal ? internalLoaded : externalLoaded;
  const visiblePosts = isInternal ? visibleInternalPosts : visibleExternalPosts;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <main className="overflow-x-clip pb-24">
      <div className="container-wide">
        {/* Hero */}
        <PageHero
          align="center"
          eyebrow="Insights & Resources"
          lines={[
            "The Nexora ",
            <span key="blog" className="accent">Blog</span>,
          ]}
          sub="Expert advice, industry trends, and practical guides to help you navigate your tech career."
        >
          {/* Tabs */}
          <div className="inline-flex bg-[#FFFFFF] p-1 rounded-full border border-[#203548]">
            <button
              onClick={() => setActiveTab("Nexora")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "Nexora"
                  ? "bg-gradient-to-r from-[#F26A21] to-[#8FB8D8] text-[#171717] shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  : "text-[#77736D] hover:text-[#171717]"
              }`}
            >
              Nexora Articles
            </button>
            <button
              onClick={() => setActiveTab("Industry")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "Industry"
                  ? "bg-gradient-to-r from-[#F26A21] to-[#8FB8D8] text-[#171717] shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  : "text-[#77736D] hover:text-[#171717]"
              }`}
            >
              Industry News
            </button>
          </div>
        </PageHero>

        {/* Filters & Search */}
        <section className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E5E5E5] pb-6">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {currentCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  currentCategory === cat
                    ? "bg-[#F26A21] text-[#171717]"
                    : "text-[#77736D] bg-[#FFFFFF] border border-[#203548] hover:border-[#F26A21]/50 hover:text-[#171717]"
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
              className="w-full bg-[#101821] border border-[#203548] rounded-full py-2 pl-9 pr-4 text-xs text-[#171717] placeholder:text-[#64748B] focus:outline-none focus:border-[#F26A21]/50 transition-colors"
            />
          </div>
        </section>

        {/* Blog Grid */}
        {!isLoaded ? (
          <div className="text-center py-20">
            <p className="text-[#77736D]">Loading articles...</p>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-10 h-10 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#171717]">No articles found</h3>
            <p className="text-sm text-[#64748B] mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isInternal ? (
              // Nexora Articles
              visiblePosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl bg-[#FFFFFF] border border-[#203548] overflow-hidden hover:border-[#F26A21]/40 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#0a111a]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-md border border-[#F26A21]/40 bg-[#07151d]/80 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-[#171717]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] text-[#64748B] mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold text-[#171717] mb-2 group-hover:text-[#F26A21] transition-colors"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#77736D] leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#203548]">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.authorAvatar || post.author?.avatar || "/images/default-avatar.svg"}
                          alt={`${post.authorName || post.author?.name || "Author"}'s avatar`}
                          width={24}
                          height={24}
                          className="rounded-full"
                          unoptimized
                        />
                        <span className="text-[10px] text-[#77736D] font-medium">
                          {post.authorName || post.author?.name || "Nexora Team"}
                        </span>
                      </div>
                      
                      <span className="text-[10px] text-[#F26A21] font-bold flex items-center gap-1">
                        Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Industry News
              visiblePosts.map((post: any) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-[#FFFFFF] border border-[#203548] overflow-hidden hover:border-[#8FB8D8]/40 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#0a111a] flex items-center justify-center">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#FFFFFF] to-[#203548] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Sparkles className="w-10 h-10 text-[#203548]" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-md border border-[#8FB8D8]/40 bg-[#07151d]/80 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-[#171717]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] text-[#64748B] mb-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="text-[#8FB8D8] font-semibold flex items-center gap-1">
                        Source: {post.source}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold text-[#171717] mb-2 group-hover:text-[#8FB8D8] transition-colors line-clamp-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#77736D] leading-relaxed mb-5 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#203548]">
                      <span className="text-[10px] text-[#77736D]">
                        External Article
                      </span>
                      
                      <span className="text-[10px] text-[#8FB8D8] font-bold flex items-center gap-1">
                        Read Original <ExternalLink className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
