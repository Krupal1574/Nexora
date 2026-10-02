# Development Guide

**Last Updated:** October 2, 2026

## Overview

This guide covers local development setup, coding standards, and best practices for contributing to the Nexora platform.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Git Workflow](#git-workflow)
7. [Common Tasks](#common-tasks)
8. [Debugging](#debugging)

---

## Getting Started

### Prerequisites

- **Node.js:** 18.x or higher
- **npm:** 9.x or higher (or pnpm/yarn)
- **PostgreSQL:** 14.x or higher
- **Git:** Latest version

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexora-site.git
   cd nexora-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your local configuration:
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/nexora_dev"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-dev-secret"
   # ... other variables
   ```

4. **Set up database**
   ```bash
   # Create database
   createdb nexora_dev

   # Run migrations
   npm run prisma:generate
   npm run prisma:migrate

   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

### IDE Setup

#### Visual Studio Code (Recommended)

**Required Extensions:**
- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- TypeScript Error Translator

**Recommended Extensions:**
- GitLens
- Error Lens
- Auto Rename Tag
- Import Cost
- TODO Highlight

**VS Code Settings (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

#### WebStorm / IntelliJ IDEA

1. Enable ESLint: Preferences → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
2. Enable Prettier: Preferences → Languages & Frameworks → JavaScript → Prettier
3. Enable Prisma plugin from marketplace

---

## Project Structure

```
nexora-site/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (marketing)/       # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
│
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── motion/           # Animation components
│   ├── candidate/        # Candidate-specific
│   └── [feature]/        # Feature-specific
│
├── lib/                   # Utilities & helpers
│   ├── prisma.ts         # Prisma client (legacy)
│   ├── prisma8.ts        # Prisma 8 client
│   ├── auth.ts           # Auth utilities
│   ├── utils.ts          # General utilities
│   └── [feature].ts      # Feature utilities
│
├── hooks/                 # Custom React hooks
│   ├── useMediaQuery.ts
│   ├── useDebounce.ts
│   └── [feature].ts
│
├── types/                 # TypeScript types
│   ├── index.ts          # Shared types
│   └── [feature].ts      # Feature types
│
├── prisma/                # Database
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Migration history
│   └── seed.ts           # Seed script
│
├── public/                # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── .agents/               # AI agent configs
├── .next/                 # Next.js build output
├── node_modules/          # Dependencies
│
├── next.config.ts         # Next.js config
├── tailwind.config.ts     # Tailwind config
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
└── README.md              # Project readme
```

---

## Development Workflow

### File Naming Conventions

```
Components:     PascalCase.tsx      (Button.tsx)
Pages:          lowercase.tsx       (page.tsx, layout.tsx)
Utilities:      camelCase.ts        (formatDate.ts)
Types:          camelCase.ts        (userTypes.ts)
API Routes:     route.ts            (route.ts)
Hooks:          useCamelCase.ts     (useAuth.ts)
Constants:      UPPER_SNAKE_CASE.ts (API_ROUTES.ts)
```

### Code Organization

#### Component Structure

```tsx
// components/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// 1. Types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// 2. Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    // 3. Logic/hooks
    const baseStyles = 'rounded-lg font-medium transition-colors';
    const variants = {
      primary: 'bg-nexora-gradient text-white',
      secondary: 'border-2 border-nexora-cyan text-nexora-cyan',
      ghost: 'text-nexora-cyan hover:bg-nexora-surface'
    };
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    // 4. Render
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### API Route Structure

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma8';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 1. Validation schemas
const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().optional(),
});

// 2. GET handler
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// 3. POST handler
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate input
    const body = await request.json();
    const data = productSchema.parse(body);

    // Create product
    const product = await prisma.product.create({
      data,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

### Custom Hooks

```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

---

## Coding Standards

### TypeScript

**Use explicit types:**
```typescript
// ❌ Bad
const user = {};

// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}
const user: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com'
};
```

**Avoid `any`:**
```typescript
// ❌ Bad
function processData(data: any) {
  return data.value;
}

// ✅ Good
function processData<T extends { value: string }>(data: T): string {
  return data.value;
}
```

**Use type guards:**
```typescript
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}

if (isUser(data)) {
  console.log(data.name); // TypeScript knows data is User
}
```

### React Patterns

**Use functional components:**
```typescript
// ✅ Always use functional components
export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  // ...
}
```

**Server vs Client Components:**
```typescript
// Server Component (default in App Router)
// app/users/page.tsx
import { prisma } from '@/lib/prisma8';

export default async function UsersPage() {
  const users = await prisma.user.findMany();
  return <UserList users={users} />;
}

// Client Component
// components/UserList.tsx
'use client';

import { useState } from 'react';

export function UserList({ users }: { users: User[] }) {
  const [filter, setFilter] = useState('');
  // Interactive features...
}
```

**Error Boundaries:**
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Styling Guidelines

**Use Tailwind utilities:**
```tsx
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-nexora-card rounded-xl">
  <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
  <div>
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-nexora-muted text-sm">{role}</p>
  </div>
</div>
```

**Use cn utility for conditional classes:**
```tsx
import { cn } from '@/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded-lg',
    isActive && 'bg-nexora-cyan text-white',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</button>
```

**Extract repeated patterns:**
```typescript
// lib/styles.ts
export const buttonStyles = {
  base: 'px-6 py-3 rounded-lg font-medium transition-colors',
  variants: {
    primary: 'bg-nexora-gradient text-white',
    secondary: 'border-2 border-nexora-cyan text-nexora-cyan',
  },
};
```

### Database Queries

**Use Prisma best practices:**
```typescript
// ✅ Good: Use transactions for related operations
const result = await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({
    data: {
      userId: user.id,
      total: 100,
    },
  });

  await tx.orderItem.createMany({
    data: items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    })),
  });

  return order;
});

// ✅ Good: Use select to fetch only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

// ✅ Good: Use includes for relations
const user = await prisma.user.findUnique({
  where: { id },
  include: {
    orders: {
      include: {
        items: true,
      },
    },
  },
});
```

---

## Testing

### Unit Tests

**Setup Jest:**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

**Example test:**
```typescript
// components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// app/api/__tests__/products.test.ts
import { POST } from '../api/products/route';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma8', () => ({
  prisma: {
    product: {
      create: jest.fn(),
    },
  },
}));

describe('POST /api/products', () => {
  it('creates a product successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Product',
        price: 99.99,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.product).toBeDefined();
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('text=Welcome back')).toBeVisible();
});
```

---

## Git Workflow

### Branch Naming

```
feature/add-user-profile
bugfix/fix-login-error
hotfix/critical-security-patch
chore/update-dependencies
docs/add-api-documentation
refactor/optimize-queries
```

### Commit Messages

Follow conventional commits:

```
feat: add user profile page
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: extract reusable hook
test: add unit tests for Button
chore: update dependencies
```

### Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/add-user-profile
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add user profile page"
   ```

3. **Push to remote**
   ```bash
   git push origin feature/add-user-profile
   ```

4. **Create Pull Request**
   - Add descriptive title
   - Fill out PR template
   - Request reviewers
   - Link related issues

5. **Address review comments**
   ```bash
   git add .
   git commit -m "fix: address review comments"
   git push
   ```

6. **Merge after approval**
   - Squash and merge (preferred)
   - Delete branch after merge

---

## Common Tasks

### Add a New Page

```bash
# Create page file
touch app/about/page.tsx
```

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
    </div>
  );
}
```

### Add a New API Endpoint

```bash
# Create route file
mkdir -p app/api/users
touch app/api/users/route.ts
```

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Users endpoint' });
}
```

### Add a Database Model

1. **Update schema:**
   ```prisma
   // prisma/schema.prisma
   model Post {
     id        String   @id @default(cuid())
     title     String
     content   String   @db.Text
     authorId  String
     author    User     @relation(fields: [authorId], references: [id])
     createdAt DateTime @default(now())
   }
   ```

2. **Create migration:**
   ```bash
   npx prisma migrate dev --name add_post_model
   ```

3. **Generate client:**
   ```bash
   npx prisma generate
   ```

### Add Environment Variable

1. **Add to `.env.local`:**
   ```bash
   NEW_API_KEY="your-key-here"
   ```

2. **Add type definition:**
   ```typescript
   // types/env.d.ts
   declare namespace NodeJS {
     interface ProcessEnv {
       NEW_API_KEY: string;
     }
   }
   ```

3. **Use in code:**
   ```typescript
   const apiKey = process.env.NEW_API_KEY;
   ```

---

## Debugging

### VS Code Debug Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Console Logging

```typescript
// Development only logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Use debug library for structured logging
import debug from 'debug';
const log = debug('app:api');
log('Processing request', { userId, action });
```

### React DevTools

Install React DevTools browser extension for:
- Component tree inspection
- Props and state debugging
- Performance profiling

### Database Debugging

```bash
# View database in Prisma Studio
npx prisma studio

# Run SQL queries
psql nexora_dev

# View query logs
# Add to prisma client:
log: ['query', 'info', 'warn', 'error']
```

### Network Debugging

Use browser DevTools Network tab:
- Monitor API requests
- Inspect request/response
- Check timing
- View headers

---

## Performance Tips

1. **Use React.memo for expensive components**
2. **Implement proper loading states**
3. **Optimize images with next/image**
4. **Use dynamic imports for code splitting**
5. **Enable Prisma query optimization**
6. **Implement proper caching strategies**
7. **Monitor bundle size with webpack-bundle-analyzer**

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)

---

**Happy Coding! 🚀**
