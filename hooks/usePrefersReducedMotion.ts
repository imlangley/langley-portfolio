'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  )
}
