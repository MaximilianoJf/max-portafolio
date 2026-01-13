import type { ReactNode } from "react"
import glassBadge from "./badge.module.css"

interface BadgeProps {
    children: ReactNode,
    className?: string,
}

export const Badge = ({ children, className = "" }: BadgeProps) => {
    return (
        <div className={`${glassBadge['glass-badge']} ${className}`}>{children}</div>
    )
}

export default Badge