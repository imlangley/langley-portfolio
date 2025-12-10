# Product Specification: Langley Portfolio

## 1. Executive Summary

**Langley Portfolio** is a premium, full-stack portfolio website designed for a creative professional who bridges video editing and web development. The project features a unique "Creative Software Suite" aesthetic that merges the visual languages of **Adobe After Effects** and **VS Code**, creating an immersive, editor-like experience.

### Key Highlights
- **Unique Design Identity**: Award-winning aesthetic combining video editing and code editor interfaces
- **Headless CMS**: Powered by Sanity.io for flexible content management
- **Modern Tech Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4
- **Dual Content Types**: Showcases both web development projects and video editing work
- **Premium Animations**: Smooth, elastic animations using Framer Motion
- **Fully Responsive**: Optimized for desktop and mobile experiences

---

## 2. Product Vision & Goals

### Vision Statement
Create a portfolio that doesn't just showcase work—it embodies the creator's dual identity as both a video editor and developer through an innovative, interactive interface that feels like stepping into a professional creative suite.

### Primary Goals
1. **Differentiation**: Stand out from typical portfolio websites with a unique editor-inspired design
2. **Showcase Versatility**: Effectively present both web development and video editing projects
3. **Professional Credibility**: Demonstrate technical expertise through the portfolio itself
4. **Content Flexibility**: Enable easy content updates without code changes via Sanity CMS
5. **Performance**: Deliver a fast, smooth user experience with premium animations

### Target Audience
- **Potential Clients**: Seeking web development or video editing services
- **Recruiters/Employers**: Looking for creative technologists
- **Peers/Community**: Fellow developers and video editors
- **Collaborators**: Potential project partners

---

## 3. Technical Architecture

### 3.1 Technology Stack

#### Frontend Framework
- **Next.js 16.0.8**: React framework with App Router
- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5.6.0**: Type-safe development

#### Styling & UI
- **Tailwind CSS 4.0.0**: Utility-first CSS framework
- **Framer Motion 11.5.4**: Advanced animation library
- **Custom Design System**: Editor-inspired color palette and components
- **Lenis (@studio-freight/react-lenis)**: Smooth scroll library

#### Content Management
- **Sanity.io 3.57.0**: Headless CMS
- **@sanity/client 6.21.0**: Sanity client library
- **@sanity/image-url 1.0.2**: Image optimization
- **@sanity/vision 3.57.0**: GROQ query testing
- **next-sanity 9.5.0**: Next.js integration

#### UI Components & Icons
- **Lucide React 0.439.0**: Icon library
- **clsx 2.1.1**: Conditional className utility
- **tailwind-merge 2.5.2**: Tailwind class merging

#### Theming
- **next-themes 0.3.0**: Dark/light mode support

### 3.2 Project Structure

