
import tittle from "./tittle.module.css"

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <h2 className={`${tittle['section-title']} text-foreground`}>
                {children}
            </h2>
        </div>
    );
}

export default SectionTitle;