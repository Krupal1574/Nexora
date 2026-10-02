# Component Library Documentation

**Last Updated:** October 2, 2026

## Overview

This document catalogs all reusable components in the Nexora platform. Components are built with React 19, TypeScript, and Framer Motion for animations.

## Component Categories

1. [Layout Components](#layout-components)
2. [Motion Components](#motion-components)
3. [Candidate Components](#candidate-components)
4. [Navigation Components](#navigation-components)
5. [Providers & Context](#providers--context)
6. [UI Components](#ui-components)

---

## Layout Components

### Footer

**Location:** `components/Footer.tsx`

Main site footer with navigation links, social media, and contact information.

**Usage:**
```tsx
import Footer from '@/components/Footer';

<Footer />
```

**Features:**
- Multi-column layout
- Social media links
- Newsletter subscription
- Contact information
- Responsive design

---

### AdminLayoutWrapper

**Location:** `components/AdminLayoutWrapper.tsx`

Wrapper component for admin dashboard pages with sidebar navigation.

**Props:**
```typescript
interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
}
```

**Usage:**
```tsx
import AdminLayoutWrapper from '@/components/AdminLayoutWrapper';

<AdminLayoutWrapper title="Dashboard">
  {/* Admin page content */}
</AdminLayoutWrapper>
```

**Features:**
- Sidebar navigation
- Breadcrumbs
- User menu
- Responsive mobile menu
- Role-based access control

---

## Motion Components

Advanced animation components using Framer Motion for smooth, engaging interactions.

### Magnetic

**Location:** `components/motion/Magnetic.tsx`

Creates a magnetic effect where elements follow the cursor.

**Props:**
```typescript
interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Default: 0.3
  className?: string;
}
```

**Usage:**
```tsx
import Magnetic from '@/components/motion/Magnetic';

<Magnetic strength={0.5}>
  <button>Hover me</button>
</Magnetic>
```

**Best For:**
- Call-to-action buttons
- Interactive cards
- Hero sections

---

### Marquee

**Location:** `components/motion/Marquee.tsx`

Infinite scrolling text/content marquee.

**Props:**
```typescript
interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // Default: 30
  direction?: 'left' | 'right'; // Default: 'left'
  pauseOnHover?: boolean; // Default: true
  className?: string;
}
```

**Usage:**
```tsx
import Marquee from '@/components/motion/Marquee';

<Marquee speed={40} direction="left">
  <span>Career Counseling • Resume Building • Interviews</span>
</Marquee>
```

**Best For:**
- Service lists
- Partner logos
- Testimonial tickers
- Feature highlights

---

### HorizontalScroll

**Location:** `components/motion/HorizontalScroll.tsx`

Converts vertical scroll into horizontal content movement.

**Props:**
```typescript
interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
import HorizontalScroll from '@/components/motion/HorizontalScroll';

<HorizontalScroll>
  <div className="flex gap-8">
    {items.map(item => <Card key={item.id} {...item} />)}
  </div>
</HorizontalScroll>
```

**Best For:**
- Project galleries
- Service showcases
- Timeline displays

---

### HoverPreviewList

**Location:** `components/motion/HoverPreviewList.tsx`

List with large preview images that appear on hover.

**Props:**
```typescript
interface HoverPreviewListProps {
  items: {
    title: string;
    description: string;
    image: string;
    tag?: string;
  }[];
  className?: string;
}
```

**Usage:**
```tsx
import HoverPreviewList from '@/components/motion/HoverPreviewList';

<HoverPreviewList items={services} />
```

**Best For:**
- Service listings
- Project portfolios
- Team member bios

---

### DragRail

**Location:** `components/motion/DragRail.tsx`

Draggable horizontal carousel with momentum scrolling.

**Props:**
```typescript
interface DragRailProps {
  children: React.ReactNode;
  className?: string;
  dragConstraints?: { left: number; right: number };
}
```

**Usage:**
```tsx
import DragRail from '@/components/motion/DragRail';

<DragRail>
  <div className="flex gap-4">
    {cards.map(card => <Card key={card.id} {...card} />)}
  </div>
</DragRail>
```

**Best For:**
- Image galleries
- Product carousels
- Testimonial sliders

---

### ParallaxImage

**Location:** `components/motion/ParallaxImage.tsx`

Image with parallax scroll effect.

**Props:**
```typescript
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // Default: 0.5
  className?: string;
}
```

**Usage:**
```tsx
import ParallaxImage from '@/components/motion/ParallaxImage';

<ParallaxImage 
  src="/hero-image.jpg" 
  alt="Hero" 
  speed={0.3}
/>
```

**Best For:**
- Hero sections
- Feature showcases
- Visual storytelling

---

### MaskLines

**Location:** `components/motion/MaskLines.tsx`

Text reveal animation that masks in line by line.

**Props:**
```typescript
interface MaskLinesProps {
  children: React.ReactNode;
  delay?: number; // Default: 0
  className?: string;
}
```

**Usage:**
```tsx
import MaskLines from '@/components/motion/MaskLines';

<MaskLines delay={0.2}>
  <h1>Welcome to Nexora</h1>
</MaskLines>
```

**Best For:**
- Headlines
- Hero text
- Section titles

---

### ScrollFillText

**Location:** `components/motion/ScrollFillText.tsx`

Text that fills with color as user scrolls.

**Props:**
```typescript
interface ScrollFillTextProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
import ScrollFillText from '@/components/motion/ScrollFillText';

<ScrollFillText>
  <h2>Our Mission</h2>
</ScrollFillText>
```

**Best For:**
- Long-form content
- Story sections
- Feature descriptions

---

### CtaSection

**Location:** `components/motion/CtaSection.tsx`

Call-to-action section with animations.

**Props:**
```typescript
interface CtaSectionProps {
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  className?: string;
}
```

**Usage:**
```tsx
import CtaSection from '@/components/motion/CtaSection';

<CtaSection
  title="Ready to start?"
  description="Join hundreds of successful candidates"
  primaryButton={{ text: "Get Started", href: "/signup" }}
  secondaryButton={{ text: "Learn More", href: "/about" }}
/>
```

---

### CustomCursor

**Location:** `components/motion/CustomCursor.tsx`

Custom cursor that follows mouse movement.

**Props:**
```typescript
interface CustomCursorProps {
  enabled?: boolean; // Default: true
}
```

**Usage:**
```tsx
import CustomCursor from '@/components/motion/CustomCursor';

// In layout or app
<CustomCursor />
```

**Features:**
- Smooth following
- Hover state changes
- Click animations
- Desktop only (hidden on mobile)

---

### Preloader

**Location:** `components/motion/Preloader.tsx`

Site preloader with animation.

**Usage:**
```tsx
import { useSiteReady } from '@/components/motion/Preloader';

const HomePage = () => {
  const { isReady } = useSiteReady();
  
  if (!isReady) return <Preloader />;
  
  return <div>Content</div>;
};
```

---

## Candidate Components

Components specific to candidate profile management.

### ProfileForm

**Location:** `components/candidate/ProfileForm.tsx`

Form for editing candidate profile information.

**Props:**
```typescript
interface ProfileFormProps {
  initialData?: Partial<CandidateProfile>;
  onSubmit: (data: CandidateProfile) => Promise<void>;
}
```

**Usage:**
```tsx
import ProfileForm from '@/components/candidate/ProfileForm';

<ProfileForm 
  initialData={profile}
  onSubmit={handleProfileUpdate}
/>
```

**Features:**
- Form validation with Zod
- Skills tags input
- Location autocomplete
- Salary range slider
- Social links validation

---

### ResumeUpload

**Location:** `components/candidate/ResumeUpload.tsx`

Resume file upload with preview.

**Props:**
```typescript
interface ResumeUploadProps {
  onUpload: (file: File) => Promise<void>;
  currentResume?: {
    fileName: string;
    fileUrl: string;
    uploadedAt: Date;
  };
}
```

**Usage:**
```tsx
import ResumeUpload from '@/components/candidate/ResumeUpload';

<ResumeUpload 
  onUpload={handleResumeUpload}
  currentResume={resume}
/>
```

**Features:**
- Drag-and-drop upload
- File type validation (PDF, DOC, DOCX)
- File size limit (5MB)
- Preview current resume
- Download option

---

### AvatarUpload

**Location:** `components/candidate/AvatarUpload.tsx`

Profile picture upload with crop.

**Props:**
```typescript
interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<void>;
}
```

**Usage:**
```tsx
import AvatarUpload from '@/components/candidate/AvatarUpload';

<AvatarUpload 
  currentAvatar={user.image}
  onUpload={handleAvatarUpload}
/>
```

**Features:**
- Image preview
- Circular crop
- File size validation
- Image optimization

---

### SecuritySettings

**Location:** `components/candidate/SecuritySettings.tsx`

Security settings for candidate accounts.

**Props:**
```typescript
interface SecuritySettingsProps {
  userId: string;
}
```

**Usage:**
```tsx
import SecuritySettings from '@/components/candidate/SecuritySettings';

<SecuritySettings userId={user.id} />
```

**Features:**
- Change password
- Change email (with verification)
- Two-factor authentication toggle
- Session management
- Account deletion

---

## Navigation Components

### MobileBottomNav

**Location:** `components/MobileBottomNav.tsx`

Bottom navigation bar for mobile devices.

**Usage:**
```tsx
import MobileBottomNav from '@/components/MobileBottomNav';

<MobileBottomNav />
```

**Features:**
- Fixed bottom position
- Icon + label
- Active state highlighting
- Badge support for notifications
- Responsive (hidden on desktop)

**Navigation Items:**
- Home
- Services
- Cart
- Profile

---

## Providers & Context

### AuthProvider

**Location:** `components/AuthProvider.tsx`

Authentication context provider using NextAuth.

**Usage:**
```tsx
import AuthProvider from '@/components/AuthProvider';

// In app layout
<AuthProvider>
  {children}
</AuthProvider>
```

**Provides:**
- User session
- Login/logout methods
- Authentication state
- Protected route logic

---

### CartProvider

**Location:** `components/CartProvider.tsx`

Shopping cart state management.

**Context API:**
```typescript
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}
```

**Usage:**
```tsx
import { CartProvider, useCart } from '@/components/CartProvider';

// Wrap app
<CartProvider>
  {children}
</CartProvider>

// In component
const { items, addItem, total } = useCart();
```

**Features:**
- Local storage persistence
- Cart total calculation
- Item quantity management
- Clear cart functionality

---

### AnalyticsManager

**Location:** `components/AnalyticsManager.tsx`

Client-side analytics tracking.

**Usage:**
```tsx
import AnalyticsManager from '@/components/AnalyticsManager';

// In app layout
<AnalyticsManager />
```

**Tracks:**
- Page views
- User events
- Conversions
- Error events

---

## UI Components

### CartIcon

**Location:** `components/CartIcon.tsx`

Shopping cart icon with item count badge.

**Props:**
```typescript
interface CartIconProps {
  className?: string;
}
```

**Usage:**
```tsx
import CartIcon from '@/components/CartIcon';

<CartIcon />
```

**Features:**
- Animated badge
- Click to open cart
- Real-time count updates

---

### Chatbot

**Location:** `components/Chatbot.tsx`

AI-powered chatbot widget.

**Usage:**
```tsx
import Chatbot from '@/components/Chatbot';

<Chatbot />
```

**Features:**
- Floating chat button
- Message history
- Typing indicators
- AI streaming responses
- Minimizable widget

---

### AddressAutocomplete

**Location:** `components/AddressAutocomplete.tsx`

Address input with Google Places autocomplete.

**Props:**
```typescript
interface AddressAutocompleteProps {
  onSelect: (address: Address) => void;
  defaultValue?: string;
  className?: string;
}
```

**Usage:**
```tsx
import AddressAutocomplete from '@/components/AddressAutocomplete';

<AddressAutocomplete 
  onSelect={handleAddressSelect}
  defaultValue={currentAddress}
/>
```

**Features:**
- Google Places API integration
- Debounced search
- Structured address parsing
- Validation

---

## Component Patterns

### Animation Variants

Standard Framer Motion variants used across components:

```typescript
// Fade in from bottom
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Scale in
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.4 }
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Responsive Hooks

Common responsive utilities:

```typescript
// useMediaQuery hook
import { useMediaQuery } from '@/hooks/useMediaQuery';

const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');
```

### Form Validation

Standard form validation with Zod:

```typescript
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
});

type ProfileFormData = z.infer<typeof profileSchema>;
```

---

## Styling Conventions

### Tailwind Classes

Standard spacing and sizing:
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card: `bg-nexora-card rounded-xl p-6 shadow-glass`
- Button Primary: `bg-nexora-gradient text-white px-6 py-3 rounded-lg font-medium`
- Button Secondary: `border-2 border-nexora-cyan text-nexora-cyan px-6 py-3 rounded-lg font-medium`

### Color Usage

- **Background layers:** nexora-bg → nexora-surface → nexora-card
- **Primary actions:** nexora-cyan, nexora-teal
- **Text:** nexora-white (primary), nexora-muted (secondary)
- **Borders:** nexora-border

### Animation Timing

- Quick interactions: 200-300ms
- Standard transitions: 400-600ms
- Page transitions: 600-800ms
- Scroll animations: Use scroll progress (0-1)

---

## Accessibility

All components follow WCAG 2.1 AA standards:

1. **Keyboard Navigation**
   - All interactive elements accessible via Tab
   - Enter/Space to activate
   - Escape to close modals/menus

2. **Screen Readers**
   - Semantic HTML
   - ARIA labels where needed
   - Focus management

3. **Color Contrast**
   - Minimum 4.5:1 for text
   - 3:1 for interactive elements

4. **Motion**
   - Respect `prefers-reduced-motion`
   - Provide static alternatives

---

## Testing Components

Example test pattern:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from '@/components/candidate/ProfileForm';

describe('ProfileForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = jest.fn();
    render(<ProfileForm onSubmit={onSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  });
});
```

---

## Performance Optimization

1. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting

2. **Lazy Loading**
   - Images with Next.js Image component
   - Below-the-fold content

3. **Memoization**
   - Use `React.memo` for pure components
   - `useMemo` for expensive calculations
   - `useCallback` for event handlers

4. **Bundle Size**
   - Tree-shaking unused code
   - Import only needed utilities
   - Monitor with `next/bundle-analyzer`

---

## Component Development Guidelines

1. **File Structure**
   ```
   ComponentName/
   ├── index.tsx          # Main component
   ├── ComponentName.tsx  # Component logic
   ├── styles.module.css  # Optional CSS modules
   └── types.ts           # TypeScript types
   ```

2. **Props Interface**
   - Always define explicit prop types
   - Use optional chaining for optional props
   - Provide default values where appropriate

3. **Error Boundaries**
   - Wrap critical components in error boundaries
   - Provide fallback UI

4. **Documentation**
   - JSDoc comments for public APIs
   - Props table in Storybook
   - Usage examples

---

## Future Components (Roadmap)

- [ ] DataTable with sorting/filtering
- [ ] DatePicker component
- [ ] File manager component
- [ ] Rich text editor
- [ ] Video player with controls
- [ ] Advanced form builder
- [ ] Kanban board component
- [ ] Calendar/scheduling component
