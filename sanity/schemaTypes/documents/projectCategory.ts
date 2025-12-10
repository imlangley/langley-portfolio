/**
 * projectCategory Document Schema
 * 
 * Optional sub-grouping for projects beyond projectType.
 * Examples: "Landing Pages", "Music Videos", "SaaS Apps"
 */

import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Category display name',
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
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this category',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in navigation',
      initialValue: 0,
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      title: 'name',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title,
        subtitle: order !== undefined ? `Order: ${order}` : undefined,
      }
    },
  },
  // Default ordering in document list
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
