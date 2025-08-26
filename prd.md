# Product Requirements Document (PRD) – Golden Nest Poultry Website Redesign

## 1. Overview
Golden Nest Poultry’s current website will be redesigned to provide a modern, clean, and user-friendly experience. The new site will be built with **Next.js (TypeScript)**, optimized for speed, accessibility, and SEO. This will be a **simple website** (not a complex app) with a focus on branding, storytelling, and showcasing products.

---

## 2. Goals
- Improve branding with a modern and trustworthy design.
- Provide clear navigation and easy access to products and company info.
- Use high-quality poultry images to convey freshness and quality.
- Improve SEO to attract more organic traffic.
- Ensure mobile-first, responsive design.

---

## 3. Site Structure & Flow

**Pages:**
1. **Home**
   - Hero section with high-quality farm/poultry image.
   - Short intro text with call-to-action.
   - Highlights: Products, About, Quality assurance.
   - Footer with quick links & social media.

2. **About Us**
   - Company story, values, and mission.
   - Images of farm, team, and poultry.

3. **Products**
   - Showcase poultry products (e.g., eggs, chickens).
   - Simple grid layout with product descriptions.

4. **Gallery**
   - High-quality photos of poultry and farm.
   - Carousel/lightbox for images.

5. **Quality & Safety**
   - Certifications, quality processes, and customer trust signals.

6. **Contact**
   - Contact form (name, email, message).
   - Phone, email, map integration.

**Flow Diagram:**
```
Home → About Us → Products → Gallery → Quality & Safety → Contact
```

---

## 4. Design Guidelines

