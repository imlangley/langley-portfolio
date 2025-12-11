'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { ProjectCard as ProjectCardType } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'
import { Folder, Film, FileCode, FileImage, Search, ChevronRight, ChevronDown, Table, LayoutGrid } from 'lucide-react'
import { useState } from 'react'

interface FeaturedProjectsProps {
    projects: ProjectCardType[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const { setCursorText, setCursorVariant } = useCursor()
    const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree')
    const [expandedFolders, setExpandedFolders] = useState<string[]>(['root', 'comps'])
    const [searchQuery, setSearchQuery] = useState('')

    // Filter projects
    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleFolder = (id: string) => {
        if (expandedFolders.includes(id)) {
            setExpandedFolders(expandedFolders.filter(f => f !== id))
        } else {
            setExpandedFolders([...expandedFolders, id])
        }
    }

    return (
        <section id="projects" className="w-full bg-[#161616] pb-20 border-t border-[#333] min-h-[50vh]">

            {/* Panel Header */}
            <div className="h-9 bg-[#252526] border-b border-[#333] flex items-center justify-between px-3 select-none sticky top-14 md:top-[40px] z-30">
                <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
                    <span className="opacity-70">Project:</span>
                    <span className="text-white">Portfolio.aep</span>
                    <span className="opacity-50 mx-1">/</span>
                    <span className="text-blue-400">Selected Works</span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Filter..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-5 w-32 bg-[#161616] border border-[#333] rounded pl-7 pr-2 text-[10px] text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div className="h-3 w-px bg-[#444]" />
                    <button
                        onClick={() => setViewMode('tree')}
                        className={`p-1 rounded hover:bg-[#333] ${viewMode === 'tree' ? 'text-blue-400' : 'text-gray-500'}`}
                        title="List View"
                    >
                        <Table className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1 rounded hover:bg-[#333] ${viewMode === 'grid' ? 'text-blue-400' : 'text-gray-500'}`}
                        title="Thumbnail View"
                    >
                        <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-2 md:p-4">

                {viewMode === 'tree' ? (
                    // AE Tree View
                    <div className="w-full font-sans text-xs select-none">
                        {/* Header Row */}
                        <div className="grid grid-cols-12 gap-2 px-2 py-1 bg-[#1f1f1f] text-[10px] text-gray-500 font-medium border-b border-[#333] mb-1">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-2">Type</div>
                            <div className="col-span-2">Size</div>
                            <div className="col-span-2">Duration</div>
                        </div>

                        {/* Root: Compositions */}
                        <FolderRow
                            id="comps"
                            label="01_Compositions"
                            isOpen={expandedFolders.includes('comps')}
                            toggle={() => toggleFolder('comps')}
                            color="text-yellow-500"
                        />
                        <AnimatePresence>
                            {expandedFolders.includes('comps') && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    {filteredProjects.map((project, i) => (
                                        <ProjectTreeItem
                                            key={project._id}
                                            project={project}
                                            setCursorVariant={setCursorVariant}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Root: Solids */}
                        <FolderRow
                            id="solids"
                            label="02_Solids"
                            isOpen={expandedFolders.includes('solids')}
                            toggle={() => toggleFolder('solids')}
                            color="text-gray-500"
                        />

                        {/* Root: Footage */}
                        <FolderRow
                            id="footage"
                            label="03_Footage"
                            isOpen={expandedFolders.includes('footage')}
                            toggle={() => toggleFolder('footage')}
                            color="text-purple-500"
                        />
                    </div>
                ) : (
                    // Grid View (Thumbnails)
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredProjects.map((project, i) => (
                            <ProjectGridItem
                                key={project._id}
                                project={project}
                                index={i}
                                setCursorVariant={setCursorVariant}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

// Tree View Components
function FolderRow({ id, label, isOpen, toggle, color }: any) {
    return (
        <div
            onClick={toggle}
            className="flex items-center gap-1 px-1 py-0.5 hover:bg-[#2a2a2a] cursor-pointer text-gray-300 transition-colors"
        >
            {isOpen ? <ChevronDown className="w-3 h-3 text-gray-500" /> : <ChevronRight className="w-3 h-3 text-gray-500" />}
            <Folder className={`w-3.5 h-3.5 ${color} fill-current bg-opacity-20`} />
            <span className="ml-1 font-medium">{label}</span>
        </div>
    )
}

function ProjectTreeItem({ project, setCursorVariant }: any) {
    const isVideo = project.projectType === 'video'

    return (
        <Link href={`/projects/${project.slug}`} className="block group">
            <div
                className="grid grid-cols-12 gap-2 px-2 py-0.5 pl-8 hover:bg-[#2a2a2a] cursor-pointer items-center text-gray-400 group-hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant('project')}
                onMouseLeave={() => setCursorVariant('default')}
            >
                <div className="col-span-6 flex items-center gap-2 truncate">
                    {isVideo ? <Film className="w-3.5 h-3.5 text-purple-400" /> : <FileCode className="w-3.5 h-3.5 text-blue-400" />}
                    <span className="truncate">{project.title}</span>
                </div>
                <div className="col-span-2 text-[10px] opacity-70">
                    {isVideo ? 'Composition' : 'Source File'}
                </div>
                <div className="col-span-2 text-[10px] opacity-50 font-mono">
                    {isVideo ? '1920x1080' : '24KB'}
                </div>
                <div className="col-span-2 text-[10px] opacity-50 font-mono">
                    {isVideo ? '0:02:30:00' : '--'}
                </div>
            </div>
        </Link>
    )
}

// Grid View Components
import SpotlightCard from '@/components/ui/SpotlightCard'

function ProjectGridItem({ project, index, setCursorVariant }: any) {
    return (
        <Link href={`/projects/${project.slug}`} className="group relative block">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
            >
                <SpotlightCard
                    className="aspect-[4/3] bg-[#000] border border-[#333] rounded-sm overflow-hidden p-0"
                    spotlightColor="rgba(59, 130, 246, 0.15)"
                    onMouseEnter={() => setCursorVariant('project')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    {/* Image / Scrub Preview */}
                    <div className="relative w-full h-[80%] bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                        {project.coverImage ? (
                            <Image
                                src={urlFor(project.coverImage).width(400).height(300).url()}
                                alt={project.title}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                        ) : (
                            <div className="text-gray-700 font-bold text-4xl select-none">?</div>
                        )}

                        {/* Overlay Indicator */}
                        <div className="absolute top-1 right-1 px-1 bg-black/50 text-[9px] text-white rounded font-mono z-10">
                            {project.projectType === 'video' ? 'MOV' : 'TSX'}
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="h-[20%] bg-[#222] px-2 flex items-center justify-between relative z-10">
                        <span className="text-[10px] text-gray-300 truncate max-w-[80%]">{project.title}</span>
                        <div className={`w-2 h-2 rounded-full ${project.projectType === 'video' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                    </div>
                </SpotlightCard>
            </motion.div>
        </Link>
    )
}
