import { useState } from 'react';
import { ServiceRequest, ServiceStatus } from '../types';
import { 
  Search, Filter, Calendar, Clock, Bookmark, ChevronRight, 
  MapPin, CheckCircle2, User, RefreshCw, X, HelpCircle, Eye, Info
} from 'lucide-react';

interface ServiceHistoryProps {
  requests: ServiceRequest[];
}

export default function ServiceHistory({ requests }: ServiceHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ServiceStatus>('All');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  // Filter requests based on search term and status pill selection
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && req.status === statusFilter;
  });

  const getStatusBadgeStyle = (status: ServiceStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#dcfce7] text-[#166534]';
      case 'In Progress':
        return 'bg-[#c6e7ff] text-[#004b69] border border-[#00658d]/20';
      case 'Cancelled':
        return 'bg-[#ffdad6] text-[#93000a]';
      case 'Pending':
        return 'bg-[#eeeef0] text-[#434749] border border-[#c4c6d0]';
      default:
        return 'bg-[#eeeef0] text-[#43474f]';
    }
  };

  const getStatusLabelEsp = (status: ServiceStatus) => {
    switch (status) {
      case 'Completed': return 'Completado';
      case 'In Progress': return 'En Curso';
      case 'Cancelled': return 'Cancelado';
      case 'Pending': return 'Pendiente';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Page Title & Subtitle */}
      <div>
        <h2 className="font-display font-bold text-2xl text-[#001736] mb-1">Service History</h2>
        <p className="font-sans text-xs text-[#43474f]">Administre, filtre y audite el historial completo de operaciones de lanchas ejecutadas.</p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border border-[#c4c6d0] rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm">
        
        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#747780] group-focus-within:text-[#00658d] transition-colors" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg font-sans text-xs focus:ring-2 focus:ring-[#00658d]/20 focus:border-[#00658d] outline-none transition-all text-[#1a1c1e]"
            placeholder="Buscar por barco, tipo de servicio o código (Ej. Baltic Carrier)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Carousel Tabs selection */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {(['All', 'Completed', 'In Progress', 'Cancelled', 'Pending'] as const).map((filter) => {
            const active = statusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`py-2 px-4 rounded-full font-sans font-bold text-xs transition-all active:scale-95 whitespace-nowrap cursor-pointer ${
                  active 
                    ? 'bg-[#001736] text-white shadow-sm' 
                    : 'bg-[#eeeef0] text-[#43474f] hover:bg-[#e2e2e5]'
                }`}
              >
                {filter === 'All' ? 'Todos los Servicios' : getStatusLabelEsp(filter)}
              </button>
            );
          })}
        </div>

      </div>

      {/* History List Section */}
      <div className="space-y-3">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequest(req)}
              className="bg-white border border-[#c4c6d0] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              {/* Boat Icon inside card */}
              <div className="w-12 h-12 bg-[#eeeef0] group-hover:bg-[#c6e7ff]/30 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                <span className="text-[#00658d] font-bold text-lg select-none">
                  {req.vesselName.substring(0, 2).toUpperCase()}
                </span>
              </div>

              {/* Central Information */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h3 className="font-display font-semibold text-sm sm:text-base text-[#001736] truncate">
                    {req.vesselName}
                  </h3>
                  <span className={`status-pill shrink-0 ${getStatusBadgeStyle(req.status)} text-[10px] font-bold px-2.5 py-0.5 rounded`}>
                    {getStatusLabelEsp(req.status)}
                  </span>
                </div>
                
                <p className="text-xs text-[#1a1c1e] font-sans truncate mb-2 font-medium">
                  {req.serviceType}
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#43474f] text-[10px]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#747780]" />
                    <span>{req.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#747780]" />
                    <span>{req.time} - {req.port}</span>
                  </div>
                </div>
              </div>

              {/* View detail trigger */}
              <div className="shrink-0 text-[#00658d] hover:text-[#001e2d] transition-colors p-1 rounded-full hover:bg-[#f3f3f6]">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white border border-[#c4c6d0] p-8 rounded-xl text-center text-[#43474f]">
            <Info className="w-8 h-8 text-[#747780] mx-auto mb-2" />
            <p className="font-semibold text-[#1a1c1e] text-sm">No se encontraron servicios registrados.</p>
            <p className="text-xs text-[#444] mt-1">Pruebe variando los términos de búsqueda o filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="pt-4 flex justify-center">
        <button 
          onClick={() => alert('Todas las operaciones del último período fiscal cargadas exitosamente.')}
          className="bg-[#eeeef0] text-[#001736] hover:bg-[#e2e2e5] px-6 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer active:scale-95"
        >
          Cargar Servicios Anteriores
        </button>
      </div>

      {/* Selected Log Details Modal Overlay */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-[#001736]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl border border-[#c4c6d0] max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-[#001736] text-white p-4 flex justify-between items-center">
              <div>
                <span className="font-mono text-[9px] bg-[#41befd] text-[#002b5c] px-2 py-0.5 rounded font-bold uppercase">
                  {selectedRequest.id}
                </span>
                <h3 className="font-display font-bold text-base mt-0.5">Bitácora de Solicitud</h3>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 font-sans text-xs">
              
              <div className="flex gap-3 pb-3 border-b border-[#eeeef0]">
                <div className="w-10 h-10 bg-[#002b5c]/10 rounded-lg flex items-center justify-center text-[#002b5c] font-bold text-sm">
                  {selectedRequest.port.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-[#001736] text-sm">{selectedRequest.vesselName}</h4>
                  <p className="text-xs text-[#00658d] font-semibold">{selectedRequest.serviceType}</p>
                </div>
              </div>

              {/* Data specifications */}
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#eeeef0]">
                <div>
                  <span className="text-[10px] text-[#43474f] font-bold uppercase tracking-wider block mb-0.5">Fecha y Hora</span>
                  <p className="font-medium text-[#1a1c1e]">{selectedRequest.date} A LAS {selectedRequest.time} (LT)</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#43474f] font-bold uppercase tracking-wider block mb-0.5">Puerto</span>
                  <p className="font-medium text-[#1a1c1e]">Terminal Portuario de {selectedRequest.port}</p>
                </div>
              </div>

              {/* Observations */}
              <div>
                <span className="text-[10px] text-[#43474f] font-bold uppercase tracking-wider block mb-1">Detalles / Instrucciones del Práctico</span>
                <p className="p-3 bg-[#f3f3f6] text-[#1a1c1e] rounded-lg leading-relaxed border border-[#c4c6d0]/40">
                  {selectedRequest.observations}
                </p>
              </div>

              {/* Interactive Roadmap Tracker */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-[#43474f] font-bold uppercase tracking-wider block">Estado del Despacho</span>
                <div className="relative pl-6 space-y-4">
                  {/* Vertical bar line */}
                  <div className="absolute left-[9px] top-1.5 bottom-1.5 w-0.5 bg-[#ebd78c] group"></div>

                  <div className="relative">
                    <span className="absolute -left-[21px] top-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"></span>
                    <p className="font-bold text-[#1a1c1e]">1. Solicitud Recibida &amp; Validada</p>
                    <p className="text-[10px] text-[#43474f]">Verificado contra plan de atraque.</p>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                      selectedRequest.status === 'Cancelled' ? 'bg-[#93000a]' : 'bg-green-500'
                    }`}></span>
                    <p className="font-bold text-[#1a1c1e]">
                      {selectedRequest.status === 'Cancelled' ? '2. Solicitud Cancelada' : '2. Lancha de Guardia Asignada'}
                    </p>
                    <p className="text-[10px] text-[#43474f]">
                      {selectedRequest.status === 'Cancelled' ? 'Cancelado preventivamente.' : 'Despachado con patrón de guardia.'}
                    </p>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                      selectedRequest.status === 'Completed' ? 'bg-green-500' :
                      selectedRequest.status === 'In Progress' ? 'bg-[#41befd] animate-pulse' :
                      'bg-[#c4c6d0]'
                    }`}></span>
                    <p className="font-bold text-[#1a1c1e]">3. Servicio en Ejecución</p>
                    <p className="text-[10px] text-[#43474f]">Embarque de tripulantes de relevo.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#f3f3f6] p-4 flex gap-2 justify-end border-t border-[#c4c6d0]/50">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="bg-[#001736] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Cerrar Bitácora
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
