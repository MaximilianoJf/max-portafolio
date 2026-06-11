import { useState, useCallback, useEffect } from "react";
import { db } from "../data/db";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "../types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>(db);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const openDetails = useCallback((project: Project) => setSelectedProject(project), []);
    const closeDetails = useCallback(() => setSelectedProject(null), []);

    useEffect(() => {
        fetch(`${API_URL}/projects`)
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (Array.isArray(data) && data.length > 0) setProjects(data); })
            .catch(() => { /* fallback a las constantes locales */ });
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    // Si los proyectos vienen de la BD usan el flag featured; las constantes locales usan los primeros 4
    const hasFeaturedFlag = projects.some(p => p.featured !== undefined);
    const featured = hasFeaturedFlag ? projects.filter(p => p.featured).slice(0, 4) : projects.slice(0, 4);
    const learning = hasFeaturedFlag ? projects.filter(p => !p.featured) : projects.slice(4);

    return (
        <section id="projects" className="py-24 px-6 sm:px-10" style={{ background: 'var(--c-bg)' }}>
            <div className="max-w-[1280px] mx-auto">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                    className="flex items-end justify-between mb-10">
                    <div>
                        <p className="section-label">Portafolio</p>
                        <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', color: 'var(--c-text)', lineHeight: 1.1 }}>
                            Trabajos Destacados
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-auto sm:auto-rows-[320px] md:auto-rows-[380px]">
                    {featured[0] && <BentoCard project={featured[0]} onPress={openDetails} className="sm:col-span-1 md:col-span-2" tall={false} index={0} />}
                    {featured[1] && <BentoCard project={featured[1]} onPress={openDetails} className="sm:col-span-1 md:col-span-1 md:row-span-2" tall={true} index={1} />}
                    {featured[2] && <BentoCard project={featured[2]} onPress={openDetails} className="sm:col-span-1" tall={false} index={2} />}
                    {featured[3] && <BentoCard project={featured[3]} onPress={openDetails} className="sm:col-span-1 md:col-span-1" tall={false} index={3} />}
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                    className="mt-16 mb-10">
                    <p className="section-label">Práctica</p>
                    <h2 className="font-bold" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', color: 'var(--c-text)', lineHeight: 1.1 }}>
                        Proyectos de Aprendizaje
                    </h2>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {learning.map((project, i) => (
                        <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                            className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-[200px]"
                            style={{ background: 'var(--c-bg-surface)', border: '1px solid var(--c-border)' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-border-hover)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-border)'}
                            onClick={() => openDetails(project)}>
                            <div className="relative h-full">
                                <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0" style={{ background: 'var(--c-card-gradient)' }} />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex gap-1 mb-1.5 flex-wrap">
                                        {project.technology.slice(0, 2).map(t => (
                                            <span key={t} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                                                style={{ background: 'var(--c-accent-soft)', color: 'var(--c-accent)', border: '1px solid var(--c-accent-border)' }}>{t}</span>
                                        ))}
                                    </div>
                                    <p className="text-xs font-semibold leading-tight" style={{ color: 'var(--c-text)' }}>{project.name}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={closeDetails} />}
            </AnimatePresence>
        </section>
    );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

    const categories = ['all', ...Array.from(new Set(project.images.map(img => img.category)))];
    const filteredImages = activeCategory === 'all' ? project.images : project.images.filter(img => img.category === activeCategory);
    const viewerImage = viewerIndex !== null ? filteredImages[viewerIndex] : null;

    const goPrev = useCallback(() => setViewerIndex(prev => prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1), [filteredImages.length]);
    const goNext = useCallback(() => setViewerIndex(prev => prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0), [filteredImages.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { viewerIndex !== null ? setViewerIndex(null) : onClose(); }
            if (viewerIndex !== null) { if (e.key === 'ArrowLeft') goPrev(); if (e.key === 'ArrowRight') goNext(); }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, viewerIndex, goPrev, goNext]);

    useEffect(() => { setViewerIndex(null); }, [activeCategory]);

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50" style={{ background: 'var(--c-bg-overlay)', backdropFilter: 'blur(12px)' }} onClick={onClose} />

            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-3 sm:inset-6 md:inset-y-8 md:inset-x-[8%] lg:inset-x-[12%] z-50 rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'var(--c-bg-elevated)', boxShadow: `0 25px 80px var(--c-shadow-heavy)` }}>

                <div className="flex-shrink-0 px-5 sm:px-8 pt-5 sm:pt-6 pb-4" style={{ borderBottom: '1px solid var(--c-border)' }}>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-2xl font-bold mb-2.5" style={{ color: 'var(--c-text)', letterSpacing: '-0.02em' }}>{project.name}</h3>
                            <div className="flex gap-1.5 flex-wrap">
                                {project.technology.map(tech => (
                                    <span key={tech} className="text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest"
                                        style={{ background: 'var(--c-accent-soft)', color: 'var(--c-accent)' }}>{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-80"
                                    style={{ background: 'var(--c-bg-input)', color: 'var(--c-text-2)' }}>
                                    <Github className="h-3.5 w-3.5" /> Codigo
                                </a>
                            )}
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noreferrer"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-90"
                                    style={{ background: 'var(--c-accent)', color: 'var(--c-accent-on)' }}>
                                    <ExternalLink className="h-3.5 w-3.5" /> Web
                                </a>
                            )}
                            <button onClick={onClose} className="p-2 rounded-lg transition-colors duration-200" style={{ color: 'var(--c-text-4)' }}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6">
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-text-3)' }}>{project.description}</p>

                    <div className="flex gap-2 mb-5 sm:hidden">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold"
                                style={{ background: 'var(--c-bg-input)', color: 'var(--c-text-2)' }}>
                                <Github className="h-3.5 w-3.5" /> Codigo Fuente
                            </a>
                        )}
                        {project.url && (
                            <a href={project.url} target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold"
                                style={{ background: 'var(--c-accent)', color: 'var(--c-accent-on)' }}>
                                <ExternalLink className="h-3.5 w-3.5" /> Sitio Web
                            </a>
                        )}
                    </div>

                    {categories.length > 2 && (
                        <div className="flex gap-1.5 flex-wrap mb-5">
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)}
                                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all duration-200"
                                    style={{ background: activeCategory === cat ? 'var(--c-accent-soft-2)' : 'transparent', color: activeCategory === cat ? 'var(--c-accent)' : 'var(--c-text-4)' }}>
                                    {cat === 'all' ? 'Todos' : cat}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {filteredImages.map((img, idx) => (
                            <div key={img.id} onClick={() => setViewerIndex(idx)}
                                className="relative rounded-lg overflow-hidden cursor-pointer group aspect-video">
                                {img.type === 'video' ? (
                                    <>
                                        <img src={img.thumbnail || img.src} alt={img.alt} loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                                                <svg viewBox="0 0 24 24" fill="#e2e2e2" className="h-4 w-4 ml-0.5"><polygon points="5,3 19,12 5,21" /></svg>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <img src={img.src} alt={img.alt} loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {viewerImage && viewerIndex !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.92)' }} onClick={() => setViewerIndex(null)}>
                        <button onClick={e => { e.stopPropagation(); setViewerIndex(null); }}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full transition-colors duration-200 hover:bg-white/10 z-10"
                            style={{ color: '#b9cbc1' }}><X className="h-6 w-6" /></button>
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: '#b9cbc1' }}>
                                {viewerIndex + 1} / {filteredImages.length}
                            </span>
                        </div>
                        {filteredImages.length > 1 && (
                            <>
                                <button onClick={e => { e.stopPropagation(); goPrev(); }}
                                    className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-110 z-10"
                                    style={{ color: '#b9cbc1' }}><ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" /></button>
                                <button onClick={e => { e.stopPropagation(); goNext(); }}
                                    className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-110 z-10"
                                    style={{ color: '#b9cbc1' }}><ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" /></button>
                            </>
                        )}
                        <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                            <AnimatePresence mode="wait">
                                <motion.div key={viewerImage.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                                    {viewerImage.type === 'video' ? (
                                        <video src={viewerImage.src} controls autoPlay className="max-w-[90vw] max-h-[85vh] rounded-lg" poster={viewerImage.thumbnail} />
                                    ) : (
                                        <img src={viewerImage.src} alt={viewerImage.alt} className="max-w-[90vw] max-h-[85vh] rounded-lg object-contain" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-center z-10 max-w-md px-4">
                            <p className="text-xs sm:text-sm font-medium" style={{ color: '#b9cbc1' }}>{viewerImage.alt}</p>
                            <p className="text-[10px] mt-1" style={{ color: '#5a6b63' }}>{viewerImage.category}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const BentoCard = ({ project, onPress, className, tall, index }: {
    project: Project; onPress: (p: Project) => void;
    className: string; tall: boolean; index: number;
}) => {
    const heightClass = tall ? 'h-[200px] sm:h-[320px] md:h-[780px]' : 'h-[200px] sm:h-[320px] md:h-[380px]';

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }} viewport={{ once: true }}
            onClick={() => onPress(project)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${className} ${heightClass}`}
            style={{ border: '1px solid var(--c-border)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-border-hover)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-border)'}>
            <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: 'var(--c-card-gradient)' }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 100%, var(--c-accent-soft) 0%, transparent 70%)` }} />
            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                <div className="flex gap-2 flex-wrap">
                    {project.technology.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{ background: 'var(--c-tag-bg)', color: 'var(--c-tag-text)', backdropFilter: 'blur(8px)', border: '1px solid var(--c-tag-border)' }}>{t}</span>
                    ))}
                </div>
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--c-text-3)' }}>{project.technology[0]}</p>
                    <h3 className="font-bold mb-2 sm:mb-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{project.name}</h3>
                    <p className="text-xs leading-relaxed mb-3 sm:mb-4 line-clamp-2 hidden sm:block" style={{ color: 'var(--c-text-3)' }}>{project.description}</p>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--c-accent)' }}>Ver Detalles</span>
                        <ArrowUpRight className="h-3.5 w-3.5" style={{ color: 'var(--c-accent)' }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
