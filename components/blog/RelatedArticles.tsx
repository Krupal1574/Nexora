import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export default function RelatedArticles({
  posts,
  currentSlug,
  currentCategory,
}: {
  posts: RelatedPost[];
  currentSlug: string;
  currentCategory?: string;
}) {
  const candidates = posts.filter(
    (post) => post.slug !== currentSlug
  );

  const sameCategory = currentCategory
    ? candidates.filter(
        (post) => post.category === currentCategory
      )
    : [];

  const otherPosts = candidates.filter(
    (post) => post.category !== currentCategory
  );

  const related = [...sameCategory, ...otherPosts].slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="
        border-t border-black/[0.08]
        bg-[#F5F1E8] px-5 py-16
        sm:px-8 sm:py-20 lg:py-24
      "
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="
            mb-9 flex flex-col gap-4
            sm:flex-row sm:items-end sm:justify-between
          "
        >
          <div>
            <p
              className="
                mb-3 text-[11px] font-bold uppercase
                tracking-[0.2em] text-[#F26A21]
              "
            >
              Keep exploring
            </p>

            <h2
              id="related-articles-heading"
              className="
                font-['Space_Grotesk',sans-serif]
                text-3xl font-bold tracking-tight text-[#171717]
                sm:text-4xl
              "
            >
              More from Nexora
            </h2>
          </div>

          <Link
            href="/blog"
            className="
              inline-flex w-fit items-center gap-2
              text-sm font-semibold text-[#171717]
              transition-colors hover:text-[#F26A21]
            "
          >
            All insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {related.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="
                group overflow-hidden rounded-2xl
                border border-black/[0.06] bg-white
                transition-all duration-300
                hover:-translate-y-1 hover:border-[#F26A21]/30
                hover:shadow-xl hover:shadow-black/[0.05]
              "
            >
              <div
                className="
                  relative aspect-[16/10] overflow-hidden
                  bg-[#E9E2D6]
                "
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="
                    object-cover transition-transform duration-700
                    group-hover:scale-[1.04]
                  "
                  unoptimized
                />
              </div>

              <div className="p-5 sm:p-6">
                <div
                  className="
                    mb-3 flex flex-wrap items-center gap-2
                    text-[11px] text-[#77736D]
                  "
                >
                  <span
                    className="
                      rounded-full bg-[#F26A21]/10 px-3 py-1
                      font-semibold text-[#C94F12]
                    "
                  >
                    {post.category}
                  </span>

                  <span aria-hidden="true">·</span>

                  <time>{post.date}</time>
                </div>

                <h3
                  className="
                    mb-3 font-['Space_Grotesk',sans-serif]
                    text-xl font-bold leading-snug text-[#171717]
                    transition-colors group-hover:text-[#F26A21]
                  "
                >
                  {post.title}
                </h3>

                <p className="line-clamp-3 text-sm leading-6 text-[#77736D]">
                  {post.excerpt}
                </p>

                <span
                  className="
                    mt-5 inline-flex items-center gap-2
                    text-sm font-semibold text-[#171717]
                    transition-colors group-hover:text-[#F26A21]
                  "
                >
                  Read article
                  <ArrowRight
                    className="
                      h-4 w-4 transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
