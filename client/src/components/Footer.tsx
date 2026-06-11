import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";

const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#experience", label: "Experiencia" },
    { href: "#projects", label: "Proyectos" },
    { href: "#contact-form", label: "Contacto" },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative overflow-hidden py-16 px-6 sm:px-10"
            style={{ background: 'var(--c-bg-footer)', borderTop: '1px solid var(--c-accent-soft)' }}>
            <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
            <div className="max-w-[1280px] mx-auto flex flex-col gap-10 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <p className="font-bold text-2xl" style={{ color: 'var(--c-text)', letterSpacing: '-0.02em' }}>
                            MJ<span style={{ color: 'var(--c-accent)' }}>.</span>
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-caps mt-1.5" style={{ color: 'var(--c-text-4)' }}>Fullstack Developer</p>
                    </div>
                    <div className="flex gap-7 flex-wrap justify-center">
                        {navLinks.map(({ href, label }) => (
                            <a key={href} href={href}
                                className="text-sm font-medium transition-colors duration-200"
                                style={{ color: 'var(--c-text-4)', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--c-accent)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--c-text-4)'}>{label}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        {[
                            { icon: <Github className="h-4 w-4" />, href: "https://github.com/MaximilianoJf" },
                            { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/maximiliano-alejandro-jiménez-flores-1261a1267/" },
                            { icon: <Mail className="h-4 w-4" />, href: "mailto:majf2704@gmail.com" },
                        ].map(({ icon, href }, i) => (
                            <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                                style={{ background: 'var(--c-bg-input)', border: '1px solid var(--c-border)', color: 'var(--c-text-4)' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-accent)'; e.currentTarget.style.borderColor = 'var(--c-accent-border)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-4)'; e.currentTarget.style.borderColor = 'var(--c-border)'; }}>{icon}</a>
                        ))}
                        <div className="w-px h-6 mx-1" style={{ background: 'var(--c-border)' }} />
                        <button onClick={scrollToTop}
                            className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                            style={{ background: 'var(--c-accent-soft)', border: '1px solid var(--c-accent-soft-2)', color: 'var(--c-accent)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-accent-soft-2)'; e.currentTarget.style.borderColor = 'var(--c-accent-border)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-accent-soft)'; e.currentTarget.style.borderColor = 'var(--c-accent-soft-2)'; }}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, var(--c-accent-soft-2), transparent)` }} />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--c-text-5)' }}>
                        &copy; {currentYear} Maximiliano Jiménez. Hecho con <Heart className="h-3 w-3 inline" style={{ color: 'var(--c-accent)' }} /> en Chile
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--c-text-5)' }}>Diseñado & desarrollado por MJ</p>
                </div>
            </div>
        </footer>
    );
};
