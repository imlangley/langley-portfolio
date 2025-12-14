/**
 * faq Singleton Schema
 * 
 * Frequently asked questions section.
 * This is a singleton - only one document of this type exists.
 */

import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array' as const,
      description: 'Add questions and answers',
      of: [{ type: 'faqItem' }],
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const count = items?.length || 0
      return {
        title: 'FAQ',
        subtitle: `${count} question${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
