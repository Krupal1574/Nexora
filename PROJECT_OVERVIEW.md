# Nexora Site - Project Overview

**Last Updated:** October 2, 2026

## Project Description

Nexora is a comprehensive career placement and training platform built with Next.js 16. The platform connects candidates with career counseling, resume optimization, interview preparation, technical training, and job placement services focused on the U.S. market.

## Tech Stack

### Core Framework
- **Next.js 16.3.3** (App Router) - React framework with server components
- **React 19.2.8** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Database & ORM
- **PostgreSQL** - Primary database
- **Prisma 8 (RC)** - Next-generation ORM with advanced features
- **@prisma/orm-toolchain** - Prisma 8 tooling
- **@prisma/orm-framework** - Prisma 8 framework
- **@prisma/orm-postgres** - PostgreSQL adapter

### Authentication & Authorization
- **NextAuth.js 4.24** - Authentication system
- **@auth/prisma-adapter** - Prisma adapter for NextAuth
- **Argon2** - Password hashing

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 13** - Animation library
- **Lenis** - Smooth scroll library
- **Lucide React** - Icon library

### AI & APIs
- **AI SDK** - Vercel AI SDK for chat/streaming
- **@ai-sdk/google** - Google AI integration
- **@ai-sdk/groq** - Groq AI integration
- **Google APIs** - Google services integration

### Payments & E-commerce
- **Stripe** - Payment processing
- Integrated shopping cart and order management

### Monitoring & Analytics
- **Sentry** - Error tracking and performance monitoring
- **Vercel Analytics** - Usage analytics

### Additional Features
- **Resend** - Email service
- **RSS Parser** - Blog/news feed parsing
- **Mammoth** - Document parsing (.docx)
- **Zod 4** - Schema validation

## Project Structure

```
nexora-site/
├── app/                          # Next.js App Router
│   ├── about/                   # About page
│   ├── admin/                   # Admin dashboard
│   │   ├── blogs/              # Blog management
│   │   ├── coupons/            # Coupon management
│   │   ├── courses/            # Course management
│   │   ├── inquiries/          # Inquiry management
│   │   ├── logs/               # Audit logs
│   │   ├── media/              # Media management
│   │   ├── orders/             # Order management
│   │   ├── products/           # Product management
│   │   ├── settings/           # Admin settings
│   │   ├── testimonials/       # Testimonial management
│   │   └── users/              # User management
│   ├── api/                     # API routes
│   │   ├── address/            # Address autocomplete
│   │   ├── admin/              # Admin APIs
│   │   ├── auth/               # Authentication
│   │   ├── blogs/              # Blog APIs
│   │   ├── calendar/           # Calendar integration
│   │   ├── chat/               # AI chat endpoints
│   │   ├── forms/              # Form submissions
│   │   ├── integrations/       # Third-party integrations
│   │   ├── news/               # News feed
│   │   ├── products/           # Product APIs
│   │   ├── profile/            # User profile
│   │   ├── testimonials/       # Testimonial APIs
│   │   └── user/               # User operations
│   └── page.tsx                 # Homepage
│
├── components/                   # React components
│   ├── candidate/               # Candidate-specific components
│   │   ├── AvatarUpload.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── ResumeUpload.tsx
│   │   └── SecuritySettings.tsx
│   ├── motion/                  # Animation components
│   │   ├── CtaSection.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── DragRail.tsx
│   │   ├── HorizontalScroll.tsx
│   │   ├── HoverPreviewList.tsx
│   │   ├── Magnetic.tsx
│   │   ├── Marquee.tsx
│   │   └── [more motion components]
│   ├── AddressAutocomplete.tsx
│   ├── AdminLayoutWrapper.tsx
│   ├── AnalyticsManager.tsx
│   ├── AuthProvider.tsx
│   ├── CartIcon.tsx
│   ├── CartProvider.tsx
│   ├── Chatbot.tsx
│   ├── Footer.tsx
│   └── MobileBottomNav.tsx
│
├── lib/                          # Utility functions & helpers
│   ├── auth.ts                  # Authentication utilities
│   ├── blog.ts                  # Blog helpers
│   ├── candidate-profile.ts     # Candidate profile logic
│   ├── cart.tsx                 # Shopping cart logic
│   ├── email.ts                 # Email utilities
│   ├── forms.ts                 # Form helpers
│   ├── google-oauth.ts          # Google OAuth integration
│   ├── prisma.ts                # Prisma client (legacy)
│   ├── prisma8.ts               # Prisma 8 client
│   ├── prisma8-adapter.ts       # Prisma 8 NextAuth adapter
│   ├── rate-limit.ts            # Rate limiting
│   ├── resume-storage.ts        # Resume file management
│   ├── shop.ts                  # E-commerce logic
│   ├── site.ts                  # Site configuration
│   └── testimonials.ts          # Testimonial data
│
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma            # Prisma schema
│   └── seed.ts                  # Database seeding
│
├── public/                       # Static assets
│   └── images/                  # Image assets
│
├── types/                        # TypeScript type definitions
│
├── .agents/                      # AI agent configurations
│   └── skills/                  # AI skills definitions
│       └── prisma-8/            # Prisma 8 skill definitions
│
├── .env                          # Environment variables
├── .env.local                    # Local environment overrides
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── AGENTS.md                     # Agent instructions
└── CLAUDE.md                     # Claude AI instructions
```

