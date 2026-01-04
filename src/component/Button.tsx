import React from 'react'

/**
 * Props definition for reusable Button component
 * This ensures type safety and autocomplete benefits in TS
 */
interface ButtonProps {
    children: React.ReactNode;             // Content inside the button (text, icon, etc.)
    onClick?: () => void;                   // Optional click handler
    variant?: "primary" | "secondary";      // Visual style of button
    className?: string;                     // Allows overriding or extending styles
    size?: "small" | "medium" | "large";    // Button size variants
}

/**
 * Reusable Button component
 * Designed to be flexible, styled via variants and sizes
 */
export function Button({
    children,
    onClick,
    variant = "primary",   // Default variant
    className,
    size = "medium"        // Default size
}: ButtonProps) {

    /**
     * Variant-based styles
     * Keeps visual themes centralized and scalable
     */
    const VariantStyle = {
        primary: "bg-accent text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
    }

    /**
     * Base styles applied to all buttons
     * Handles spacing, animation, and interaction feedback
     */
    const baseStyle =
        "rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95"

    /**
     * Size-based styles
     * Controls padding and font size
     */
    const buttonSize = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-12 py-4 text-lg md:px-20 md:py-5 md:text-xl"
    }

    /**
     * Final class composition
     * - If className is provided → developer takes control
     * - Otherwise → use base + variant styles
     */
    const buttonClasses =
        className ?? `${baseStyle} ${VariantStyle[variant]}`

    return (
        <button
            onClick={onClick}
            className={`${buttonClasses} ${buttonSize[size]}`}
        >
            {children}
        </button>
    )
}
