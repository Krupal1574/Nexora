# API Documentation

**Last Updated:** October 2, 2026

## Overview

This document covers all API endpoints in the Nexora platform. All endpoints follow RESTful conventions and return JSON responses.

## Base URL

```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

## Authentication

Most admin endpoints require authentication via NextAuth session cookies. Public endpoints are marked as such.

### Authentication Headers
```
Cookie: next-auth.session-token=<token>
```

## API Endpoints

### Authentication (`/api/auth`)

Handled by NextAuth.js with the following providers:

#### **POST** `/api/auth/signin`
Sign in with credentials or OAuth provider.

#### **POST** `/api/auth/signout`
Sign out current user.

#### **GET** `/api/auth/session`
Get current session information.

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "CUSTOMER | ADMIN",
    "image": "string"
  },
  "expires": "ISO8601 timestamp"
}
```

---

### User Management (`/api/user`)

#### **GET** `/api/user/profile`
Get current user's profile information.

**Auth Required:** Yes

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "jobTitle": "string",
  "company": "string",
  "role": "CUSTOMER | ADMIN",
  "candidateProfile": {
    "bio": "string",
    "skills": ["string"],
    "experience": "number"
  }
}
```

#### **PUT** `/api/user/profile`
Update user profile.

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "string",
  "phone": "string",
  "jobTitle": "string",
  "company": "string"
}
```

---

### Admin - Users (`/api/admin/users`)

#### **GET** `/api/admin/users`
List all users with pagination.

**Auth Required:** Admin

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `role` (optional: "CUSTOMER" | "ADMIN")
- `search` (optional: string)

**Response:**
```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "CUSTOMER | ADMIN",
      "isDisabled": "boolean",
      "createdAt": "ISO8601"
    }
  ],
  "total": "number",
  "page": "number",
  "totalPages": "number"
}
```

#### **PATCH** `/api/admin/users/[id]`
Update user (disable/enable, change role).

**Auth Required:** Admin

**Request Body:**
```json
{
  "isDisabled": "boolean",
  "role": "CUSTOMER | ADMIN"
}
```

---

### Admin - Blogs (`/api/admin/blogs`)

#### **GET** `/api/admin/blogs`
List all blog posts.

**Auth Required:** Admin

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `status` (optional: "PUBLISHED" | "DRAFT")

**Response:**
```json
{
  "blogs": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "excerpt": "string",
      "content": "string",
      "image": "string",
      "status": "PUBLISHED | DRAFT",
      "publishedAt": "ISO8601",
      "author": {
        "name": "string",
        "email": "string"
      }
    }
  ],
  "total": "number"
}
```

#### **POST** `/api/admin/blogs`
Create new blog post.

**Auth Required:** Admin

**Request Body:**
```json
{
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string",
  "image": "string",
  "status": "PUBLISHED | DRAFT",
  "tags": ["string"]
}
```

#### **PUT** `/api/admin/blogs/[id]`
Update existing blog post.

**Auth Required:** Admin

#### **DELETE** `/api/admin/blogs/[id]`
Delete blog post.

**Auth Required:** Admin

---

### Admin - Courses (`/api/admin/courses`)

#### **GET** `/api/admin/courses`
List all courses.

**Auth Required:** Admin

**Response:**
```json
{
  "courses": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "price": "number",
      "duration": "string",
      "level": "BEGINNER | INTERMEDIATE | ADVANCED",
      "lessons": [
        {
          "id": "string",
          "title": "string",
          "duration": "number",
          "order": "number"
        }
      ]
    }
  ]
}
```

#### **POST** `/api/admin/courses`
Create new course.

**Auth Required:** Admin

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "duration": "string",
  "level": "BEGINNER | INTERMEDIATE | ADVANCED",
  "image": "string"
}
```

#### **PUT** `/api/admin/courses/[id]`
Update course.

**Auth Required:** Admin

#### **DELETE** `/api/admin/courses/[id]`
Delete course.

**Auth Required:** Admin

---

### Admin - Products (`/api/admin/products`)

#### **GET** `/api/admin/products`
List all products/services.

**Auth Required:** Admin

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "status": "ACTIVE | INACTIVE | OUT_OF_STOCK",
      "category": "string",
      "image": "string"
    }
  ]
}
```

#### **POST** `/api/admin/products`
Create new product.

