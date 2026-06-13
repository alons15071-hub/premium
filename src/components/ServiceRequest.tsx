import React, { useState } from 'react';
import { PortType, ServiceRequest } from '../types';
import { Anchor, Calendar, Clock, MapPin, Navigation, ClipboardList, PenTool, Ship, HelpCircle, Send } from 'lucide-react';

interface ServiceRequestProps {
  onAddRequest: (request: ServiceRequest) => void;
  onScreenChange: (screen: 'dashboard' | 'tracking' | 'history') => void;
}

export default function ServiceRequestForm({ onAddRequest, onScreenChange }: ServiceRequestProps) {
  const [port, setPort] = useState<PortType>('Callao');
  const [vesselName, setVesselName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [observations, setObservations] = useState('');
  const [submitting, setSubLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vesselName || !serviceType || !date || !time) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    setSubLoading(true);

    const newRequest: ServiceRequest = {
      id: `SR-${Math.floor(100 + Math.random() * 900)}`,
      port,
      vesselName,
      serviceType,
      date,
      time,
      observations: observations || 'Ninguna observación adicional.',
      status: 'Pending',
      timestamp: Date.now()
    };

    setTimeout(() => {
      onAddRequest(newRequest);
      setSubLoading(false);
      setSuccess(true);
      
      // Auto transition to tracking screen after brief delay
      setTimeout(() => {
        onScreenChange('tracking');
      }, 1500);
    }, 1200);
  };

  const ports: PortType[] = ['Callao', 'Paita', 'Chancay', 'Pisco'];

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      
      {/* Hero context section */}
      <div className="relative rounded-xl overflow-hidden h-40 shadow-sm border border-[#c4c6d0]">
        <img 
          className="w-full h-full object-cover brightness-75 contrast-125" 
          alt="Puerto Marítimo"
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <span className="font-mono text-[10px] bg-[#41befd] text-[#002b5c] px-2 py-0.5 rounded font-bold uppercase tracking-widest block w-max mb-1">
            Registro Operativo
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl leading-none">Solicitud de Lancha</h2>
          <p className="font-sans text-xs text-[#c6e7ff] mt-1">Gestión de servicios y aprovisionamientos portuarios</p>
        </div>
      </div>

      {success && (
        <div className="bg-[#dcfce7] border border-[#166534]/20 p-4 rounded-xl text-[#166534] text-center font-semibold text-sm animate-bounce">
          ✓ ¡Solicitud enviada exitosamente! Redireccionando al seguimiento...
        </div>
      )}

      {/* Main Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Puerto de Operación Segmented Boxes */}
        <div className="bg-white p-5 rounded-xl border border-[#c4c6d0] shadow-sm space-y-3">
          <label className="font-sans font-bold text-xs text-[#43474f] flex items-center gap-1.5 uppercase tracking-wide">
            <MapPin className="text-[#00658d] w-4 h-4" />
            Puerto de Operación
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {ports.map((pt) => {
              const active = port === pt;
              return (
                <button
                  key={pt}
                  type="button"
                  onClick={() => setPort(pt)}
                  className={`py-3 px-3 border rounded-lg font-sans font-bold text-xs transition-all duration-200 cursor-pointer ${
                    active 
                      ? 'border-[#00658d] bg-[#c6e7ff]/30 text-[#00658d] shadow-sm ring-1 ring-[#00658d]' 
                      : 'border-[#c4c6d0] bg-white text-[#1a1c1e] hover:bg-[#f3f3f6]'
                  }`}
                >
                  {pt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vessel Name Input */}
        <div className="bg-white p-5 rounded-xl border border-[#c4c6d0] shadow-sm space-y-2">
          <label className="font-sans font-bold text-xs text-[#43474f] flex items-center gap-1.5 uppercase tracking-wide" htmlFor="vessel_name">
            <Ship className="text-[#00658d] w-4 h-4" />
            Nombre de la Embarcación
          </label>
          <input
            id="vessel_name"
            type="text"
            required
            className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-sm focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all text-[#1a1c1e]"
            placeholder="Ej. MV Oceanic Star"
            value={vesselName}
            onChange={(e) => setVesselName(e.target.value)}
          />
        </div>

        {/* Tipo de Servicio Option select */}
        <div className="bg-white p-5 rounded-xl border border-[#c4c6d0] shadow-sm space-y-2">
          <label className="font-sans font-bold text-xs text-[#43474f] flex items-center gap-1.5 uppercase tracking-wide">
            <ClipboardList className="text-[#00658d] w-4 h-4" />
            Tipo de Servicio Solicitado
          </label>
          <select
            className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-sm focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all text-[#1a1c1e]"
            value={serviceType}
            required
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="" disabled>Seleccione un tipo de servicio</option>
            <option value="Cambio de Tripulación (Crew Change)">Relevo / Cambio de Tripulación (Crew Change)</option>
            <option value="Entrega de Víveres (Supply Delivery)">Provisión de Víveres (Supply Delivery)</option>
            <option value="Entrega de Repuestos Directos">Entrega de Repuestos Directos de Babor/Estribor</option>
            <option value="Inspección Técnica (Technical Survey)">Inspección Técnica de Autoridad / Peritaje</option>
            <option value="Patrullaje de Seguridad (Security Patrol)">Patrullaje de Seguridad en Fondeo</option>
          </select>
        </div>

        {/* Inputs row: Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="bg-white p-5 rounded-xl border border-[#c4c6d0] shadow-sm space-y-2">
            <label className="font-sans font-bold text-xs text-[#43474f] flex items-center gap-1.5 uppercase tracking-wide">
              <Calendar className="text-[#00658d] w-4 h-4" />
              Fecha Requerida
            </label>
            <input
              type="date"
              required
              className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-sm focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all text-[#1a1c1e]"
              value={date}
              min={new Date().toISOString().split('T')[0]} // Block historical logs registration
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#c4c6d0] shadow-sm space-y-2">
            <label className="font-sans font-bold text-xs text-[#43474f] flex items-center gap-1.5 uppercase tracking-wide">
              <Clock className="text-[#00658d] w-4 h-4" />
              Hora Estimada (LT)
            </label>
            <input
              type="time"
              required
              className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-sm focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all text-[#1a1c1e]"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

        </div>

        {/* Observations input block */}
        <div className="bg-white p-5 rounded-xl border border-[#c4c6d0] shadow-sm space-y-2">
          <label className="font-sans font-bold text-xs text-[#43474f] flex items-center gap-1.5 uppercase tracking-wide" htmlFor="observations">
            <PenTool className="text-[#00658d] w-4 h-4" />
            Observaciones Adicionales
          </label>
          <textarea
            id="observations"
            rows={3}
            className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-sm focus:border-[#00658d] focus:ring-2 focus:ring-[#00658d]/20 outline-none transition-all text-[#1a1c1e] resize-none"
            placeholder="Especifique bultos, peso aproximado de repuestos o requerimientos especiales para la lancha..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting || success}
          className="w-full h-14 bg-[#001736] hover:bg-[#002b5c] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all disabled:opacity-75 cursor-pointer uppercase tracking-wider text-sm"
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Transmitiendo Solicitud...</span>
            </>
          ) : (
            <>
              <span>Enviar Solicitud</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

      </form>

      {/* Confirmation feedback alert snippet */}
      <div className="p-4 bg-[#c6e7ff]/30 border border-[#00658d]/20 rounded-xl flex gap-3.5 items-start">
        <HelpCircle className="text-[#00658d] w-6 h-6 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-sans font-bold text-xs text-[#002b5c]">Confirmación en Tiempo Real</p>
          <p className="font-sans text-xs text-[#43474f] leading-relaxed">
            Una vez recibida la solicitud, el centro de control del Callao/Chancay asignará la lancha idónea de guardia y actualizará el tiempo estimado de arribo (ETA) directamente en su pantalla de seguimiento de forma inmediata.
          </p>
        </div>
      </div>

    </div>
  );
}