```
langley-portfolio/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Main site routes
│   │   ├── layout.tsx           # Site layout with Navbar/Footer
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── projects/            # Projects listing & detail
│   │   └── services/            # Services page
│   ├── api/                     # API routes
│   │   ├── draft/               # Draft mode
│   │   └── revalidate/          # On-demand revalidation
│   ├── studio/                  # Sanity Studio
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── global/                  # Global components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── home/                    # Homepage components
│   │   ├── Hero.tsx
│   │   └── FeaturedProjects.tsx
│   ├── projects/                # Project components
│   │   ├── ProjectCard.tsx
│   │   └── ProjectDetail.tsx
│   ├── shell/                   # Editor shell components
│   │   ├── AppLayout.tsx        # Main editor layout
│   │   ├── MenuBar.tsx          # Top menu bar
│   │   ├── Toolbar.tsx          # Left toolbar
│   │   └── StatusBar.tsx        # Bottom status bar
│   └── ui/                      # Reusable UI components
│       ├── CustomCursor.tsx
│       ├── Button.tsx
│       └── Card.tsx
├── context/                      # React contexts
│   └── CursorContext.tsx        # Custom cursor state
├── lib/                         # Utility libraries
│   └── utils.ts
├── providers/                    # React providers
│   ├── LenisProvider.tsx        # Smooth scroll
│   └── ThemeProvider.tsx        # Theme management
├── sanity/                      # Sanity CMS configuration
│   ├── lib/                     # Sanity utilities
│   │   ├── client.ts            # Sanity client
│   │   ├── fetch.ts             # Data fetching functions
│   │   ├── image.ts             # Image URL builder
│   │   └── queries.ts           # GROQ queries
│   ├── plugins/                 # Sanity plugins
│   ├── schemaTypes/             # Content schemas
│   │   ├── documents/           # Document types
│   │   │   ├── project.ts
│   │   │   ├── service.ts
│   │   │   ├── testimonial.ts
│   │   │   ├── tool.ts
│   │   │   ├── tag.ts
│   │   │   └── projectCategory.ts
│   │   ├── singletons/          # Singleton types
│   │   │   ├── profile.ts
│   │   │   ├── siteSettings.ts
│   │   │   └── faq.ts
│   │   └── objects/             # Object types
│   │       ├── galleryItem.ts
│   │       ├── socialLink.ts
│   │       ├── faqItem.ts
│   │       └── seo.ts
│   ├── structure.ts             # Studio structure
│   └── index.ts
├── sanity.config.ts             # Sanity configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

### 3.3 Data Architecture

#### Content Types

##### Documents (Multiple Instances)
1. **Project** (`project`)
   - Core portfolio item for web/video work
   - Fields: title, slug, summary, description, coverImage, gallery, videoEmbedUrl
   - Metadata: projectType (web/video/mixed), category, tools, tags, date, clientName
   - Flags: isFeatured, isPinned, isCommission
   - Links: liveUrl, repoUrl

2. **Service** (`service`)
   - Service offerings
   - Fields: title, slug, description, icon, pricing

3. **Testimonial** (`testimonial`)
   - Client testimonials
   - Fields: clientName, role, company, quote, avatar

4. **Tool** (`tool`)
   - Technologies and software
   - Fields: name, category, icon, url

5. **Tag** (`tag`)
   - Freeform project tags
   - Fields: name, slug

6. **Project Category** (`projectCategory`)
   - Project categorization
   - Fields: title, slug, description

##### Singletons (Single Instance)
1. **Profile** (`profile`)
   - Personal information
   - Fields: name, role, shortBio, longBio, avatarImage, socials

2. **Site Settings** (`siteSettings`)
   - Global site configuration
   - Fields: title, description, seo, navigation, footer

3. **FAQ** (`faq`)
   - Frequently asked questions
   - Fields: array of faqItem objects

##### Object Types (Embedded)
- **Gallery Item**: Image or video with caption
- **Social Link**: Platform, URL, icon
- **FAQ Item**: Question and answer
- **SEO**: Meta title, description, keywords, og:image

---

## 4. Design System

### 4.1 Visual Identity

#### Theme: "Creative Software Suite"
The design merges two professional creative tools:
- **Adobe After Effects**: Timeline, composition panels, keyframes, playhead
- **VS Code**: File explorer, status bar, syntax highlighting, command palette

#### Color Palette

**Dark Mode (Primary)**
```css
--background: hsl(0 0% 4%)           /* Deep black */
--foreground: hsl(0 0% 98%)          /* Near white */
--primary: hsl(217 91% 60%)          /* Electric blue */
--accent: hsl(271 91% 65%)           /* Neon purple */
--muted: hsl(240 3.7% 15.9%)         /* Dark gray */
--border: hsl(240 3.7% 15.9%)        /* Subtle borders */
```

**Light Mode**
```css
--background: hsl(0 0% 98%)          /* Off white */
--foreground: hsl(240 10% 10%)       /* Dark text */
--primary: hsl(217 91% 60%)          /* Electric blue */
--accent: hsl(271 91% 65%)           /* Neon purple */
```

**Editor-Specific Colors**
- Panel backgrounds: `#1f1f1f`, `#252526`, `#2a2a2a`
- Viewport: `#0d0d0d`, `#161616`, `#181818`
- Borders: `#333`, `#444`
- Highlights: Blue `#4a9eff`, Purple `#c678dd`, Yellow `#e5c07b`

