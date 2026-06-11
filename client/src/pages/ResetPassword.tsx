import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // Sin token en URL → inválido
    if (!token) {
        return (
            <div className="min-h-screen bg-[#0c0f0f] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md text-center"
                >
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-[#e2e2e2] mb-2">Enlace inválido</h2>
                        <p className="text-sm mb-6" style={{ color: '#83958c' }}>
                            Este enlace de recuperación es inválido o no contiene un token.
                        </p>
                        <Link to="/forgot-password"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
                            style={{ background: 'linear-gradient(135deg, #00ffc2, #00e1ab)', color: '#003828' }}
                        >
                            Solicitar nuevo enlace
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (password.length < 6) {
            setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus('error');
                setErrorMsg(data.error || 'Error al restablecer la contraseña');
            } else {
                setStatus('success');
                // Redirigir al login después de 3s
                setTimeout(() => navigate('/login'), 3000);
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
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.07) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
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

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,255,194,0.10)' }}>
                                <ShieldCheck className="h-8 w-8 text-[#00ffc2]" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-center" style={{
                            background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Nueva Contraseña
                        </h1>
                        <p className="text-sm text-center" style={{ color: '#5a6b63' }}>
                            Elige una contraseña segura para tu cuenta.
                        </p>
                    </motion.div>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4 py-6 text-center"
                        >
                            <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,255,194,0.10)' }}>
                                <CheckCircle2 className="h-10 w-10 text-[#00ffc2]" />
                            </div>
                            <div>
                                <p className="font-bold text-[#e2e2e2] mb-2">¡Contraseña actualizada!</p>
                                <p className="text-sm" style={{ color: '#83958c' }}>
                                    Tu contraseña ha sido restablecida correctamente. Redirigiendo al login...
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Nueva contraseña */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
                                    Nueva Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300 pr-12"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,255,194,0.15)' }}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,255,194,0.40)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,255,194,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#83958c] hover:text-[#00ffc2] transition-colors">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirmar contraseña */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="Repite la contraseña"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300 pr-12"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: confirmPassword && password !== confirmPassword
                                                ? '1px solid rgba(239,68,68,0.5)'
                                                : '1px solid rgba(0,255,194,0.15)',
                                        }}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,255,194,0.40)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                                        onBlur={e => {
                                            e.currentTarget.style.borderColor = confirmPassword && password !== confirmPassword
                                                ? 'rgba(239,68,68,0.5)' : 'rgba(0,255,194,0.15)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        }}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#83958c] hover:text-[#00ffc2] transition-colors">
                                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password strength indicator */}
                            {password && (
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                                            style={{
                                                background: password.length >= i * 3
                                                    ? i <= 1 ? '#ef4444' : i <= 2 ? '#f59e0b' : i <= 3 ? '#00e1ab' : '#00ffc2'
                                                    : 'rgba(255,255,255,0.06)',
                                            }} />
                                    ))}
                                </div>
                            )}

                            {/* Error */}
                            {(status === 'error' || errorMsg) && errorMsg && (
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
                                disabled={isLoading}
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
                                        Guardando...
                                    </>
                                ) : (
                                    <><ShieldCheck className="h-4 w-4" /> Guardar Contraseña</>
                                )}
                            </button>

                            <p className="text-center text-xs" style={{ color: '#3a4a43' }}>
                                ¿Recordaste tu contraseña?{' '}
                                <Link to="/login" className="text-[#00ffc2] hover:underline font-semibold">
                                    Ingresar
                                </Link>
                            </p>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
