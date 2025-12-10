/**
 * tool Document Schema
 * 
 * Technologies, software, and skills.
 * Examples: "Next.js", "DaVinci Resolve", "Tailwind CSS"
 */

import { defineField, defineType } from 'sanity'
import { WrenchIcon } from '@sanity/icons'

export const tool = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Tool or technology name',
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
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Tool logo or icon (optional, recommended: SVG or PNG)',
      options: {
        accept: 'image/*',
      },
    }),
    defineField({
      name: 'url',
      title: 'Official URL',
      type: 'url',
      description: 'Link to official website (optional)',
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      title: 'name',
      media: 'icon',
    },
  },
})
