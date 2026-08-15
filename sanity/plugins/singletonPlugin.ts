/**
 * Singleton Plugin
 * 
 * This plugin provides utilities for working with singleton documents in Sanity.
 * Singletons are document types where only one instance should exist (e.g., site settings).
 * 
 * Features:
 * - Prevents creating new instances of singleton documents
 * - Filters out singletons from the default "New document" menu
 * - Provides action filter to prevent deletion/duplication
 */

import { type DocumentActionComponent, type DocumentActionsContext, type NewDocumentOptionsResolver } from 'sanity'

/**
 * List of singleton document type names.
 * These types will only have one instance each.
 */
export const SINGLETON_TYPES = ['profile', 'siteSettings', 'faq'] as const
export type SingletonType = (typeof SINGLETON_TYPES)[number]

/**
 * Check if a document type is a singleton.
 */
export function isSingleton(typeName: string): boolean {
  return SINGLETON_TYPES.includes(typeName as SingletonType)
}

/**
 * Filter for the "New document" menu.
 * Removes singleton types from the creation options.
 */
export const singletonNewDocumentFilter: NewDocumentOptionsResolver = (prev) =>
  prev.filter((option) => !isSingleton((option as { schemaType?: string }).schemaType ?? ''))

/**
 * Filter for document actions.
 * Removes "duplicate" and "delete" actions from singleton documents.
 * 
 * @param prev - Previous action components
 * @param context - Document action context
 */
export function singletonActionFilter(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext
): DocumentActionComponent[] {
  if (isSingleton(context.schemaType)) {
    // For singletons, only keep publish and discard actions
    return prev.filter(
      (action) =>
        action.action === 'publish' ||
        action.action === 'discardChanges' ||
        action.action === 'restore'
    )
  }
  return prev
}

/**
 * Singleton document IDs
 * Each singleton has a fixed document ID for easy querying.
 */
export const SINGLETON_IDS: Record<SingletonType, string> = {
  profile: 'profile',
  siteSettings: 'siteSettings',
  faq: 'faq',
}

/**
 * Get the document ID for a singleton type.
 */
export function getSingletonId(type: SingletonType): string {
  return SINGLETON_IDS[type]
}
