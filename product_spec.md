# Product Specification - Langley Portfolio

## 📋 Executive Summary

**Product Name:** Langley Portfolio  
**Version:** 0.1.0  
**Type:** Personal Portfolio Website with Headless CMS  
**Target Users:** Prospective clients, employers, collaborators  
**Primary Purpose:** Professional showcase for web development and video editing work  
**Platform:** Web Application (Responsive)

---

## 🎯 Product Overview

Langley Portfolio adalah website portfolio modern yang menampilkan karya web development dan video editing dengan desain terinspirasi IDE/code editor (seperti VS Code). Project ini menggunakan Next.js 16 untuk frontend dan Sanity CMS untuk content management, dengan fokus pada performa, SEO, dan user experience yang unik.

### Key Value Propositions

1. **Unique Design System:** Tampilan menyerupai IDE profesional untuk menarik perhatian tech audience
2. **Content-First Approach:** Headless CMS memungkinkan update konten tanpa deploy ulang
3. **Performance Optimized:** Next.js App Router dengan ISR untuk loading yang cepat
4. **SEO Ready:** Server-side rendering dan metadata optimization
5. **Interactive Experience:** Custom cursor, smooth scroll, dan animasi Framer Motion

---

## 🏗️ Technical Architecture

### Technology Stack

#### Frontend Framework
- **Next.js 16.0.8** - React framework dengan App Router & Turbopack
- **React 19.0.0** - UI library dengan Server Components
- **React DOM 19.0.0** - DOM rendering
- **TypeScript 5.6.0** - Type-safe development

#### Styling & Design
- **Tailwind CSS 4.0.0** - Utility-first CSS framework (latest version)
- **@tailwindcss/postcss 4.0.0** - PostCSS plugin untuk Tailwind v4
- **PostCSS 8.4.31** - CSS processing
- **clsx 2.1.1** - Conditional class names utility
- **tailwind-merge 2.5.2** - Merge Tailwind classes intelligently

#### Animation & Interaction
- **motion 12.23.26** - Framer Motion rebranded (latest animation library)
- **Framer Motion 11.5.4** - Legacy imports compatibility
- **Lenis 1.1.0** - Smooth scroll library dengan native scroll integration
- **Lucide React 0.439.0** - Icon system (1000+ icons)

#### Content Management (Sanity CMS)
- **Sanity 3.57.0** - Headless CMS dengan real-time collaboration
- **@sanity/client 6.21.0** - Sanity API client
- **next-sanity 9.5.0** - Next.js integration untuk Sanity
- **@sanity/image-url 1.0.2** - Image URL builder dengan transformations
- **@sanity/vision 3.57.0** - GROQ query testing tool
- **@sanity/icons 3.4.0** - Icon system untuk Sanity Studio

#### UI/UX & Theming
- **next-themes 0.3.0** - Dark/light theme support dengan system preference
- **Custom cursor system** - Magnetic cursor dengan Framer Motion
- **VS Code-inspired interface** - IDE-style layout components
- **ReactBits Library** - 23 custom animation components

#### Development Tools
- **@types/node 20.16.0** - Node.js TypeScript definitions
- **@types/react 19.0.0** - React TypeScript definitions
- **@types/react-dom 19.0.0** - React DOM TypeScript definitions

#### Build & Performance
- **Turbopack** - Next.js 16 development bundler (built-in)
- **ISR (Incremental Static Regeneration)** - Revalidation strategy
- **Image Optimization** - Next.js Image component + Sanity CDN
- **Server Components** - React 19 server-side rendering
- **Edge Runtime** - API routes dengan edge functions support

### Architecture Patterns

#### 1. Complete Project Structure

