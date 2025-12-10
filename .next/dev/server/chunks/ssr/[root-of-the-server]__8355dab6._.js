module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/GitHub/langley-portfolio/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/GitHub/langley-portfolio/app/(site)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/app/(site)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/GitHub/langley-portfolio/sanity/lib/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sanity Client Configuration
 * 
 * Creates and exports a configured Sanity client for querying content.
 * This client is used by the Next.js frontend to fetch data.
 * 
 * Features:
 * - Configurable for draft/preview mode
 * - Type-safe environment variable handling
 * - Reusable across the application
 */ __turbopack_context__.s([
    "apiVersion",
    ()=>apiVersion,
    "client",
    ()=>client,
    "dataset",
    ()=>dataset,
    "getClient",
    ()=>getClient,
    "previewClient",
    ()=>previewClient,
    "projectId",
    ()=>projectId,
    "sanityConfig",
    ()=>sanityConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>");
;
const sanityConfig = {
    projectId: ("TURBOPACK compile-time value", "579t8o66") || '',
    dataset: ("TURBOPACK compile-time value", "production") || 'production',
    apiVersion: ("TURBOPACK compile-time value", "2024-01-01") || '2024-01-01',
    // useCdn: true for production, false for preview/development
    useCdn: ("TURBOPACK compile-time value", "development") === 'production'
};
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(sanityConfig);
const previewClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    ...sanityConfig,
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: 'previewDrafts'
});
function getClient(preview = false) {
    return preview ? previewClient : client;
}
const projectId = sanityConfig.projectId;
const dataset = sanityConfig.dataset;
const apiVersion = sanityConfig.apiVersion;
}),
"[project]/Documents/GitHub/langley-portfolio/sanity/lib/image.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sanity Image URL Builder
 * 
 * Provides utilities for generating optimized image URLs from Sanity assets.
 * Supports responsive images, hotspots, and crops.
 */ __turbopack_context__.s([
    "getImageLqip",
    ()=>getImageLqip,
    "getImageSrcSet",
    ()=>getImageSrcSet,
    "getImageUrl",
    ()=>getImageUrl,
    "urlFor",
    ()=>urlFor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/client.ts [app-rsc] (ecmascript)");
;
;
/**
 * Image URL builder instance.
 * Used to generate URLs with transformations.
 */ const builder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"]);
function urlFor(source) {
    return builder.image(source);
}
function getImageUrl(image, width = 800, quality = 80) {
    if (!image) return null;
    return urlFor(image).width(width).quality(quality).auto('format') // Auto-select best format (webp, etc.)
    .url();
}
function getImageSrcSet(image, widths = [
    320,
    640,
    1024,
    1440,
    1920
]) {
    if (!image) return null;
    return widths.map((w)=>`${urlFor(image).width(w).auto('format').url()} ${w}w`).join(', ');
}
function getImageLqip(image) {
    return image?.asset?.metadata?.lqip;
}
}),
"[project]/Documents/GitHub/langley-portfolio/sanity/lib/queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * GROQ Queries
 * 
 * All GROQ queries for fetching content from Sanity.
 * Import these in your Next.js pages/components.
 * 
 * Query naming convention:
 * - get[Type]Query: Returns the GROQ string
 * - Actual fetching is done in your pages using the client
 */ // ============================================
