'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    Sparkles,
    Type,
    MousePointer,
    Square,
    Star,
    BarChart3,
    Clock,
    Layers
} from 'lucide-react'
import {
    SplitText,
    DecryptedText,
    GlitchText,
    ShinyText,
    RotatingText,
    Magnet,
    ClickSpark,
    StarBorder,
    Squares,
    TiltedCard,
    AnimatedCounter,
    ShimmerButton,
    AnimatedAvatar,
    Timeline,
    SkillBars,
    Accordion,
    BentoGrid
} from '@/components/reactbits'

// Component showcase cards
const showcaseItems = [
    {
        id: 'split-text',
        title: 'SplitText',
        icon: <Type className="w-5 h-5" />,
        description: 'Animated text that splits and animates each character',
    },
    {
        id: 'decrypted-text',
        title: 'DecryptedText',
        icon: <Type className="w-5 h-5" />,
        description: 'Matrix-style text decryption effect',
    },
    {
        id: 'glitch-text',
        title: 'GlitchText',
        icon: <Type className="w-5 h-5" />,
        description: 'Cyberpunk glitch text effect',
    },
    {
        id: 'rotating-text',
        title: 'RotatingText',
        icon: <Clock className="w-5 h-5" />,
        description: 'Rotating words with smooth transitions',
    },
    {
        id: 'magnet',
        title: 'Magnet',
        icon: <MousePointer className="w-5 h-5" />,
        description: 'Elements that follow cursor movement',
    },
    {
        id: 'tilted-card',
        title: 'TiltedCard',
        icon: <Square className="w-5 h-5" />,
        description: '3D tilt effect on hover',
    },
    {
        id: 'star-border',
        title: 'StarBorder',
        icon: <Star className="w-5 h-5" />,
        description: 'Animated gradient border',
    },
    {
        id: 'counter',
        title: 'AnimatedCounter',
        icon: <BarChart3 className="w-5 h-5" />,
        description: 'Smooth number counting animation',
    },
]

export default function ShowcasePage() {
    const [activeDemo, setActiveDemo] = useState<string | null>(null)

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            {/* Background */}
            <Squares
                speed={0.3}
                squareSize={60}
                borderColor="hsl(var(--border))"
                hoverFillColor="hsl(var(--primary) / 0.1)"
                className="fixed inset-0 -z-10"
            />

            <div className="container max-w-6xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <motion.div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                        <GlitchText
                            text="ReactBits Showcase"
                            className="text-4xl md:text-6xl font-bold"
                        />
                        <Sparkles className="w-8 h-8 text-primary" />
                    </motion.div>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A collection of beautiful, interactive React components with Framer Motion animations.
                    </p>
                </motion.div>

                {/* Component Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {showcaseItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <TiltedCard
                                containerClassName="h-full"
                                scaleOnHover={1.02}
                                rotateAmplitude={8}
                            >
                                <div
                                    className="p-6 bg-card border border-border rounded-xl h-full cursor-pointer"
                                    onClick={() => setActiveDemo(activeDemo === item.id ? null : item.id)}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {item.description}
                                    </p>

                                    {/* Demo preview */}
                                    <div className="p-4 bg-muted/50 rounded-lg min-h-[80px] flex items-center justify-center">
                                        {item.id === 'split-text' && (
                                            <SplitText
                                                text="Hello World"
                                                className="text-xl font-bold"
                                                delay={50}
                                            />
                                        )}
                                        {item.id === 'decrypted-text' && (
                                            <DecryptedText
                                                text="DECRYPT ME"
                                                className="text-xl font-mono"
                                            />
                                        )}
                                        {item.id === 'glitch-text' && (
                                            <GlitchText
                                                text="GLITCH"
                                                className="text-xl font-bold"
                                            />
                                        )}
                                        {item.id === 'rotating-text' && (
                                            <RotatingText
                                                texts={['Hello', 'World', 'React']}
                                                className="text-xl font-bold text-primary"
                                            />
                                        )}
                                        {item.id === 'magnet' && (
                                            <Magnet>
                                                <motion.button
                                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    Hover Me
                                                </motion.button>
                                            </Magnet>
                                        )}
                                        {item.id === 'tilted-card' && (
                                            <span className="text-muted-foreground text-sm">
                                                Tilt this card! ↗
                                            </span>
                                        )}
                                        {item.id === 'star-border' && (
                                            <StarBorder color="hsl(var(--primary))" speed={3}>
                                                <span className="px-4 py-2">Glowing</span>
                                            </StarBorder>
                                        )}
                                        {item.id === 'counter' && (
                                            <AnimatedCounter
                                                value={1234}
                                                duration={2}
                                                className="text-3xl font-bold text-primary"
                                            />
                                        )}
                                    </div>
                                </div>
                            </TiltedCard>
                        </motion.div>
                    ))}
                </div>

                {/* Live Demo Section */}
                <motion.div
                    className="space-y-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="text-center">
                        <SplitText
                            text="Live Demos"
                            className="text-3xl font-bold"
                            delay={40}
                        />
                    </div>

                    {/* Skill Bars Demo */}
                    <div className="bg-card border border-border rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6">Skill Bars</h3>
                        <SkillBars
                            skills={[
                                { skill: 'React / Next.js', level: 95 },
                                { skill: 'TypeScript', level: 90 },
                                { skill: 'Framer Motion', level: 85 },
                                { skill: 'Node.js', level: 80 },
                                { skill: 'Video Editing', level: 92 },
                            ]}
                        />
                    </div>

                    {/* Timeline Demo */}
                    <div className="bg-card border border-border rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6">Timeline</h3>
                        <Timeline
                            items={[
                                { date: '2024', title: 'Senior Developer', subtitle: 'Company A', description: 'Leading frontend development' },
                                { date: '2022', title: 'Full Stack Developer', subtitle: 'Company B', description: 'Building web applications' },
                                { date: '2020', title: 'Junior Developer', subtitle: 'Startup', description: 'Started my journey' },
                            ]}
                        />
                    </div>

                    {/* Buttons Demo */}
                    <div className="bg-card border border-border rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6">Buttons & Interactive</h3>
                        <div className="flex flex-wrap gap-4">
                            <ShimmerButton>
                                <Sparkles className="w-4 h-4" />
                                Shimmer Button
                            </ShimmerButton>

                            <Magnet>
                                <motion.button
                                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Magnetic Button
                                </motion.button>
                            </Magnet>

                            <StarBorder color="hsl(var(--primary))" speed={4}>
                                <button className="px-6 py-3 font-semibold">
                                    Star Border
                                </button>
                            </StarBorder>
                        </div>
                    </div>

                    {/* Click Spark Demo */}
                    <ClickSpark>
                        <div className="bg-card border border-border rounded-2xl p-8 text-center cursor-pointer">
                            <h3 className="text-xl font-bold mb-2">Click Spark</h3>
                            <p className="text-muted-foreground">
                                Click anywhere in this box to see sparks! ✨
                            </p>
                        </div>
                    </ClickSpark>
                </motion.div>

                {/* Secret Message */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-xs text-muted-foreground/50">
                        You found the secret showcase! 🎉 Press <kbd className="px-1 bg-muted rounded">⌘K</kbd> to open the command menu.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
