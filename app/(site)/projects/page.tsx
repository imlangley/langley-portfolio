/**
 * Projects Page
 * 
 * Fetches all projects and categories to populate the interactive grid.
 */

import { getAllProjects, getProjectCategories } from '@/sanity/lib'
import { ProjectGrid } from '@/components/projects/ProjectGrid'

export const metadata = {
    title: 'Projects | Langley',
    description: 'Full portfolio of web development and video editing work.',
}

export const revalidate = 60

export default async function ProjectsPage() {
    // Fetch data
    const projects = await getAllProjects() // Gets all projects sorted by displayOrder/date
    const categories = await getProjectCategories()

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container space-y-12">

                {/* Page Header */}
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Archive <span className="text-primary">&</span> Work
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        A complete list of my commercial and personal projects.
                        Filter by category or type to find what you're looking for.
                    </p>
                </div>

                <hr className="border-border" />

                {/* Client Component */}
                <ProjectGrid projects={projects} categories={categories} />
            </div>
        </div>
    )
}
