'use client'

import { Component, type ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    crashed: boolean
}

/**
 * WebGL canvases can throw at runtime on some GPU/driver combos (shader
 * compile failures, context loss with many live contexts). A crash there
 * must never take down the host page — degrade to the labelled static
 * panel instead.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
    state: State = { crashed: false }

    static getDerivedStateFromError(): State {
        return { crashed: true }
    }

    componentDidCatch(error: unknown) {
        console.warn('[3d] canvas disabled after runtime error:', error)
    }

    render() {
        if (this.state.crashed) return null
        return this.props.children
    }
}
