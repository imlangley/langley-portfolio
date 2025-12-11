'use client';

import React, { useRef, useState } from 'react';

interface Position {
    x: number;
    y: number;
}

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = '',
    spotlightColor = 'rgba(255, 255, 255, 0.25)',
    onMouseMove,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
        if (!divRef.current || isFocused) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (onMouseMove) onMouseMove(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        setIsFocused(true);
        setOpacity(0.6);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setIsFocused(false);
        setOpacity(0);
        if (onBlur) onBlur(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpacity(0.6);
        if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpacity(0);
        if (onMouseLeave) onMouseLeave(e);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-3xl border border-neutral-800 bg-neutral-900/50 overflow-hidden p-8 ${className}`}
            {...props}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
                }}
            />
            {children}
        </div>
    );
};

export default SpotlightCard;
