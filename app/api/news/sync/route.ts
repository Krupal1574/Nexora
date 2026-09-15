import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Parser from "rss-parser";

export const dynamic = "force-dynamic";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['content:encoded', 'contentEncoded']
    ]
  }
});

const FEEDS = [
  { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
  { url: "https://cloudblog.withgoogle.com/rss/", source: "Google Cloud Blog" },
  { url: "https://aws.amazon.com/blogs/aws/feed/", source: "AWS News" },
  { url: "https://github.blog/feed/", source: "GitHub Blog" },
];

function extractImage(item: any): string | null {
  if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) return item.mediaContent.$.url;
  if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) return item.mediaThumbnail.$.url;
  
  // Try to find image in content:encoded or description
  const content = item.contentEncoded || item.content || item.description || "";
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  if (match) return match[1];

  return null;
}

function determineCategory(item: any, source: string): string {
  const text = `${item.title} ${item.categories?.join(" ") || ""} ${item.contentSnippet || ""} ${source}`.toLowerCase();
  
  if (text.includes("ai ") || text.includes("artificial intelligence") || text.includes("machine learning")) return "AI";
  if (text.includes("cloud") || text.includes("aws") || text.includes("azure") || text.includes("gcp")) return "Cloud";
  if (text.includes("devops") || text.includes("kubernetes") || text.includes("docker") || text.includes("ci/cd")) return "DevOps";
  if (text.includes("security") || text.includes("cybersecurity") || text.includes("vulnerability") || text.includes("hack")) return "Cybersecurity";
  if (text.includes("startup") || text.includes("funding") || text.includes("venture")) return "Startups";
  if (text.includes("career") || text.includes("hiring") || text.includes("job") || text.includes("staffing")) return "Career";
  
  return "Technology";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cronSecret = searchParams.get("secret");

    // Secure the endpoint
    if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let addedCount = 0;

    for (const feedConfig of FEEDS) {
      try {
        const feed = await parser.parseURL(feedConfig.url);
        
        for (const rawItem of feed.items) {
          const item = rawItem as any;
          if (!item.title || !item.link) continue;

          const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();
          
          // Skip articles older than 30 days
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          if (publishedAt < thirtyDaysAgo) continue;

          // Expires in 30 days from publish date
          const expiresAt = new Date(publishedAt);
          expiresAt.setDate(expiresAt.getDate() + 30);

          const category = determineCategory(item, feedConfig.source);
          const imageUrl = extractImage(item);
          const description = (item.contentSnippet || item.description || "").substring(0, 300) + "...";

          await prisma.externalArticle.upsert({
            where: { url: item.link },
            update: {}, // Don't overwrite if it already exists
            create: {
              title: item.title,
              description,
              url: item.link,
              source: feedConfig.source,
              imageUrl,
              publishedAt,
              expiresAt,
              category,
            },
          });
          
          addedCount++;
        }
      } catch (e) {
        console.error(`Failed to sync feed ${feedConfig.url}`, e);
        // Continue to the next feed
      }
    }

    // Purge expired articles
    const deleted = await prisma.externalArticle.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });

    return NextResponse.json({ 
      success: true, 
      processed: addedCount,
      purged: deleted.count
    });

  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