#### Typography
- **Font Stack**: System fonts with ligatures enabled
- **Headings**: Bold, tracking-tighter
- **Code/Mono**: For technical elements and timecodes
- **Sizes**: Responsive scale from mobile to desktop

#### Spacing & Layout
- **Border Radius**: 1rem (16px) for cards and panels
- **Container**: Max-width with responsive padding
- **Grid**: 100px grid overlay for composition feel

### 4.2 Component Design Patterns

#### Glassmorphism
```css
.glass: bg-background/40 backdrop-blur-xl border-white/5
.glass-heavy: bg-background/60 backdrop-blur-2xl border-white/10
.glass-card: bg-black/40 backdrop-blur-lg border-white/10
```

#### Text Effects
```css
.text-gradient: Gradient from primary to accent
.text-stroke: Outlined text effect
```

#### Scrollbar
- Width: 6px
- Thumb: White/10 with hover state
- Rounded, minimal design

### 4.3 Animation Principles

#### Motion Values
- **Stiffness**: 100 (spring animations)
- **Damping**: 30 (smooth deceleration)
- **Duration**: 0.3-0.5s for micro-interactions

#### Scroll-Based Animations
- Hero section: 300vh scroll container with sticky viewport
- Parallax effects on scroll progress
- Timeline playhead synced to scroll position

#### Interaction States
- Hover: Subtle scale (1.02-1.05) and glow
- Active: Scale down (0.98)
- Focus: Ring with primary color
- Disabled: Opacity 50%

---

## 5. Key Features & User Experience

### 5.1 Homepage

#### Hero Section
**Design**: After Effects-inspired composition viewport with timeline

**Elements**:
- **Composition Toolbar** (Desktop): Shows comp name, resolution (1920×1080), framerate (30fps), timecode
- **Main Viewport**: Centered content with grid overlay and graph editor curves
- **Animated Text Layers**:
  1. "VIDEO EDITOR" - Fades and scales out
  2. "&" symbol - Transition effect
  3. "yang kebetulan bisa ngoding" (who happens to code) - Slides in
- **Timeline Panel** (Desktop): 
  - 3 tracks with layer names
  - Keyframe diamonds
  - Animated playhead synced to scroll
  - Ruler with time markers (0-10s)
- **Mobile**: Simplified version without timeline

**Scroll Interaction**: 
- 300vh total scroll height
- Sticky viewport stays in view
- Text animations triggered by scroll progress
- Playhead moves from 0% to 100%
- Timecode updates in real-time (00:00:00:00 to 00:00:10:00)

#### Featured Projects Section
- Grid layout of project cards
- Filter by project type (web/video/mixed)
- Hover effects with accent color
- Quick view of cover image, title, summary, tools

### 5.2 Projects Page

#### Project Listing
- Filterable by type, category, tags, tools
- Sortable by date, name, custom order
- Card grid with hover animations
- Pagination or infinite scroll

#### Project Detail Page
- Hero image with accent color overlay
- Project metadata (date, client, type, tools)
- Rich text description with embedded images
- Image gallery with lightbox
- Video embed (YouTube/Vimeo)
- Related projects
- Call-to-action (live site, repository links)

### 5.3 About Page

#### Profile Section
- Avatar image
- Name and role
- Short bio
- Social links

#### Long Biography
- Rich text content
- Skills and expertise
- Work history
- Personal interests

#### Services Offered
- Service cards with icons
- Description and pricing
- Call-to-action

#### Testimonials
- Client quotes
- Avatar, name, role, company
- Carousel or grid layout

### 5.4 Services Page

- Detailed service offerings
- Pricing information
- Process explanation
- Contact form or booking CTA

### 5.5 Global Features

#### Editor Shell (AppLayout)
**Desktop**:
- **MenuBar** (Top): File, Edit, View, Window, Help menus
- **Toolbar** (Left): Icon-based navigation (Home, Projects, About, Services)
- **StatusBar** (Bottom): Current page, stats, theme toggle
- **Line Numbers**: Fake code editor gutter on left
- **Viewport**: Main content area with dark background

**Mobile**:
- Simplified header with logo
- Bottom navigation bar
- Responsive content area
- Touch-optimized interactions

#### Custom Cursor
- Follows mouse movement
- Changes on hover states (buttons, links, interactive elements)
- Smooth spring animation
- Desktop only

