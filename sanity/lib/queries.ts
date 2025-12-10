/**
 * GROQ Queries
 * 
 * All GROQ queries for fetching content from Sanity.
 * Import these in your Next.js pages/components.
 * 
 * Query naming convention:
 * - get[Type]Query: Returns the GROQ string
 * - Actual fetching is done in your pages using the client
 */

// ============================================
// SITE SETTINGS QUERIES
// ============================================

/**
 * Fetch site settings (singleton).
 * Used for: Layout, SEO, navigation, footer.
 */
export const getSiteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    heroTitle,
    heroSubtitle,
    heroImage {
      ...,
      asset->
    },
    defaultSeoImage {
      ...,
      asset->
    },
    socials[] {
      platform,
      url,
      label
    },
    footerText
  }
`

// ============================================
// PROFILE QUERIES
// ============================================

/**
 * Fetch profile (singleton).
 * Used for: About page, author info.
 */
export const getProfileQuery = /* groq */ `
  *[_type == "profile"][0] {
    name,
    role,
    shortBio,
    longBio,
    avatarImage {
      ...,
      asset->
    },
    socials[] {
      platform,
      url,
      label
    }
  }
`

// ============================================
// PROJECT QUERIES
// ============================================

/**
 * Fetch featured projects for homepage.
 * Returns projects that are featured OR pinned.
 * Ordered by: pinned first, then display order, then date.
 */
export const getFeaturedProjectsQuery = /* groq */ `
  *[_type == "project" && (isFeatured == true || isPinned == true)] | order(isPinned desc, displayOrder asc, date desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    summary,
    projectType,
    category-> {
      name,
      "slug": slug.current
    },
    coverImage {
      ...,
      asset->
    },
    date,
    accentColor,
    isPinned,
    isFeatured,
    tools[]-> {
      name,
      "slug": slug.current,
      icon {
        asset->
      }
    }
  }
`

/**
 * Fetch all projects for portfolio page.
 * Supports optional filtering by projectType.
 * 
 * Usage with filter:
 * ```ts
 * const query = getAllProjectsQuery
 * const params = { type: 'web' } // or null for all
 * const projects = await client.fetch(query, params)
 * ```
 */
export const getAllProjectsQuery = /* groq */ `
  *[_type == "project" && (!defined($type) || $type == "" || projectType == $type)] | order(displayOrder asc, date desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    projectType,
    category-> {
      name,
      "slug": slug.current
    },
    coverImage {
      ...,
      asset->
    },
    date,
    accentColor,
    isCommission,
    isPinned,
    isFeatured,
    tools[]-> {
      name,
      "slug": slug.current
    },
    tags[]-> {
      name,
      "slug": slug.current
    }
  }
`

/**
 * Fetch a single project by slug for detail page.
 * Includes all fields and expanded references.
 */
export const getProjectBySlugQuery = /* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    projectType,
    category-> {
      name,
      "slug": slug.current
    },
    coverImage {
      ...,
      asset->,
      alt
    },
    gallery[] {
      type,
      image {
        ...,
        asset->
      },
      videoEmbedUrl,
      caption
    },
    tools[]-> {
      name,
      "slug": slug.current,
      icon {
        asset->
      },
      url
    },
    tags[]-> {
      name,
      "slug": slug.current
    },
    clientName,
    isCommission,
    date,
    isFeatured,
    isPinned,
    displayOrder,
    accentColor,
    liveUrl,
    repoUrl,
    videoEmbedUrl
  }
`

/**
 * Fetch all project slugs for static generation.
 * Used with Next.js generateStaticParams().
 */
export const getAllProjectSlugsQuery = /* groq */ `
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`

// ============================================
// SERVICE QUERIES
// ============================================

/**
 * Fetch all services.
 * Ordered by display order.
 */
export const getServicesQuery = /* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    order
  }
`

// ============================================
// TESTIMONIAL QUERIES
// ============================================

/**
 * Fetch all testimonials.
 * Includes optional project reference.
 */
export const getTestimonialsQuery = /* groq */ `
  *[_type == "testimonial"] {
    _id,
    name,
    role,
    testimonialBody,
    project-> {
      title,
      "slug": slug.current
    },
    avatarImage {
      ...,
      asset->
    }
  }
`

// ============================================
// FAQ QUERIES
// ============================================

/**
 * Fetch FAQ (singleton).
 * Returns array of FAQ items ordered by order field.
 */
export const getFaqQuery = /* groq */ `
  *[_type == "faq"][0] {
    items[] | order(order asc) {
      question,
      answer,
      order
    }
  }
`

// ============================================
// TAXONOMY QUERIES
// ============================================

/**
 * Fetch all project categories.
 */
export const getProjectCategoriesQuery = /* groq */ `
  *[_type == "projectCategory"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    order
  }
`

/**
 * Fetch all tools.
 */
export const getToolsQuery = /* groq */ `
  *[_type == "tool"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    icon {
      asset->
    },
    url
  }
`

/**
 * Fetch all tags.
 */
export const getTagsQuery = /* groq */ `
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`
