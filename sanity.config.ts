/**
 * Sanity Configuration
 * 
 * Main configuration file for Sanity Studio v3.
 * This configures:
 * - Project ID and dataset
 * - Schema types
 * - Custom desk structure
 * - Singleton document handling
 * - Plugins
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Schema types
import { schemaTypes } from './sanity/schemaTypes'

// Custom desk structure
import { structure } from './sanity/structure'

// Singleton utilities
import {
  singletonNewDocumentFilter,
  singletonActionFilter,
  SINGLETON_TYPES,
  SINGLETON_IDS,
} from './sanity/plugins/singletonPlugin'

/**
 * Sanity Studio Configuration
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID: Your Sanity project ID
 * - NEXT_PUBLIC_SANITY_DATASET: Dataset name (usually "production")
 */
export default defineConfig({
  // Project identification
  name: 'langley-portfolio',
  title: 'Langley Portfolio',

  // Project ID and dataset from environment variables
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // Plugins
  plugins: [
    // Structure tool with custom desk configuration
    structureTool({
      structure,
    }),
    // Vision tool for testing GROQ queries (dev only)
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  // Schema configuration
  schema: {
    types: schemaTypes,
    
    // Customize initial document templates
    // This ensures singletons are created with the correct ID
    templates: (prev) => {
      // Filter out singleton templates and add custom ones with fixed IDs
      const filtered = prev.filter(
        (template) => !SINGLETON_TYPES.includes(template.schemaType as any)
      )

      // Add singleton templates with fixed document IDs
      const singletonTemplates = SINGLETON_TYPES.map((type) => ({
        id: type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        schemaType: type,
        value: {
          _id: SINGLETON_IDS[type],
        },
      }))

      return [...filtered, ...singletonTemplates]
    },
  },

  // Document configuration
  document: {
    // Filter out singletons from "New document" menu
    newDocumentOptions: singletonNewDocumentFilter,

    // Customize document actions (removes delete/duplicate for singletons)
    actions: singletonActionFilter,
  },
})
