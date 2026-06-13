import { useState } from 'react';
import { AUTHORIZED_USERS } from '../data';
import CompanyLogo from './CompanyLogo';
import { 
  Anchor, Mail, MapPin, User, LogOut, Check, Save, Settings, 
  ShieldCheck, HelpCircle, BellRing, PhoneCall, Key, Globe, Eye
} from 'lucide-react';

interface UserProfileProps {
  userEmail: string;
  onLogout: () => void;
  subscriptionPlan: 'basic' | 'control' | 'premium';
  setSubscriptionPlan: (plan: 'basic' | 'control' | 'premium') => void;
}

export default function UserProfile({ 
  userEmail, 
  onLogout, 
  subscriptionPlan, 
  setSubscriptionPlan 
}: UserProfileProps) {
  const [email, setEmail] = useState(userEmail || 'ops@navierapacifico.com');
  const [phone, setPhone] = useState('+51 1 555-0199');
  const [address, setAddress] = useState('Av. Marítima 450, Callao, Peru');
  
  // Notification preference switches states
  const [notifyDocking, setNotifyDocking] = useState(true);
  const [notifyWeather, setNotifyWeather] = useState(true);
  const [notifyManifest, setNotifyManifest] = useState(false);
  
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    alert('Información del perfil marítimo corporativo actualizada con éxito.');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Hero Profile Section */}
      <section className="bg-white rounded-xl p-5 border border-[#c4c6d0] shadow-sm flex flex-col md:flex-row gap-5 items-start md:items-center">
        
        {/* Profile Avatar Frame */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#c4c6d0] bg-white flex items-center justify-center p-2">
            <CompanyLogo className="w-full h-auto" variant="icon" theme="light" />
          </div>
          <div className="absolute -bottom-2.5 -right-2.5 bg-[#41befd] text-[#002b5c] px-2.5 py-0.5 rounded-full text-[10px] font-bold border-2 border-white shadow-sm font-sans uppercase">
            {subscriptionPlan === 'premium' ? 'Socio Premium' : subscriptionPlan === 'control' ? 'Socio Control' : 'Socio Basic'}
          </div>
        </div>

        {/* Company specs */}
        <div className="flex-grow space-y-2 min-w-0">
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#001736] tracking-tight truncate">
            Naviera del Pacífico S.A.
          </h1>
          <p className="text-[#43474f] font-sans text-xs font-semibold uppercase tracking-wider">
            Callao Port Operations &amp; Logistics Hub
          </p>

          <div className="flex flex-wrap gap-2 pt-1 font-sans text-xs">
            <div className="flex items-center gap-1.5 text-[#43474f] bg-[#f3f3f6] px-2.5 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-[#00658d]" />
              <input 
                type="text" 
                disabled={!editMode} 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className={`bg-transparent outline-none max-w-[200px] sm:max-w-none text-xs p-0 border-none ${editMode ? 'text-[#00658d] underline focus:ring-0' : 'text-[#43474f]'}`}
              />
            </div>
            <div className="flex items-center gap-1.5 text-[#43474f] bg-[#f3f3f6] px-2.5 py-1 rounded-lg">
              <Mail className="w-3.5 h-3.5 text-[#00658d]" />
              <input 
                type="email" 
                disabled={!editMode} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={`bg-transparent outline-none max-w-[200px] sm:max-w-none text-xs p-0 border-none ${editMode ? 'text-[#00658d] underline focus:ring-0' : 'text-[#43474f]'}`}
              />
            </div>
          </div>
        </div>

        {/* Actions edit switcher toggle */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0 md:self-center">
          {editMode ? (
            <button 
              onClick={handleSave}
              className="flex-grow sm:flex-grow-0 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="flex-grow sm:flex-grow-0 bg-[#001736] hover:bg-[#002b5c] text-white px-5 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Editar Perfil</span>
            </button>
          )}

          <button 
            onClick={onLogout}
            className="p-2.5 border border-[#93000a] text-[#93000a] hover:bg-[#ffdad6]/20 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Cerrar sesión corporativa"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* Bento Grid layout inside Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Port authorized operators (Col-span 7) */}
        <div className="lg:col-span-7 bg-white border border-[#c4c6d0] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#eeeef0]">
            <h2 className="font-display font-bold text-base text-[#001736]">Usuarios Autorizados</h2>
            <button 
              onClick={() => alert('Para agregar nuevos oficiales autorizados, contacte al oficial de capitanía del puerto.')}
              className="text-[#00658d] font-sans font-bold text-xs hover:underline cursor-pointer"
            >
              + Gestionar
            </button>
          </div>

          <div className="space-y-2">
            {AUTHORIZED_USERS.map((usr) => (
              <div 
                key={usr.name}
                className="flex items-center gap-3.5 p-3 hover:bg-[#f3f3f6] rounded-xl transition-all border border-transparent hover:border-[#c4c6d0]/50 group"
              >
                {/* Visual initials circular frame representation */}
                <div className="w-10 h-10 rounded-full bg-[#ebd78c] text-[#001b3e] font-bold font-sans text-xs flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  {usr.initials}
                </div>
                
                <div className="flex-grow">
                  <p className="font-sans font-bold text-sm text-[#1a1c1e]">{usr.name}</p>
                  <p className="font-sans text-xs text-[#43474f] font-medium">{usr.role}</p>
                </div>
                <div className="text-[#ebd78c] bg-[#001b3e] p-1.5 rounded-full" title="Operador verificado">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Subscription Selector block (Col-span 5) */}
        <div className="lg:col-span-5 bg-[#001736] text-white rounded-xl p-5 border border-[#eeeef0]/10 shadow-sm flex flex-col justify-between overflow-hidden relative">
          
          <div className="relative z-10 space-y-3">
            <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#41befd] font-mono">Plan de Servicio Actual</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#ebd78c]/20 text-[#ebd78c] text-[10px] font-bold uppercase tracking-wider">
                {subscriptionPlan}
              </span>
            </div>
            
            <h3 className="font-display font-bold text-base text-white">Configurador de Cuenta</h3>
            <p className="font-sans text-[11px] text-[#7594cb] leading-relaxed">
              Seleccione un nivel de servicio para configurar instantáneamente los sistemas y permisos activos en esta cuenta.
            </p>

            <div className="space-y-2 pt-1 font-sans">
              {/* Basic switcher option */}
              <button
                onClick={() => {
                  setSubscriptionPlan('basic');
                  alert('Plan de cuenta cambiado a: Smart Basic (Sistemas esenciales únicamente)');
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                  subscriptionPlan === 'basic' 
                    ? 'bg-white/15 border-[#41befd] text-white font-bold' 
                    : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${subscriptionPlan === 'basic' ? 'bg-[#41befd]' : 'bg-transparent'}`} />
                  <span className="text-xs">Smart Basic</span>
                </div>
                <span className="text-[9px] uppercase tracking-normal px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Esencial</span>
              </button>

              {/* Control switcher option */}
              <button
                onClick={() => {
                  setSubscriptionPlan('control');
                  alert('Plan de cuenta cambiado a: Smart Control (Sistemas intermedios habilitados)');
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                  subscriptionPlan === 'control' 
                    ? 'bg-white/15 border-[#41befd] text-white font-bold' 
                    : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${subscriptionPlan === 'control' ? 'bg-[#41befd]' : 'bg-transparent'}`} />
                  <span className="text-xs">Smart Control [Recomendado]</span>
                </div>
                <span className="text-[9px] uppercase tracking-normal px-1.5 py-0.5 rounded bg-[#008de0]/30 text-[#41befd]">Intermedio</span>
              </button>

              {/* Premium switcher option */}
              <button
                onClick={() => {
                  setSubscriptionPlan('premium');
                  alert('Plan de cuenta cambiado a: Smart Premium (Acceso total e ilimitado)');
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                  subscriptionPlan === 'premium' 
                    ? 'bg-white/15 border-[#ebd78c] text-[#ebd78c] font-bold' 
                    : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${subscriptionPlan === 'premium' ? 'bg-[#ebd78c]' : 'bg-transparent'}`} />
                  <span className="text-xs">Smart Premium</span>
                </div>
                <span className="text-[9px] uppercase tracking-normal px-1.5 py-0.5 rounded bg-[#ebd78c]/20 text-[#ebd78c]">Premium</span>
              </button>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/5 mt-3">
            <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
              <div 
                className="bg-[#41befd] h-full rounded-full transition-all duration-500" 
                style={{ width: subscriptionPlan === 'premium' ? '100%' : subscriptionPlan === 'control' ? '65%' : '30%' }}
              ></div>
            </div>
            <div className="flex justify-between font-mono text-[9px] text-[#7594cb]">
              <span>Sistemas habilitados:</span>
              <span>{subscriptionPlan === 'premium' ? '9 / 9' : subscriptionPlan === 'control' ? '7 / 9' : '4 / 9'}</span>
            </div>
          </div>

          {/* Background decorative raw watermark icon */}
          <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none transform rotate-12">
            <Anchor className="w-48 h-48" />
          </div>

        </div>

      </div>

      {/* Customizable Switch Preferences */}
      <section className="bg-white rounded-xl border border-[#c4c6d0] p-5 shadow-sm space-y-4">
        <div>
          <h2 className="font-display font-bold text-base text-[#001736]">Preferencias de Notificaciones</h2>
          <p className="font-sans text-xs text-[#43474f]">Reciba alertas críticas directamente en su dispositivo móvil</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          
          {/* Switch 1: Port Arrivals Check */}
          <div className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
            notifyDocking ? 'border-l-4 border-l-[#00658d] border-[#c4c6d0] bg-[#f9f9fc]' : 'border-l-4 border-l-transparent border-[#c4c6d0]'
          }`}>
            <div className="space-y-1 pr-2">
              <p className="font-bold text-[#1a1c1e]">Arribos de Embarcaciones</p>
              <p className="text-[#43474f]">Alertas al momento del atraque/puerto</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifyDocking}
                onChange={() => setNotifyDocking(!notifyDocking)}
              />
              <div className="w-11 h-6 bg-[#eeeef0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#001736]" />
            </label>
          </div>

          {/* Switch 2: Hazard Alerts Switch */}
          <div className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
            notifyWeather ? 'border-l-4 border-l-[#00658d] border-[#c4c6d0] bg-[#f9f9fc]' : 'border-l-4 border-l-transparent border-[#c4c6d0]'
          }`}>
            <div className="space-y-1 pr-2">
              <p className="font-bold text-[#1a1c1e]">Alertas de Mal Tiempo / Oleaje</p>
              <p className="text-[#43474f]">Variaciones climáticas en la bahía</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifyWeather}
                onChange={() => setNotifyWeather(!notifyWeather)}
              />
              <div className="w-11 h-6 bg-[#eeeef0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#001736]" />
            </label>
          </div>

          {/* Switch 3: Manifest Updates Switch */}
          <div className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
            notifyManifest ? 'border-l-4 border-l-[#00658d] border-[#c4c6d0] bg-[#f9f9fc]' : 'border-l-4 border-l-transparent border-[#c4c6d0]'
          }`}>
            <div className="space-y-1 pr-2">
              <p className="font-bold text-[#1a1c1e]">Manifiestos y Documentación</p>
              <p className="text-[#43474f]/90">Actualizaciones de visas / despachos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifyManifest}
                onChange={() => setNotifyManifest(!notifyManifest)}
              />
              <div className="w-11 h-6 bg-[#eeeef0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#001736]" />
            </label>
          </div>

        </div>
      </section>

      {/* Regional Operations Map snippet */}
      <div className="relative rounded-xl border border-[#c4c6d0] p-4 shadow-sm h-48 overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700 pointer-events-none" 
            alt="Ubicación Callao"
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
          />
        </div>
        <div className="relative z-10 bg-white/90 backdrop-blur-md p-3 rounded-lg inline-block text-xs">
          <p className="font-sans font-bold text-[#001736]">Sede Operativa Principal: Bahía Norte el Callao Hub</p>
          <p className="text-[#43474f] font-medium pt-0.5">3 Embarcaciones en servicio | 2 en atraque activo</p>
        </div>
      </div>

    </div>
  );
}
