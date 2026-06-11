import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, User, ArrowUpRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

type FormData = { name: string; email: string; subject: string; message: string; };

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async () => {
        setStatus('idle'); setErrorMsg('');
        try {
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY);
            setStatus('success'); reset();
            setTimeout(() => setStatus('idle'), 5000);
        } catch { setStatus('error'); setErrorMsg('Error al enviar. Intenta de nuevo.'); }
    };

    return (
        <>
            <section id="contact" className="relative overflow-hidden" style={{ background: 'var(--c-cta-bg)' }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50%] h-full opacity-10"
                        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
                </div>
                <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-24 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex flex-col gap-3 max-w-lg">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--c-cta-sub)' }}>Hablemos</span>
                            <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--c-cta-text)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                                ¿Tienes un proyecto en mente?
                            </h2>
                            <p className="text-sm" style={{ color: 'var(--c-cta-sub)', lineHeight: '1.6' }}>
                                Abierto a nuevas oportunidades, freelance o colaboraciones. Respondo en menos de 24h.
                            </p>
                        </div>
                        <a href="#contact-form"
                            onClick={e => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 whitespace-nowrap hover:scale-[1.02] shrink-0 group"
                            style={{ background: 'var(--c-cta-btn-bg)', color: 'var(--c-cta-btn-text)', boxShadow: '0 8px 32px rgba(0,56,40,0.30)' }}>
                            Escríbeme <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            <section id="contact-form" className="py-24 px-6 sm:px-10 relative" style={{ background: 'var(--c-bg)', borderTop: '1px solid var(--c-border-dim)' }}>
                <div className="absolute top-0 left-[20%] w-[40%] h-[50%] rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, var(--c-orb) 0%, transparent 70%)`, filter: 'blur(80px)' }} />
                <div className="max-w-[1280px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
                            <p className="section-label">Contacto</p>
                            <h2 className="font-bold mb-6"
                                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', color: 'var(--c-text)', lineHeight: 1.1 }}>
                                Trabajemos<br /><span className="text-gradient">juntos.</span>
                            </h2>
                            <p className="mb-10" style={{ color: 'var(--c-text-3)', fontSize: '16px', lineHeight: '1.7', maxWidth: '360px' }}>
                                Disponible para proyectos de desarrollo, sistemas de gestión o colaboraciones técnicas.
                            </p>
                            <div className="flex flex-col gap-5">
                                <ContactInfo icon={<Mail className="h-4 w-4" />} label="Email" value="majf2704@gmail.com" />
                                <ContactInfo icon={<MapPin className="h-4 w-4" />} label="Ubicación" value="Chile" />
                                <ContactInfo icon={<Clock className="h-4 w-4" />} label="Respuesta" value="Menos de 24h" />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
                            <div className="p-6 sm:p-8 rounded-2xl" style={{ background: 'var(--c-bg-surface)', border: '1px solid var(--c-border)' }}>
                                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input {...register("name", { required: true })} name="name" label="Nombre" placeholder="Tu nombre" variant="bordered"
                                            startContent={<User className="h-4 w-4 text-foreground/30" />} isInvalid={!!errors.name}
                                            classNames={{ inputWrapper: "border-white/8 hover:border-white/20 data-[focus=true]:border-[#00ffc2] bg-white/[0.03]" }} />
                                        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} name="email" label="Email" placeholder="tu@email.com" variant="bordered"
                                            startContent={<Mail className="h-4 w-4 text-foreground/30" />} isInvalid={!!errors.email}
                                            classNames={{ inputWrapper: "border-white/8 hover:border-white/20 data-[focus=true]:border-[#00ffc2] bg-white/[0.03]" }} />
                                    </div>
                                    <Input {...register("subject", { required: true })} name="subject" label="Asunto" placeholder="¿En qué puedo ayudarte?" variant="bordered"
                                        isInvalid={!!errors.subject}
                                        classNames={{ inputWrapper: "border-white/8 hover:border-white/20 data-[focus=true]:border-[#00ffc2] bg-white/[0.03]" }} />
                                    <Textarea {...register("message", { required: true })} name="message" label="Mensaje" placeholder="Cuéntame sobre tu proyecto..." variant="bordered"
                                        minRows={4} isInvalid={!!errors.message}
                                        classNames={{ inputWrapper: "border-white/8 hover:border-white/20 data-[focus=true]:border-[#00ffc2] bg-white/[0.03]" }} />

                                    <AnimatePresence mode="wait">
                                        {status === 'success' && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                                style={{ background: 'var(--c-accent-soft)', border: '1px solid var(--c-accent-border)' }}>
                                                <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                                                <p className="text-sm" style={{ color: 'var(--c-accent)' }}>¡Mensaje enviado! Te responderé pronto.</p>
                                            </motion.div>
                                        )}
                                        {status === 'error' && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                                <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                                                <p className="text-sm text-red-400">{errorMsg}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button type="submit" disabled={isSubmitting}
                                        className="flex items-center justify-center gap-2.5 h-13 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] mt-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                                        style={{ background: 'var(--c-accent-gradient)', color: 'var(--c-accent-on)', boxShadow: `0 0 24px var(--c-accent-glow)` }}
                                        onMouseEnter={e => !isSubmitting && (e.currentTarget.style.boxShadow = `0 0 36px var(--c-accent-glow)`)}
                                        onMouseLeave={e => !isSubmitting && (e.currentTarget.style.boxShadow = `0 0 24px var(--c-accent-glow)`)}>
                                        {isSubmitting ? (
                                            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Enviando...</>
                                        ) : (<><Send className="h-4 w-4" /> Enviar Mensaje</>)}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

const ContactInfo = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-4 group">
        <div className="p-3 rounded-xl transition-all duration-300 shrink-0 group-hover:scale-105"
            style={{ background: 'var(--c-accent-soft)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent)' }}>
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-bold uppercase tracking-caps mb-0.5" style={{ color: 'var(--c-text-5)' }}>{label}</p>
            <p className="font-semibold text-sm" style={{ color: 'var(--c-text)' }}>{value}</p>
        </div>
    </div>
);
