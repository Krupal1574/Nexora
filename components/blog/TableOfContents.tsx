"use client";

import { List } from "lucide-react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({
  headings,
}: {
  headings: Heading[];
}) {
  if (headings.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="
        rounded-2xl border border-black/[0.07]
        bg-white p-5 sm:p-6
      "
    >
      <div className="mb-5 flex items-center gap-2">
        <List className="h-4 w-4 text-[#F26A21]" />

        <h2
          className="
            font-['Space_Grotesk',sans-serif]
            text-sm font-bold text-[#171717]
          "
        >
          In this article
        </h2>
      </div>

      <ul className="space-y-3">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={heading.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="
                group flex items-start gap-3 text-sm
                leading-relaxed text-[#77736D]
                transition-colors hover:text-[#F26A21]
              "
            >
              <span
                className="
                  mt-0.5 text-[10px] font-semibold
                  text-[#F26A21]/70
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
