import { getServices } from '@/sanity/lib'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Monitor, Film } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Services | Langley',
    description: 'Web development and video editing services.',
}

export const revalidate = 60

export default async function ServicesPage() {
    const services = await getServices()

    return (
        <div className="min-h-screen pt-32 pb-20 overflow-hidden">

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />

            <div className="container max-w-6xl space-y-20">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
                        Services <span className="text-gradient">&</span><br /> Solutions
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        Specialized engineering and creative services for brands that demand excellence.
                    </p>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <div
                            key={service._id}
                            className="group relative p-10 rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover Beam */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon || '⚡'}
                                </div>

                                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed flex-grow">
                                    {service.shortDescription}
                                </p>

                                <div className="pt-8 mt-auto border-t border-border/50">
                                    <div className="flex items-center justify-between text-primary font-bold">
                                        <span>Explore {service.title}</span>
                                        <span className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="relative rounded-3xl bg-black overflow-hidden px-8 py-24 text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-90" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Ready to elevate your project?
                        </h2>
                        <p className="text-xl text-white/80">
                            Let's discuss how we can bring your vision to life with precision and creativity.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl"
                        >
                            Book a Consultation
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
