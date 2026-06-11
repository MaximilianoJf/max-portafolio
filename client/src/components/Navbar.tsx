import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#experience", label: "Experiencia" },
    { href: "#projects", label: "Proyectos" },
    { href: "#contact-form", label: "Contacto" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 640) setMobileOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    background: scrolled ? 'var(--c-glass-bg)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--c-accent-soft)' : '1px solid transparent',
                }}
            >
                <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
                    <a href="#home"
                        className="font-bold text-xl tracking-tight relative z-[60]"
                        style={{ color: 'var(--c-text)', letterSpacing: '-0.02em' }}>
                        MJ<span style={{ color: 'var(--c-accent)' }}>.</span>
                    </a>

                    <div className="hidden sm:flex items-center gap-9">
                        {navLinks.map(({ href, label }) => (
                            <a key={href} href={href}
                                className="relative group py-1 transition-colors duration-200"
                                style={{ fontSize: '13px', fontWeight: 500, color: 'var(--c-text-3)', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--c-text)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--c-text-3)'}
                            >
                                {label}
                                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-px rounded-full transition-all duration-300"
                                    style={{ background: 'var(--c-accent)' }} />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/login"
                            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105"
                            title="Panel Admin"
                            style={{ background: 'var(--c-bg-input)', border: '1px solid var(--c-border)', color: 'var(--c-text-4)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-accent)'; e.currentTarget.style.borderColor = 'var(--c-accent-border)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-4)'; e.currentTarget.style.borderColor = 'var(--c-border)'; }}
                        >
                            <Lock className="h-3.5 w-3.5" />
                        </Link>
                        <button onClick={() => setMobileOpen(!mobileOpen)}
                            className="sm:hidden p-2 rounded-lg transition-colors duration-200 relative z-[60]"
                            style={{ color: 'var(--c-text-2)' }}>
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8"
                        style={{ background: 'var(--c-bg)', backdropFilter: 'blur(24px)' }}
                    >
                        {navLinks.map(({ href, label }, i) => (
                            <motion.a key={href} href={href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: i * 0.06 }}
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl font-bold transition-colors duration-200"
                                style={{ color: 'var(--c-text)', letterSpacing: '-0.02em', textDecoration: 'none' }}>
                                {label}
                            </motion.a>
                        ))}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                            className="flex gap-4 mt-4">
                            <a href="https://github.com/MaximilianoJf" target="_blank" rel="noreferrer"
                                className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
                                style={{ color: 'var(--c-accent)', border: '1px solid var(--c-accent-border)' }}>GitHub</a>
                            <a href="https://www.linkedin.com/in/maximiliano-alejandro-jiménez-flores-1261a1267/" target="_blank" rel="noreferrer"
                                className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
                                style={{ color: 'var(--c-accent)', border: '1px solid var(--c-accent-border)' }}>LinkedIn</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
