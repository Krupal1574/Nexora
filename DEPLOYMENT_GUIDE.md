# Deployment Guide

**Last Updated:** October 2, 2026

## Overview

This guide covers deploying the Nexora platform to production. The recommended deployment platform is Vercel, but instructions for other platforms are included.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Alternative Platforms](#alternative-platforms)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- [ ] Vercel account (or alternative hosting)
- [ ] PostgreSQL database (Vercel Postgres, Supabase, or similar)
- [ ] Stripe account (payment processing)
- [ ] Google Cloud Console (OAuth, Maps API)
- [ ] Sentry account (error tracking)
- [ ] Resend account (email service)
- [ ] AI provider accounts (Google AI, Groq)

### Development Tools
- Node.js 18+ installed
- npm or pnpm
- Git
- Prisma CLI

---

## Environment Setup

### Required Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/nexora?schema=public"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AI Services
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-key"
GROQ_API_KEY="your-groq-api-key"

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-api-key"

# Sentry
SENTRY_DSN="https://...@sentry.io/..."
SENTRY_AUTH_TOKEN="your-sentry-auth-token"
SENTRY_ORG="nexora-9j"
SENTRY_PROJECT="nexora"

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"

# Feature Flags (optional)
ENABLE_CHATBOT="true"
ENABLE_BLOG="true"
ENABLE_ECOMMERCE="true"
```

### Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Database Setup

### 1. Create PostgreSQL Database

**Option A: Vercel Postgres**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Create database
vercel postgres create nexora-db

# Get connection string
vercel env pull .env.production
```

**Option B: Supabase**
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database
4. Use connection pooler for production

**Option C: Railway**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create database
railway add postgresql
```

### 2. Run Database Migrations

```bash
# Set DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 3. Seed Database (Optional)

```bash
# Seed initial data
npx prisma db seed
```

---

## Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/nexora-site.git
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.production`
   - Separate variables for Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Automatic deployments on every push to main

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... add all other variables
```

### Build Configuration

Ensure your `vercel.json` is configured:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

---

## Alternative Platforms

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: nexora
      POSTGRES_PASSWORD: password
      POSTGRES_DB: nexora
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Deploy:**
```bash
docker-compose up -d
```

### AWS Deployment (Amplify)

```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Configure
# - Select: Hosting with Amplify Console
# - Choose: Manual deployment

# Publish
amplify publish
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add postgresql

# Deploy
railway up
```

---

## Post-Deployment

### 1. DNS Configuration

Point your domain to Vercel:

**For Vercel:**
- Add domain in Vercel dashboard
- Update DNS records:
  ```
  Type: A     Name: @    Value: 76.76.21.21
  Type: CNAME Name: www  Value: cname.vercel-dns.com
  ```

### 2. SSL Certificate

- Vercel automatically provisions SSL via Let's Encrypt
- Certificate auto-renews

### 3. Database Connection Pooling

For production, enable connection pooling:

```typescript
// lib/prisma8.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 4. Stripe Webhook Setup

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Google OAuth Redirect URIs

Add authorized redirect URIs in Google Cloud Console:
```
https://yourdomain.com/api/auth/callback/google
https://www.yourdomain.com/api/auth/callback/google
```

### 6. CORS Configuration

Ensure API routes allow your domain:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', 'https://yourdomain.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}
```

---

## Monitoring & Maintenance

### Error Tracking (Sentry)

Sentry is already configured. View errors at:
- https://sentry.io/organizations/nexora-9j/issues/

**Key Metrics to Monitor:**
- Error rate
- Response time
- User sessions
- Release health

### Performance Monitoring

**Vercel Analytics:**
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load times

**Access:** https://vercel.com/[team]/[project]/analytics

### Database Monitoring

**Monitor:**
- Connection pool usage
- Query performance
- Storage size
- Active connections

**Optimization:**
```sql
-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check connection count
SELECT count(*) FROM pg_stat_activity;

-- Database size
SELECT pg_size_pretty(pg_database_size('nexora'));
```

### Uptime Monitoring

Set up external monitoring:
- **UptimeRobot:** https://uptimerobot.com
- **Pingdom:** https://pingdom.com
- **Better Uptime:** https://betteruptime.com

Monitor endpoints:
- `https://yourdomain.com/api/health`
- `https://yourdomain.com/`

### Backup Strategy

**Database Backups:**
1. Daily automated backups (configured in DB provider)
2. Point-in-time recovery enabled
3. 30-day retention minimum
4. Test restore quarterly

**Code Backups:**
- Git repository (GitHub)
- Vercel maintains deployment history

---

## Security Checklist

### Pre-Launch Security Review

- [ ] All environment variables secured
- [ ] No secrets in git history
- [ ] Security headers configured (HSTS, CSP, etc.)
- [ ] SQL injection prevention (Prisma parameterized queries)
- [ ] XSS protection (React escaping + CSP)
- [ ] CSRF protection (NextAuth)
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] File upload restrictions
- [ ] Admin routes protected
- [ ] Password hashing with Argon2
- [ ] SSL/TLS enforced
- [ ] Database connection encrypted
- [ ] API authentication required
- [ ] Session security configured
- [ ] Audit logging enabled

### Security Headers

Already configured in `next.config.ts`:

