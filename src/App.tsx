import { useState, useEffect } from 'react';
import { ActiveScreen, ServiceRequest, NotificationItem, DocumentItem } from './types';
import { 
  INITIAL_SERVICES, INITIAL_NOTIFICATIONS, INITIAL_DOCUMENTS 
} from './data';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ServiceRequestForm from './components/ServiceRequest';
import ServiceTracking from './components/ServiceTracking';
import ServiceHistory from './components/ServiceHistory';
import Documents from './components/Documents';
import Reports from './components/Reports';
import UserProfile from './components/UserProfile';
import CompanyLogo from './components/CompanyLogo';
import AboutUs from './components/AboutUs';
import LockedSystem from './components/LockedSystem';

import { 
  Anchor, Bell, ClipboardList, Play, History, FileDown, 
  BarChart2, User, HelpCircle, LogOut, CheckCircle2, ChevronRight, Menu, X, Landmark, Lock
} from 'lucide-react';

export default function App() {
  // App authentication gates
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('login');

  // Subscription plan level configuration ('basic', 'control', 'premium')
  // Starts on 'control' as requested
  const [subscriptionPlan, setSubscriptionPlan] = useState<'basic' | 'control' | 'premium'>('control');

  const isScreenLocked = (screen: ActiveScreen): boolean => {
    if (subscriptionPlan === 'basic') {
      return ['tracking', 'history', 'documents', 'reports'].includes(screen);
    }
    if (subscriptionPlan === 'control') {
      return ['reports'].includes(screen);
    }
    return false; // premium has full access
  };

  // Unified global storage states (reactive)
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_SERVICES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);

  // Unread notification tracker for badges
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setUserLoggedIn(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    setUserEmail('');
    setActiveScreen('login');
  };

  const handleAddRequest = (newRequest: ServiceRequest) => {
    setRequests([newRequest, ...requests]);
    
    // Add real-time notification as well to mirror system transparency
    const newNotif: NotificationItem = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title: 'Nueva Solicitud Registrada',
      type: 'STATUS UPDATE',
      content: `Su lancha para \"${newRequest.vesselName}\" ha sido ingresada en ${newRequest.port}.`,
      timestamp: 'Ahora',
      status: 'unread'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments([newDoc, ...documents]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' as const })));
  };

  const toggleSingleNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'read' as const } : n));
  };

  // Helper to get pending lancha commission size
  const pendingLanchaCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Progress').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9fc] font-sans antialiased text-[#1a1c1e] select-none">
      
      {/* 1. App Gated Authentication Wrapper */}
      {!userLoggedIn ? (
        <div className="flex-grow flex items-center justify-center p-4 min-h-screen relative overflow-hidden bg-cover bg-center" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 23, 54, 0.94) 0%, rgba(0, 101, 141, 0.9) 100%), url('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000')`
        }}>
          {/* Decorative sat coordinates stamp */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 hidden sm:block">
            <span>COORD: 12.0508° S, 77.1259° W</span>
            <span className="block">PORT STATUS: CALLAO HUB ACTIVE</span>
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30 text-right hidden sm:block">
            <span>TERMINAL SYSTEM VER: 2.4.1</span>
            <span className="block">PROYECTO UNIVERSITARIO DE ALTA FIDELIDAD</span>
          </div>

          <Login onLoginSuccess={handleLogin} />
        </div>
      ) : (
        <div className="flex-grow flex flex-col md:flex-row">
          
          {/* 2. Responsive Side Navigation Bar (Visible on Tablet/Desktop for Bento layout feeling) */}
          <aside className="hidden md:flex flex-col w-64 bg-[#001736] text-white shrink-0 border-r border-[#c4c6d0]/10 justify-between p-5 z-40 relative">
            <div className="space-y-6">
              
              {/* App Brand Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-white/10 select-none">
                <CompanyLogo className="w-10 h-10 shrink-0" variant="icon" theme="dark" />
                <div>
                  <h1 className="font-display font-light text-base tracking-widest text-white uppercase m-0 leading-none">SMART</h1>
                  <span className="font-sans font-bold text-[8px] text-[#41befd] uppercase tracking-wider block">LAUNCH SERVICES</span>
                </div>
              </div>

              {/* Navigation Links list */}
              <nav className="space-y-1 block">
                
                <button 
                  onClick={() => setActiveScreen('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'dashboard'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Landmark className="w-4.5 h-4.5" />
                  <span>Dashboard Principal</span>
                </button>

                <button 
                  onClick={() => setActiveScreen('request')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'request'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <ClipboardList className="w-4.5 h-4.5" />
                  <span>Solicitar Lancha</span>
                </button>

                <button 
                  onClick={() => setActiveScreen('tracking')}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'tracking'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-4.5 h-4.5 fill-current" />
                    <span>Seguimiento Bahía</span>
                  </div>
                  {isScreenLocked('tracking') && (
                    <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  )}
                </button>

                <button 
                  onClick={() => setActiveScreen('history')}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'history'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <History className="w-4.5 h-4.5" />
                    <span>Historial de Servicios</span>
                  </div>
                  {isScreenLocked('history') && (
                    <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  )}
                </button>

                <button 
                  onClick={() => setActiveScreen('documents')}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'documents'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileDown className="w-4.5 h-4.5" />
                    <span>Documentos Marina</span>
                  </div>
                  {isScreenLocked('documents') && (
                    <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  )}
                </button>

                <button 
                  onClick={() => setActiveScreen('reports')}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'reports'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart2 className="w-4.5 h-4.5" />
                    <span>Reportes KPIs</span>
                  </div>
                  {isScreenLocked('reports') && (
                    <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0 animate-pulse" />
                  )}
                </button>

                <button 
                  onClick={() => setActiveScreen('about')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'about'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-4.5 h-4.5" />
                  <span>Sobre la Empresa</span>
                </button>

                <div className="h-px bg-white/10 my-4" />

                {/* Presentation Toolkit Link for professors */}
                <button 
                  onClick={() => setActiveScreen('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wider cursor-pointer ${
                    activeScreen === 'profile'
                      ? 'bg-[#41befd] text-[#002b5c] shadow-sm' 
                      : 'text-[#7594cb] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <User className="w-4.5 h-4.5" />
                  <span>Perfil &amp; Preferencias</span>
                </button>

              </nav>
            </div>

            {/* Side bottom user details card */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-[#7594cb] space-y-2">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-[#ebd78c] text-[#001b3e] font-bold flex items-center justify-center text-[10px]">
                  NP
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate text-xs">Naviera del Pacífico</p>
                  <p className="text-[10px] text-[#7594cb] truncate">{userEmail}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full py-1.5 bg-[#93000a] text-white hover:bg-red-800 rounded font-bold text-[10px] uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salida</span>
              </button>
            </div>

          </aside>

          {/* 3. Top Master Appbar (Header consistent across device viewports) */}
          <div className="flex-grow flex flex-col min-w-0">
            
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#c4c6d0] md:left-64 z-30 flex justify-between items-center px-4 sm:px-6 shadow-sm">
              
              {/* App Brand Header for Mobile Navigation */}
              <div className="flex items-center gap-1.5 md:hidden select-none">
                <CompanyLogo className="w-6 h-6 shrink-0" variant="icon" theme="light" />
                <div className="text-left">
                  <span className="font-display font-black text-xs tracking-wider text-[#001736] block leading-none">SMART</span>
                  <span className="font-sans font-bold text-[6px] text-[#008de0] tracking-wider block uppercase">LAUNCH SERVICES</span>
                </div>
              </div>

              {/* Desktop Dynamic Screen Indicator */}
              <div className="hidden md:flex items-center gap-2">
                <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#00658d] select-none bg-[#c6e7ff]/30 px-3 py-1 rounded-full">
                  {activeScreen === 'dashboard' ? 'Control de Flota' :
                   activeScreen === 'request' ? 'Formulario de Zarpe' :
                   activeScreen === 'tracking' ? 'Bahía en Vivo' :
                   activeScreen === 'history' ? 'Historial Operativo' :
                   activeScreen === 'documents' ? 'Expedientes Portuarios' :
                   activeScreen === 'reports' ? 'Centro Analítico' :
                   activeScreen === 'profile' ? 'Ajustes del Cliente' :
                   activeScreen === 'about' ? 'Sobre la Empresa' : 'Asistencia'}
                </span>

                {/* Subcription Plan Pill */}
                <button 
                  onClick={() => setActiveScreen('profile')} 
                  title="Administrar Nivel de Plan en Perfil"
                  className={`font-sans font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1.5 cursor-pointer hover:opacity-90 active:scale-95 transition-all ${
                    subscriptionPlan === 'premium' ? 'bg-[#ebd78c]/15 text-[#996515] border-[#ebd78c]/40' :
                    subscriptionPlan === 'control' ? 'bg-[#41befd]/15 text-[#00658d] border-[#41befd]/30' :
                    'bg-slate-100 text-slate-500 border-slate-300'
                  }`}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    subscriptionPlan === 'premium' ? 'bg-[#ebd78c]' :
                    subscriptionPlan === 'control' ? 'bg-[#41befd]' :
                    'bg-slate-400'
                  }`} />
                  <span>Smart {subscriptionPlan}</span>
                </button>
              </div>

              {/* Controls (Notification panel trigger list clicks) */}
              <div className="flex items-center gap-2.5">
                
                {/* Notification Dropdown Trigger */}
                <button 
                  onClick={() => alert(`Usted tiene ${unreadCount} alertas pendientes de lectura.`)}
                  className="w-9 h-9 hover:bg-[#f3f3f6] rounded-full flex items-center justify-center relative text-[#43474f] hover:text-[#001736] cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-ping-slow">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Profile quick settings router */}
                <button 
                  onClick={() => setActiveScreen('profile')}
                  className="w-9 h-9 hover:bg-[#f3f3f6] rounded-full flex items-center justify-center text-[#43474f] hover:text-[#001736] cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </button>

                <div className="h-6 w-px bg-[#c4c6d0] mx-1 md:hidden" />

                {/* Mobile logout trigger */}
                <button 
                  onClick={handleLogout}
                  className="w-9 h-9 hover:bg-red-50 rounded-full flex items-center justify-center text-[#93000a] md:hidden cursor-pointer"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>

              </div>
            </header>

            {/* 4. Main Scrollable Canvas Space */}
            <main className="flex-grow pt-20 pb-24 md:pb-8 px-4 sm:px-6 overflow-y-auto no-scrollbar">
              
              {activeScreen === 'dashboard' && (
                <Dashboard onScreenChange={setActiveScreen} vesselCountTask={pendingLanchaCount} />
              )}
              
              {activeScreen === 'request' && (
                <ServiceRequestForm onAddRequest={handleAddRequest} onScreenChange={setActiveScreen} />
              )}

              {activeScreen === 'tracking' && (
                isScreenLocked('tracking') ? (
                  <LockedSystem 
                    screenName="Seguimiento Bahía en Vivo"
                    currentPlan={subscriptionPlan}
                    requiredPlan="control"
                    onUpgrade={() => {
                      setSubscriptionPlan('control');
                      alert('Plan actualizado a Smart Control con éxito.');
                    }}
                  />
                ) : (
                  <ServiceTracking customVesselList={requests} />
                )
              )}

              {activeScreen === 'history' && (
                isScreenLocked('history') ? (
                  <LockedSystem 
                    screenName="Historial de Servicios de Lanchas"
                    currentPlan={subscriptionPlan}
                    requiredPlan="control"
                    onUpgrade={() => {
                      setSubscriptionPlan('control');
                      alert('Plan actualizado a Smart Control con éxito.');
                    }}
                  />
                ) : (
                  <ServiceHistory requests={requests} />
                )
              )}

              {activeScreen === 'documents' && (
                isScreenLocked('documents') ? (
                  <LockedSystem 
                    screenName="Documentos y Certificaciones"
                    currentPlan={subscriptionPlan}
                    requiredPlan="control"
                    onUpgrade={() => {
                      setSubscriptionPlan('control');
                      alert('Plan actualizado a Smart Control con éxito.');
                    }}
                  />
                ) : (
                  <Documents 
                    initialDocuments={documents} 
                    onAddDocument={handleAddDocument} 
                    onDeleteDocument={handleDeleteDocument} 
                  />
                )
              )}

              {activeScreen === 'reports' && (
                isScreenLocked('reports') ? (
                  <LockedSystem 
                    screenName="Reportes KPIs / Centro Analítico"
                    currentPlan={subscriptionPlan}
                    requiredPlan="premium"
                    onUpgrade={() => {
                      setSubscriptionPlan('premium');
                      alert('Plan actualizado a Smart Premium con éxito.');
                    }}
                  />
                ) : (
                  <Reports />
                )
              )}

              {activeScreen === 'profile' && (
                <UserProfile 
                  userEmail={userEmail} 
                  onLogout={handleLogout} 
                  subscriptionPlan={subscriptionPlan}
                  setSubscriptionPlan={setSubscriptionPlan}
                />
              )}

              {activeScreen === 'about' && (
                <AboutUs />
              )}

            </main>

            {/* 5. Mobile Bottom Navigation Bar (Fulfilling image reference design structure perfectly) */}
            <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#c4c6d0] shadow-md z-40 flex justify-around items-center px-2 pb-safe md:hidden">
              
              <button 
                onClick={() => setActiveScreen('dashboard')}
                className={`flex flex-col items-center justify-center p-1.5 transition-all text-[#43474f] cursor-pointer ${
                  activeScreen === 'dashboard' ? 'text-[#001736] font-bold scale-105' : 'hover:bg-slate-50'
                }`}
              >
                <Landmark className="w-5 h-5" />
                <span className="text-[10px] font-sans mt-0.5 font-bold">Inicio</span>
              </button>

              <button 
                onClick={() => setActiveScreen('history')}
                className={`flex flex-col items-center justify-center p-1.5 transition-all text-[#43474f] cursor-pointer ${
                  activeScreen === 'history' ? 'text-[#001736] font-bold scale-105' : 'hover:bg-slate-50'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="text-[10px] font-sans mt-0.5 font-bold">Historial</span>
              </button>

              <button 
                onClick={() => setActiveScreen('tracking')}
                className={`flex flex-col items-center justify-center p-1.5 transition-all text-[#43474f] cursor-pointer ${
                  activeScreen === 'tracking' ? 'text-[#001736] font-bold scale-105' : 'hover:bg-slate-50'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                <span className="text-[10px] font-sans mt-0.5 font-bold">Seguimiento</span>
              </button>

              <button 
                onClick={() => setActiveScreen('documents')}
                className={`flex flex-col items-center justify-center p-1.5 transition-all text-[#43474f] cursor-pointer ${
                  activeScreen === 'documents' ? 'text-[#001736] font-bold scale-105' : 'hover:bg-slate-50'
                }`}
              >
                <FileDown className="w-5 h-5" />
                <span className="text-[10px] font-sans mt-0.5 font-bold">Documentos</span>
              </button>

              <button 
                onClick={() => setActiveScreen('about')}
                className={`flex flex-col items-center justify-center p-1.5 transition-all text-[#43474f] cursor-pointer ${
                  activeScreen === 'about' ? 'text-[#001736] font-bold scale-105' : 'hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-[10px] font-sans mt-0.5 font-bold">Nosotros</span>
              </button>

            </nav>

          </div>
        </div>
      )}

    </div>
  );
}
