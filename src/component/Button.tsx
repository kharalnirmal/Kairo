import React from 'react'
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" ;
    className?: string;
    size?: "small" | "medium" | "large";
}

export function  Button ({ children, onClick, variant = "primary", className, size="medium" }: ButtonProps) {


    const VariantStyle = {
        primary: "bg-accent text-white shadow-lg hover:shadow-xl", //accent 
        secondary: "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
    }
    const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95"

    const buttonClasses = className ||`${baseStyle} ${VariantStyle[variant]}`

    const buttonsize= {
     small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-12 py-4 text-lg md:px-20 md:py-5 md:text-xl"
    }
    
    return (
        <button
            onClick={onClick}
            className={`${buttonClasses} ${buttonsize[size]} `}>
        {children}
    </button>
    )
}
