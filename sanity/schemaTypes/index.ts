/**
 * Schema Types Index
 * 
 * Central export of all schemas for Sanity configuration.
 * Schemas are organized into three categories:
 * - Objects: Reusable nested types (socialLink, galleryItem, faqItem)
 * - Documents: Regular content types (project, tag, tool, etc.)
 * - Singletons: One-of documents (profile, siteSettings, faq)
 */

import type { SchemaTypeDefinition } from 'sanity'

// Object schemas (reusable nested types)
import { socialLink, galleryItem, faqItem } from './objects'

// Document schemas (regular content)
import { tag, tool, projectCategory, project } from './documents'

// Singleton schemas (single-instance documents)
import { profile, siteSettings, faq } from './singletons'

/**
 * All schema types combined for Sanity registration.
 * Order matters for reference resolution.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects first (used by other schemas)
  socialLink,
  galleryItem,
  faqItem,
  
  // Independent documents (no dependencies)
  tag,
  tool,
  projectCategory,
  
  // Documents with references
  project,


  
  // Singletons
  profile,
  siteSettings,
  faq,
]

/**
 * List of singleton type names.
 * Used by the desk structure to show singletons differently.
 */
export const singletonTypes = ['profile', 'siteSettings', 'faq'] as const

/**
 * List of document type names (non-singleton).
 * Useful for filtering in desk structure.
 */
export const documentTypes = [
  'project',
  'projectCategory',
  'tool',
  'tag',


] as const
