/**
 * Preview Banner Component
 * 
 * Displays a banner when Draft Mode is active.
 * Shows a link to exit preview and return to published content.
 * 
 * Usage in layout.tsx:
 * ```tsx
 * import { draftMode } from 'next/headers'
 * import { PreviewBanner } from '@/components/PreviewBanner'
 * 
 * export default async function RootLayout({ children }) {
 *   const { isEnabled } = await draftMode()
 *   return (
 *     <html>
 *       <body>
 *         {isEnabled && <PreviewBanner />}
 *         {children}
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */

import Link from 'next/link'

export function PreviewBanner() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            backgroundColor: '#e63946',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Preview Mode
        </span>
        <span>You are viewing unpublished content.</span>
      </div>
      <Link
        href="/api/draft/disable"
        style={{
          backgroundColor: '#ffffff',
          color: '#1a1a2e',
          padding: '8px 16px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'opacity 0.2s',
        }}
      >
        Exit Preview
      </Link>
    </div>
  )
}
