/**
 * faqItem Object Schema
 * 
 * Single FAQ question/answer pair.
 * Used in: faq.items array
 */

import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array' as const,
      description: 'Rich text answer',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      question: 'question',
      order: 'order',
    },
    prepare({ question, order }) {
      return {
        title: question,
        subtitle: order !== undefined ? `Order: ${order}` : undefined,
      }
    },
  },
})
