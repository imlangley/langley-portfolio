'use client'

import Link from 'next/link'
import { FileX } from 'lucide-react'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html lang="en">
            <body style={{ background: '#0b0d14', color: '#e6e6f0', fontFamily: 'ui-monospace, monospace', margin: 0 }}>
                <section
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: 420,
                            border: '1px solid #23263a',
                            borderRadius: 6,
                            background: '#12141c',
                            padding: '2rem',
                            textAlign: 'center',
                        }}
                    >
                        <FileX style={{ margin: '0 auto 1rem', width: 44, height: 44, color: '#ff6482' }} aria-hidden="true" />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
                            Crash — workspace halted
                        </h1>
                        <p style={{ color: '#8b8fa3', fontSize: 13, lineHeight: 1.6, marginTop: '0.75rem' }}>
                            {'// fatal: process exited unexpectedly'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={reset}
                                style={{
                                    flex: 1,
                                    height: 40,
                                    borderRadius: 6,
                                    background: '#9999ff',
                                    color: '#0b0b14',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Retry
                            </button>
                            <a
                                href="/"
                                style={{
                                    flex: 1,
                                    height: 40,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 6,
                                    border: '1px solid #23263a',
                                    background: '#171a24',
                                    color: '#e6e6f0',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    textDecoration: 'none',
                                }}
                            >
                                Home
                            </a>
                        </div>
                    </div>
                </section>
            </body>
        </html>
    )
}
