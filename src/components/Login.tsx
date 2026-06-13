import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Phone, HelpCircle } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Por favor, ingrese todos los campos requeridos.');
      return;
    }

    setLoading(true);
    setMessage('');

    // Simulate database lookup & verification
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 1200);
  };

  return (
    <div className="w-full max-w-[420px] bg-white border border-[#c4c6d0] p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300">
      
      {/* Header / Logo */}
      <div className="flex flex-col items-center mb-6 text-center">
        <CompanyLogo className="w-40 h-auto" variant="full" theme="light" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-sans font-semibold text-xs text-[#1a1c1e] uppercase tracking-wider block" htmlFor="email">
            Correo Corporativo
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#43474f]">
              <Mail className="w-4 h-4" />
            </span>
            <input
              id="email"
              type="email"
              required
              className="w-full pl-10 pr-3 py-3 bg-[#f3f3f6] text-[#1a1c1e] border border-[#c4c6d0] rounded-lg focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all font-sans text-sm"
              placeholder="ejemplo@smartlaunch.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="font-sans font-semibold text-xs text-[#1a1c1e] uppercase tracking-wider block" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#43474f]">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full pl-10 pr-10 py-3 bg-[#f3f3f6] text-[#1a1c1e] border border-[#c4c6d0] rounded-lg focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all font-sans text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#43474f] hover:text-[#00658d] transition-colors p-1 rounded-full outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Utilities */}
        <div className="flex items-center justify-between py-1 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#c4c6d0] text-[#00658d] focus:ring-[#00658d] cursor-pointer"
            />
            <span className="text-[#43474f] group-hover:text-[#1a1c1e] select-none font-medium">Recordarme</span>
          </label>
          <a href="#" className="font-semibold text-[#00658d] hover:text-[#001e2d] hover:underline" onClick={(e) => {
            e.preventDefault(); 
            setMessage('Se ha enviado un enlace de recuperación a su correo corporativo.');
          }}>
            ¿Olvidé mi contraseña?
          </a>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`p-3 rounded-lg text-xs font-medium text-center ${
            message.includes('recuperación') ? 'bg-[#c6e7ff] text-[#004b69]' : 'bg-[#ffdad6] text-[#93000a]'
          }`}>
            {message}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#001736] hover:bg-[#002b5c] text-white font-bold py-3.5 rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Verificando...</span>
            </>
          ) : (
            <>
              <span>Iniciar Sesión</span>
              <LogIn className="w-4 h-4" />
            </>
          )}
        </button>

      </form>

      {/* Footer Registration Request */}
      <footer className="mt-8 pt-5 border-t border-[#c4c6d0] text-center">
        <span className="text-xs text-[#43474f] block mb-1">¿No tienes credenciales activas?</span>
        <button
          onClick={() => setMessage('Solicitud de acceso enviada al Administrador de Operaciones Portuarias.')}
          className="text-xs text-[#001736] hover:text-[#00658d] hover:underline font-bold inline-flex items-center gap-1 transition-colors"
        >
          <span>Solicitar Acceso Corporativo</span>
          <span className="text-lg leading-none">→</span>
        </button>
      </footer>
    </div>
  );
}
