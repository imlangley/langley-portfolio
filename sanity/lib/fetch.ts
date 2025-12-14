/**
 * Sanity Fetch Utilities
 * 
 * Wrapper functions for fetching Sanity data with proper typing and error handling.
 * Use these in your Next.js Server Components.
 */

import { getClient } from './client'
import {
  getSiteSettingsQuery,
  getProfileQuery,
  getFeaturedProjectsQuery,
  getAllProjectsQuery,
  getProjectBySlugQuery,
  getAllProjectSlugsQuery,
  getRelatedProjectsQuery,
  getServicesQuery,

  getFaqQuery,
  getProjectCategoriesQuery,
  getToolsQuery,
  getTagsQuery,
} from './queries'

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Base types for Sanity documents.
 * These match the data shapes returned by GROQ queries.
 */

export interface SocialLink {
  platform: string
  url: string
  label?: string
}

export interface SanityImageAsset {
  asset: {
    _ref: string
    url?: string
  }
  hotspot?: {
    x: number
    y: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

export interface SiteSettings {
  siteTitle: string
  siteDescription: string
  favicon?: SanityImageAsset
  heroTitle?: string
  heroSubtitle?: string
  socials?: SocialLink[]
  footerText?: string
}

export interface Profile {
  name: string
  role?: string
  shortBio?: string
  longBio?: any[] // Portable Text
  avatarImage?: SanityImageAsset
  socials?: SocialLink[]
}

export interface ProjectCategory {
  _id: string
  name: string
  slug: string
}

export interface Tool {
  _id: string
  name: string
  slug: string
  icon?: SanityImageAsset
  url?: string
}

export interface Tag {
  name: string
  slug: string
}

export interface GalleryItem {
  type: 'image' | 'video'
  image?: SanityImageAsset
  videoEmbedUrl?: string
  caption?: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  summary: string
  description?: any[] // Portable Text
  projectType: 'web' | 'video' | 'mixed'
  category?: ProjectCategory
  coverImage: SanityImageAsset
  gallery?: GalleryItem[]
  tools?: Tool[]
  tags?: Tag[]
  clientName?: string
  isCommission?: boolean
  date: string
  isFeatured?: boolean
  isPinned?: boolean
  displayOrder?: number
  accentColor?: string
  liveUrl?: string
  repoUrl?: string
  videoEmbedUrl?: string
}

export interface ProjectCard {
  _id: string
  title: string
  slug: string
  summary: string
  projectType: 'web' | 'video' | 'mixed'
  category?: ProjectCategory
  coverImage: SanityImageAsset
  date: string
  accentColor?: string
  isCommission?: boolean
  isPinned?: boolean
  isFeatured?: boolean
  tools?: Pick<Tool, 'name' | 'slug'>[]
  tags?: Tag[]
}

export interface Service {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  icon?: string
  order?: number
}



export interface FaqItem {
  question: string
  answer: any[] // Portable Text
  order?: number
}

export interface Faq {
  items?: FaqItem[]
}

// ============================================
// FETCH FUNCTIONS
// ============================================

/**
 * Generic fetch wrapper with error handling.
 */
async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  preview = false
): Promise<T> {
  const client = getClient(preview)
  return client.fetch<T>(query, params)
}

/**
 * Fetch site settings.
 */
export async function getSiteSettings(preview = false): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>(getSiteSettingsQuery, {}, preview)
}

/**
 * Fetch profile.
 */
export async function getProfile(preview = false): Promise<Profile | null> {
  return sanityFetch<Profile | null>(getProfileQuery, {}, preview)
}

/**
 * Fetch featured projects for homepage.
 */
export async function getFeaturedProjects(preview = false): Promise<ProjectCard[]> {
  return sanityFetch<ProjectCard[]>(getFeaturedProjectsQuery, {}, preview)
}

/**
 * Fetch all projects with optional type filter.
 */
export async function getAllProjects(
  type: 'web' | 'video' | 'mixed' | null = null,
  preview = false
): Promise<ProjectCard[]> {
  // Pass empty string for null type to work with GROQ !defined() check
  return sanityFetch<ProjectCard[]>(getAllProjectsQuery, { type: type ?? '' }, preview)
}

/**
 * Fetch a single project by slug.
 */
export async function getProjectBySlug(
  slug: string,
  preview = false
): Promise<Project | null> {
  return sanityFetch<Project | null>(getProjectBySlugQuery, { slug }, preview)
}

/**
 * Fetch all project slugs for static generation.
 */
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(getAllProjectSlugsQuery)
}

/**
 * Related project card type
 */
export interface RelatedProject {
  _id: string
  title: string
  slug: string
  summary?: string
  projectType: 'web' | 'video' | 'mixed'
  category?: ProjectCategory
  coverImage?: SanityImageAsset
}

/**
 * Fetch related projects by category or tags.
 */
export async function getRelatedProjects(
  currentId: string,
  categoryId: string | null,
  tagIds: string[] = [],
  preview = false
): Promise<RelatedProject[]> {
  return sanityFetch<RelatedProject[]>(
    getRelatedProjectsQuery,
    { currentId, categoryId: categoryId ?? '', tagIds },
    preview
  )
}

/**
 * Fetch all services.
 */
export async function getServices(preview = false): Promise<Service[]> {
  return sanityFetch<Service[]>(getServicesQuery, {}, preview)
}



/**
 * Fetch FAQ.
 */
export async function getFaq(preview = false): Promise<Faq | null> {
  return sanityFetch<Faq | null>(getFaqQuery, {}, preview)
}

/**
 * Fetch project categories.
 */
export async function getProjectCategories(
  preview = false
): Promise<ProjectCategory[]> {
  return sanityFetch<ProjectCategory[]>(getProjectCategoriesQuery, {}, preview)
}

/**
 * Fetch all tools.
 */
export async function getTools(preview = false): Promise<Tool[]> {
  return sanityFetch<Tool[]>(getToolsQuery, {}, preview)
}

/**
 * Fetch all tags.
 */
export async function getTags(preview = false): Promise<Tag[]> {
  return sanityFetch<Tag[]>(getTagsQuery, {}, preview)
}
