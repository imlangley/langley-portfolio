/**
 * project Document Schema
 * 
 * Core content type representing any work:
 * - Web development projects
 * - Video editing commissions
 * - Mixed/other work
 */

import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  
  // Organize fields into logical groups
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'metadata', title: 'Metadata' },
    { name: 'links', title: 'Links' },
  ],

  fields: [
    // ============================================
    // CONTENT GROUP - Core project information
    // ============================================
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Project name as it will appear on the site',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL-safe identifier (click Generate)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'content',
      description: 'Short 1-2 sentence description for cards. Max 280 characters.',
      rows: 2,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'content',
      description: 'Rich case-study content with headings, images, and code blocks',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),

    // ============================================
    // MEDIA GROUP - Images and videos
    // ============================================
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      description: 'Hero image. Recommended: 1920×1080 (16:9). Set the focal point.',
      options: {
        hotspot: true, // Enable focal point selection
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      description: 'Additional images and videos for the project',
      of: [{ type: 'galleryItem' }],
    }),
    defineField({
      name: 'videoEmbedUrl',
      title: 'Main Video Embed URL',
      type: 'string',
      group: 'media',
      description: 'YouTube or Vimeo URL for the main project video',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      group: 'media',
      description: 'Hex color for unique card/hero styling (e.g., #6366f1)',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }).warning('Please enter a valid hex color (e.g., #6366f1)'),
    }),

    // ============================================
    // METADATA GROUP - Classification and dates
    // ============================================
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      group: 'metadata',
      description: 'Primary type of work',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: 'Video Editing', value: 'video' },
          { title: 'Mixed / Other', value: 'mixed' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'web',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'metadata',
      description: 'Optional sub-category (e.g., "Landing Pages", "Music Videos")',
      to: [{ type: 'projectCategory' }],
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Stack',
      type: 'array',
      group: 'metadata',
      description: 'Technologies and software used',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      description: 'Freeform tags for filtering',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'metadata',
      description: 'Completion or publish date',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      group: 'metadata',
      description: 'Client name (if applicable and can be shared)',
    }),
    defineField({
      name: 'isCommission',
      title: 'Is Commission',
      type: 'boolean',
      group: 'metadata',
      description: 'Was this paid work?',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      group: 'metadata',
      description: 'Show in the featured/homepage section',
      initialValue: false,
    }),
    defineField({
      name: 'isPinned',
      title: 'Pinned',
      type: 'boolean',
      group: 'metadata',
      description: 'Always show on homepage regardless of date',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'metadata',
      description: 'Manual ordering for pinned/featured items (lower = first)',
    }),

    // ============================================
    // LINKS GROUP - External URLs
    // ============================================
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      group: 'links',
      description: 'Link to the live website (web projects)',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
      group: 'links',
      description: 'GitHub or GitLab repository URL',
    }),
  ],

  // Preview configuration for document list
  preview: {
    select: {
      title: 'title',
      projectType: 'projectType',
      date: 'date',
      media: 'coverImage',
      isFeatured: 'isFeatured',
      isPinned: 'isPinned',
    },
    prepare({ title, projectType, date, media, isFeatured, isPinned }) {
      const typeLabels: Record<string, string> = {
        web: '🌐 Web',
        video: '🎬 Video',
        mixed: '🔀 Mixed',
      }
      const badges = []
      if (isPinned) badges.push('📌')
      if (isFeatured) badges.push('⭐')
      
      return {
        title: `${badges.join(' ')} ${title}`.trim(),
        subtitle: `${typeLabels[projectType] || projectType} • ${date || 'No date'}`,
        media,
      }
    },
  },

  // Default ordering in document list
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
})
