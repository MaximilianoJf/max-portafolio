import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/dashboard');
    } catch (error) {
      setFormError('Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f0f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.05) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to portfolio */}
        <Link to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 transition-colors duration-200"
          style={{ color: '#5a6b63' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00ffc2'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5a6b63'}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al portafolio
        </Link>

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
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,255,194,0.15)' }}>
                <LogIn className="h-8 w-8 text-[#00ffc2]" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-center" style={{
              background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Panel Admin
            </h1>
            <p className="text-sm text-[#83958c] text-center">Gestiona tu portafolio</p>
          </motion.div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portafolio.com"
                className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,255,194,0.15)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,194,0.4)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,194,0.15)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              />
            </motion.div>

            {/* Contraseña */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300 pr-12"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(0,255,194,0.15)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,194,0.4)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,194,0.15)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#83958c] hover:text-[#00ffc2] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Error */}
            {formError && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20"
              >
                {formError}
              </motion.p>
            )}

            {/* Forgot password link */}
            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-xs transition-colors duration-200 font-medium"
                style={{ color: '#5a6b63' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00ffc2'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5a6b63'}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 uppercase tracking-widest mt-4"
              style={{
                background: isLoading ? 'rgba(0,255,194,0.5)' : 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
                color: '#003828',
                boxShadow: '0 0 24px rgba(0,255,194,0.25)',
              }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 0 36px rgba(0,255,194,0.45)')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 0 24px rgba(0,255,194,0.25)')}
            >
              {isLoading ? 'Verificando...' : 'Ingresar'}
            </motion.button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};
