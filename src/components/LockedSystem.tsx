import React from 'react';
import { ShieldAlert, Lock, ArrowUpRight, Check, AlertTriangle, Sparkles, Star } from 'lucide-react';

interface LockedSystemProps {
  screenName: string;
  currentPlan: 'basic' | 'control' | 'premium';
  requiredPlan: 'control' | 'premium';
  onUpgrade: () => void;
}

export default function LockedSystem({ 
  screenName, 
  currentPlan, 
  requiredPlan, 
  onUpgrade 
}: LockedSystemProps) {
  
  const getPlanDetails = (plan: 'basic' | 'control' | 'premium') => {
    switch (plan) {
      case 'basic':
        return { name: 'Smart Basic', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' };
      case 'control':
        return { name: 'Smart Control', bg: 'bg-[#41befd]/15', text: 'text-[#00658d]', border: 'border-[#41befd]/30' };
      case 'premium':
        return { name: 'Smart Premium', bg: 'bg-[#ebd78c]/15', text: 'text-[#996515]', border: 'border-[#ebd78c]/30' };
    }
  };

  const currentInfo = getPlanDetails(currentPlan);
  const requiredInfo = getPlanDetails(requiredPlan);

  const plansMatrix = [
    {
      feature: 'Solicitud de Lancha (Registro manual)',
      basic: true,
      control: true,
      premium: true,
    },
    {
      feature: 'Dashboard / Inicio Operativo',
      basic: true,
      control: true,
      premium: true,
    },
    {
      feature: 'Seguimiento Bahía (Radar satelital en vivo)',
      basic: false,
      control: true,
      premium: true,
    },
    {
      feature: 'Historial de Operaciones extendido',
      basic: false,
      control: true,
      premium: true,
    },
    {
      feature: 'Expedientes & Documentos Marina',
      basic: false,
      control: true,
      premium: true,
    },
    {
      feature: 'Centro de Reportes & KPIs Avanzados',
      basic: false,
      control: false,
      premium: true,
    },
    {
      feature: 'Previsión Climática Predictiva por IA',
      basic: false,
      control: false,
      premium: true,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white border border-[#c4c6d0] rounded-2xl p-6 sm:p-10 shadow-lg animate-fadeIn text-center space-y-8 select-none relative overflow-hidden">
      
      {/* Decorative top grid accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-[#ebd78c]"></div>

      {/* Main Lock Icon & Locked Screen Title */}
      <div className="space-y-3 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 mx-auto flex items-center justify-center border border-amber-200 text-amber-600 animate-bounce-slow">
          <Lock className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" /> Sistema Restringido
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-[#001736] tracking-tight uppercase">
          {screenName}
        </h2>
        <p className="font-sans text-sm text-[#43474f] max-w-xl mx-auto leading-relaxed">
          Su cuenta actual bajo el nivel <span className={`px-2 py-0.5 rounded-md font-semibold text-xs ${currentInfo.bg} ${currentInfo.text}`}>{currentInfo.name}</span> no cuenta con acceso a este sistema de la flota.
        </p>
      </div>

      {/* Action CTA Upgrade Card */}
      <div className="bg-[#f3f3f6] border border-[#c4c6d0]/60 p-6 rounded-2xl max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-amber-700">
          <Sparkles className="w-5 h-5 fill-current animate-pulse text-[#d4af37]" />
          <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-[#001736]">
            Actualización de Plan Disponible
          </span>
        </div>
        <p className="font-sans text-xs text-[#43474f] leading-relaxed">
          Desbloquee el acceso completo al módulo <strong className="text-slate-800">{screenName}</strong> y optimice la totalidad de las operaciones portuarias ampliando su cuenta a <strong className="text-slate-800">{requiredInfo.name}</strong>.
        </p>
        
        <button
          onClick={onUpgrade}
          className="w-full bg-[#001736] hover:bg-[#002b5c] text-white font-sans font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          <Star className="w-4.5 h-4.5 text-[#ebd78c] fill-current" />
          <span>Mejorar Plan a {requiredInfo.name}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature Plan Access Matrix comparison */}
      <div className="space-y-4 pt-4 border-t border-[#eeeef0]">
        <div className="text-left font-sans font-bold text-xs text-[#001736] uppercase tracking-wider">
          Comparativa de Sistemas y Módulos
        </div>
        
        <div className="border border-[#c4c6d0]/60 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-[#f9f9fc] border-b border-[#c4c6d0]/50 text-[#001736] font-bold text-[10px] uppercase tracking-wider">
                <th className="p-3">Sistema / Módulo</th>
                <th className="p-3 text-center w-24">Basic</th>
                <th className="p-3 text-center w-28">Control</th>
                <th className="p-3 text-center w-28">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeef0]">
              {plansMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-medium text-slate-700">{item.feature}</td>
                  <td className="p-3 text-center">
                    {item.basic ? (
                      <Check className="w-4.5 h-4.5 text-green-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">-</span>
                    )}
                  </td>
                  <td className="p-3 text-center bg-[#41befd]/5">
                    {item.control ? (
                      <Check className="w-4.5 h-4.5 text-[#00658d] mx-auto font-bold" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="p-3 text-center bg-amber-50/40">
                    {item.premium ? (
                      <Check className="w-4.5 h-4.5 text-amber-700 mx-auto font-bold" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
