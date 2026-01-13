import type { ReactNode } from 'react'
import { Children } from 'react'
import card from "./card.module.css";

interface cardProps {
    children: ReactNode;
    className?: string;
    variant?: "glass" | "Default";
    shape?: "circle" | "square";
    onClick?: (...args: any[]) => void | any;
}

const Body = ({ children, className = "" }: cardProps) => {
    const childrenCount = Children.count(children);
    const justifyClass = childrenCount > 1 ? 'justify-evenly' : 'justify-start';

    return (

        <div className={`p-4 sm:p-6 w-full flex flex-col lg:flex-row ${justifyClass} gap-8 items-center min-w-0 ${className}`}>
            {children}
        </div>
    )
}

const Image = ({ children, className = "", shape = "circle" }: cardProps) => {
    const baseStyle = "shrink-0 overflow-hidden flex justify-center items-center";

    const shapeClass = shape === "circle"
        ? "w-full max-w-[250px] sm:max-w-[300px] aspect-square rounded-full"
        : "w-full lg:max-w-[300px] aspect-video lg:aspect-auto lg:h-[200px] rounded-2xl";

    return (
        <div className={`${baseStyle} ${shapeClass} ${className}`}>
            {children}
        </div>
    )
}

const Description = ({ children, className = "" }: cardProps) => {
    return (

        <div className={`flex flex-col gap-4 w-full min-w-0 sm:max-w-2xl ${className}`}>
            {children}
        </div>
    )
}
const Tittle = ({ children, className = "" }: cardProps) => {
    return (
        <h2 className={`text-3xl font-extrabold text-foreground ${className}`}>
            {children}
        </h2>
    )
}

const Content = ({ children, className = "" }: cardProps) => {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {children}
        </div>
    )
}



const Footer = ({ children, className = "" }: cardProps) => {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {children}
        </div>
    )
}

const Container = ({ children, className = "", variant = "Default", onClick }: cardProps) => {

    const style = variant === "glass" ? card['glass-card'] : ""

    return (
        <div className={`${style} ${className} gap-8`} onClick={onClick}>
            {children}
        </div>
    )
}

export const Card = Object.assign(Container, {
    Body: Body,
    Image: Image,
    Description: Description,
    Tittle: Tittle,
    Content: Content,
    Footer: Footer,
});

