/**
 * tag Document Schema
 * 
 * Freeform tags for flexible project categorization.
 * Examples: "landing-page", "motion-graphics", "ecommerce"
 */

import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Tag display name',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-safe identifier (auto-generated)',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  // Preview configuration for document list
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})
