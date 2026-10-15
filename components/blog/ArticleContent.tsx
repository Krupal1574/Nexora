import React from "react";

type ArticleContentProps = {
  content: string;
};

function renderInline(text: string, keyPrefix: string) {
  const tokenPattern =
    /(\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)|\*\*(.+?)\*\*|\*(.+?)\*)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const href = match[3];

      elements.push(
        <a
          key={`${keyPrefix}-${index}`}
          href={href}
          className="
            font-medium text-[#F26A21] underline
            decoration-[#F26A21]/30 underline-offset-4
            transition-colors hover:text-[#171717]
          "
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      elements.push(
        <strong
          key={`${keyPrefix}-${index}`}
          className="font-semibold text-[#171717]"
        >
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      elements.push(
        <em key={`${keyPrefix}-${index}`}>
          {match[5]}
        </em>
      );
    }

    lastIndex = tokenPattern.lastIndex;
    index++;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s+/, "");

      return {
        id: slugifyHeading(text),
        text,
        level,
      };
    });
}

export default function ArticleContent({
  content,
}: ArticleContentProps) {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <article
      className="
        article-content
        max-w-none
        text-[16px] leading-[1.95] text-[#77736D]
        sm:text-[17px]
        [&_h2]:scroll-mt-28
        [&_h3]:scroll-mt-28
      "
    >
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.startsWith("## ")) {
          const heading = block.replace(/^##\s+/, "");

          return (
            <h2
              key={key}
              id={slugifyHeading(heading)}
              className="
                mb-5 mt-12 font-['Space_Grotesk',sans-serif]
                text-2xl font-bold leading-tight tracking-tight
                text-[#171717] sm:text-3xl
              "
            >
              {heading}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          const heading = block.replace(/^###\s+/, "");

          return (
            <h3
              key={key}
              id={slugifyHeading(heading)}
              className="
                mb-4 mt-9 font-['Space_Grotesk',sans-serif]
                text-xl font-bold leading-snug text-[#171717]
                sm:text-2xl
              "
            >
              {heading}
            </h3>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={key}
              className="
                my-8 rounded-r-2xl border-l-4 border-[#F26A21]
                bg-[#F5F1E8] px-6 py-5
                text-lg font-medium leading-relaxed
                text-[#171717] sm:px-8 sm:py-6
              "
            >
              {renderInline(
                block.replace(/^>\s+/gm, "").replace(/\n/g, " "),
                key
              )}
            </blockquote>
          );
        }

        const lines = block.split("\n");

        if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
          return (
            <ul
              key={key}
              className="
                my-6 space-y-3 pl-6
                marker:text-[#F26A21]
                [&_li]:pl-2
              "
            >
              {lines.map((line, lineIndex) => (
                <li key={`${key}-${lineIndex}`}>
                  {renderInline(
                    line.replace(/^\s*[-*]\s+/, ""),
                    `${key}-${lineIndex}`
                  )}
                </li>
              ))}
            </ul>
          );
        }

        if (
          lines.every((line) => /^\s*\d+\.\s+/.test(line))
        ) {
          return (
            <ol
              key={key}
              className="
                my-6 list-decimal space-y-3 pl-6
                marker:font-semibold marker:text-[#F26A21]
                [&_li]:pl-2
              "
            >
              {lines.map((line, lineIndex) => (
                <li key={`${key}-${lineIndex}`}>
                  {renderInline(
                    line.replace(/^\s*\d+\.\s+/, ""),
                    `${key}-${lineIndex}`
                  )}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={key} className="mb-6">
            {renderInline(block.replace(/\n/g, " "), key)}
          </p>
        );
      })}
    </article>
  );
}