```
langley-portfolio/
├── .next/                          # Next.js build output (auto-generated)
├── .vscode/                        # VS Code configuration
│   └── mcp.json                    # Model Context Protocol config
├── node_modules/                   # Dependencies (auto-generated)
│
├── app/                            # Next.js App Router
│   ├── (site)/                     # Main site group dengan AppLayout
│   │   ├── about/
│   │   │   ├── page.tsx            # About page (Server Component)
│   │   │   └── AboutPageClient.tsx # Client component dengan ReactBits
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact page dengan AnimatedInput
│   │   ├── projects/
│   │   │   ├── page.tsx            # Projects listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic project detail
│   │   ├── services/
│   │   │   ├── page.tsx            # Services page (Server Component)
│   │   │   └── ServicesPageClient.tsx # Client component dengan BentoGrid
│   │   ├── showcase/
│   │   │   └── page.tsx            # Easter egg - ReactBits showcase
│   │   ├── layout.tsx              # Site layout dengan CommandMenuWrapper
│   │   └── page.tsx                # Homepage dengan Hero & Featured Projects
│   │
│   ├── api/                        # API Routes
│   │   ├── draft/
│   │   │   ├── route.ts            # Enable draft mode
│   │   │   └── disable/
│   │   │       └── route.ts        # Disable draft mode
│   │   └── revalidate/
│   │       └── route.ts            # On-demand ISR revalidation
│   │
│   ├── studio/                     # Sanity Studio (isolated)
│   │   └── [[...tool]]/
│   │       ├── layout.tsx          # Studio layout (no AppLayout)
│   │       └── page.tsx            # Studio entry point
│   │
│   ├── globals.css                 # Global styles & Tailwind imports
│   └── layout.tsx                  # Root layout (ThemeProvider, ToastProvider)
│
├── components/                     # React Components
│   ├── global/                     # Global UI components
│   │   ├── CommandMenuWrapper.tsx  # Client wrapper for CommandMenu
│   │   ├── Footer.tsx              # Site footer
│   │   └── ThemeToggle.tsx         # Dark/light mode toggle
│   │
│   ├── home/                       # Homepage-specific components
│   │   ├── AboutSection.tsx        # About preview section
│   │   ├── FeaturedProjects.tsx    # Featured projects grid
│   │   ├── FeaturedProjectsSection.tsx # Section wrapper
│   │   ├── Hero.tsx                # Hero section
│   │   └── ToolsSection.tsx        # Tech stack showcase
│   │
│   ├── navigation/                 # Navigation components (future)
│   │
│   ├── projects/                   # Project-related components
│   │   ├── LoadMoreButton.tsx      # Pagination button
│   │   ├── ParallaxHero.tsx        # Parallax hero image
│   │   ├── ProjectDetail.tsx       # Project detail view
│   │   ├── ProjectDetailEnhanced.tsx # Enhanced detail dengan animations
│   │   ├── ProjectGrid.tsx         # Basic project grid
│   │   ├── ProjectGridEnhanced.tsx # Grid dengan filter & search
│   │   ├── RelatedProjects.tsx     # Related projects carousel
│   │   └── StickySidebar.tsx       # Sticky project info sidebar
│   │
│   ├── reactbits/                  # ReactBits Animation Library (23 components)
│   │   ├── Accordion.tsx           # Expandable accordion component
│   │   ├── AnimatedAvatar.tsx      # Avatar dengan glow & particles
│   │   ├── AnimatedCounter.tsx     # Counting animation dengan spring
│   │   ├── AnimatedInput.tsx       # Form inputs dengan floating labels
│   │   ├── BentoGrid.tsx           # Grid layout untuk services
│   │   ├── ClickSpark.tsx          # Click spark effect
│   │   ├── CommandMenu.tsx         # Command palette (Cmd+K)
│   │   ├── DecryptedText.tsx       # Matrix-style text reveal
│   │   ├── GlitchText.tsx          # Glitch text effect
│   │   ├── LogoLoop.tsx            # Infinite logo carousel
│   │   ├── Magnet.tsx              # Magnetic hover effect
│   │   ├── RotatingText.tsx        # Rotating text animation
│   │   ├── ScrollProgress.tsx      # Scroll progress indicator
│   │   ├── ShimmerButton.tsx       # Button dengan shimmer effect
│   │   ├── ShinyText.tsx           # Shiny text animation
│   │   ├── SkillBar.tsx            # Animated skill progress bars
│   │   ├── SplitText.tsx           # Character-by-character reveal
│   │   ├── Squares.tsx             # Animated squares background
│   │   ├── StarBorder.tsx          # Star border animation
│   │   ├── TiltedCard.tsx          # 3D tilt card effect
│   │   ├── Timeline.tsx            # Animated timeline component
│   │   ├── Toast.tsx               # Toast notifications dengan confetti
│   │   └── index.ts                # Central exports file
│   │
│   ├── shell/                      # IDE-inspired layout components
│   │   ├── AppLayout.tsx           # Main layout wrapper (MenuBar + StatusBar)
│   │   ├── MenuBar.tsx             # Top menu bar (VS Code style)
│   │   ├── StatusBar.tsx           # Bottom status bar
│   │   └── Toolbar.tsx             # Toolbar dengan breadcrumbs
│   │
│   ├── ui/                         # Reusable UI components
│   │   ├── CustomCursor.tsx        # Custom cursor dengan magnetic effect
│   │   ├── Magnetic.tsx            # Magnetic wrapper component
│   │   ├── ScrollProgress.tsx      # Scroll progress component
│   │   ├── SpotlightCard.tsx       # Card dengan spotlight effect
│   │   └── TextReveal.tsx          # Text reveal animation
│   │
│   └── PreviewBanner.tsx           # Draft mode preview banner
│
├── context/                        # React Context providers
│   └── CursorContext.tsx           # Custom cursor state management
│
├── hooks/                          # Custom React hooks (future)
│
├── lib/                            # Utility functions & helpers
│   └── utils.ts                    # cn() function, class utilities
│
├── providers/                      # Client-side providers
│   ├── SmoothScroll.tsx            # Lenis smooth scroll wrapper
│   ├── ThemeProvider.tsx           # next-themes wrapper
│   └── ToastProviderWrapper.tsx    # Toast context provider
│
├── public/                         # Static assets
│   └── (images, fonts, icons)      # Public files
│
├── sanity/                         # Sanity CMS Configuration
│   ├── lib/                        # Sanity utilities
│   │   ├── client.ts               # Sanity client config
│   │   ├── fetch.ts                # Server-side fetch utilities
│   │   ├── image.ts                # Image URL builder
│   │   ├── index.ts                # Central exports
│   │   └── queries.ts              # GROQ query definitions
│   │
│   ├── plugins/                    # Sanity plugins
│   │   └── singletonPlugin.ts      # Singleton document plugin
│   │
│   ├── schemaTypes/                # Content type schemas
│   │   ├── documents/              # Regular document types
│   │   │   ├── project.ts          # Project schema (main content)
│   │   │   ├── projectCategory.ts  # Project categories
│   │   │   ├── service.ts          # Service offerings
│   │   │   ├── tag.ts              # Project tags
│   │   │   ├── testimonial.ts      # Client testimonials
│   │   │   ├── tool.ts             # Tools/technologies
│   │   │   └── index.ts            # Document exports
│   │   │
│   │   ├── objects/                # Reusable object types
│   │   │   ├── faqItem.ts          # FAQ item object
│   │   │   ├── galleryItem.ts      # Gallery item object
│   │   │   ├── socialLink.ts       # Social link object
│   │   │   └── index.ts            # Object exports
│   │   │
│   │   ├── singletons/             # Singleton document types
│   │   │   ├── faq.ts              # FAQ singleton
│   │   │   ├── profile.ts          # Profile singleton
│   │   │   ├── siteSettings.ts     # Site settings singleton
│   │   │   └── index.ts            # Singleton exports
│   │   │
│   │   └── index.ts                # All schema types export
│   │
│   └── structure.ts                # Sanity Studio structure config
│
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment (gitignored)
├── .gitignore                      # Git ignore rules
├── build_log.txt                   # Build logs (gitignored)
├── components.json                 # shadcn/ui configuration
├── next-env.d.ts                   # Next.js TypeScript declarations
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Lock file
├── postcss.config.mjs              # PostCSS configuration
├── product_spec.md                 # Product specification (this file)
├── sanity.config.ts                # Sanity Studio config
├── tsconfig.json                   # TypeScript configuration
└── _tailwind.config.ts             # Tailwind CSS v4 configuration
```

