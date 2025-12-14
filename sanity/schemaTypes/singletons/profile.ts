/**
 * profile Singleton Schema
 * 
 * Personal brand info for About page and author metadata.
 * This is a singleton - only one document of this type exists.
 */

import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Your name or handle',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Professional title (e.g., "Web Developer & Video Editor")',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: '1-2 sentence tagline for headers and cards',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'longBio',
      title: 'Long Bio',
      type: 'array' as const,
      description: 'Extended biography for the About page',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
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
    }),
    defineField({
      name: 'avatarImage',
      title: 'Avatar Image',
      type: 'image',
      description: 'Profile photo (recommended: square, at least 400×400)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array' as const,
      description: 'Your social media profiles',
      of: [{ type: 'socialLink' }],
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