```typescript
{
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

### Regular Security Maintenance

**Weekly:**
- Review Sentry errors for security issues
- Check for failed login attempts
- Monitor database for unusual activity

**Monthly:**
- Update dependencies (`npm audit fix`)
- Review admin audit logs
- Check SSL certificate expiry

**Quarterly:**
- Security penetration testing
- Dependency vulnerability scan
- Review access controls
- Update disaster recovery plan

---

## Performance Optimization

### 1. Image Optimization

Images are automatically optimized by Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // for above-fold images
/>
```

### 2. Code Splitting

Dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});
```

### 3. Database Query Optimization

```typescript
// ❌ Bad: N+1 query problem
const users = await prisma.user.findMany();
for (const user of users) {
  const orders = await prisma.order.findMany({ where: { userId: user.id } });
}

// ✅ Good: Use includes
const users = await prisma.user.findMany({
  include: { orders: true }
});
```

### 4. Caching Strategy

**Static Pages:**
- Generate at build time
- Revalidate with ISR

**API Routes:**
```typescript
export const revalidate = 3600; // 1 hour

export async function GET() {
  const data = await fetchData();
  return Response.json(data);
}
```

### 5. CDN Configuration

Vercel automatically serves static assets via CDN. For custom CDN:

```typescript
// next.config.ts
const config = {
  assetPrefix: process.env.CDN_URL,
  images: {
    loader: 'custom',
    loaderFile: './lib/cdn-loader.ts'
  }
};
```

---

## Troubleshooting

### Build Failures

**Issue:** Build fails on Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure environment variables are set
4. Test build locally: `npm run build`

**Common Errors:**
```bash
# Module not found
npm install [missing-package] --save

# Type errors
npm run build -- --no-lint

# Out of memory
# Increase Node memory in Vercel:
# Settings → General → Build & Development Settings
# Override: node --max-old-space-size=4096
```

### Database Connection Issues

**Issue:** "Can't reach database server"

**Solutions:**
1. Verify `DATABASE_URL` is correct
2. Check database is accessible from Vercel IPs
3. Enable connection pooling
4. Increase connection limit

```sql
-- Check max connections
SHOW max_connections;

-- Increase if needed (requires restart)
ALTER SYSTEM SET max_connections = 100;
```

### Deployment Timeouts

**Issue:** Deployment exceeds time limit

**Solutions:**
1. Optimize build process
2. Use build cache
3. Remove unused dependencies
4. Split large builds

### Performance Issues

**Issue:** Slow page loads

**Debug:**
1. Check Vercel Analytics for slow endpoints
2. Use Lighthouse for page insights
3. Review Sentry performance data
4. Optimize database queries

**Common Fixes:**
- Enable caching
- Optimize images
- Remove unused JavaScript
- Enable compression

### Email Delivery Issues

**Issue:** Emails not sending

**Solutions:**
1. Verify Resend API key
2. Check sender domain verification
3. Review Resend logs
4. Test with sample email

```typescript
// Test email endpoint
// POST /api/test/email
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'test@yourdomain.com',
  to: 'your-email@example.com',
  subject: 'Test Email',
  text: 'This is a test'
});
```

---

## Rollback Procedure

If deployment causes issues:

### Vercel Rollback

1. Go to Deployments tab
2. Find last working deployment
3. Click "..." menu → "Promote to Production"

### Database Rollback

```bash
# Revert last migration
npx prisma migrate resolve --rolled-back [migration-name]

# Or restore from backup
# (Use your DB provider's restore function)
```

---

## Scaling Considerations

### Horizontal Scaling

Vercel automatically scales based on traffic. For custom scaling:

**Edge Functions:**
- Move API routes to edge runtime
- Reduce cold start times

```typescript
// app/api/route.ts
export const runtime = 'edge';
```

**Database Connection Pooling:**
- Use PgBouncer or similar
- Configure max connections

### Vertical Scaling

**Increase Vercel Function Resources:**
- Pro plan: 1GB memory, 10s timeout
- Enterprise: Custom limits

**Database Scaling:**
- Upgrade PostgreSQL plan
- Enable read replicas
- Implement caching layer (Redis)

---

## Support & Resources

- **Documentation:** https://nextjs.org/docs
- **Vercel Support:** https://vercel.com/support
- **Prisma Docs:** https://prisma.io/docs
- **Community:** Discord, GitHub Discussions

---

## Maintenance Schedule

### Daily
- Monitor error rates
- Check uptime
- Review critical alerts

### Weekly
- Review analytics
- Check database performance
- Security log review
- Dependency updates (patch versions)

### Monthly
- Full security audit
- Performance optimization review
- Database cleanup/optimization
- Minor dependency updates
- Backup restoration test

### Quarterly
- Major dependency updates
- Security penetration testing
- Disaster recovery drill
- Capacity planning review
- User feedback integration

---

## Checklist: Pre-Production Launch

- [ ] All environment variables set
- [ ] Database migrated and seeded
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Google OAuth configured
- [ ] Stripe webhooks configured
- [ ] Email sending tested
- [ ] Sentry receiving errors
- [ ] Analytics tracking
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] 404/500 pages customized
- [ ] Admin accounts created
- [ ] Security headers verified
- [ ] Performance tested (Lighthouse)
- [ ] Mobile responsiveness checked
- [ ] Cross-browser tested
- [ ] Backup system verified
- [ ] Monitoring alerts configured
- [ ] Documentation updated
- [ ] Team access configured

---

**Deployment Status:** Ready for Production ✅

For questions or issues during deployment, refer to the troubleshooting section or contact the development team.