#### 2. File-based Routing (App Router) - Detail

```
app/
├── (site)/                         # Route group (shares layout)
│   ├── page.tsx                    # Route: /
│   ├── about/page.tsx              # Route: /about
│   ├── contact/page.tsx            # Route: /contact
│   ├── services/page.tsx           # Route: /services
│   ├── showcase/page.tsx           # Route: /showcase (Easter egg)
│   ├── projects/
│   │   ├── page.tsx                # Route: /projects
│   │   └── [slug]/page.tsx         # Route: /projects/[slug]
│   └── layout.tsx                  # Shared layout untuk (site) group
│
├── studio/[[...tool]]/
│   ├── page.tsx                    # Route: /studio/* (catch-all)
│   └── layout.tsx                  # Studio-specific layout
│
└── api/
    ├── draft/route.ts              # API: /api/draft
    ├── draft/disable/route.ts      # API: /api/draft/disable
    └── revalidate/route.ts         # API: /api/revalidate
```

#### 3. Content Layer (Sanity CMS)
- **Schema-first approach** dengan TypeScript
- **Singleton documents** untuk global settings (profile, siteSettings, faq)
- **Document types:** projects, services, testimonials, tags, tools, projectCategory
- **Object types:** socialLink, galleryItem, faqItem
- **GROQ queries** untuk data fetching (defined in sanity/lib/queries.ts)
- **Draft mode** untuk preview dengan token authentication
- **ISR (Incremental Static Regeneration)** setiap 60 detik

