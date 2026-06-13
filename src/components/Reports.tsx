import { useState } from 'react';
import { 
  BarChart4, Calendar, FileDown, FileSpreadsheet, FileWarning, 
  HelpCircle, BarChart, PieChart, TrendingUp, TrendingDown, RefreshCw, Layers
} from 'lucide-react';

export default function Reports() {
  const [reportType, setReportType] = useState<'efficiency' | 'volume' | 'performance'>('efficiency');
  const [startDate, setStartDate] = useState('2026-10-24');
  const [endDate, setEndDate] = useState('2026-10-31');

  // Chart dataset depending on checked report type
  const chartData = {
    efficiency: [
      { day: 'Lun', val: 28.5, active: false },
      { day: 'Mar', val: 31.2, active: false },
      { day: 'Mié', val: 38.9, active: true }, // Highest Peak
      { day: 'Jue', val: 29.4, active: false },
      { day: 'Vie', val: 34.1, active: false },
      { day: 'Sáb', val: 22.0, active: false },
      { day: 'Dom', val: 19.5, active: false }
    ],
    volume: [
      { day: 'Lun', val: 110, active: false },
      { day: 'Mar', val: 135, active: false },
      { day: 'Mié', val: 160, active: false },
      { day: 'Jue', val: 172, active: true }, // Highest Peak
      { day: 'Vie', val: 145, active: false },
      { day: 'Sáb', val: 90, active: false },
      { day: 'Dom', val: 75, active: false }
    ],
    performance: [
      { day: 'Lun', val: 88, active: false },
      { day: 'Mar', val: 92, active: false },
      { day: 'Mié', val: 95, active: false },
      { day: 'Jue', val: 91, active: false },
      { day: 'Vie', val: 98, active: true }, // Highest Peak
      { day: 'Sáb', val: 85, active: false },
      { day: 'Dom', val: 82, active: false }
    ],
  };

  const getMetricHeadline = () => {
    switch(reportType) {
      case 'efficiency': return '32.4 TEUs/hr';
      case 'volume': return '128.5 Mueves';
      case 'performance': return '90.7% Cumplido';
    }
  };

  const currentDataset = chartData[reportType];

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Page Title & Subtitle */}
      <div>
        <h2 className="font-display font-bold text-2xl text-[#001736] mb-1">Operational Reports</h2>
        <p className="font-sans text-xs text-[#43474f]">Analice métricas de eficiencia, volumen y cumplimiento SLA de socios logísticos en tiempo real.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column Controls (4 cols) */}
        <section className="lg:col-span-4 space-y-4">
          
          {/* Report Type Card Option List */}
          <div className="bg-white border border-[#c4c6d0] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-xs text-[#001736] uppercase tracking-wider">Tipo de Reporte</h3>
            <div className="space-y-2">
              
              <label className={`flex items-start p-3 border rounded-lg cursor-pointer hover:bg-[#f3f3f6] transition-colors group ${
                reportType === 'efficiency' ? 'border-[#00658d] bg-[#c6e7ff]/20' : 'border-[#c4c6d0]'
              }`}>
                <input
                  type="radio"
                  name="report_type"
                  checked={reportType === 'efficiency'}
                  onChange={() => setReportType('efficiency')}
                  className="mt-1 w-4 h-4 text-[#00658d] focus:ring-[#00658d] border-[#c4c6d0]"
                />
                <div className="ml-3">
                  <span className="block font-sans font-bold text-xs text-[#1a1c1e]">Eficiencia Operacional</span>
                  <span className="block text-[10px] text-[#43474f] pt-0.5">Movimiento de contendores por hora y demoras</span>
                </div>
              </label>

              <label className={`flex items-start p-3 border rounded-lg cursor-pointer hover:bg-[#f3f3f6] transition-colors group ${
                reportType === 'volume' ? 'border-[#00658d] bg-[#c6e7ff]/20' : 'border-[#c4c6d0]'
              }`}>
                <input
                  type="radio"
                  name="report_type"
                  checked={reportType === 'volume'}
                  onChange={() => setReportType('volume')}
                  className="mt-1 w-4 h-4 text-[#00658d] focus:ring-[#00658d] border-[#c4c6d0]"
                />
                <div className="ml-3">
                  <span className="block font-sans font-bold text-xs text-[#1a1c1e]">Volumen de Lanzamientos</span>
                  <span className="block text-[10px] text-[#43474f] pt-0.5">TEUs totales y frecuencia del servicio de lanchas</span>
                </div>
              </label>

              <label className={`flex items-start p-3 border rounded-lg cursor-pointer hover:bg-[#f3f3f6] transition-colors group ${
                reportType === 'performance' ? 'border-[#00658d] bg-[#c6e7ff]/20' : 'border-[#c4c6d0]'
              }`}>
                <input
                  type="radio"
                  name="report_type"
                  checked={reportType === 'performance'}
                  onChange={() => setReportType('performance')}
                  className="mt-1 w-4 h-4 text-[#00658d] focus:ring-[#00658d] border-[#c4c6d0]"
                />
                <div className="ml-3">
                  <span className="block font-sans font-bold text-xs text-[#1a1c1e]">Desempeño de Socios (SLA)</span>
                  <span className="block text-[10px] text-[#43474f] pt-0.5">Cumplimiento de tiempos de lancha estipulados</span>
                </div>
              </label>

            </div>
          </div>

          {/* Date Range Picker */}
          <div className="bg-white border border-[#c4c6d0] rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
            <h3 className="font-sans font-bold text-xs text-[#001736] uppercase tracking-wider">Intervalo de Fechas</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-[#43474f] font-semibold mb-1 uppercase">Inicio</label>
                <input
                  type="date"
                  className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg text-xs py-2 px-2 focus:ring-[#00658d] focus:border-[#00658d] outline-none"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#43474f] font-semibold mb-1 uppercase">Fin</label>
                <input
                  type="date"
                  className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg text-xs py-2 px-2 focus:ring-[#00658d] focus:border-[#00658d] outline-none"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-1.5 pt-2">
              <button 
                onClick={() => { setStartDate('2026-10-24'); setEndDate('2026-10-31'); }}
                className="px-2.5 py-1 bg-[#eeeef0] text-[#43474f] rounded-full text-[10px] font-bold hover:bg-[#e2e2e5] transition-colors cursor-pointer"
              >
                Últimos 7 Días
              </button>
              <button 
                onClick={() => { setStartDate('2026-10-01'); setEndDate('2026-10-31'); }}
                className="px-2.5 py-1 bg-[#eeeef0] text-[#43474f] rounded-full text-[10px] font-bold hover:bg-[#e2e2e5] transition-colors cursor-pointer"
              >
                Este Mes
              </button>
              <button 
                onClick={() => { setStartDate('2026-07-01'); setEndDate('2026-09-30'); }}
                className="px-2.5 py-1 bg-[#eeeef0] text-[#43474f] rounded-full text-[10px] font-bold hover:bg-[#e2e2e5] transition-colors cursor-pointer"
              >
                Trimestre
              </button>
            </div>
          </div>

          {/* Export Actions Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => alert(`Generando archivo PDF con reporte consolidado del periodo ${startDate} al ${endDate}.`)}
              className="flex items-center justify-center gap-1.5 py-3.5 bg-[#001736] hover:bg-[#002b5c] text-white rounded-xl font-sans font-bold text-xs uppercase cursor-pointer tracking-wider active:scale-95 transition-transform"
            >
              <FileDown className="w-4 h-4" />
              <span>Exportar PDF</span>
            </button>
            <button 
              onClick={() => alert(`Generando planilla estructurada Excel (.xlsx) con datos analíticos de lanchas del periodo ${startDate} al ${endDate}.`)}
              className="flex items-center justify-center gap-1.5 py-3.5 border border-[#00658d] text-[#00658d] hover:bg-[#c6e7ff]/30 rounded-xl font-sans font-bold text-xs uppercase cursor-pointer tracking-wider active:scale-95 transition-transform"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exportar XLS</span>
            </button>
          </div>

        </section>

        {/* Right Column Charts View (8 cols) */}
        <section className="lg:col-span-8">
          <div className="bg-white border border-[#c4c6d0] rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
            
            <div className="flex justify-between items-start gap-4 mb-3 border-b border-[#eeeef0] pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-[#001736]">
                  {reportType === 'efficiency' ? 'Avances de Eficiencia en Terminal' : 
                   reportType === 'volume' ? 'Historial de Volumen de Misiones' : 
                   'Cumplimiento SLA de Lanchas'}
                </h3>
                <p className="font-sans text-xs text-[#43474f] pt-0.5">
                  {reportType === 'efficiency' ? 'Métrica: Promedio de TEUs cargados por grúa/hora (Callao)' : 
                   reportType === 'volume' ? 'Métrica: Kilajes y bultos logísticos transportados por semana' : 
                   'Métrica: Promedio de puntualidad de zarpe de lancha'}
                </p>
              </div>
              <div className="text-right">
                <span className="block font-display font-bold text-lg text-[#00658d]">{getMetricHeadline()}</span>
                <span className="inline-flex items-center gap-0.5 font-sans font-bold text-[10px] text-green-700">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +4.2% vs semana anterior
                </span>
              </div>
            </div>

            {/* Custom Interactive SVG Bar Chart block with exact responsive tooltips */}
            <div className="flex-grow flex items-end justify-between gap-2.5 pt-8 pb-3 min-h-[220px]">
              
              {currentDataset.map((item) => {
                // Generate relative height
                const barHeight = reportType === 'efficiency' ? `${(item.val / 45) * 100}%` :
                                  reportType === 'volume' ? `${(item.val / 200) * 100}%` :
                                  `${(item.val / 100) * 100}%`;

                return (
                  <div key={item.day} className="flex-grow flex flex-col items-center gap-2 group relative">
                    
                    {/* Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2f3133] text-white px-2 py-1 rounded text-[10px] font-mono shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {item.val} {reportType === 'efficiency' ? 'TEUs/hr' : reportType === 'volume' ? 'TM' : '% SLA'}
                    </div>

                    {/* Styled bar element */}
                    <div className="w-full max-w-[40px] bg-[#eeeef0] group-hover:bg-[#c6e7ff] h-48 rounded-t-lg overflow-hidden flex items-end transition-all">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          item.active ? 'bg-[#41befd] scale-105' : 'bg-[#001736]'
                        }`}
                        style={{ height: barHeight }}
                      />
                    </div>

                    <span className="font-sans font-bold text-xs text-[#747780]">{item.day}</span>
                  </div>
                );
              })}

            </div>

            {/* Additional details (Peak Hours, active units, etc.) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#eeeef0] pt-4 font-sans text-xs">
              <div className="p-3 bg-[#f3f3f6] rounded-lg">
                <span className="block text-[10px] text-[#43474f] font-bold uppercase tracking-wider mb-0.5">Horas Pico de Tráfico</span>
                <span className="font-bold text-[#1a1c1e]">14:00 - 18:00 (LT)</span>
              </div>
              <div className="p-3 bg-[#f3f3f6] rounded-lg">
                <span className="block text-[10px] text-[#43474f] font-bold uppercase tracking-wider mb-0.5">Lanchas Activas</span>
                <span className="font-bold text-[#1a1c1e]">12 Unidades Operacionales</span>
              </div>
              <div className="p-3 bg-[#f3f3f6] rounded-lg">
                <span className="block text-[10px] text-[#43474f] font-bold uppercase tracking-wider mb-0.5">Pronóstico de Oleaje</span>
                <span className="font-bold text-[#1a1c1e] text-green-700 flex items-center gap-1">
                  Estable para Zarpes
                </span>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Recent PDF/Excel download history logs */}
      <section className="space-y-3">
        <h3 className="font-sans font-bold text-xs text-[#43474f] uppercase tracking-wider">Historial de Reportes Generados</h3>
        <div className="overflow-x-auto bg-white border border-[#c4c6d0] rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#f3f3f6] border-b border-[#c4c6d0]">
              <tr>
                <th className="p-3 font-bold text-[#1a1c1e] uppercase">Nombre del Archivo</th>
                <th className="p-3 font-bold text-[#1a1c1e] uppercase">Fecha de Emisión</th>
                <th className="p-3 font-bold text-[#1a1c1e] uppercase">Métrica Clave</th>
                <th className="p-3 font-bold text-[#1a1c1e] uppercase">Estado</th>
                <th className="p-3 font-bold text-[#1a1c1e] uppercase text-right">Descargas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeef0] font-sans">
              <tr className="hover:bg-[#f3f3f6]/40 transition-colors">
                <td className="p-3 font-semibold text-[#001736]">Weekly_Throughput_Oct_V4.pdf</td>
                <td className="p-3 text-[#43474f] font-mono">2026-10-31 09:15</td>
                <td className="p-3 text-[#1a1c1e]">Daily Efficiency (Callao)</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#dcfce7] text-[#166534] uppercase">Listo</span>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => alert('Descargando reporte semanal PDF desde el hub Callao...')} className="text-[#00658d] hover:text-[#001e2d] hover:underline font-bold cursor-pointer">Descargar</button>
                </td>
              </tr>
              <tr className="hover:bg-[#f3f3f6]/40 transition-colors">
                <td className="p-3 font-semibold text-[#001736]">Service_Volume_Q3_Final.xlsx</td>
                <td className="p-3 text-[#43474f] font-mono">2026-10-28 16:42</td>
                <td className="p-3 text-[#1a1c1e]">Service Volume (Chancay)</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#dcfce7] text-[#166534] uppercase">Listo</span>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => alert('Descargando planilla Excel del volumen operativo...')} className="text-[#00658d] hover:text-[#001e2d] hover:underline font-bold cursor-pointer">Descargar</button>
                </td>
              </tr>
              <tr className="hover:bg-[#f3f3f6]/40 transition-colors">
                <td className="p-3 font-semibold text-[#001736]">Provider_SLA_LogiTrans_Oct.pdf</td>
                <td className="p-3 text-[#43474f] font-mono">2026-10-25 11:30</td>
                <td className="p-3 text-[#1a1c1e]">Provider Performance (Pisco)</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">Archivado</span>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => alert('Descargando reporte de SLA archivado desde el hub de Pisco...')} className="text-[#00658d] hover:text-[#001e2d] hover:underline font-bold cursor-pointer">Descargar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
