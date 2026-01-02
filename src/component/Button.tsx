import React from 'react'
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" ;
    className?: string;
}

const Button = ({ children, onClick, variant = "primary", className }: ButtonProps) => {


    const VariantStyle = {
        primary: "bg-accent text-white shadow-lg hover:shadow-xl", //accent 
        secondary: "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
    }
    const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95"

    const buttonClasses = className ||`${baseStyle} ${VariantStyle[variant]}`
    
    return (
        <button
            onClick={onClick}
            className={buttonClasses}>
        {children}
    </button>
    )
}

export default Button