#### 4. Component Organization Strategy

**ReactBits Library (23 Components):**
Koleksi lengkap animation components untuk interactive experiences:
- **Text Animations:** DecryptedText, GlitchText, RotatingText, ShinyText, SplitText
- **UI Components:** Accordion, AnimatedInput, BentoGrid, CommandMenu, Toast
- **Effects:** AnimatedAvatar, AnimatedCounter, ClickSpark, Magnet, ShimmerButton
- **Visual Elements:** SkillBar, Timeline, TiltedCard, ScrollProgress, StarBorder
- **Backgrounds:** LogoLoop, Squares

**Layout Components:**
- **shell/** - IDE-inspired interface (MenuBar, StatusBar, Toolbar, AppLayout)
- **global/** - Site-wide components (Footer, ThemeToggle, CommandMenuWrapper)

**Feature Components:**
- **home/** - Homepage sections (Hero, FeaturedProjects, AboutSection, ToolsSection)
- **projects/** - Project displays (Grid, Detail, Sidebar, ParallaxHero, RelatedProjects)

**Utility Components:**
- **ui/** - Base UI elements (CustomCursor, Magnetic, SpotlightCard, TextReveal)

---

## 📱 Feature Specifications

### 1. Homepage (Landing Page)

#### 1.1 Hero Section
- **Dynamic Content:** Judul dan subtitle dari Sanity CMS
- **Profile Integration:** Nama, role, dan short bio dari profile singleton
- **Visual Identity:** Hero background image (optional)
- **Responsive Design:** Optimized untuk mobile hingga desktop
- **SEO Metadata:** Dynamic meta tags dari site settings

#### 1.2 Featured Projects Section
- **Content Source:** Projects marked as `featured: true` di Sanity
- **Grid Layout:** Responsive grid dengan project cards
- **Project Cards:** 
  - Cover image dengan hotspot optimization
  - Judul dan summary
  - Project type badge (Web/Video/Mixed)
  - Tags dan tools
  - Hover effects dengan custom cursor
- **CTA:** Link ke halaman projects lengkap

#### Technical Implementation
- Server-side data fetching
- ISR dengan revalidation 60 detik
- Image optimization via Sanity CDN
- Framer Motion animations

---

### 2. Projects Section

#### 2.1 Projects Listing Page (`/projects`)
- **Grid/List View:** Menampilkan semua projects
- **Filtering:** 
  - By project type (Web/Video/Mixed)
  - By category
  - By tags
- **Sorting:** By date, title, featured status
- **Search:** Real-time search by title/summary
- **Pagination/Infinite Scroll:** Performance optimization

#### 2.2 Project Detail Page (`/projects/[slug]`)

**Content Sections:**
- **Hero:**
  - Large cover image dengan focal point
  - Judul dan summary
  - Metadata (client, date, role, duration)
  - Project type dan category
  - Tags dan tools used

- **Main Content:**
  - Rich text description (portable text)
  - Embedded images dengan captions
  - Code blocks (syntax highlighted)
  - Headings, lists, quotes
  - External links

- **Media Gallery:**
  - Additional images
  - Video embeds (YouTube/Vimeo)
  - Lightbox view

- **Project Info Sidebar:**
  - Client name
  - Completion date
  - Role/contribution
  - Duration/timeline
  - Project links (live site, repo, case study)
  - Related projects

- **Call to Action:**
  - Contact button
  - Share buttons
  - Download case study (optional)

#### Features
- **SEO Optimization:**
  - Dynamic meta tags
  - Open Graph tags
  - JSON-LD structured data
  - Canonical URLs

- **Draft Mode:**
  - Preview unpublished projects
  - Content editor workflow

- **Accent Colors:**
  - Per-project custom accent color
  - Dynamic theming untuk branding

---

### 3. About Page (`/about`)

**Content:**
- Profile avatar image
- Extended biography (portable text)
- Skills dan expertise
- Work experience timeline (optional)
- Education (optional)
- Certifications (optional)
- Social links
- Resume/CV download (optional)

**Visual Elements:**
- Animated text reveals
- Image hover effects
- Skill bars/tags
- Timeline visualization

---

### 4. Services Page (`/services`)

**Content Structure:**
- Service listings dari Sanity
- Service cards with:
  - Icon/image
  - Service name
  - Description
  - Features/deliverables list
  - Pricing info (optional)
  - CTA button

**Features:**
- Tabbed interface atau accordion
- FAQ section integration
- Testimonials carousel
- Contact form link

---

### 5. Contact Page (`/contact`)

**Form Fields:**
- Name
- Email
- Subject
- Message
- Project type selection
- Budget range (optional)

**Features:**
- Form validation
- Email integration (future)
- Success/error states
- Contact information display
- Social links
- Business hours (optional)

**Alternative Contact Methods:**
- Email link
- Phone (optional)
- Social media links
- Location (optional)

---

### 6. Sanity Studio (`/studio`)

**Access:** Isolated route tanpa AppLayout shell

**Features:**
- **Document Management:**
  - Projects (full CRUD)
  - Services (full CRUD)
  - Testimonials (full CRUD)
  - Tags, Tools, Categories
  
- **Singleton Documents:**
  - Site Settings (global SEO, hero content, social links)
  - Profile (personal info, bio, avatar)
  - FAQ (frequently asked questions)

- **Media Management:**
  - Image uploads
  - Asset library
  - Hotspot/crop tool

- **Content Preview:**
  - Live preview integration
  - Draft mode support

- **Custom Desk Structure:**
  - Organized sidebar
  - Singleton documents grouped
  - Document filtering

**Studio Configuration:**
- Vision plugin untuk GROQ testing
- Custom schema validation
- Reference relationships
- Array fields dengan custom objects

---

## 🎨 Design System

### Visual Theme: IDE/Code Editor

#### Color Palette

**Dark Theme (Primary):**
```css
--background: #1e1e1e       /* Editor background */
--surface: #252526          /* Panels */
--border: #333              /* Dividers */
--accent: #007acc           /* VS Code blue */
--text-primary: #cccccc     /* Main text */
--text-secondary: #858585   /* Muted text */
```

**Light Theme:**
```css
--background: #ffffff
--surface: #f3f3f3
--border: #e5e5e5
--accent: #007acc
--text-primary: #333333
--text-secondary: #666666
```

**Accent Colors:**
- Dynamic per-project
- Overrides pada cards dan detail pages

#### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold, system font stack
- **Body:** Regular, sans-serif
- **Code:** Monospace (for code blocks)

**Scale:**
- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

#### Components

**VS Code-Inspired Elements:**
1. **MenuBar:**
   - Top fixed bar
   - File menus simulation
   - Window controls (yellow/green/red dots)
   - App identity badge

2. **Toolbar:**
   - Navigation breadcrumbs
   - Status indicators
   - Quick actions

3. **StatusBar:**
   - Bottom fixed bar
   - Current page info
   - GitHub link
   - Theme toggle
   - Visitor count (optional)

4. **Sidebar:**
   - File explorer style
   - Collapsible sections
   - Icons dari Lucide

#### Interactive Elements

**Custom Cursor:**
- Default: 16×16 white dot
- Hover state: 100×100 dengan text label
- Mix-blend-mode untuk contrast
- Smooth spring animation
- Hidden pada touch devices

**Magnetic Effect:**
- Buttons dan links "menarik" cursor
- Framer Motion spring physics

**Spotlight Card:**
- Mouse tracking effect
- Gradient overlay mengikuti cursor
- Subtle glow pada hover

**Text Reveal:**
- Animated text entrance
- Character/word split animation
- Intersection Observer trigger

---

## 📊 Content Model (Sanity Schema)

### Document Types

#### 1. **project** (Main Content Type)

**Fields:**

**Content Group:**
- `title` (string, required, max 100 chars)
- `slug` (slug, required, auto-generated from title)
- `summary` (text, required, max 280 chars) - Card description
- `description` (portable text) - Full case study content

**Media Group:**
- `coverImage` (image, required) - Hero image with hotspot
- `gallery` (array of galleryItem) - Additional media
- `videoEmbedUrl` (string) - YouTube/Vimeo URL
- `accentColor` (string) - Hex color for theming

**Metadata Group:**
- `projectType` (string, required) - web | video | mixed
- `category` (reference to projectCategory)
- `tags` (array of references to tag)
- `tools` (array of references to tool)
- `client` (string) - Client name
- `role` (string) - Your role/contribution
- `completionDate` (date)
- `duration` (string) - Timeline
- `featured` (boolean) - Show on homepage

**Links Group:**
- `projectUrl` (url) - Live site
- `repositoryUrl` (url) - GitHub repo
- `caseStudyUrl` (url) - External case study
- `otherLinks` (array) - Additional resources

**SEO Group:**
- `seoTitle` (string, max 60)
- `seoDescription` (text, max 160)
- `seoImage` (image) - OG image override

**Relations:**
- `relatedProjects` (array of project references)
- `testimonials` (array of testimonial references)

#### 2. **service**
- `title` (string)
- `slug` (slug)
- `description` (portable text)
- `icon` (image)
- `features` (array of strings)
- `pricing` (object: from, to, currency)
- `order` (number) - Display order

#### 3. **testimonial**
- `author` (string)
- `role` (string)
- `company` (string)
- `content` (text)
- `rating` (number, 1-5)
- `avatar` (image)
- `featured` (boolean)

#### 4. **tag**
- `name` (string)
- `slug` (slug)
- `color` (string) - Badge color

#### 5. **tool**
- `name` (string)
- `slug` (slug)
- `icon` (image)
- `url` (url)
- `category` (string) - development | design | video | other

#### 6. **projectCategory**
- `name` (string)
- `slug` (slug)
- `description` (text)
- `projectType` (string) - Filtered by type

### Singleton Types

#### 1. **siteSettings** (ID: `site-settings`)

**General Group:**
- `siteTitle` (string, required, max 60)
- `siteDescription` (text, required, max 160)
- `defaultSeoImage` (image, required)

**Hero Group:**
- `heroTitle` (string)
- `heroSubtitle` (string)
- `heroImage` (image)

**Social Group:**
- `socials` (array of socialLink)
- `footerText` (string)

#### 2. **profile** (ID: `profile`)
- `name` (string, required)
- `role` (string)
- `shortBio` (text, max 200)
- `longBio` (portable text)
- `avatarImage` (image)
- `socials` (array of socialLink)

#### 3. **faq** (ID: `faq`)
- `title` (string)
- `description` (text)
- `items` (array of faqItem)

### Object Types

#### **socialLink**
- `platform` (string) - github | linkedin | twitter | instagram | etc.
- `url` (url)
- `handle` (string)

#### **galleryItem**
- `mediaType` (string) - image | video
- `image` (image) - If type is image
- `videoUrl` (url) - If type is video
- `caption` (string)
- `alt` (string)

#### **faqItem**
- `question` (string)
- `answer` (portable text)

---

## 🔄 User Flows

### 1. Visitor Journey (First-Time User)

```
Landing (Homepage) 
  ↓