// SITE SETTINGS QUERIES
// ============================================
/**
 * Fetch site settings (singleton).
 * Used for: Layout, SEO, navigation, footer.
 */ __turbopack_context__.s([
    "getAllProjectSlugsQuery",
    ()=>getAllProjectSlugsQuery,
    "getAllProjectsQuery",
    ()=>getAllProjectsQuery,
    "getFaqQuery",
    ()=>getFaqQuery,
    "getFeaturedProjectsQuery",
    ()=>getFeaturedProjectsQuery,
    "getProfileQuery",
    ()=>getProfileQuery,
    "getProjectBySlugQuery",
    ()=>getProjectBySlugQuery,
    "getProjectCategoriesQuery",
    ()=>getProjectCategoriesQuery,
    "getServicesQuery",
    ()=>getServicesQuery,
    "getSiteSettingsQuery",
    ()=>getSiteSettingsQuery,
    "getTagsQuery",
    ()=>getTagsQuery,
    "getTestimonialsQuery",
    ()=>getTestimonialsQuery,
    "getToolsQuery",
    ()=>getToolsQuery
]);
const getSiteSettingsQuery = /* groq */ `
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
`;
const getProfileQuery = /* groq */ `
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
`;
const getFeaturedProjectsQuery = /* groq */ `
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
`;
const getAllProjectsQuery = /* groq */ `
  *[_type == "project" && ($type == null || projectType == $type)] | order(displayOrder asc, date desc) {
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
`;
const getProjectBySlugQuery = /* groq */ `
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
`;
const getAllProjectSlugsQuery = /* groq */ `
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;
const getServicesQuery = /* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    order
  }
`;
const getTestimonialsQuery = /* groq */ `
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
`;
const getFaqQuery = /* groq */ `
  *[_type == "faq"][0] {
    items[] | order(order asc) {
      question,
      answer,
      order
    }
  }
`;
const getProjectCategoriesQuery = /* groq */ `
  *[_type == "projectCategory"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    order
  }
`;
const getToolsQuery = /* groq */ `
  *[_type == "tool"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    icon {
      asset->
    },
    url
  }
`;
const getTagsQuery = /* groq */ `
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;
}),
"[project]/Documents/GitHub/langley-portfolio/sanity/lib/fetch.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sanity Fetch Utilities
 * 
 * Wrapper functions for fetching Sanity data with proper typing and error handling.
 * Use these in your Next.js Server Components.
 */ __turbopack_context__.s([
    "getAllProjectSlugs",
    ()=>getAllProjectSlugs,
    "getAllProjects",
    ()=>getAllProjects,
    "getFaq",
    ()=>getFaq,
    "getFeaturedProjects",
    ()=>getFeaturedProjects,
    "getProfile",
    ()=>getProfile,
    "getProjectBySlug",
    ()=>getProjectBySlug,
    "getProjectCategories",
    ()=>getProjectCategories,
    "getServices",
    ()=>getServices,
    "getSiteSettings",
    ()=>getSiteSettings,
    "getTags",
    ()=>getTags,
    "getTestimonials",
    ()=>getTestimonials,
    "getTools",
    ()=>getTools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/queries.ts [app-rsc] (ecmascript)");
;
;
// ============================================
// FETCH FUNCTIONS
// ============================================
/**
 * Generic fetch wrapper with error handling.
 */ async function sanityFetch(query, params = {}, preview = false) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"])(preview);
    return client.fetch(query, params);
}
async function getSiteSettings(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSiteSettingsQuery"], {}, preview);
}
async function getProfile(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProfileQuery"], {}, preview);
}
async function getFeaturedProjects(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFeaturedProjectsQuery"], {}, preview);
}
async function getAllProjects(type = null, preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllProjectsQuery"], {
        type
    }, preview);
}
async function getProjectBySlug(slug, preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectBySlugQuery"], {
        slug
    }, preview);
}
async function getAllProjectSlugs() {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllProjectSlugsQuery"]);
}
async function getServices(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServicesQuery"], {}, preview);
}
async function getTestimonials(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTestimonialsQuery"], {}, preview);
}
async function getFaq(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFaqQuery"], {}, preview);
}
async function getProjectCategories(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectCategoriesQuery"], {}, preview);
}
async function getTools(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getToolsQuery"], {}, preview);
}
async function getTags(preview = false) {
    return sanityFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTagsQuery"], {}, preview);
}
}),
"[project]/Documents/GitHub/langley-portfolio/sanity/lib/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Sanity Library Index
 * 
 * Re-exports all Sanity utilities for convenient imports.
 * 
 * Usage:
 * ```ts
 * import { client, urlFor, getSiteSettings, type Project } from '@/sanity/lib'
 * ```
 */ // Client exports
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/client.ts [app-rsc] (ecmascript)");
// Image utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/image.ts [app-rsc] (ecmascript)");
// GROQ queries (for custom usage)
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/queries.ts [app-rsc] (ecmascript)");
// Fetch functions and types
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/fetch.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicesPage,
    "metadata",
    ()=>metadata,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/fetch.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
const metadata = {
    title: 'Services | Langley',
    description: 'Web development and video editing services.'
};
const revalidate = 60;
async function ServicesPage() {
    const services = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServices"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pt-32 pb-20 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container max-w-6xl space-y-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-6 max-w-3xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-5xl md:text-7xl font-extrabold tracking-tighter",
                                children: [
                                    "Services ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gradient",
                                        children: "&"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 27,
                                        columnNumber: 34
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 27,
                                        columnNumber: 74
                                    }, this),
                                    " Solutions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                lineNumber: 26,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl md:text-2xl text-muted-foreground leading-relaxed",
                                children: "Specialized engineering and creative services for brands that demand excellence."
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                lineNumber: 29,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12",
                        children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative p-10 rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 42,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex flex-col h-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300",
                                                children: service.icon || '⚡'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                lineNumber: 45,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold mb-4",
                                                children: service.title
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                lineNumber: 49,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg text-muted-foreground leading-relaxed flex-grow",
                                                children: service.shortDescription
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                lineNumber: 50,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-8 mt-auto border-t border-border/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-primary font-bold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Explore ",
                                                                service.title
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                            lineNumber: 56,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                className: "w-5 h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                                lineNumber: 58,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                            lineNumber: 57,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 44,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, service._id, true, {
                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                lineNumber: 37,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                        lineNumber: 35,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative rounded-3xl bg-black overflow-hidden px-8 py-24 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-90"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                lineNumber: 69,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[url('/grid.svg')] opacity-20"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 max-w-2xl mx-auto space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl md:text-5xl font-bold text-white tracking-tight",
                                        children: "Ready to elevate your project?"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl text-white/80",
                                        children: "Let's discuss how we can bring your vision to life with precision and creativity."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact",
                                        className: "inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl",
                                        children: "Book a Consultation"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
}),
"[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/app/(site)/services/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8355dab6._.js.map