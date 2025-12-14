/**
 * testimonial Document Schema
 * 
 * Client testimonials and reviews.
 */

import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the person giving the testimonial',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'role',
      title: 'Role / Client Type',
      type: 'string',
      description: 'Their role or how they relate to the project (e.g., "Founder, Startup XYZ")',
    }),
    defineField({
      name: 'testimonialBody',
      title: 'Testimonial',
      type: 'text',
      description: 'The testimonial text',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'project',
      title: 'Related Project',
      type: 'reference' as const,
      description: 'Link to the project this testimonial is about (optional)',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'avatarImage',
      title: 'Avatar Image',
      type: 'image',
      description: 'Client photo (optional)',
      options: {
        hotspot: true,
      },
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatarImage',
    },
  },
})
