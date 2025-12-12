'use client'

import { motion } from 'motion/react'

interface SkillBarProps {
    skill: string
    level: number // 0-100
    color?: string
    icon?: React.ReactNode
    className?: string
}

export function SkillBar({
    skill,
    level,
    color = 'hsl(var(--primary))',
    icon,
    className = ''
}: SkillBarProps) {
    return (
        <motion.div
            className={`group ${className}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {icon && (
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                            {icon}
                        </span>
                    )}
                    <span className="text-sm font-medium text-foreground">
                        {skill}
                    </span>
                </div>
                <motion.span 
                    className="text-xs font-mono text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    {level}%
                </motion.span>
            </div>
            
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                        duration: 1,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.2
                    }}
                >
                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}

interface SkillBarsProps {
    skills: Array<{
        skill: string
        level: number
        color?: string
        icon?: React.ReactNode
    }>
    className?: string
}

export function SkillBars({ skills, className = '' }: SkillBarsProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            {skills.map((skill, index) => (
                <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <SkillBar {...skill} />
                </motion.div>
            ))}
        </div>
    )
}