#### Smooth Scroll
- Lenis integration for buttery smooth scrolling
- Momentum and easing
- Scroll-based animations

#### Theme Toggle
- Dark/light mode switcher
- Persisted preference
- Smooth color transitions

#### Navigation
- Responsive navbar (hidden on editor shell pages)
- Footer with social links, copyright
- Breadcrumbs on detail pages

---

## 6. Content Management (Sanity CMS)

### 6.1 Studio Configuration

**Access**: `/studio` route
**Features**:
- Custom structure with organized sections
- Document actions (publish, unpublish, duplicate)
- Preview pane for live content
- Media library management
- GROQ query testing with Vision plugin

### 6.2 Content Workflow

1. **Create/Edit Content**: Use Sanity Studio interface
2. **Preview**: Real-time preview in Studio
3. **Publish**: Content goes live
4. **Revalidate**: On-demand ISR revalidation via webhook
5. **Draft Mode**: Preview unpublished changes

### 6.3 Data Fetching Strategy

- **Static Generation (SSG)**: Homepage, about page
- **Incremental Static Regeneration (ISR)**: Project listings, detail pages
- **On-Demand Revalidation**: Webhook from Sanity on publish
- **Draft Mode**: Preview unpublished content for editors

### 6.4 Image Optimization

- Sanity CDN for image hosting
- Automatic format conversion (WebP, AVIF)
- Responsive image sizes
- Hotspot/crop support
- Lazy loading

---

## 7. Performance & SEO

### 7.1 Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### 7.2 Optimization Strategies

- Next.js Image component for optimized images
- Code splitting and lazy loading
- Font optimization with next/font
- Minimal JavaScript bundle size
- Server components where possible
- Static generation for most pages

### 7.3 SEO Implementation

- **Meta Tags**: Dynamic per page from Sanity
- **Open Graph**: Social sharing previews
- **Structured Data**: JSON-LD for projects, person, organization
- **Sitemap**: Auto-generated from content
- **Robots.txt**: Proper crawling directives
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Alt Text**: All images have descriptive alt text
- **Performance**: Fast loading times boost rankings

---

## 8. Responsive Design

### 8.1 Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

### 8.2 Mobile Adaptations

#### Hero Section
- Remove timeline panel
- Remove composition toolbar
- Simplify viewport to centered text
- Reduce scroll height
- Touch-friendly interactions

#### Editor Shell
- Hide MenuBar, Toolbar, StatusBar
- Show simplified mobile header
- Bottom navigation bar
- Full-width content
- Remove line numbers gutter

#### Project Cards
- Single column on mobile
- 2 columns on tablet
- 3-4 columns on desktop

#### Typography
- Smaller font sizes on mobile
- Adjusted line heights
- Shorter text blocks

### 8.3 Touch Interactions

- Larger tap targets (min 44×44px)
- Swipe gestures for galleries
- Pull-to-refresh disabled
- Smooth momentum scrolling

---

## 9. Accessibility

### 9.1 WCAG Compliance

**Target**: WCAG 2.1 Level AA

### 9.2 Features

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus Indicators**: Visible focus rings
- **Screen Reader Support**: Semantic HTML, ARIA labels where needed
- **Color Contrast**: 4.5:1 minimum for text
- **Alt Text**: All images have descriptive alternatives
- **Skip Links**: Skip to main content
- **Heading Hierarchy**: Proper H1-H6 structure
- **Form Labels**: All inputs properly labeled
- **Error Messages**: Clear, descriptive error states

### 9.3 Custom Cursor Accessibility

- Custom cursor is visual enhancement only
- Does not interfere with native cursor
- Disabled on touch devices
- Does not hide native cursor

---

## 10. Browser & Device Support

### 10.1 Browsers

**Fully Supported**:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

**Graceful Degradation**:
- Older browsers get functional experience without advanced animations
- Fallbacks for CSS features (backdrop-filter, etc.)

### 10.2 Devices

- Desktop (Windows, macOS, Linux)
- Tablets (iPad, Android tablets)
- Mobile (iOS, Android)
- Screen sizes: 320px - 2560px+

---

