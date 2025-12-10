/**
 * galleryItem Object Schema
 * 
 * Unified media item supporting both images and videos.
 * Used in: project.gallery array
 */

import { defineField, defineType } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      description: 'Select whether this is an image or video',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload an image (recommended: 1920×1080 or higher)',
      options: {
        hotspot: true, // Enable focal point selection
      },
      // Only show this field when type is 'image'
      hidden: ({ parent }) => parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string }
          if (parent?.type === 'image' && !value) {
            return 'Image is required when type is "image"'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoEmbedUrl',
      title: 'Video Embed URL',
      type: 'string',
      description: 'YouTube or Vimeo URL (e.g., https://youtube.com/watch?v=...)',
      // Only show this field when type is 'video'
      hidden: ({ parent }) => parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string }
          if (parent?.type === 'video' && !value) {
            return 'Video URL is required when type is "video"'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Alt text for images or description for videos',
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      type: 'type',
      image: 'image',
      caption: 'caption',
      videoUrl: 'videoEmbedUrl',
    },
    prepare({ type, image, caption, videoUrl }) {
      return {
        title: caption || (type === 'image' ? 'Image' : 'Video'),
        subtitle: type === 'video' ? videoUrl : undefined,
        media: type === 'image' ? image : undefined,
      }
    },
  },
})