## Key Features

### For Candidates
1. **Career Counseling** - 1-on-1 career mapping with domain advisors
2. **Resume Optimization** - ATS-tailored resumes for U.S. market
3. **Interview Preparation** - Mock interviews with industry veterans
4. **Technical Training** - Weekly webinars and skill upgrades
5. **Job Placement** - End-to-end placement support
6. **Profile Management** - Comprehensive candidate profiles with resume uploads

### For Administrators
1. **Dashboard** - Comprehensive admin panel
2. **User Management** - Manage candidates and admins
3. **Content Management** - Blogs, testimonials, courses
4. **Order Management** - Track orders and payments
5. **Audit Logging** - Track administrative actions
6. **Media Management** - Upload and manage media assets
7. **Integration Management** - Google Sheets, Docs integrations

### E-commerce
1. **Product Catalog** - Services and courses
2. **Shopping Cart** - Session-based cart
3. **Stripe Integration** - Secure payment processing
4. **Coupon System** - Discount codes
5. **Order Tracking** - Complete order lifecycle

### Additional Features
1. **AI Chatbot** - Intelligent chat support
2. **Blog System** - Content marketing
3. **RSS News Feed** - Industry news aggregation
4. **Address Autocomplete** - Google Places integration
5. **Responsive Design** - Mobile-first approach
6. **Advanced Animations** - Smooth, engaging interactions

## Design System

### Color Palette
- **Background:** #0B0F19 (nexora-bg)
- **Surface:** #121623 (nexora-surface)
- **Card:** #1A202C (nexora-card)
- **Border:** #2D3748 (nexora-border)
- **Primary Cyan:** #00F2FE (nexora-cyan)
- **Primary Teal:** #00D2C4 (nexora-teal)
- **Muted:** #94A3B8 (nexora-muted)
- **White:** #FFFFFF (nexora-white)

### Typography
- **Sans:** Inter, system-ui
- **Display:** Space Grotesk, system-ui

### Effects
- Gradient backgrounds
- Glow effects on interactive elements
- Smooth scroll with Lenis
- Framer Motion animations
- Custom cursor interactions
- Magnetic buttons
- Marquee text effects

## Database Schema Overview

### Core Models
- **User** - User accounts with role-based access (CUSTOMER/ADMIN)
- **Account** - OAuth provider accounts
- **Session** - User sessions
- **CandidateProfile** - Extended candidate information
- **Resume** - Resume file storage

### E-commerce Models
- **Product** - Service/course listings
- **Order** - Purchase orders
- **OrderItem** - Line items in orders
- **Address** - Shipping/billing addresses

### Content Models
- **Blog** - Blog posts
- **Testimonial** - Customer testimonials
- **Course** - Training courses
- **Lesson** - Course lessons

### System Models
- **AdminAuditLog** - Track admin actions
- **Inquiry** - Contact form submissions
- **Coupon** - Discount codes

## Environment Variables

Required environment variables (see .env.example):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `SENTRY_DSN` - Sentry error tracking DSN
- AI SDK keys (Google, Groq)
- Email service credentials (Resend)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma commands
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations (legacy)
npm run prisma8:migrate    # Run Prisma 8 migrations
```

## Deployment

The application is configured for deployment on **Vercel** with:
- Automatic deployments from Git
- Environment variable management
- Edge function support
- Vercel Analytics integration
- Vercel Cron Jobs for scheduled tasks

## Security Features

1. **HTTP Security Headers**
   - Strict-Transport-Security
   - X-Content-Type-Options
   - X-Frame-Options
   - Referrer-Policy
   - Permissions-Policy

2. **Authentication Security**
   - Argon2 password hashing
   - OAuth providers (Google)
   - Session management
   - Role-based access control

3. **Error Tracking**
   - Sentry integration
   - Source map upload
   - Performance monitoring

4. **Rate Limiting**
   - API rate limiting
   - Protection against abuse

## Browser Support

Modern browsers with ES2020+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See LICENSE file for details.

## Additional Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Component Library](./COMPONENT_LIBRARY.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
