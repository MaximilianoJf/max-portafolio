import { motion } from "framer-motion";
import { Database, Layout, Server, ShieldCheck } from "lucide-react";

const services = [
    { icon: <Server className="h-5 w-5" />, tag: "Backend Engineering", title: "Arquitectura MVC & APIs", description: "Desarrollo de soluciones completas con Laravel 10 bajo patrón MVC, utilizando Eloquent ORM, middlewares, services, eventos y jobs para procesamiento asíncrono." },
    { icon: <Layout className="h-5 w-5" />, tag: "Frontend Development", title: "Interfaces & Experiencia", description: "Construcción de interfaces con React, Livewire y Blade orientadas a la facilidad de uso. Componentes modulares para sistemas corporativos con múltiples módulos integrados." },
    { icon: <Database className="h-5 w-5" />, tag: "Data & Gestión", title: "Sistemas de Gestión", description: "Diseño de sistemas para control documental, planificación de entregables, gestión de hallazgos e incidentes, y reportes gráficos basados en KPIs por servicio." },
    { icon: <ShieldCheck className="h-5 w-5" />, tag: "Análisis & Procesos", title: "Requerimientos & Mejora", description: "Análisis de requerimientos de clientes y mejora continua de módulos. Integración de capacitaciones, cuestionarios y herramientas de seguimiento para personal en terreno." },
];

export const Experience = () => (
    <section id="experience" className="py-24 px-6 sm:px-10"
        style={{ background: 'var(--c-bg-surface-dim)', borderTop: '1px solid var(--c-border-dim)' }}>
        <div className="max-w-[1280px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <p className="section-label">Trayectoria</p>
                    <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', color: 'var(--c-text)', lineHeight: 1.1 }}>
                        Experiencia Profesional
                    </h2>
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl"
                    style={{ background: 'var(--c-accent-soft)', border: '1px solid var(--c-accent-soft-2)' }}>
                    <div className="p-3 rounded-xl" style={{ background: 'var(--c-accent-soft-2)' }}>
                        <div className="h-5 w-5 flex items-center justify-center" style={{ color: 'var(--c-accent)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm" style={{ color: 'var(--c-text)' }}>Guiñez Ingeniería</p>
                        <p className="text-[11px] font-semibold uppercase tracking-caps" style={{ color: 'var(--c-accent)' }}>Desarrollador Full Stack</p>
                        <p className="text-[11px] font-semibold uppercase tracking-caps mt-0.5" style={{ color: 'var(--c-text-5)' }}>2023 — 2025</p>
                    </div>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {services.map((s, i) => (
                    <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                        className="group flex flex-col gap-5 p-6 rounded-2xl transition-all duration-500 cursor-default"
                        style={{ background: 'var(--c-bg-surface)', border: '1px solid var(--c-border)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        <div className="p-3 rounded-xl w-fit transition-colors duration-300"
                            style={{ background: 'var(--c-accent-soft)', color: 'var(--c-accent)', border: '1px solid var(--c-accent-border)' }}>
                            {s.icon}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-caps" style={{ color: 'var(--c-text-5)' }}>{s.tag}</span>
                            <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--c-text)', letterSpacing: '-0.01em' }}>{s.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-3)', lineHeight: '1.6' }}>{s.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
