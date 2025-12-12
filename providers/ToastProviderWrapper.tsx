'use client'

import { ToastProvider } from '@/components/reactbits'
import { ReactNode } from 'react'

export function ToastProviderWrapper({ children }: { children: ReactNode }) {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    )
}
