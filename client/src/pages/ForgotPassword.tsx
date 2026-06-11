import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');
        setErrorMsg('');

        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus('error');
                setErrorMsg(data.error || 'Error al enviar el email');
            } else {
                setStatus('success');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Error de conexión. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0f0f] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.07) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
                    style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.04) 0%, transparent 70%)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="rounded-2xl p-8 backdrop-blur-xl"
                    style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(0,255,194,0.10)' }}>

                    {/* Back link */}
                    <Link to="/login"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 transition-colors duration-200"
                        style={{ color: '#5a6b63' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00ffc2'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5a6b63'}
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Volver al Login
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,255,194,0.10)' }}>
                                <Mail className="h-8 w-8 text-[#00ffc2]" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-center" style={{
                            background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Recuperar Acceso
                        </h1>
                        <p className="text-sm text-center" style={{ color: '#5a6b63' }}>
                            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-4 py-6 text-center"
                            >
                                <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,255,194,0.10)' }}>
                                    <CheckCircle2 className="h-10 w-10 text-[#00ffc2]" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#e2e2e2] mb-2">¡Email enviado!</p>
                                    <p className="text-sm" style={{ color: '#83958c' }}>
                                        Si <strong style={{ color: '#b9cbc1' }}>{email}</strong> está registrado, recibirás un enlace de recuperación. Revisa también tu carpeta de spam.
                                    </p>
                                </div>
                                <p className="text-xs mt-2" style={{ color: '#3a4a43' }}>
                                    El enlace expira en 1 hora.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="admin@portafolio.com"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(0,255,194,0.15)',
                                        }}
                                        onFocus={e => {
                                            e.currentTarget.style.borderColor = 'rgba(0,255,194,0.40)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        }}
                                        onBlur={e => {
                                            e.currentTarget.style.borderColor = 'rgba(0,255,194,0.15)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        }}
                                    />
                                </div>

                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20"
                                    >
                                        {errorMsg}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading || !email}
                                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
                                    style={{
                                        background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
                                        color: '#003828',
                                        boxShadow: '0 0 24px rgba(0,255,194,0.20)',
                                    }}
                                    onMouseEnter={e => !isLoading && ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(0,255,194,0.40)')}
                                    onMouseLeave={e => !isLoading && ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,255,194,0.20)')}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        <><Send className="h-4 w-4" /> Enviar Enlace</>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};
