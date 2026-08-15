import { getAllProjects, getProjectCategories } from '@/sanity/lib'
import { ProjectWorkspace } from '@/components/projects/ProjectWorkspace'

export const metadata = {
    title: 'Projects | Langley',
    description: 'Full portfolio of web development and video editing work.',
}

export const revalidate = 60

export default async function ProjectsPage() {
    const [projects, categories] = await Promise.all([
        getAllProjects(),
        getProjectCategories(),
    ])

    return <ProjectWorkspace projects={projects} categories={categories} />
}