## 11. Development & Deployment

### 11.1 Development Workflow

1. **Local Development**: `npm run dev` (port 3000)
2. **Sanity Studio**: Accessible at `/studio`
3. **Type Checking**: TypeScript strict mode
4. **Linting**: Next.js ESLint configuration
5. **Git Workflow**: Feature branches, pull requests

### 11.2 Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Revalidation
REVALIDATION_SECRET=

# Draft Mode
SANITY_PREVIEW_SECRET=
```

### 11.3 Build & Deployment

**Build Command**: `npm run build`
**Start Command**: `npm start`

**Recommended Platform**: Vercel
- Automatic deployments from Git
- Preview deployments for PRs
- Edge network for fast global delivery
- Serverless functions for API routes
- Automatic HTTPS

**Alternative Platforms**: Netlify, Cloudflare Pages, self-hosted

### 11.4 Post-Deployment Setup

1. Configure Sanity webhook for revalidation
2. Set up custom domain
3. Configure analytics (optional)
4. Set up error tracking (optional)
5. Configure email for contact forms (if applicable)

---

## 12. Future Enhancements

### 12.1 Planned Features

- **Blog**: Add blog functionality with MDX support
- **Case Studies**: Detailed project breakdowns with process documentation
- **Contact Form**: Integrated contact form with email notifications
- **Newsletter**: Email subscription for updates
- **Search**: Full-text search across projects and content
- **Filtering**: Advanced filtering and sorting on projects page
- **Analytics Dashboard**: View project views and engagement
- **Internationalization**: Multi-language support (English/Indonesian)

### 12.2 Technical Improvements

- **Progressive Web App (PWA)**: Offline support, installable
- **Animation Presets**: Reusable animation configurations
- **Component Library**: Storybook for component documentation
- **Testing**: Unit tests (Jest), E2E tests (Playwright)
- **Performance Monitoring**: Real User Monitoring (RUM)
- **A/B Testing**: Experiment with different layouts and CTAs

### 12.3 Content Enhancements

- **Video Backgrounds**: Subtle animated backgrounds
- **Interactive Demos**: Embedded project demos
- **3D Elements**: Three.js integration for visual interest
- **Audio**: Background music or sound effects (toggleable)
- **Micro-interactions**: More delightful UI feedback

---

## 13. Success Metrics

### 13.1 Technical KPIs

- Lighthouse Performance Score: 90+
- Page Load Time: < 2s
- Time to Interactive: < 3s
- Zero critical accessibility issues
- 99.9% uptime

### 13.2 Business KPIs

- Visitor engagement (time on site, pages per session)
- Project view rate
- Contact form submissions / inquiries
- Social shares
- Return visitor rate

### 13.3 User Feedback

- Qualitative feedback from visitors
- Usability testing results
- Peer reviews from developer/designer community
- Client testimonials

---

## 14. Maintenance & Support

### 14.1 Regular Maintenance

- **Content Updates**: Weekly/monthly via Sanity Studio
- **Dependency Updates**: Monthly security patches, quarterly major updates
- **Performance Monitoring**: Weekly Lighthouse audits
- **Backup**: Automated Sanity backups
- **Security**: Regular security audits

### 14.2 Support Channels

- GitHub Issues for bug reports
- Email for general inquiries
- Documentation for common tasks

---

## 15. Conclusion

**Langley Portfolio** is a cutting-edge, full-stack portfolio website that pushes the boundaries of traditional portfolio design. By merging the visual languages of professional creative software (After Effects and VS Code), it creates a unique, memorable experience that showcases the creator's dual expertise in video editing and web development.

The project leverages modern web technologies (Next.js, React, TypeScript, Sanity CMS) to deliver a fast, flexible, and maintainable solution. With its premium animations, responsive design, and comprehensive content management system, it serves as both a portfolio and a demonstration of technical capabilities.

The modular architecture and headless CMS approach ensure the site can evolve with the creator's career, easily accommodating new projects, services, and content types without requiring code changes.

---

**Document Version**: 1.0  
**Last Updated**: December 11, 2025  
**Project Status**: Active Development  
**Tech Stack Version**: Next.js 16, React 19, Sanity 3.57