**Auth Required:** Admin

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "status": "ACTIVE | INACTIVE | OUT_OF_STOCK",
  "category": "string",
  "image": "string",
  "features": ["string"]
}
```

#### **PUT** `/api/admin/products/[id]`
Update product.

**Auth Required:** Admin

#### **DELETE** `/api/admin/products/[id]`
Delete product.

**Auth Required:** Admin

---

### Admin - Orders (`/api/admin/orders`)

#### **GET** `/api/admin/orders`
List all orders.

**Auth Required:** Admin

**Query Parameters:**
- `status` (optional: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED")
- `page` (number)
- `limit` (number)

**Response:**
```json
{
  "orders": [
    {
      "id": "string",
      "orderNumber": "string",
      "status": "PENDING | CONFIRMED | PROCESSING | SHIPPED | DELIVERED | CANCELLED | REFUNDED",
      "paymentStatus": "PENDING | PAID | FAILED | REFUNDED | PARTIALLY_REFUNDED",
      "total": "number",
      "user": {
        "name": "string",
        "email": "string"
      },
      "items": [
        {
          "product": {
            "name": "string"
          },
          "quantity": "number",
          "price": "number"
        }
      ],
      "createdAt": "ISO8601"
    }
  ],
  "total": "number"
}
```

#### **PATCH** `/api/admin/orders/[id]`
Update order status.

**Auth Required:** Admin

**Request Body:**
```json
{
  "status": "PENDING | CONFIRMED | PROCESSING | SHIPPED | DELIVERED | CANCELLED | REFUNDED",
  "paymentStatus": "PENDING | PAID | FAILED | REFUNDED | PARTIALLY_REFUNDED"
}
```

---

### Admin - Coupons (`/api/admin/coupons`)

#### **GET** `/api/admin/coupons`
List all coupons.

**Auth Required:** Admin

**Response:**
```json
{
  "coupons": [
    {
      "id": "string",
      "code": "string",
      "discount": "number",
      "type": "PERCENTAGE | FIXED",
      "validFrom": "ISO8601",
      "validUntil": "ISO8601",
      "usageLimit": "number",
      "usageCount": "number",
      "isActive": "boolean"
    }
  ]
}
```

#### **POST** `/api/admin/coupons`
Create new coupon.

**Auth Required:** Admin

**Request Body:**
```json
{
  "code": "string",
  "discount": "number",
  "type": "PERCENTAGE | FIXED",
  "validFrom": "ISO8601",
  "validUntil": "ISO8601",
  "usageLimit": "number",
  "minPurchase": "number"
}
```

#### **PUT** `/api/admin/coupons/[id]`
Update coupon.

**Auth Required:** Admin

#### **DELETE** `/api/admin/coupons/[id]`
Delete coupon.

**Auth Required:** Admin

---

### Admin - Testimonials (`/api/admin/testimonials`)

#### **GET** `/api/admin/testimonials`
List all testimonials.

**Auth Required:** Admin

**Response:**
```json
{
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "company": "string",
      "content": "string",
      "rating": "number",
      "image": "string",
      "isPublished": "boolean"
    }
  ]
}
```

#### **POST** `/api/admin/testimonials`
Create new testimonial.

**Auth Required:** Admin

**Request Body:**
```json
{
  "name": "string",
  "role": "string",
  "company": "string",
  "content": "string",
  "rating": "number",
  "image": "string",
  "isPublished": "boolean"
}
```

#### **PUT** `/api/admin/testimonials/[id]`
Update testimonial.

**Auth Required:** Admin

#### **DELETE** `/api/admin/testimonials/[id]`
Delete testimonial.

**Auth Required:** Admin

---

### Admin - Inquiries (`/api/admin/inquiries`)

#### **GET** `/api/admin/inquiries`
List all contact form inquiries.

**Auth Required:** Admin

**Query Parameters:**
- `status` (optional: "NEW" | "IN_PROGRESS" | "RESOLVED")
- `page` (number)
- `limit` (number)

**Response:**
```json
{
  "inquiries": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "subject": "string",
      "message": "string",
      "status": "NEW | IN_PROGRESS | RESOLVED",
      "createdAt": "ISO8601"
    }
  ],
  "total": "number"
}
```

#### **PATCH** `/api/admin/inquiries/[id]`
Update inquiry status.

**Auth Required:** Admin

**Request Body:**
```json
{
  "status": "NEW | IN_PROGRESS | RESOLVED"
}
```

---

### Admin - Audit Logs (`/api/admin/logs`)

#### **GET** `/api/admin/logs`
Get admin activity audit logs.

**Auth Required:** Admin

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `userId` (optional: string)
- `action` (optional: string)

**Response:**
```json
{
  "logs": [
    {
      "id": "string",
      "userId": "string",
      "user": {
        "name": "string",
        "email": "string"
      },
      "action": "string",
      "resource": "string",
      "resourceId": "string",
      "metadata": "object",
      "ipAddress": "string",
      "userAgent": "string",
      "createdAt": "ISO8601"
    }
  ],
  "total": "number"
}
```

---

### Admin - Settings (`/api/admin/settings`)

#### **GET** `/api/admin/settings`
Get site settings.

**Auth Required:** Admin

**Response:**
```json
{
  "siteName": "string",
  "siteDescription": "string",
  "contactEmail": "string",
  "contactPhone": "string",
  "socialMedia": {
    "linkedin": "string",
    "twitter": "string",
    "facebook": "string"
  },
  "features": {
    "chatbot": "boolean",
    "blog": "boolean",
    "ecommerce": "boolean"
  }
}
```

#### **PUT** `/api/admin/settings`
Update site settings.

**Auth Required:** Admin

---

### Admin - Media (`/api/admin/media`)

#### **POST** `/api/admin/media`
Upload media file.

**Auth Required:** Admin

**Content-Type:** `multipart/form-data`

**Request Body:**
```
file: File
```

**Response:**
```json
{
  "url": "string",
  "name": "string",
  "size": "number",
  "type": "string"
}
```

---

### Public - Blogs (`/api/blogs`)

#### **GET** `/api/blogs`
Get published blog posts (public).

**Auth Required:** No

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `tag` (optional: string)

**Response:**
```json
{
  "blogs": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "excerpt": "string",
      "image": "string",
      "publishedAt": "ISO8601",
      "tags": ["string"]
    }
  ],
  "total": "number"
}
```

#### **GET** `/api/blogs/[slug]`
Get single blog post by slug.

**Auth Required:** No

---

### Public - Products (`/api/products`)

#### **GET** `/api/products`
Get active products (public).

**Auth Required:** No

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "image": "string",
      "features": ["string"]
    }
  ]
}
```

