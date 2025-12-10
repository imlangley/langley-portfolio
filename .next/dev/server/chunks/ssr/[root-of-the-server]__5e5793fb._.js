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
"[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Hero",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Hero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Hero() from the server but Hero is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx <module evaluation>", "Hero");
}),
"[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Hero",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Hero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Hero() from the server but Hero is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx", "Hero");
}),
"[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FeaturedProjects",
    ()=>FeaturedProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FeaturedProjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FeaturedProjects() from the server but FeaturedProjects is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx <module evaluation>", "FeaturedProjects");
}),
"[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FeaturedProjects",
    ()=>FeaturedProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FeaturedProjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FeaturedProjects() from the server but FeaturedProjects is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx", "FeaturedProjects");
}),
"[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$FeaturedProjects$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$FeaturedProjects$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$FeaturedProjects$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Documents/GitHub/langley-portfolio/app/(site)/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Homepage - Main Entry Point
 * 
 * Assembles the Hero, Featured Projects, and other sections.
 * Fetches data from Sanity on the server.
 */ __turbopack_context__.s([
    "default",
    ()=>HomePage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/sanity/lib/fetch.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/components/home/Hero.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$FeaturedProjects$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx [app-rsc] (ecmascript)");
;
;
;
;
const revalidate = 60 // ISR every 60 seconds
;
async function HomePage() {
    const settings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSiteSettings"])();
    const projects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$sanity$2f$lib$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFeaturedProjects"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Hero"], {
                title: settings?.heroTitle,
                subtitle: settings?.heroSubtitle,
                image: settings?.heroImage,
                siteSettings: settings
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/page.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$components$2f$home$2f$FeaturedProjects$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FeaturedProjects"], {
                projects: projects
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/langley-portfolio/app/(site)/page.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/Documents/GitHub/langley-portfolio/app/(site)/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/app/(site)/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5e5793fb._.js.map