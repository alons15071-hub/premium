import { ActiveScreen } from '../types';
import { 
  FileText, Play, History, FileDown, TrendingUp, HelpCircle, 
  MapPin, Star, ShieldAlert, Award, Compass, MessageSquare, Anchor, BarChart4
} from 'lucide-react';

interface DashboardProps {
  onScreenChange: (screen: ActiveScreen) => void;
  vesselCountTask: number;
}

export default function Dashboard({ onScreenChange, vesselCountTask }: DashboardProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome banner with abstract maritime visual elements */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#001736] to-[#002b5c] p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#41befd]/20 text-[#41befd] text-xs font-semibold uppercase tracking-wider">
            <Anchor className="w-3.5 h-5 text-[#41befd] animate-pulse" />
            OPERACIONES EN VIVO
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight pt-1">
            Gestión Operatividad Portuaria
          </h2>
          <p className="font-sans text-sm text-[#7594cb] leading-relaxed">
            Optimice y sincronice en tiempo real sus procesos de aprovisionamiento, transporte y relevo de personal lancha en los terminales del Callao y Chancay.
          </p>
        </div>
        {/* Subtle decorative vector mesh representing depth curves */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6">
          <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="4" />
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="1" />
            <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* Quick Access Grid (The 5 Core Buttons with beautiful material styling) */}
      <section className="space-y-3">
        <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[#43474f]">
          Accesos Operativos Rápidos
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          
          <button 
            onClick={() => onScreenChange('request')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#c4c6d0] rounded-xl hover:bg-[#f3f3f6] hover:border-[#00658d] transition-all duration-200 active:scale-95 group shadow-sm text-center"
          >
            <div className="h-10 w-10 rounded-lg bg-[#41befd]/10 flex items-center justify-center text-[#00658d] mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs text-[#1a1c1e]">Solicitud Lancha</span>
          </button>

          <button 
            onClick={() => onScreenChange('tracking')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#c4c6d0] rounded-xl hover:bg-[#f3f3f6] hover:border-[#00658d] transition-all duration-200 active:scale-95 group shadow-sm text-center"
          >
            <div className="h-10 w-10 rounded-lg bg-[#41befd]/10 flex items-center justify-center text-[#00658d] mb-2 group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <span className="font-sans font-bold text-xs text-[#1a1c1e]">Seguimiento</span>
          </button>

          <button 
            onClick={() => onScreenChange('history')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#c4c6d0] rounded-xl hover:bg-[#f3f3f6] hover:border-[#00658d] transition-all duration-200 active:scale-95 group shadow-sm text-center"
          >
            <div className="h-10 w-10 rounded-lg bg-[#41befd]/10 flex items-center justify-center text-[#00658d] mb-2 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs text-[#1a1c1e]">Historial</span>
          </button>

          <button 
            onClick={() => onScreenChange('documents')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#c4c6d0] rounded-xl hover:bg-[#f3f3f6] hover:border-[#00658d] transition-all duration-200 active:scale-95 group shadow-sm text-center"
          >
            <div className="h-10 w-10 rounded-lg bg-[#41befd]/10 flex items-center justify-center text-[#00658d] mb-2 group-hover:scale-110 transition-transform">
              <FileDown className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs text-[#1a1c1e]">Documentos</span>
          </button>

          <button 
            onClick={() => onScreenChange('reports')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#c4c6d0] rounded-xl hover:bg-[#f3f3f6] hover:border-[#00658d] transition-all duration-200 active:scale-95 group shadow-sm text-center col-span-2 md:col-span-1"
          >
            <div className="h-10 w-10 rounded-lg bg-[#41befd]/10 flex items-center justify-center text-[#00658d] mb-2 group-hover:scale-110 transition-transform">
              <BarChart4 className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs text-[#1a1c1e]">Reportes</span>
          </button>

        </div>
      </section>

      {/* Port Callao Simulated Live Radar Traffic (with asymmetric design) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#f3f3f6] border border-[#c4c6d0] rounded-xl overflow-hidden flex flex-col min-h-[300px]">
          <div className="p-4 border-b border-[#c4c6d0] bg-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <h3 className="font-display font-semibold text-sm text-[#001736]">Tránsito en Bahía Exterior - Callao</h3>
            </div>
            <span className="font-mono text-xs text-[#43474f] bg-[#eeeef0] px-2.5 py-0.5 rounded-full select-none">
              Radar Activo
            </span>
          </div>
          
          {/* Simulated radar canvas pattern */}
          <div className="relative flex-grow bg-slate-900 overflow-hidden flex items-center justify-center p-4 group">
            {/* Concentric rings represent depth ranges */}
            <div className="absolute w-[280px] h-[280px] border border-green-500/10 rounded-full" />
            <div className="absolute w-[180px] h-[180px] border border-green-500/15 rounded-full" />
            <div className="absolute w-[80px] h-[80px] border border-green-500/20 rounded-full" />
            
            {/* Radar swept line simulation */}
            <div className="absolute w-[150px] h-[150px] origin-bottom-right top-0 left-0 border-r border-[#41befd]/40 invisible group-hover:visible animate-spin duration-[4000ms]" style={{ transformOrigin: 'bottom right' }}></div>
            
            {/* Interactive Status card representing STAR CARRIER ship */}
            <div className="relative z-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-[#c4c6d0] max-w-xs text-[#1a1c1e]">
              <span className="font-mono text-[10px] font-bold text-[#00658d] block mb-1">CALLAO HUB - EN TRÁNSITO</span>
              <h4 className="font-display font-bold text-sm text-[#001736]">Vessel: STAR CARRIER</h4>
              <div className="w-full bg-[#f3f3f6] h-1.5 rounded-full my-2.5 overflow-hidden">
                <div className="bg-[#001736] h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="font-sans text-xs text-[#43474f] font-medium flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-[#41befd] rounded-full"></span>
                Estado: Maniobra de atraque en 15 min.
              </p>
            </div>
          </div>
        </div>

        {/* Operational Metrics from standard daily log */}
        <div className="flex flex-col justify-between gap-4">
          <div className="bg-white p-6 rounded-xl border border-[#c4c6d0] shadow-sm flex-grow space-y-4">
            <h4 className="font-sans font-bold text-xs text-[#43474f] uppercase tracking-wider pb-2 border-b border-[#eeeef0]">
              Monitoreo del Día
            </h4>
            <div className="space-y-4 font-sans">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#1a1c1e]">Lanchas en Comisión</span>
                <span className="font-display font-semibold text-lg text-[#00658d]">{vesselCountTask}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#1a1c1e]">Tareas Completadas</span>
                <span className="font-display font-semibold text-lg text-[#166534]">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#1a1c1e]">Alertas Críticas</span>
                <span className="font-display font-semibold text-lg text-[#93000a]">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#1a1c1e]">Eficiencia General</span>
                <span className="font-display font-semibold text-lg text-[#002b5c]">94%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#c6e7ff]/30 border border-[#00658d]/20 p-5 rounded-xl flex items-start gap-3">
            <span className="text-[#00658d]">
              <HelpCircle className="w-8 h-8" />
            </span>
            <div className="space-y-1">
              <h4 className="font-sans font-semibold text-xs text-[#002b5c]">¿Necesita asistencia técnica?</h4>
              <p className="font-sans text-xs text-[#43474f] leading-normal">
                Verifique los instructivos operacionales o tome contacto directo con nuestro canal interno en Chancay &amp; Callao.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
