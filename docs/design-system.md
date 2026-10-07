# Nexora Staffing LLP — Unified Visual Design System

## Purpose
To establish a single, cohesive visual language across the Nexora Staffing LLP website, elevating the brand's digital presence without altering the existing site structure, functionality, service names, or pricing.

## Core Palette
The palette is designed to convey a premium, professional, and modern talent consultancy aesthetic.

| Token | Hex | Use | Proportion |
|---|---|---|---|
| Cream White | `#F5F1E8` | Main backgrounds and light surfaces | ~70% |
| Coal Black | `#171717` | Dark sections, headings, strong text, footer | ~20% |
| Orange | `#F26A21` | Primary CTA, focus states, and brand accent | ~8% |
| Soft Blue | `#8FB8D8` | Secondary/subtle accent, restrained highlights | ~2% |
| Muted Gray | `#77736D` | Secondary text, placeholders, and metadata | N/A |

## Visual Direction
**The Aesthetic:** Premium, minimal, professional, modern staffing/talent consultancy, with an editorial corporate approach.
**Key Elements:** Clean whitespace, subtle glassmorphism, soft blur, natural drop shadows, restrained orange accents, and very limited blue accents.
**To Avoid:** Cyberpunk themes, excessive neon/glow effects, heavy gradients, generic SaaS card grids, and repetitive/monotonous layouts.

## Design Tokens
Implement these centrally via CSS variables or Tailwind tokens to ensure consistency and maintainability. Raw hex values should not be scattered throughout the components.

```css
:root {
  /* Colors */
  --nexora-cream: #F5F1E8;
  --nexora-coal: #171717;
  --nexora-orange: #F26A21;
  --nexora-blue: #8FB8D8;
  --nexora-muted: #77736D;
  
  /* Borders */
  --nexora-border-light: rgba(23, 23, 23, 0.12);
  --nexora-border-dark: rgba(245, 241, 232, 0.14);
  
  /* Glassmorphism */
  --nexora-glass-light: rgba(245, 241, 232, 0.72);
  --nexora-glass-dark: rgba(23, 23, 23, 0.72);
  
  /* Shadows */
  --nexora-shadow-soft: 0 12px 40px rgba(23, 23, 23, 0.08);
  --nexora-shadow-medium: 0 20px 60px rgba(23, 23, 23, 0.12);
}
```

## Typography
Maintain the existing clean sans-serif system where possible, emphasizing strong hierarchy, editorial spacing, and readability.

- **H1:** 56–80px desktop
- **H2:** 40–56px
- **H3:** 28–36px
- **H4:** 20–24px
- **Responsiveness:** Scale typography naturally on mobile and tablet devices.
- **Coloring:** 
  - Primary text on light backgrounds: Coal Black
  - Primary text on dark backgrounds: Cream White
  - Secondary/Metadata text: Muted Gray

## Components

### Buttons
- **Primary:** Orange background, white text, restrained border radius, subtle upward translation on hover. No neon glow or heavy drop shadows.
- **Secondary:** Cream or transparent surface with a Coal Black border.
- **Dark CTA:** Coal Black background with Cream White text.

### Cards & Surfaces
- **Style:** Cream or subtle translucent surfaces, thin borders, moderate border radius, and natural shadows (`--nexora-shadow-soft`). Generous internal padding (whitespace).
- **Avoid:** Excessive glass effects, huge ungrounded shadows, neon borders, and repetitive generic SaaS card grids. 

### Glass Effects (Restricted Use)
Use selectively for floating elements (e.g., sticky navigation, overlapping UI panels, modals).
- **Light Glass:** `background: var(--nexora-glass-light); backdrop-filter: blur(18px); border: 1px solid var(--nexora-border-light);`
- **Dark Glass:** `background: var(--nexora-glass-dark); backdrop-filter: blur(18px); border: 1px solid var(--nexora-border-dark);`

### Forms
Clean, editorial styling. Cream/white surfaces, Coal Black text, Muted Gray placeholders, and subtle borders. Focus states should use the Orange accent. Error and success states must be clear, accessible, and distinct.

### Badges
Use for small editorial labels (e.g., `PRO SERVICE`, `FEATURED`, `NEW`, `CAREER SUPPORT`, `HIRING`). 
- **Styling:** Uppercase typography, slight letter spacing, thin borders, restrained orange accents. Avoid oversized pills.

## Page Sections

### Navigation
- **Light pages:** Cream background, Coal text, Orange active/CTA.
- **Dark pages:** Coal background, Cream text, Orange CTA.
- *Note: Use blur/transparency only where it strictly improves readability.*

### Product & Service Cards
- **Constraint:** Preserve every existing service name, price, category, description, image, CTA, and functionality.
- **Styling:** Cream surfaces, Coal typography, small Orange accents, high-quality imagery, and subtle hover elevation. Make offerings feel like premium services rather than generic ecommerce tiles.

### Testimonials
Prioritize storytelling. Use large quotations, real person/story context, subtle imagery, and editorial spacing. 
- *Constraint: Do not add unsupported statistics or claims (e.g., salary increases, placement percentages, time-to-offer stats).*

### Blog
Adopt an editorial magazine approach. Use featured stories, strong typography, asymmetric/varied layouts, categories, large imagery, and clean metadata instead of standard, repetitive card grids.

### Footer
Coal background, Cream typography, Orange accents. Minimal links, strong company identity, clear contact information, and subtle separators.

### Modals & Drawers
Coal/Cream surfaces, restrained backdrop blur, natural shadows, thin borders. Ensure clear close controls, proper focus management, and subtle entrance/exit transitions.

## Interaction & Motion

### Hover & Focus
- **Movement:** Restrained (e.g., `translateY(-2px)`).
- **Effects:** Subtle shadow increase, Orange accent color shift, minimal image scaling (1.02–1.04x).
- **Focus States:** Clearly visible, leveraging the Orange accent for accessibility.
- **Avoid:** Large scaling, flashing, or neon effects.

### Motion Guidelines
Preserve existing motion where appropriate. Any new motion should communicate navigation, hierarchy, transition, interaction, or storytelling. Strictly respect `prefers-reduced-motion` media queries.

### Loading States
Use subtle Cream/Coal skeletons with minimal motion. Avoid bright, fast-animated placeholders.

## Imagery
Keep existing high-quality imagery. Do not replace images unnecessarily. If new imagery is required, it must be realistic, professional, corporate, human-centric, minimally styled, and naturally lit. Incorporate restrained blue/orange accents where fitting. Use the existing Nexora blue/orange logo consistently.

## Non-Negotiable Constraints
- **DO NOT** change service names or pricing.
- **DO NOT** change existing functionality or remove working features.
- **DO NOT** redesign the core structural layout of pages.
- **DO NOT** replace good imagery unnecessarily.
- **DO NOT** add fake statistics or unsupported claims.
- **DO NOT** add unnecessary third-party dependencies.
- **DO NOT** reset or destroy the production database.
