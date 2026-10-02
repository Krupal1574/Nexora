# Database Schema Documentation

**Last Updated:** October 2, 2026

## Overview

The Nexora platform uses PostgreSQL as the primary database with Prisma 8 ORM. This document details all database models, relationships, and constraints.

## Database Provider

- **Provider:** PostgreSQL
- **ORM:** Prisma 8 (RC)
- **Migration System:** Prisma Migrate

## Enums

### UserRole
Defines user access levels.

```prisma
enum UserRole {
  CUSTOMER    // Regular users/candidates
  ADMIN       // Administrative users
}
```

### OrderStatus
Tracks order lifecycle states.

```prisma
enum OrderStatus {
  PENDING       // Order created, awaiting confirmation
  CONFIRMED     // Order confirmed by admin
  PROCESSING    // Order being processed
  SHIPPED       // Order shipped to customer
  DELIVERED     // Order delivered successfully
  CANCELLED     // Order cancelled
  REFUNDED      // Order refunded
}
```

### PaymentStatus
Tracks payment states.

```prisma
enum PaymentStatus {
  PENDING              // Payment initiated
  PAID                 // Payment successful
  FAILED               // Payment failed
  REFUNDED             // Full refund issued
  PARTIALLY_REFUNDED   // Partial refund issued
}
```

### ProductStatus
Product availability states.

```prisma
enum ProductStatus {
  ACTIVE          // Product available for purchase
  INACTIVE        // Product hidden from catalog
  OUT_OF_STOCK    // Product temporarily unavailable
}
```

## Core Models

### User

Primary user model for authentication and authorization.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  image         String?
  jobTitle      String?
  company       String?
  role          UserRole  @default(CUSTOMER)
  emailVerified DateTime?

  // Contact fields
  phone         String?
  pendingPhone  String?   // Phone pending OTP verification

  // Relations
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  addresses     Address[]
  enrollments   Enrollment[]
  lessonProgress UserLessonProgress[]
  auditLogs     AdminAuditLog[]

  // Candidate profile relations
  candidateProfile    CandidateProfile?
  resume              Resume?
  pendingEmailChanges PendingEmailChange[]

  isDisabled    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([email])
}
```

**Relationships:**
- One-to-many: accounts, sessions, orders, addresses, enrollments, lesson progress, audit logs, pending email changes
- One-to-one: candidate profile, resume

**Indexes:**
- `email` - For fast user lookups

---

### Account

OAuth provider accounts (Google, etc.).

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}
```

**Relationships:**
- Many-to-one: user

**Constraints:**
- Unique combination of provider + providerAccountId
- Cascade delete when user is deleted

---

### Session

User session management.

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

**Relationships:**
- Many-to-one: user

**Constraints:**
- Unique session token
- Cascade delete when user is deleted

---

### CandidateProfile

Extended profile information for candidates.