Hero Section → Sees name, role, tagline
  ↓
Featured Projects → Clicks interesting project card
  ↓
Project Detail → Views case study, media, info
  ↓
Related Projects / CTA → Explores more work
  ↓
Contact Page → Sends inquiry
```

### 2. Content Editor Flow (Admin)

```
/studio Login
  ↓
Dashboard → Sees document types
  ↓
Create New Project:
  ↓
  1. Fill basic info (title, summary, type)
  2. Upload cover image (set hotspot)
  3. Write description (rich text)
  4. Add gallery items
  5. Set metadata (tags, tools, dates)
  6. Add project links
  7. Configure SEO
  8. Save as draft
  9. Preview on site (draft mode)
  10. Publish
  ↓
Content appears on site (after ISR revalidation)
```

### 3. Navigation Flow

```
MenuBar (Always visible)
  ↓
  - Home
  - Projects (+ filtering)
  - About
  - Services
  - Contact
  ↓
StatusBar (Always visible)
  - Page info
  - Theme toggle
  - Social links
```

---

## 🚀 Performance & Optimization

### Next.js Optimizations

#### 1. Rendering Strategy
- **Static Generation (SSG):** Static pages (about, services, contact)
- **ISR (Incremental Static Regeneration):** 
  - Homepage: revalidate every 60 seconds
  - Project pages: revalidate every 300 seconds
  - Projects listing: revalidate every 120 seconds
- **Server-Side Rendering (SSR):** Draft mode preview

#### 2. Image Optimization
- **Next.js Image Component:** Automatic optimization, lazy loading
- **Sanity CDN:** 
  - Format optimization (WebP, AVIF)
  - Responsive images with hotspot
  - Quality optimization
  - Auto-caching

#### 3. Code Splitting
- **Automatic chunking** by Next.js
- **Dynamic imports** untuk heavy components
- **Route-based splitting**

#### 4. Caching Strategy
- **Sanity CDN Cache:** Edge caching untuk images dan data
- **Browser Caching:** Static assets
- **ISR Cache:** Stale-while-revalidate

### Performance Targets

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Lighthouse Score:** 90+ (Performance, SEO, Accessibility)

---

## 🔒 Security & Privacy

### Authentication
- Sanity Studio: OAuth/password authentication
- Draft mode: Token-based authentication

### Data Protection
- Environment variables untuk sensitive data
- Sanity API tokens disimpan di environment
- No sensitive data di client-side

### HTTPS
- Production deployment via HTTPS only
- Secure headers (CSP, HSTS, etc.)

---

## 🌐 SEO Strategy

### On-Page SEO

#### 1. Meta Tags
```tsx
<title>{project.seoTitle || project.title} | Langley</title>
<meta name="description" content={project.seoDescription || project.summary} />
<link rel="canonical" href={`https://langley.dev/projects/${project.slug}`} />
```

#### 2. Open Graph Tags
```tsx
<meta property="og:title" content={project.title} />
<meta property="og:description" content={project.summary} />
<meta property="og:image" content={project.seoImage || project.coverImage} />
<meta property="og:type" content="article" />
```

#### 3. Twitter Cards
```tsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={project.title} />
<meta name="twitter:description" content={project.summary} />
<meta name="twitter:image" content={project.coverImage} />
```

#### 4. Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Project Title",
  "description": "Project summary",
  "image": "cover-image-url",
  "author": {
    "@type": "Person",
    "name": "Langley"
  },
  "datePublished": "2024-01-01"
}
```