**Color Schemes (Options):**
- **Warm & Earthy**: Beige (#F7F4F3), Terracotta (#D19E5A), Brown (#574337).
- **Fresh Organic**: Light Green (#16c72e), Soft Orange (#e8b730), Neutral Gray.
- **Modern Neutral**: White, Steel Gray, Bright Yellow/Orange.

**Typography:**
- Primary: Clean sans-serif (e.g., Inter, Poppins).
- Secondary: Serif/accent font for headings.

**Imagery:**
- Use free high-quality images from **Unsplash**, **Pixabay**, or **Pexels**.

---

## 5. SEO Improvements
- Add proper meta titles, descriptions, and Open Graph tags.
- Use alt attributes for all images.
- Optimize for mobile and page speed (Next.js Image Optimization).
- Structured data (JSON-LD) for business info.
- Semantic HTML for accessibility and SEO.

---

## 6. Tech Stack
- **Framework**: Next.js (TypeScript)
- **Styling**: TailwindCSS or CSS Modules
- **Deployment**: Vercel or similar hosting
- **Forms**: Next.js API route or third-party (e.g., Formspree)
- **Image handling**: Next.js Image component

---

## 7. Deliverables
- Fully responsive, SEO-optimized Next.js site.
- Pages: Home, About Us, Products, Gallery, Quality & Safety, Contact.
- Deployment-ready build.

---

## 8. Out of Scope
- No e-commerce functionality.
- No advanced CMS integration (content will be static or simple data-driven).
- No third-party marketing automation tools.

---

This PRD will serve as the guiding document for development of the Golden Nest Poultry site.

---

## 9. Detailed Development Specifications

This section provides pixel-perfect, detailed build instructions. The goal is to ensure even a lesser AI model can implement this site correctly without guesswork.

### 9.1 Layout & Styling Requirements
- **Container widths**:
  - Mobile: 100% with 16px padding
  - Tablet: 640px max width, 24px padding
  - Desktop: 1280px max width, centered with 32px padding
- **Grid system**:
  - Use CSS grid or flexbox
  - 12-column layout for desktop, 6-column for tablet
- **Spacing scale**:
  - 4px baseline grid: multiples of 4px (4, 8, 12, 16, 24, 32, 48, 64)
- **Border radius**:
  - Small buttons: 8px
  - Cards: 16px
  - Hero images: 24px
- **Shadows**:
  - Use Tailwind’s shadow-md for cards
  - Use shadow-lg for hero call-to-action buttons
- **Typography**:
  - Headings: Poppins, bold
  - Body: Inter, regular
  - Font sizes: H1 = 48px, H2 = 32px, H3 = 24px, body = 16px, small = 14px

### 9.2 UI/UX Components
Use the following libraries:
- **Aceternity UI**: For advanced cards, gradient text, spotlight effects, bento grid layouts.
- **shadcn/ui (Radix)**: For navigation menu, dialog, tooltip, accordion, form components.
- **Motion One (@motionone/react)**: For animations on scroll, hover effects, page transitions.
- **Embla Carousel**: For product and gallery carousels with parallax and progress indicators.
- **React Three Fiber (with drei)**: For 3D hero section (temporary Sketchfab poultry model).

### 9.3 Animations & Effects
- **Hero section**:
  - Animate headline fade-in with Motion One `useAnimate`.
  - Background spotlight gradient moving slowly (Aceternity spotlight).
  - Floating 3D poultry model with React Three Fiber + drei.
- **Scroll animations**:
  - Sections should fade and slide up into view using `inView` hook from Motion One.
  - Numbers (like "eggs per day") should count up with Motion’s spring animation.
- **Carousel**:
  - Embla carousel with:
    - Parallax effect
    - Progress bar indicator
    - Masked edges
    - 3D tilt on hover (using Motion One transforms)
- **Micro-interactions**:
  - Buttons scale to 1.05 on hover
  - Cards lift with shadow-lg on hover
  - Images zoom slightly on hover

### 9.4 Page Breakdown
**Home**
- Navbar (shadcn/ui navigation menu, sticky, shadow)
- Hero (3D poultry model, spotlight gradient, CTA button)
- Highlights (3-column grid with icons and text)
- Product carousel (Embla advanced carousel)
- Testimonials (cards with motion entry)
- Footer (newsletter form, contact info, social links)

**About**
- Two-column layout (text + farm image)
- Timeline component (Radix accordion for milestones)
- Values cards with Aceternity spotlight effect

**Products**
- Grid layout (2 per row on tablet, 4 per row on desktop)
- Hover animations (zoom and tilt)

**Gallery**
- Embla carousel with mixed layout (masonry style with motion effects)

**Quality & Safety**
- Certifications grid (logos)
- Animated counters (Motion One spring animation)
- Accordion for FAQ (Radix + shadcn/ui)

**Contact**
- Form (shadcn/ui form, validation included)
- Map embed (Google Maps iframe styled with border radius)
- Contact info cards

### 9.5 SEO & Accessibility
- Use Next.js Metadata API for titles, descriptions, Open Graph
- Alt text for every image
- Semantic HTML5 elements
- JSON-LD structured data for business
- Robots.txt and sitemap generated
- Radix primitives ensure accessibility
- Respect reduced-motion preference (disable parallax/3D if set)

### 9.6 File Structure
```
/app
  /components
    Navbar.tsx
    Hero.tsx
    ProductCarousel.tsx
    TestimonialCard.tsx
    Footer.tsx
  /about/page.tsx
  /products/page.tsx
  /gallery/page.tsx
  /quality/page.tsx
  /contact/page.tsx
/styles
  globals.css
  tailwind.config.ts
```

### 9.7 Build Commands
```bash
yarn create next-app golden-nest -typescript
yarn add tailwindcss @radix-ui/react-* @motionone/react embla-carousel-react @react-three/fiber @react-three/drei
yarn add -D @types/embla-carousel-react
```

### 9.8 Acceptance Criteria
- Site is fully responsive (mobile-first).
- Animations are smooth (< 16ms frame budget).
- LCP < 2.5s, CLS < 0.1, TBT < 200ms.
- All pages accessible with keyboard navigation.
- Lighthouse score > 90 for performance, SEO, accessibility.

---

## 10. Page Content & Copywriting

This section defines the exact text content to be placed on each page, with instructions on where it should appear. The implementer should use this wording verbatim unless formatting requires minor changes.

### 10.1 Home Page
- **Hero Section (top center)**
  - Heading: “Fresh Poultry, Trusted Quality”
  - Subtext: “Golden Nest Poultry is committed to delivering farm-fresh eggs and healthy chickens with the highest standards of care.”
  - CTA Button: “Explore Our Products”

- **Highlights (below hero, 3 columns)**
  1. Title: “Farm Fresh Eggs” — Text: “Nutritious and delicious eggs sourced directly from our farm.”
  2. Title: “Healthy Chickens” — Text: “Well-cared for poultry raised with natural feed and proper welfare.”
  3. Title: “Trusted Quality” — Text: “Certified processes ensuring safety and freshness every step of the way.”

- **Product Carousel (middle of page)**
  - Section Title: “Our Products”
  - Below title: “Discover our range of poultry products tailored to meet your needs.”

- **Testimonials (beneath product carousel)**
  - Section Title: “What Our Customers Say”
  - Card Example 1: “Golden Nest’s eggs are always fresh and tasty. My family loves them!” — *Customer, Pretoria*
  - Card Example 2: “The quality is unmatched, and delivery is always reliable.” — *Retailer, Johannesburg*

- **Footer (bottom)**
  - Newsletter heading: “Stay Updated”
  - Newsletter subtext: “Subscribe for the latest updates from our farm.”
  - Footer info: Address, phone, email, and social links.

---

### 10.2 About Us Page
- **Header Section**
  - Heading: “Our Story”
  - Text: “Golden Nest Poultry began with a vision to provide families and businesses with poultry products that are both fresh and trustworthy. With years of dedication, we have grown into a name customers rely on.”

- **Mission & Values (two-column layout)**
  - Title: “Our Mission” — Text: “To deliver safe, nutritious poultry products while upholding ethical farming practices.”
  - Title: “Our Values” — Text: “Integrity, quality, sustainability, and care for our poultry.”

- **Timeline (accordion)**
  - 2015: “Founded as a small family farm.”
  - 2018: “Expanded into wholesale egg supply.”
  - 2021: “Introduced modern facilities and certifications.”

---

### 10.3 Products Page
- **Header Section**
  - Heading: “Our Products”
  - Subtext: “From eggs to live chickens, we supply premium poultry products for homes, retailers, and businesses.”

- **Product Grid (each card with title + description)**
  1. “Fresh Eggs” — “Large, medium, and small eggs packed with nutrition.”
  2. “Broiler Chickens” — “Healthy and well-fed chickens, ideal for commercial and home use.”
  3. “Layer Chickens” — “Strong layers producing high-quality eggs consistently.”

---

### 10.4 Gallery Page
- **Header Section**
  - Heading: “Farm Life in Pictures”
  - Subtext: “Take a closer look at our farm, facilities, and poultry.”

- **Carousel/Images**
  - Captions example: “Our poultry enjoying open-air spaces.” / “Packing facility ensuring quality control.”

---

### 10.5 Quality & Safety Page
- **Header Section**
  - Heading: “Quality You Can Trust”
  - Subtext: “We follow rigorous quality checks and maintain industry certifications to keep our poultry safe and healthy.”

- **Certifications Grid**
  - “Certified Poultry Health & Safety”
  - “Biosecurity Standards Compliant”
  - “Trusted by retailers across South Africa”

- **Animated Counters**
  - “10+ Years Experience”
  - “5000+ Eggs Daily”
  - “100+ Happy Clients”

- **FAQ (accordion)**
  - Q: “Are your eggs organic?” — A: “Our eggs come from healthy hens fed on natural grain-based diets.”
  - Q: “Do you deliver?” — A: “Yes, we deliver bulk orders to local retailers and distributors.”

---

### 10.6 Contact Page
- **Header Section**
  - Heading: “Get in Touch”
  - Subtext: “We’d love to hear from you. Contact us for inquiries, orders, or partnerships.”

- **Form Fields**
  - Name, Email, Message, Submit button (“Send Message”)

- **Contact Info Cards**
  - Address: “Golden Nest Poultry Farm, Gauteng, South Africa”
  - Phone: “+27 12 345 6789”
  - Email: “info@goldennestpoultry.co.za”

- **Map Embed**
  - Caption: “Find us easily with Google Maps.”

---

This completes the content plan. All copy should be placed exactly in the specified sections.