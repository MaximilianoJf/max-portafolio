import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";


export const Hero = () => (
    <section id="home" className="relative min-h-screen overflow-hidden" style={{ background: 'var(--c-bg)' }}>
        <div className="absolute top-[15%] -left-[10%] w-[45%] h-[55%] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, var(--c-orb) 0%, transparent 70%)`, filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] right-[-8%] w-[30%] h-[40%] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, var(--c-orb-2) 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-10">
            <div className="max-w-[1280px] mx-auto w-full pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="flex flex-col gap-8">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-caps"
                            style={{ background: 'var(--c-accent-soft)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent)' }}>
                            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--c-accent)' }} />
                            Disponible para proyectos
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="font-bold"
                        style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: '1.05', letterSpacing: '-0.04em', color: 'var(--c-text)' }}>
                        Diseñando soluciones<br />
                        <span className="text-gradient">digitales</span>{" "}que<br />
                        resuenan.
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                        style={{ fontSize: '16px', color: 'var(--c-text-3)', lineHeight: '1.7', maxWidth: '420px' }}>
                        Ingeniero Informático con experiencia en{" "}
                        <span style={{ color: 'var(--c-text-2)', fontWeight: 500 }}>sistemas de gestión</span> y
                        desarrollo Fullstack con Laravel y React. Orientado a soluciones prácticas y centradas en el usuario.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex items-center gap-4 flex-wrap">
                        <a href="#projects"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                            style={{ background: 'var(--c-accent-gradient)', color: 'var(--c-accent-on)', boxShadow: `0 0 24px var(--c-accent-glow)` }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 36px var(--c-accent-glow)`}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 24px var(--c-accent-glow)`}>
                            Ver Proyectos <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="#experience"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                            style={{ background: 'transparent', border: '1px solid var(--c-border)', color: 'var(--c-text-2)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-accent-border)'; e.currentTarget.style.color = 'var(--c-accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = 'var(--c-text-2)'; }}>
                            Mi Experiencia
                        </a>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex items-center gap-3">
                        {[
                            { icon: <Github className="h-4 w-4" />, href: "https://github.com/MaximilianoJf" },
                            { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/maximiliano-alejandro-jiménez-flores-1261a1267/" },
                        ].map(({ icon, href }, i) => (
                            <a key={i} href={href} target="_blank" rel="noreferrer"
                                className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                                style={{ background: 'var(--c-bg-input)', border: '1px solid var(--c-border)', color: 'var(--c-text-3)' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-accent)'; e.currentTarget.style.borderColor = 'var(--c-accent-border)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-3)'; e.currentTarget.style.borderColor = 'var(--c-border)'; }}>
                                {icon}
                            </a>
                        ))}
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center items-center">
                    <div className="relative" style={{ width: '100%', maxWidth: '460px', aspectRatio: '1/1' }}>
                        <div className="absolute -inset-6 rounded-3xl blur-3xl opacity-15 pointer-events-none"
                            style={{ background: `radial-gradient(circle, var(--c-accent), transparent 70%)` }} />
                        <div className="absolute -inset-3 rounded-2xl pointer-events-none"
                            style={{ border: '1px solid var(--c-accent-soft)' }} />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden"
                            style={{ border: '1px solid var(--c-accent-border)' }}>
                            <img src="/images/photo/portafolio_photo.jpg" alt="Maximiliano Jiménez"
                                className="w-full h-full object-cover object-[center_10%]" style={{ aspectRatio: '1/1' }} />
                            <div className="absolute bottom-0 inset-x-0 h-40"
                                style={{ background: `linear-gradient(to top, var(--c-bg) 0%, transparent 100%)` }} />
                            <div className="absolute bottom-5 left-6">
                                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--c-accent)' }}>Fullstack Developer</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
            <span className="text-[10px] font-semibold uppercase tracking-caps" style={{ color: 'var(--c-text-5)' }}>Experiencia</span>
            <motion.div animate={{ height: [16, 32, 16] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px" style={{ background: `linear-gradient(to bottom, var(--c-accent-border), transparent)` }} />
        </motion.div>
    </section>
);
