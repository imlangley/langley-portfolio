import { getFaq } from '@/sanity/lib'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import { Github, Linkedin, Mail, Twitter, Instagram, Youtube } from 'lucide-react'

export const metadata = {
    title: 'About | Langley',
    description: 'Cinematic Video Editor & Visual Storyteller.',
}

export const revalidate = 60

export default async function AboutPage() {
    // Static Profile for the Pivot (bypassing Sanity for the specific 'Video Editor' request)
    const profile = {
        name: "Langley",
        role: "Cinematic Video Editor",
        avatarImage: null, // Use placeholder or keep null
        longBio: [
            {
                _key: '1',
                _type: 'block',
                children: [
                    {
                        _key: '1a',
                        _type: 'span',
                        text: "I believe that every frame has a pulse. My work isn't just about cutting footage; it's about finding the hidden rhythm in the chaos and sculpting it into a narrative that breathes. "
                    }
                ],
                style: 'normal'
            },
            {
                _key: '2',
                _type: 'block',
                children: [
                    {
                        _key: '2a',
                        _type: 'span',
                        text: "With over 5 years of experience in post-production, I specialize in pacing, sound design, and color grading that elevates raw footage into emotional experiences. Whether it's a high-energy music video or a nuanced commercial, I edit with intention."
                    }
                ],
                style: 'normal'
            }
        ],
        socials: [
            { platform: 'Instagram', url: 'https://instagram.com' },
            { platform: 'YouTube', url: 'https://youtube.com' },
            { platform: 'Mail', url: 'mailto:hello@langley.page' }
        ]
    }

    const faq = await getFaq()

    // Static Tools for Video Editing Pivot
    const tools = [
        { _id: '1', name: 'Premiere Pro', icon: null },
        { _id: '2', name: 'After Effects', icon: null },
        { _id: '3', name: 'DaVinci Resolve', icon: null },
        { _id: '4', name: 'Cinema 4D', icon: null },
        { _id: '5', name: 'Final Cut Pro', icon: null },
    ]

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-5xl space-y-24">

                {/* Profile Intro */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 flex justify-center md:justify-start">
                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-[2rem] overflow-hidden border border-border shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            {/* Placeholder Avatar since we don't have the image file handy/sanity might be outdated */}
                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-muted-foreground relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-700" />
                                <span className="relative z-10 font-bold text-6xl opacity-20">L.</span>
                            </div>
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    </div>

                    <div className="md:col-span-7 space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">About Me</span>
                            <h1 className="text-5xl font-extrabold tracking-tight">
                                {profile?.name}
                            </h1>
                            <p className="text-2xl text-foreground/80 font-medium">
                                {profile?.role}
                            </p>
                        </div>

                        <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                            <PortableText value={profile?.longBio || []} />
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            {profile.socials.map((social) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all transform hover:scale-110 duration-300"
                                >
                                    {social.platform.toLowerCase().includes('github') && <Github className="w-5 h-5" />}
                                    {social.platform.toLowerCase().includes('linkedin') && <Linkedin className="w-5 h-5" />}
                                    {social.platform.toLowerCase().includes('twitter') && <Twitter className="w-5 h-5" />}
                                    {social.platform.toLowerCase().includes('mail') && <Mail className="w-5 h-5" />}
                                    {social.platform.toLowerCase().includes('instagram') && <Instagram className="w-5 h-5" />}
                                    {social.platform.toLowerCase().includes('youtube') && <Youtube className="w-5 h-5" />}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-bold">My Toolbox</h2>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {tools.map((tool) => (
                            <div key={tool._id} className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="relative w-12 h-12 mb-4 grayscale group-hover:grayscale-0 transition-all flex items-center justify-center bg-secondary rounded-xl">
                                    {/* Icon Placeholder fallback since we are static */}
                                    <span className="text-xl font-bold opacity-50">{tool.name[0]}</span>
                                </div>
                                <span className="text-sm font-semibold text-center">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                {faq?.items && (
                    <section className="space-y-8 max-w-3xl mx-auto pt-12 border-t border-border">
                        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <Accordion className="space-y-4">
                            {faq.items.map((item, i) => (
                                <div key={i}>
                                    <AccordionItem value={`item-${i}`}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>
                                            <PortableText value={item.answer} />
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                            ))}
                        </Accordion>
                    </section>
                )}

            </div>
        </div>
    )
}
