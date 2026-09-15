CREATE TABLE "ExternalArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalArticle_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ExternalArticle_url_key" ON "ExternalArticle"("url");
CREATE INDEX "ExternalArticle_category_idx" ON "ExternalArticle"("category");
CREATE INDEX "ExternalArticle_publishedAt_idx" ON "ExternalArticle"("publishedAt");
CREATE INDEX "ExternalArticle_expiresAt_idx" ON "ExternalArticle"("expiresAt");
