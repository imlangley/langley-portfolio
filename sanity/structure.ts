/**
 * Desk Structure Configuration
 * 
 * Customizes the Sanity Studio sidebar to organize content into logical groups:
 * - Content: Projects, Services, Testimonials
 * - Taxonomy: Categories, Tools, Tags
 * - Settings: Profile, Site Settings, FAQ (singletons)
 * 
 * Singletons are shown as direct edit views (no list view needed).
 */

import { type StructureBuilder, type StructureResolverContext } from 'sanity/structure'
import {
  ProjectsIcon,
  BulbOutlineIcon,
  CommentIcon,
  FolderIcon,
  WrenchIcon,
  TagIcon,
  UserIcon,
  CogIcon,
  HelpCircleIcon,
} from '@sanity/icons'
import { SINGLETON_IDS, type SingletonType } from './plugins/singletonPlugin'

/**
 * Helper function to create a singleton list item.
 * Shows the document directly without a list view.
 */
function createSingletonListItem(
  S: StructureBuilder,
  typeName: SingletonType,
  title: string,
  icon: React.ComponentType
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(SINGLETON_IDS[typeName])
        .title(title)
    )
}

/**
 * Main desk structure configuration.
 * Organizes documents into Content, Taxonomy, and Settings groups.
 */
export function structure(
  S: StructureBuilder,
  context: StructureResolverContext
) {
  return S.list()
    .title('Content')
    .items([
      // ============================================
      // CONTENT GROUP - Main content types
      // ============================================
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              // Projects
              S.listItem()
                .title('Projects')
                .icon(ProjectsIcon)
                .child(
                  S.documentTypeList('project')
                    .title('Projects')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }])
                ),



              // Testimonials
              S.listItem()
                .title('Testimonials')
                .icon(CommentIcon)
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonials')
                ),
            ])
        ),

      S.divider(),

      // ============================================
      // TAXONOMY GROUP - Classification types
      // ============================================
      S.listItem()
        .title('Taxonomy')
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              // Project Categories
              S.listItem()
                .title('Project Categories')
                .icon(FolderIcon)
                .child(
                  S.documentTypeList('projectCategory')
                    .title('Project Categories')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),

              // Tools & Stack
              S.listItem()
                .title('Tools & Stack')
                .icon(WrenchIcon)
                .child(
                  S.documentTypeList('tool')
                    .title('Tools & Stack')
                ),

              // Tags
              S.listItem()
                .title('Tags')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('tag')
                    .title('Tags')
                ),
            ])
        ),

      S.divider(),

      // ============================================
      // SETTINGS GROUP - Singletons
      // ============================================
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              // Profile (singleton)
              createSingletonListItem(S, 'profile', 'Profile', UserIcon),

              // Site Settings (singleton)
              createSingletonListItem(S, 'siteSettings', 'Site Settings', CogIcon),

              // FAQ (singleton)
              createSingletonListItem(S, 'faq', 'FAQ', HelpCircleIcon),
            ])
        ),
    ])
}