### Technical SEO
- **Semantic HTML:** Proper heading hierarchy
- **Alt text:** All images have descriptive alt text
- **Sitemap.xml:** Auto-generated by Next.js
- **Robots.txt:** Proper crawl directives
- **Mobile-friendly:** Responsive design
- **Page Speed:** Optimized loading times

---

## 📈 Analytics & Monitoring (Future)

### Potential Integrations
- Google Analytics 4
- Vercel Analytics
- Sanity Analytics
- Search Console

### Key Metrics
- Page views
- Bounce rate
- Session duration
- Conversion rate (contact form submissions)
- Popular projects
- Traffic sources

---

## 🔧 Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000 (site)
# → http://localhost:3000/studio (CMS)

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Draft Mode
SANITY_REVALIDATE_SECRET=your_secret_key
```

### Git Workflow
1. Feature branch dari `main`
2. Local development dan testing
3. Commit dengan descriptive messages
4. Pull request untuk review
5. Merge ke `main`
6. Auto-deploy (jika configured)

---

## 🚢 Deployment

### Recommended Platform: Vercel

#### Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### Environment Variables (Production)
- Set di Vercel dashboard
- Automatic deployment dari GitHub
- Preview deployments untuk PRs

#### Sanity Studio Deployment
```bash
# Deploy studio ke Sanity hosting
npx sanity deploy
```

### Alternative Platforms
- Netlify
- Railway
- Self-hosted (Docker)

---

## 🎯 Future Enhancements

### Phase 2 Features (Planned)

#### 1. Blog System
- Blog post content type
- Markdown/MDX support
- Tag filtering
- RSS feed
- Comments (Disqus/Giscus)

#### 2. Advanced Filtering
- Multi-select filters
- Search with fuzzy matching
- Saved filter presets

#### 3. Interactive Components
- 3D model viewer (Three.js)
- Interactive code snippets (Sandpack)
- Live demos embed

#### 4. Client Portal
- Private project access
- File downloads
- Revision requests
- Feedback system

#### 5. E-commerce Integration
- Digital products
- Course offerings
- Booking system

#### 6. Multi-language Support
- i18n with next-intl
- Localized content in Sanity
- Language switcher

#### 7. Advanced Analytics
- Custom event tracking
- Heatmaps
- A/B testing

#### 8. Performance Enhancements
- Edge Functions
- Service Worker
- Offline support
- Progressive Web App (PWA)

### Technical Debt & Improvements

- [ ] Unit tests (Jest, React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Storybook untuk component documentation
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)
- [ ] Code splitting optimization
- [ ] Image lazy loading enhancement
- [ ] SEO audit dan improvements

---

## 📚 Documentation

### For Developers
- README.md dengan setup instructions
- Component documentation
- API documentation
- Contributing guidelines

### For Content Editors
- Sanity Studio guide
- Content creation best practices
- Image optimization guide
- SEO checklist

---

## 🤝 Support & Maintenance

### Update Schedule
- **Weekly:** Dependency updates (patch versions)
- **Monthly:** Minor version updates
- **Quarterly:** Major version updates (with testing)

### Backup Strategy
- Sanity automatic backups
- Git history sebagai version control
- Export content reguler (JSON dumps)

### Monitoring
- Uptime monitoring
- Error tracking
- Performance monitoring
- Security updates

---

## 📊 Success Metrics

### Business Goals
- Increase client inquiries by 50%
- Improve professional visibility
- Showcase portfolio effectively

### Technical Goals
- Lighthouse score > 90
- Page load time < 2s
- Zero critical bugs
- 99.9% uptime

### Content Goals
- Regular project updates (monthly)
- SEO ranking untuk target keywords
- Social media engagement

---

## 📝 Appendix

### A. Technology Justification

**Next.js 16:**
- Latest features (Server Actions, Server Components)
- Best-in-class DX dan performance
- Built-in optimization

**Sanity CMS:**
- Developer-friendly schema
- Real-time collaboration
- Flexible content modeling
- Powerful GROQ query language

**Tailwind CSS 4:**
- Rapid development
- Consistent design system
- Small production bundle
- Latest v4 features

**Framer Motion:**
- Declarative animations
- Great performance
- Spring physics
- Gesture support

### B. Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

### C. Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Focus indicators
- Alt text pada images
- Semantic HTML
- Color contrast compliance

### D. References
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Contact & Resources

**Project Repository:** [GitHub](https://github.com/imlangley/langley-portfolio)  
**Live Site:** [To be deployed]  
**Sanity Studio:** [To be configured]  

**Developer:** Langley  
**Last Updated:** December 12, 2025  
**Document Version:** 1.0.0

---

**End of Product Specification**

*This document serves as the complete technical and functional specification for the Langley Portfolio project. It should be updated as the project evolves and new features are added.*
