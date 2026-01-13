import type { ReactNode } from 'react'
import glassButton from './button.module.css'

interface LinkProps {
    children: ReactNode,
    className?: string
    href?: string
    circle?: false | true
    download?: string
    ariaLabel?: string
    variant?: "glass" | "Default"
}

export const Link = ({ children, className = "", href = "", circle = false, download, ariaLabel, variant = "Default" }: LinkProps) => {
    const isCircle = circle ? glassButton.circle : "";
    const style = variant === "glass" ? glassButton['glass-button'] : ""

    return (
        <a href={href} download={download} aria-label={ariaLabel} className={`${style} ${isCircle}  ${className}`}>{children}</a>
    )
}