```prisma
model CandidateProfile {
  id                String   @id @default(cuid())
  userId            String   @unique
  
  // Personal information
  bio               String?  @db.Text
  skills            String[] // Array of skills
  experience        Int?     // Years of experience
  education         String?
  certifications    String[]
  
  // Contact preferences
  preferredContact  String?  // Email, phone, etc.
  availability      String?  // Immediate, 2 weeks, etc.
  
  // Location
  currentLocation   String?
  willingToRelocate Boolean  @default(false)
  
  // Employment preferences
  desiredRole       String?
  desiredSalary     Int?
  employmentType    String?  // Full-time, contract, etc.
  
  // Social links
  linkedinUrl       String?
  githubUrl         String?
  portfolioUrl      String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

**Relationships:**
- One-to-one: user

---

### Resume

Resume file storage and metadata.

```prisma
model Resume {
  id           String   @id @default(cuid())
  userId       String   @unique
  
  fileName     String
  fileUrl      String
  fileSize     Int
  fileType     String   // application/pdf, application/msword, etc.
  
  // Parsed content
  parsedText   String?  @db.Text
  
  // Metadata
  uploadedAt   DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

**Relationships:**
- One-to-one: user

---

### PendingEmailChange

Tracks email change requests with verification.

```prisma
model PendingEmailChange {
  id        String   @id @default(cuid())
  userId    String
  newEmail  String
  token     String   @unique
  expiresAt DateTime
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
}
```

---

## E-commerce Models

### Product

Products/services offered on the platform.

```prisma
model Product {
  id          String        @id @default(cuid())
  name        String
  description String        @db.Text
  price       Float
  status      ProductStatus @default(ACTIVE)
  category    String?
  image       String?
  features    String[]      // Array of feature descriptions
  
  // Inventory
  stock       Int?          // null = unlimited
  
  orderItems  OrderItem[]
  
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([status])
  @@index([category])
}
```

**Relationships:**
- One-to-many: order items

---

### Order

Customer orders.

```prisma
model Order {
  id            String        @id @default(cuid())
  orderNumber   String        @unique
  userId        String
  
  status        OrderStatus   @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)
  
  // Pricing
  subtotal      Float
  discount      Float         @default(0)
  tax           Float         @default(0)
  total         Float
  
  // Payment
  stripePaymentIntentId String?
  paymentMethod         String?
  
  // Coupon
  couponId      String?
  coupon        Coupon?       @relation(fields: [couponId], references: [id])
  
  // Shipping
  shippingAddressId String?
  billingAddressId  String?
  shippingAddress   Address?  @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  billingAddress    Address?  @relation("BillingAddress", fields: [billingAddressId], references: [id])
  
  // Relations
  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
  
  // Timestamps
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  @@index([userId])
  @@index([orderNumber])
  @@index([status])
  @@index([paymentStatus])
}
```

**Relationships:**
- Many-to-one: user, coupon, shipping address, billing address
- One-to-many: order items

---

### OrderItem

Line items in an order.

```prisma
model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  
  quantity  Int
  price     Float   // Price at time of purchase
  
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])

  @@index([orderId])
  @@index([productId])
}
```

**Relationships:**
- Many-to-one: order, product

**Constraints:**
- Cascade delete when order is deleted

---

### Address

User addresses for shipping/billing.

```prisma
model Address {
  id          String  @id @default(cuid())
  userId      String
  
  // Address fields
  fullName    String
  line1       String
  line2       String?
  city        String
  state       String
  postalCode  String
  country     String  @default("US")
  phone       String?
  
  // Metadata
  isDefault   Boolean @default(false)
  type        String? // "shipping", "billing", or both
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Reverse relations
  ordersAsShipping Order[] @relation("ShippingAddress")
  ordersAsBilling  Order[] @relation("BillingAddress")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

**Relationships:**
- Many-to-one: user
- One-to-many: orders (as shipping or billing address)

---

### Coupon

Discount codes.

```prisma
model Coupon {
  id          String    @id @default(cuid())
  code        String    @unique
  
  // Discount
  discount    Float
  type        String    // "PERCENTAGE" or "FIXED"
  
  // Constraints
  minPurchase Float?
  maxDiscount Float?
  
  // Validity
  validFrom   DateTime
  validUntil  DateTime
  
  // Usage tracking
  usageLimit  Int?      // null = unlimited
  usageCount  Int       @default(0)
  
  isActive    Boolean   @default(true)
  
  orders      Order[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([code])
  @@index([isActive])
}
```

**Relationships:**
- One-to-many: orders

---

## Content Models

### Blog

Blog posts.

```prisma
model Blog {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String?   @db.Text
  content     String    @db.Text
  image       String?
  
  // Publishing
  status      String    @default("DRAFT") // "DRAFT" or "PUBLISHED"
  publishedAt DateTime?
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  // Categorization
  tags        String[]
  category    String?
  
  // Author
  authorId    String?
  
  // Engagement
  views       Int       @default(0)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
  @@index([status])
  @@index([publishedAt])
}
```

---

### Testimonial

Customer testimonials.

```prisma
model Testimonial {
  id          String   @id @default(cuid())
  name        String
  role        String?
  company     String?
  content     String   @db.Text
  rating      Int      // 1-5
  image       String?
  
  isPublished Boolean  @default(false)
  featured    Boolean  @default(false)
  
  // Order (for display)
  displayOrder Int?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isPublished])
  @@index([featured])
}
```

---

### Course

Training courses.

```prisma
model Course {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  
  // Pricing
  price       Float
  
  // Course info
  duration    String?  // "4 weeks", "20 hours", etc.
  level       String?  // "BEGINNER", "INTERMEDIATE", "ADVANCED"
  
  // Media
  image       String?
  videoUrl    String?
  
  // Status
  isPublished Boolean  @default(false)
  
  // Relations
  lessons     Lesson[]
  enrollments Enrollment[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([isPublished])
}
```

**Relationships:**
- One-to-many: lessons, enrollments

---

### Lesson

Course lessons.

```prisma
model Lesson {
  id          String   @id @default(cuid())
  courseId    String
  
  title       String
  description String?  @db.Text
  content     String   @db.Text
  
  // Media
  videoUrl    String?
  duration    Int?     // Duration in minutes
  
  // Ordering
  order       Int
  
  // Status
  isPublished Boolean  @default(false)
  
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  progress    UserLessonProgress[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([courseId])
  @@index([order])
}
```

**Relationships:**
- Many-to-one: course
- One-to-many: user lesson progress

---

### Enrollment

User course enrollments.

```prisma
model Enrollment {
  id          String    @id @default(cuid())
  userId      String
  courseId    String
  
  // Progress
  progress    Float     @default(0) // 0-100
  completedAt DateTime?
  
  // Payment
  orderId     String?
  
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  enrolledAt DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([userId, courseId])
  @@index([userId])
  @@index([courseId])
}
```

**Relationships:**
- Many-to-one: user, course

**Constraints:**
- Unique combination of userId + courseId (can't enroll twice)

---

### UserLessonProgress

Tracks user progress through lessons.

```prisma
model UserLessonProgress {
  id          String    @id @default(cuid())
  userId      String
  lessonId    String
  
  completed   Boolean   @default(false)
  completedAt DateTime?
  
  // Progress tracking
  lastPosition Int?     // Video timestamp or scroll position
  
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
}
```

**Relationships:**
- Many-to-one: user, lesson

**Constraints:**
- Unique combination of userId + lessonId

---

## System Models

### AdminAuditLog

Tracks administrative actions for security and compliance.

```prisma
model AdminAuditLog {
  id         String   @id @default(cuid())
  userId     String
  
  // Action details
  action     String   // "CREATE", "UPDATE", "DELETE", etc.
  resource   String   // "User", "Product", "Order", etc.
  resourceId String?
  
  // Additional context
  metadata   Json?    // Flexible JSON for action-specific data
  
  // Request details
  ipAddress  String?
  userAgent  String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([resource])
  @@index([createdAt])
}
```

**Relationships:**
- Many-to-one: user

**Use Cases:**
- Security audits
- Compliance reporting
- Debugging user actions
- Forensic analysis

---

### Inquiry

Contact form submissions.

```prisma
model Inquiry {
  id        String   @id @default(cuid())
  
  // Contact info
  name      String
  email     String
  phone     String?
  
  // Inquiry details
  subject   String?
  message   String   @db.Text
  
  // Status tracking
  status    String   @default("NEW") // "NEW", "IN_PROGRESS", "RESOLVED"
  
  // Assignment
  assignedTo String?
  
  // Internal notes
  notes     String?  @db.Text
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@index([email])
  @@index([createdAt])
}
```

---

## Relationships Summary

### User Relationships
- **1:N** → Accounts (OAuth providers)
- **1:N** → Sessions
- **1:N** → Orders
- **1:N** → Addresses
- **1:N** → Enrollments
- **1:N** → Lesson Progress
- **1:N** → Audit Logs
- **1:N** → Pending Email Changes
- **1:1** → Candidate Profile
- **1:1** → Resume

### Order Relationships
- **N:1** → User
- **N:1** → Coupon (optional)
- **N:1** → Shipping Address (optional)
- **N:1** → Billing Address (optional)
- **1:N** → Order Items

### Course Relationships
- **1:N** → Lessons
- **1:N** → Enrollments

### Product Relationships
- **1:N** → Order Items

## Database Indexes

Indexes are strategically placed on:
- Primary foreign keys (userId, orderId, courseId, etc.)
- Frequently queried fields (email, status, slug)
- Date fields used for sorting (createdAt, publishedAt)
- Unique constraints (email, slug, sessionToken)

## Cascade Deletes

The following models cascade delete to maintain referential integrity:
- User → Accounts, Sessions, Addresses, Profile, Resume
- Order → Order Items
- Course → Lessons
- Lesson → User Lesson Progress

## Data Types

### String Fields
- `@db.Text` - Used for large text content (blog posts, descriptions)
- Regular `String` - Used for shorter text (names, emails, titles)

### Numeric Fields
- `Int` - Whole numbers (quantity, years)
- `Float` - Decimal numbers (prices, ratings)

### Arrays
- `String[]` - Arrays of strings (tags, skills, features)

### JSON
- `Json` - Flexible JSON data (audit log metadata)

## Migration Strategy

- Use Prisma Migrate for schema changes
- Test migrations in development first
- Back up production database before migrations
- Use Prisma's shadow database for safe migrations

## Performance Considerations

1. **Indexes** - All foreign keys and frequently queried fields are indexed
2. **Pagination** - Use cursor-based or offset pagination for large datasets
3. **Selective Loading** - Use Prisma's `select` and `include` to load only needed data
4. **Connection Pooling** - Configured in Prisma client
5. **Query Optimization** - Use `explain analyze` in PostgreSQL for slow queries

## Security Considerations

1. **Passwords** - Hashed with Argon2 (never stored plain text)
2. **Soft Deletes** - Consider adding `deletedAt` fields for sensitive data
3. **Audit Trail** - All admin actions logged
4. **Data Encryption** - Sensitive fields can be encrypted at application level
5. **Row-Level Security** - Consider PostgreSQL RLS for multi-tenancy

## Backup Strategy

Recommended backup approach:
- Daily automated PostgreSQL backups
- Point-in-time recovery enabled
- Backup retention: 30 days minimum
- Test restore procedures quarterly
