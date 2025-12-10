/**
 * Sanity Studio Layout
 * 
 * Provides a minimal layout for the studio route.
 * Disables the root layout styling so Studio renders properly.
 */

export const metadata = {
    title: 'Langley Studio',
    description: 'Content management for langley.page',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    )
}
