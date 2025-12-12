/**
 * Projects Page
 * 
 * Fetches all projects and categories to populate the interactive grid.
 * Enhanced with animated filtering, search, and pagination.
 */

import { getAllProjects, getProjectCategories } from '@/sanity/lib'
import { ProjectGridEnhanced } from '@/components/projects/ProjectGridEnhanced'
import { SplitText } from '@/components/reactbits/SplitText'

export const metadata = {
    title: 'Projects | Langley',
    description: 'Full portfolio of web development and video editing work.',
}

export const revalidate = 60

export default async function ProjectsPage() {
    // Fetch data
    const projects = await getAllProjects()
    const categories = await getProjectCategories()

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container space-y-8">

                {/* Page Header */}
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        <SplitText
                            text="Archive & Work"
                            className="inline"
                            delay={50}
                            animationFrom={{ opacity: 0, y: 40 }}
                            animationTo={{ opacity: 1, y: 0 }}
                            easing={[0.33, 1, 0.68, 1]}
                            threshold={0.1}
                        />
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        A complete list of my commercial and personal projects.
                        Filter by category, type, or search to find what you're looking for.
                    </p>
                </div>

                {/* Enhanced Client Component */}
                <ProjectGridEnhanced projects={projects} categories={categories} />
            </div>
        </div>
    )
}
