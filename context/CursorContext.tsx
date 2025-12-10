'use client'

import React, { createContext, useContext, useState } from 'react'

type CursorContextType = {
    setCursorText: (text: string) => void
    setCursorVariant: (variant: 'default' | 'project' | 'button') => void
    cursorText: string
    cursorVariant: 'default' | 'project' | 'button'
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [cursorText, setCursorText] = useState('')
    const [cursorVariant, setCursorVariant] = useState<'default' | 'project' | 'button'>('default')

    return (
        <CursorContext.Provider value={{ setCursorText, setCursorVariant, cursorText, cursorVariant }}>
            {children}
        </CursorContext.Provider>
    )
}

export function useCursor() {
    const context = useContext(CursorContext)
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider')
    }
    return context
}
