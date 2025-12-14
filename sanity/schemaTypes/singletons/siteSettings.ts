/**
 * siteSettings Singleton Schema
 * 
 * Global configuration and SEO defaults for the entire site.
 * This is a singleton - only one document of this type exists.
 */

import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  
  // Organize fields into groups
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'social', title: 'Social & Footer' },
  ],

  fields: [
    // ============================================
    // GENERAL GROUP - SEO and metadata
    // ============================================
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      description: 'Default SEO title (e.g., "Langley | Developer & Editor")',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      group: 'general',
      description: 'Default meta description for search engines',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon / Browser Icon',
      type: 'image',
      group: 'general',
      description: 'Upload a square image (png/jpg/svg) to be used as the browser tab icon. Falls back to default if empty.',
      options: {
        accept: 'image/png, image/jpeg, image/svg+xml, image/x-icon',
      },
    }),

    // ============================================
    // HERO GROUP - Homepage hero content
    // ============================================
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      description: 'Homepage hero heading (e.g., "Hi, I\'m Langley")',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
      description: 'Homepage hero subheading',
    }),

    // ============================================
    // SOCIAL GROUP - Social links and footer
    // ============================================
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array' as const,
      group: 'social',
      description: 'Site-wide social media links (shown in header/footer)',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      group: 'social',
      description: 'Footer copyright or tagline',
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global configuration',
      }
    },
  },
})
