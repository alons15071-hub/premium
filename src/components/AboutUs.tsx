import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Target, Eye, ShieldCheck, Heart, Users,
  CheckCircle2, Phone, Mail, MapPin, Landmark, 
  Sparkles, Shield, Facebook, Linkedin, Instagram, Twitter, Ship, Award, HelpCircle
} from 'lucide-react';

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const valuesList = [
    { name: 'Innovación', desc: 'Transformamos los procesos tradicionales con soluciones de vanguardia.', icon: Sparkles, color: 'text-amber-500 bg-amber-50' },
    { name: 'Compromiso', desc: 'Dedicados al éxito de nuestros clientes, garantizando operaciones sin fricciones.', icon: Award, color: 'text-violet-500 bg-violet-50' },
    { name: 'Responsabilidad', desc: 'Asumimos un rol de liderazgo ético y sostenible en cada decisión logística.', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50' },
    { name: 'Transparencia', desc: 'Fomentamos relaciones basadas en la honestidad y la claridad de información.', icon: Eye, color: 'text-sky-500 bg-sky-50' },
    { name: 'Trabajo en equipo', desc: 'Colaboración sin barreras entre operadores, tripulantes y agencias.', icon: Users, color: 'text-rose-500 bg-rose-50' },
    { name: 'Orientación al cliente', desc: 'Su satisfacción y eficiencia son la brújula que guía nuestro camino diario.', icon: Heart, color: 'text-blue-500 bg-blue-50' },
  ];

  const servicesList = [
    {
      title: 'Smart Basic',
      scope: 'Logística Esencial',
      desc: 'Registro y seguimiento básico de solicitudes de servicios de lanchas. Ideal para coordinaciones rápidas y consultas inmediatas.',
      benefits: ['Registro de solicitudes', 'Visualización de estados básicos', 'Optimización manual de arribos'],
      border: 'border-t-4 border-slate-300',
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    {
      title: 'Smart Control',
      scope: 'Seguimiento Avanzado',
      desc: 'Seguimiento en tiempo real de flota, historial extendido de operaciones y notificaciones sms/push totalmente automatizadas.',
      benefits: ['Ubicación satelital', 'Alertas y notificaciones push', 'Acceso al módulo de historial operativo'],
      border: 'border-t-4 border-[#008de0]',
      badgeColor: 'bg-[#008de0]/15 text-[#00658d]'
    },
    {
      title: 'Smart Premium',
      scope: 'Operación Integral',
      desc: 'Un dashboard ejecutivo con integraciones completas, indicadores de gestión (KPIs), reportes predictivos de clima e inteligencia artificial.',
      benefits: ['KPIs y reportes avanzados de rendimiento', 'Soporte prioritario 24/7/365', 'Previsión marítima predictiva AI'],
      border: 'border-t-4 border-[#ebd78c]',
      badgeColor: 'bg-amber-100 text-[#996515]'
    }
  ];

  const benefitsList = [
    'Optimización de tiempos de coordinación operativa general.',
    'Mayor control y trazabilidad en tiempo real de cada lancha de servicio.',
    'Centralización nativa de la información operativa y documental.',
    'Acceso ultra rápido a reportes de rendimiento e historial de operaciones.',
    'Sustancial mejora de los canales de comunicación entre clientes, agencias y operadores.',
    'Incremento directo de la eficiencia global en la gestión de servicios marítimos.'
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Header Hero Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative bg-gradient-to-r from-[#001736] via-[#002f5c] to-[#004a80] rounded-2xl overflow-hidden p-6 sm:p-10 select-none shadow-md border border-white/5"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden md:block">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 90 L30 10 L80 90 Z" />
            <path d="M40 90 L60 30 L95 90 Z" opacity="0.6" />
          </svg>
        </div>
        <div className="relative max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#41befd]/15 text-[#41befd] border border-[#41befd]/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase font-sans">
            <Ship className="w-4 h-4" /> Sobre la Empresa
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
            Smart Launch Services S.A.C.
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            Evolucionando la gestión naviera con tecnología de vanguardia y procesos digitales de alta precisión.
          </p>
        </div>
      </motion.div>

      {/* 2. Who We Are */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#c4c6d0] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#001736]" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#001736] tracking-tight uppercase">¿Quiénes Somos?</h3>
          </div>
          <p className="font-sans text-sm text-[#43474f] leading-relaxed">
            Smart Launch Services S.A.C. es una empresa orientada a la transformación digital del sector marítimo-portuario mediante una plataforma tecnológica que facilita la coordinación y gestión de servicios de lanchas. Nuestro objetivo es optimizar los procesos operativos, mejorar la comunicación entre los actores involucrados y brindar una experiencia eficiente y segura para nuestros clientes.
          </p>
        </div>

        {/* Brand visual identity widget card */}
        <div className="bg-[#f3f3f6] border border-[#c4c6d0] rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div className="space-y-2 relative">
            <div className="text-[10px] font-bold text-[#008de0] uppercase tracking-widest font-mono">ADN Corporativo</div>
            <h4 className="font-display font-extrabold text-base text-[#001736]">Liderazgo y Conectividad</h4>
            <p className="text-xs text-[#43474f] leading-relaxed">
              Trabajamos incansablemente para digitalizar cada nodo de comunicación portuaria de nuestra querida costa peruana.
            </p>
          </div>
          <div className="pt-4 border-t border-[#c4c6d0]/50 flex items-center justify-between text-xs font-semibold text-[#001736] relative">
            <span>Razón Social:</span>
            <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#c4c6d0]/40">Smart Launch Services S.A.C.</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Mission & Vision */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Misión */}
        <div className="bg-white border border-[#c4c6d0] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="absolute top-3 right-3 opacity-10">
            <Target className="w-16 h-16 text-[#001736]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Target className="w-5.5 h-5.5 text-emerald-600" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#001736] uppercase tracking-wider">Misión</h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#43474f] leading-relaxed">
            Brindar una plataforma digital innovadora que permita optimizar la coordinación y gestión de servicios de lanchas en el sector marítimo-portuario, contribuyendo a mejorar la eficiencia operativa y la satisfacción de nuestros clientes.
          </p>
        </div>

        {/* Visión */}
        <div className="bg-white border border-[#c4c6d0] rounded-xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="absolute top-3 right-3 opacity-10">
            <Eye className="w-16 h-16 text-[#001736]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Eye className="w-5.5 h-5.5 text-indigo-600" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#001736] uppercase tracking-wider">Visión</h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#43474f] leading-relaxed">
            Ser la plataforma líder en la gestión digital de servicios marítimo-portuarios en el Perú, reconocida por su innovación, confiabilidad y contribución al desarrollo logístico del país.
          </p>
        </div>
      </motion.div>

      {/* 4. Values (Bento Grid) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-[#001736] uppercase">Valores que nos Guían</h3>
          <p className="font-sans text-xs text-[#43474f]">Los principios rectores que determinan el actuar impecable de nuestra corporación</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuesList.map((val) => {
            const IconComp = val.icon;
            return (
              <div key={val.name} className="bg-white border border-[#c4c6d0] rounded-xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${val.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#001736] tracking-wide uppercase">{val.name}</h4>
                </div>
                <p className="font-sans text-xs text-[#43474f] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. Our Services (Detailed cards matching plans list description) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-[#001736] uppercase">Nuestros Niveles de Servicio</h3>
          <p className="font-sans text-xs text-[#43474f]">Modelos flexibles configurables según el volumen operacional de cada agencia naviera</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesList.map((srv) => (
            <div key={srv.title} className={`bg-white border-x border-b border-[#c4c6d0] rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${srv.border}`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#001736]">{srv.title}</h4>
                    <p className="text-[10px] text-[#00658d] font-bold font-mono tracking-widest uppercase mt-0.5">{srv.scope}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${srv.badgeColor}`}>
                    Activo
                  </span>
                </div>
                <p className="font-sans text-xs text-[#43474f] leading-relaxed">
                  {srv.desc}
                </p>
                <div className="pt-3 border-t border-[#eeeef0] space-y-2">
                  <div className="text-[9px] font-bold text-[#001736] uppercase tracking-wider">Incluye:</div>
                  <ul className="space-y-1.5">
                    {srv.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-[#43474f]">
                        <span className="text-[#008de0] font-sans font-bold select-none">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 6. Benefits (Left bullet points, Right decorative stats) */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#001736] text-white rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="text-[10px] text-[#41befd] font-bold font-mono tracking-wider uppercase">Eficiencia Integrada</div>
            <h3 className="font-display font-bold text-lg uppercase tracking-wide">Beneficios de la Plataforma</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefitsList.map((benefit, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <div className="w-5 h-5 shrink-0 rounded-full bg-white/10 flex items-center justify-center mt-0.5 select-none text-[#41befd]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="font-sans text-xs text-slate-200 leading-relaxed font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Stats Panel to leverage design negativity */}
        <div className="bg-slate-50 border border-[#c4c6d0] rounded-xl p-6 flex flex-col justify-center space-y-6 shadow-sm">
          <div className="text-center space-y-1">
            <div className="text-4xl font-display font-black text-[#001736]">99.8%</div>
            <div className="text-[10px] text-[#43474f] font-bold uppercase tracking-wider">Disponibilidad del Sistema</div>
          </div>
          <div className="h-px bg-[#c4c6d0]/50" />
          <div className="text-center space-y-1">
            <div className="text-4xl font-display font-black text-[#008de0]">-35%</div>
            <div className="text-[10px] text-[#43474f] font-bold uppercase tracking-wider">Tiempos de Espera de Lanchas</div>
          </div>
        </div>
      </motion.div>

      {/* 7. Contact Info & Interactive Address Details */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact details */}
        <div className="lg:col-span-2 bg-white border border-[#c4c6d0] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
              <Phone className="w-5.5 h-5.5 text-[#00658d]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#001736] uppercase tracking-wide">Contáctate con Nosotros</h3>
              <p className="text-xs text-[#43474f]">Atención las 24 horas para operaciones activas en puerto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#eeeef0]">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Landmark className="w-5 h-5 text-[#00658d] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-[#1a1c1e] uppercase">Razón Social y RUC</div>
                  <p className="text-[#43474f] mt-0.5">Smart Launch Services S.A.C.</p>
                  <p className="font-mono text-[#00658d] font-semibold mt-0.5">RUC: 20617589264</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00658d] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-[#1a1c1e] uppercase">Soporte por Correo</div>
                  <p className="text-[#43474f] mt-0.5">contacto@smartlaunch.pe</p>
                  <p className="text-[10px] text-[#7594cb] mt-0.5">Respuesta en menos de 15 min</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00658d] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-[#1a1c1e] uppercase">Teléfono de Enlace</div>
                  <p className="text-[#43474f] mt-0.5">+51 973464761</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-0.5">WhatsApp Activo</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00658d] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-bold text-[#1a1c1e] uppercase">Dirección Principal</div>
                <p className="text-[#43474f] leading-relaxed">
                  AA.HH. San Antonio Mz. A Lt. 17<br />
                  Entre Av. Néstor Gambetta y Av. Morales Duárez
                </p>
                <div className="bg-[#f0f4f9] text-[#004b69] py-1 px-2.5 rounded text-[10px] font-bold mt-1.5 inline-block">
                  Referencia: Base Naval del Callao
                </div>
                <p className="text-[#1a1c1e] font-semibold mt-0.5">Callao - Perú</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Networks & Connect */}
        <div className="bg-white border border-[#c4c6d0] rounded-xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-[#001736] uppercase tracking-wider">Nuestras Redes Sociales</h4>
            <p className="text-xs text-[#43474f]">Manténgase al día de las últimas innovaciones sobre tecnología de puertos.</p>
            
            <div className="space-y-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-[#1a1c1e] font-medium border border-transparent hover:border-[#c4c6d0]/50">
                <div className="w-7 h-7 rounded-full bg-[#1877f2]/10 flex items-center justify-center text-[#1877f2]">
                  <Facebook className="w-4 h-4 fill-current" />
                </div>
                <span>Smart Launch Services</span>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-[#1a1c1e] font-medium border border-transparent hover:border-[#c4c6d0]/50">
                <div className="w-7 h-7 rounded-full bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2]">
                  <Linkedin className="w-4 h-4 fill-current" />
                </div>
                <span>Smart Launch Services</span>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-[#1a1c1e] font-medium border border-transparent hover:border-[#c4c6d0]/50">
                <div className="w-7 h-7 rounded-full bg-[#e1306c]/10 flex items-center justify-center text-[#e1306c]">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@smartlaunchservices</span>
              </a>

              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-[#1a1c1e] font-medium border border-transparent hover:border-[#c4c6d0]/50">
                <div className="w-7 h-7 rounded-full bg-[#1da1f2]/10 flex items-center justify-center text-[#1da1f2]">
                  <Twitter className="w-4 h-4 fill-current" />
                </div>
                <span>@SmartLaunchPE</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 8. Privacy Policy Box */}
      <motion.div variants={itemVariants} className="bg-[#f0f4f9] border border-[#d6e3f2] rounded-xl p-5 sm:p-6 space-y-3 relative overflow-hidden">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-lg bg-white shrink-0 flex items-center justify-center text-[#00658d] border border-[#d6e3f2]">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-xs sm:text-sm text-[#001736] uppercase tracking-wide">
              Política de Privacidad y Términos de Uso
            </h4>
            <p className="font-sans text-xs text-[#43474f] leading-relaxed">
              Smart Launch Services S.A.C. se compromete a proteger la información de sus usuarios y clientes. Toda la información registrada en la plataforma será utilizada únicamente para fines operativos y administrativos relacionados con la prestación de los servicios. Asimismo, los usuarios aceptan utilizar la plataforma de manera responsable y conforme a las disposiciones establecidas por la empresa.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