#### **GET** `/api/products/[id]`
Get single product details.

**Auth Required:** No

---

### Public - Testimonials (`/api/testimonials`)

#### **GET** `/api/testimonials`
Get published testimonials (public).

**Auth Required:** No

**Response:**
```json
{
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "company": "string",
      "content": "string",
      "rating": "number",
      "image": "string"
    }
  ]
}
```

---

### Forms (`/api/forms`)

#### **POST** `/api/forms/contact`
Submit contact form inquiry.

**Auth Required:** No

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully"
}
```

---

### Address Autocomplete (`/api/address`)

#### **GET** `/api/address/autocomplete`
Get address suggestions using Google Places API.

**Auth Required:** Yes

**Query Parameters:**
- `input` (string, required)

**Response:**
```json
{
  "predictions": [
    {
      "description": "string",
      "placeId": "string"
    }
  ]
}
```

---

### Chat (`/api/chat`)

#### **POST** `/api/chat`
AI chatbot endpoint with streaming support.

**Auth Required:** No

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user | assistant",
      "content": "string"
    }
  ]
}
```

**Response:** Server-Sent Events (SSE) stream with AI responses.

---

### News Feed (`/api/news`)

#### **GET** `/api/news`
Get aggregated news from RSS feeds.

**Auth Required:** No

**Response:**
```json
{
  "articles": [
    {
      "title": "string",
      "link": "string",
      "pubDate": "ISO8601",
      "source": "string",
      "description": "string"
    }
  ]
}
```

---

### Integrations - Google Sheets (`/api/integrations/sheets`)

#### **POST** `/api/integrations/sheets/export`
Export data to Google Sheets.

**Auth Required:** Admin

**Request Body:**
```json
{
  "spreadsheetId": "string",
  "data": [
    ["column1", "column2"],
    ["value1", "value2"]
  ]
}
```

---

### Calendar (`/api/calendar`)

#### **GET** `/api/calendar/availability`
Get available time slots.

**Auth Required:** Yes

**Query Parameters:**
- `date` (ISO8601 date string)

**Response:**
```json
{
  "slots": [
    {
      "start": "ISO8601",
      "end": "ISO8601",
      "available": "boolean"
    }
  ]
}
```

#### **POST** `/api/calendar/book`
Book a time slot.

**Auth Required:** Yes

**Request Body:**
```json
{
  "slot": "ISO8601",
  "purpose": "string",
  "notes": "string"
}
```

---

## Error Responses

All endpoints return standard error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

### Common Error Codes
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (authenticated but insufficient permissions)
- `404` - Not Found
- `400` - Bad Request (validation error)
- `500` - Internal Server Error
- `429` - Too Many Requests (rate limited)

### Error Code Examples
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

```json
{
  "error": "Admin access required",
  "code": "FORBIDDEN",
  "statusCode": 403
}
```

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": {
    "email": "Invalid email format",
    "name": "Name is required"
  }
}
```

## Rate Limiting

- Public endpoints: 100 requests per 15 minutes per IP
- Authenticated endpoints: 1000 requests per 15 minutes per user
- Admin endpoints: 5000 requests per 15 minutes per admin

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1696253400
```

## Pagination

Paginated endpoints return:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## API Versioning

Current API version: **v1** (implicit, no version prefix required)

Future versions will use prefix: `/api/v2/...`
