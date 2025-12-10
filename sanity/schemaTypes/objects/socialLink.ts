/**
 * socialLink Object Schema
 * 
 * Reusable object for social media links.
 * Used in: profile, siteSettings
 */

import { defineField, defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Select the social media platform',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Email', value: 'email' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Full URL to your profile (use mailto: for email)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    }),
    defineField({
      name: 'label',
      title: 'Custom Label',
      type: 'string',
      description: 'Optional custom display label (defaults to platform name)',
    }),
  ],
  // Preview configuration for the object in arrays
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
      label: 'label',
    },
    prepare({ platform, url, label }) {
      const platformNames: Record<string, string> = {
        github: 'GitHub',
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        twitter: 'Twitter / X',
        linkedin: 'LinkedIn',
        email: 'Email',
        other: 'Other',
      }
      return {
        title: label || platformNames[platform] || platform,
        subtitle: url,
      }
    },
  },
})
