import { useState, useEffect } from 'react';
import { Vessel, ServiceRequest } from '../types';
import { INITIAL_VESSELS } from '../data';
import { 
  ZoomIn, ZoomOut, Compass, Map, MessageSquare, Play, 
  Tv, Compass as Radar, Eye, Clock, Anchor, Activity, ChevronRight, X
} from 'lucide-react';

interface ServiceTrackingProps {
  customVesselList?: ServiceRequest[];
}

export default function ServiceTracking({ customVesselList }: ServiceTrackingProps) {
  const vessels = customVesselList && customVesselList.length > 0 
    ? [...INITIAL_VESSELS, ...customVesselList.map(v => ({
        name: v.vesselName,
        status: 'Transit' as const,
        speed: '12.0 kn',
        eta: v.time || '16:00',
        cargoPercentage: 45,
        terminal: `${v.port} Terminal`,
        berth: 'Berth Guard',
        lat: -12.05,
        lng: -77.13,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300'
      }))]
    : INITIAL_VESSELS;

  const [selectedVessel, setSelectedVessel] = useState<Vessel>(vessels[0]);
  const [tickerTime, setTickerTime] = useState('11:04:22 AM');
  const [zoomLevel, setZoomLevel] = useState(14);
  const [chatActive, setChatActive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Live ticking clock for operational surveillance feeling
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTickerTime(now.toLocaleTimeString('es-PE', { hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-140px)] w-full rounded-xl overflow-hidden border border-[#c4c6d0] shadow-inner bg-slate-900 flex flex-col sm:flex-row group animate-fadeIn">
      
      {/* Dynamic Map Area */}
      <div className="relative flex-grow h-full bg-[#001736] overflow-hidden">
        
        {/* Mock background pattern representing port topography */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#41befd 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        {/* Real sat backdrop with styling overlay as shown in images */}
        <img 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-500" 
          style={{ transform: `scale(${zoomLevel / 14})` }}
          alt="Mapa de Fondeo" 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
        />

        {/* Live operational ticker */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#1a1c1e]/90 text-white backdrop-blur-md px-3.5 py-2 rounded-full border border-[#c4c6d0]/20 shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="font-display font-bold text-xs uppercase tracking-wider">Misión en Vivo</span>
          <div className="h-3 w-px bg-white/20 mx-1"></div>
          <span className="font-mono text-xs text-[#ebd78c]">{tickerTime}</span>
        </div>

        {/* Zoom controls floating on map */}
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
          <button 
            onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}
            className="w-10 h-10 bg-white border border-[#c4c6d0] rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform text-[#1a1c1e] hover:bg-[#f3f3f6] cursor-pointer"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 10))}
            className="w-10 h-10 bg-white border border-[#c4c6d0] rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform text-[#1a1c1e] hover:bg-[#f3f3f6] cursor-pointer"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setZoomLevel(14);
              alert('Re-centrando mapa en Bahía de Fondeo del Callao Hub.');
            }}
            className="w-10 h-10 bg-[#001736] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <Compass className="w-5 h-5 animate-spin duration-1000" />
          </button>
        </div>

        {/* Vessel Interactive Markers on coordinate locations */}
        {vessels.map((v) => {
          const isSelected = selectedVessel.name === v.name;
          // Determine mock offset values depending on coordinate representation
          const offsetTop = v.name === 'MS MARINER' ? '45%' : v.name === 'PACIFIC-7' ? '30%' : v.name === 'MV PACIFIC STAR' ? '60%' : '55%';
          const offsetLeft = v.name === 'MS MARINER' ? '40%' : v.name === 'PACIFIC-7' ? '60%' : v.name === 'MV PACIFIC STAR' ? '30%' : '50%';

          return (
            <button
              key={v.name}
              onClick={() => {
                setSelectedVessel(v);
                setChatActive(false);
              }}
              style={{ top: offsetTop, left: offsetLeft }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none group cursor-pointer"
            >
              <div className="relative">
                {/* Active radar pulsed range ring */}
                <div className={`absolute -inset-4 rounded-full transition-all duration-1000 opacity-60 ${
                  isSelected ? 'bg-[#41befd] animate-ping-slow' : 'bg-[#747780]/30'
                }`} />
                <div className={`w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-300 ${
                  isSelected ? 'bg-[#41befd] scale-125' : 'bg-[#002b5c]'
                }`} />
                <div className={`absolute top-6 left-1/2 -translate-x-1/2 bg-[#001736] text-white px-2 py-0.5 rounded border border-white/10 whitespace-nowrap shadow-sm text-[10px] font-mono transition-opacity duration-300 ${
                  isSelected ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-100'
                }`}>
                  {v.name}
                </div>
              </div>
            </button>
          );
        })}

        {/* Watermark coordinates bottom-right */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#c4c6d0]/60 text-right select-none pointer-events-none hidden sm:block">
          <div>LAT: 12.0494° S | LNG: 77.1264° W</div>
          <div>CALLAO HARBOR LOGISTICS GROUP</div>
        </div>

      </div>

      {/* Selected Vessel Drawer / Config bento card */}
      {selectedVessel && (
        <div className="w-full sm:w-80 bg-white border-t sm:border-t-0 sm:border-l border-[#c4c6d0] p-4 flex flex-col justify-between z-20 shrink-0 font-sans shadow-lg">
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[9px] bg-[#eeeef0] text-[#43474f] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block w-max">
                  {selectedVessel.terminal}
                </span>
                <h3 className="font-display font-bold text-lg text-[#001736] mt-1">{selectedVessel.name}</h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1.5 ${
                  selectedVessel.status === 'Docked' ? 'bg-[#dcfce7] text-[#166534]' :
                  selectedVessel.status === 'Transit' ? 'bg-[#c6e7ff] text-[#004b69]' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    selectedVessel.status === 'Docked' ? 'bg-[#166534]' :
                    selectedVessel.status === 'Transit' ? 'bg-[#004b69]' :
                    'bg-yellow-500'
                  }`}></span>
                  {selectedVessel.status === 'Docked' ? 'Atracado' : selectedVessel.status === 'Transit' ? 'En Tránsito' : 'Fondeado'}
                </span>
              </div>
              <div className="h-12 w-12 rounded-lg overflow-hidden border border-[#c4c6d0] bg-[#eeeef0] shrink-0">
                <img src={selectedVessel.image} alt={selectedVessel.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Vessel ETA / Speed details */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#f3f3f6] p-2.5 rounded-lg border border-[#c4c6d0]/40">
                <span className="text-[10px] text-[#43474f] uppercase tracking-wider font-bold">ETA</span>
                <p className="font-display font-bold text-base text-[#001736]">{selectedVessel.eta}</p>
              </div>
              <div className="bg-[#f3f3f6] p-2.5 rounded-lg border border-[#c4c6d0]/40">
                <span className="text-[10px] text-[#43474f] uppercase tracking-wider font-bold">VELOCIDAD</span>
                <p className="font-display font-bold text-base text-[#001736]">{selectedVessel.speed}</p>
              </div>
            </div>

            {/* Vessel Cargo Completion layout */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#43474f] font-medium">
                <span>Operaciones de Descarga</span>
                <span>{selectedVessel.cargoPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-[#eeeef0] rounded-full overflow-hidden">
                <div className="bg-[#00658d] h-full rounded-full transition-all duration-1000" style={{ width: `${selectedVessel.cargoPercentage}%` }}></div>
              </div>
              <p className="text-[10px] text-[#43474f] text-right font-medium">Atendiendo muelle {selectedVessel.berth}</p>
            </div>

            {/* Quick Live communication helper */}
            {chatActive ? (
              <div className="bg-[#c6e7ff]/30 p-3 rounded-lg border border-[#00658d]/20 space-y-2 animate-fadeIn">
                <div className="flex justify-between items-center pb-1.5 border-b border-[#00658d]/10">
                  <span className="text-xs font-bold text-[#002b5c] uppercase">Canal de VHF-16 Digital</span>
                  <button onClick={() => setChatActive(false)} className="text-[#43474f] hover:text-black">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="max-h-24 overflow-y-auto text-xs space-y-1.5 bg-white p-2 border border-[#c4c6d0] rounded-md font-mono">
                  <p className="text-[#00658d]"><span className="font-bold">Base:</span> Lancha Smart-03 lista en fondeo.</p>
                  <p className="text-[#002b5c]"><span className="font-bold">Capitán:</span> Enterado. Iniciamos relevo de prácticos en 5 min.</p>
                  {chatMessage && <p className="text-green-800"><span className="font-bold">Usted:</span> {chatMessage}</p>}
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const input = form.elements.namedItem('msg') as HTMLInputElement;
                  if (input.value) {
                    setChatMessage(input.value);
                    input.value = '';
                  }
                }} className="flex gap-1.5">
                  <input name="msg" type="text" placeholder="Escribir mensaje..." className="flex-grow text-xs p-1.5 border border-[#c4c6d0] rounded" />
                  <button type="submit" className="bg-[#001736] text-white text-xs px-2.5 py-1.5 rounded font-bold cursor-pointer">OK</button>
                </form>
              </div>
            ) : (
              <div className="bg-[#f3f3f6] p-3 rounded-lg text-xs space-y-1 text-[#43474f]">
                <p className="font-semibold text-[#1a1c1e] flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#00658d]" /> 
                  Bitácora de Enlace:
                </p>
                <p>Último reporte VHF recibido hace 4 minutos. Tránsito regular sin novedades críticas climatológicas vigentes.</p>
              </div>
            )}

          </div>

          <div className="flex gap-2 pt-4">
            <button 
              onClick={() => setChatActive(true)}
              className="flex-grow h-11 bg-[#001736] hover:bg-[#002b5c] text-white font-bold rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Establecer Canal
            </button>
            <button 
              onClick={() => alert(`Iniciando visualización en directo de cámaras perimetrales del muelle ${selectedVessel.berth}`)}
              className="w-11 h-11 border border-[#00658d] text-[#00658d] hover:bg-[#c6e7ff]/20 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Ver Cámara Muelle"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
