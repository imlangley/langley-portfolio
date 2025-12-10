import { getProfile, getFaq, getTools, getTestimonials } from '@/sanity/lib'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { TerminalSquare, Settings2, Hash, Laptop, MapPin, Calendar, Clock, ChevronDown, Quote, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Properties | Langley',
    description: 'Editor configuration and user properties.',
}

export const revalidate = 60

export default async function AboutPage() {
    const [profile, faq, tools, testimonials] = await Promise.all([
        getProfile(),
        getFaq(),
        getTools(),
        getTestimonials()
    ])

    const displayName = profile?.name || "Langley"
    const displayRole = profile?.role || "Video Editor / Developer"

    return (
        <div className="min-h-screen bg-background pt-10 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                {/* LEFT: Properties Panel (Stats) */}
                <div className="lg:col-span-4 space-y-px bg-card border border-border select-none">

                    {/* Panel Header */}
                    <div className="h-9 bg-muted flex items-center px-4 justify-between border-b border-border">
                        <span className="text-xs font-medium text-foreground uppercase tracking-widest flex items-center gap-2">
                            <Settings2 className="w-3.5 h-3.5" /> Properties
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>

                    {/* Stats Grid */}
                    <div className="p-4 space-y-6">
                        {/* Avatar / Identity */}
                        <div className="flex flex-col items-center gap-4 pb-6 border-b border-border">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-border relative">
                                {profile?.avatarImage ? (
                                    <Image
                                        src={urlFor(profile.avatarImage).width(300).height(300).url()}
                                        alt={displayName}
                                        fill
                                        sizes="128px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                                        <span className="text-4xl font-bold text-muted-foreground">L.</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-foreground">{displayName}</h2>
                                <p className="text-sm text-primary font-mono">{displayRole}</p>
                            </div>
                        </div>

                        {/* Key Values */}
                        <div className="space-y-4 text-xs font-mono">
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</span>
                                <span className="text-foreground">Indonesia</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Timezone</span>
                                <span className="text-foreground">GMT+7</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined</span>
                                <span className="text-foreground">2020</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-2"><Laptop className="w-3 h-3" /> System</span>
                                <span className="text-foreground text-right">After Effects<br />VS Code</span>
                            </div>
                        </div>

                        {/* Tool Stack (Icons) */}
                        <div className="pt-2">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-3">Loaded Extensions</span>
                            <div className="flex flex-wrap gap-2">
                                {tools && tools.map(tool => (
                                    <div key={tool._id} className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center hover:border-primary/50 transition-colors" title={tool.name}>
                                        {tool.icon ? (
                                            <Image
                                                src={urlFor(tool.icon).width(32).height(32).url()}
                                                alt={tool.name}
                                                width={16}
                                                height={16}
                                                className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                                            />
                                        ) : (
                                            <span className="text-[10px] font-bold text-muted-foreground">{tool.name[0]}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Terminal (Bio) */}
                <div className="lg:col-span-8 bg-background font-mono text-sm border border-border flex flex-col h-full min-h-[500px]">

                    {/* Terminal Header */}
                    <div className="h-9 bg-card flex items-center px-4 gap-4 border-b border-border">
                        <div className="flex items-center gap-2 text-foreground border-b-2 border-primary h-full px-2 bg-background">
                            <TerminalSquare className="w-3.5 h-3.5" />
                            <span className="text-xs uppercase">Terminal</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground h-full px-2 hover:text-foreground cursor-pointer transition-colors">
                            <span className="text-xs uppercase">Output</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground h-full px-2 hover:text-foreground cursor-pointer transition-colors">
                            <span className="text-xs uppercase">Debug Console</span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="flex-1 p-6 text-foreground overflow-y-auto space-y-6">

                        {/* Command 1 */}
                        <div>
                            <div className="flex gap-2 text-primary mb-2">
                                <span>➜</span>
                                <span className="text-yellow-500 dark:text-yellow-400">~</span>
                                <span>cat</span>
                                <span className="text-muted-foreground">bio.txt</span>
                            </div>
                            <div className="pl-4 border-l-2 border-border text-muted-foreground leading-relaxed max-w-2xl">
                                {profile?.longBio ? (
                                    <PortableText value={profile.longBio} />
                                ) : (
                                    <p>Loading editor profile configuration...</p>
                                )}
                            </div>
                        </div>

                        {/* Command 2: FAQ */}
                        {faq?.items && (
                            <div>
                                <div className="flex gap-2 text-primary mb-2">
                                    <span>➜</span>
                                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                                    <span>run</span>
                                    <span className="text-muted-foreground">faq --verbose</span>
                                </div>
                                <div className="pl-4 space-y-4">
                                    {faq.items.map((item, i) => (
                                        <div key={i} className="group">
                                            <div className="text-green-600 dark:text-green-400 text-xs mb-1 opacity-70">
                                                [{new Date().toISOString().split('T')[0]}] INFO: Querying database...
                                            </div>
                                            <div className="font-bold text-foreground mb-1">
                                                Q: {item.question}
                                            </div>
                                            <div className="text-muted-foreground pl-4 border-l border-border">
                                                A: <PortableText value={item.answer} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Blinking Cursor */}
                        <div className="flex gap-2 text-primary">
                            <span>➜</span>
                            <span className="text-yellow-500 dark:text-yellow-400">~</span>
                            <span className="w-2 h-5 bg-muted-foreground animate-pulse" />
                        </div>

                    </div>
                </div>

                {/* TESTIMONIALS SECTION - Full Width Below */}
                {testimonials && testimonials.length > 0 && (
                    <div className="lg:col-span-12 bg-card border border-border">
                        {/* Panel Header */}
                        <div className="h-9 bg-muted flex items-center px-4 justify-between border-b border-border">
                            <span className="text-xs font-medium text-foreground uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5" /> Testimonials
                            </span>
                            <span className="text-[10px] text-muted-foreground">{testimonials.length} reviews</span>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, i) => (
                                <div key={testimonial._id || i} className="bg-background border border-border rounded-lg p-5 space-y-4 hover:border-primary/30 transition-colors">
                                    <Quote className="w-6 h-6 text-primary opacity-50" />
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <PortableText value={testimonial.testimonialBody} />
                                    </div>
                                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                                        {testimonial.avatarImage ? (
                                            <Image
                                                src={urlFor(testimonial.avatarImage).width(80).height(80).url()}
                                                alt={testimonial.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                                <span className="text-sm font-bold text-muted-foreground">{testimonial.name?.[0] || '?'}</span>
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
