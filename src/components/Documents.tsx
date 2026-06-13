import React, { useState, useRef } from 'react';
import { DocumentItem, DocumentCategory, DocumentStatus } from '../types';
import { 
  FileDown, FileUp, Folder, Search, ShieldCheck, Clock, Plus, 
  Trash2, HelpCircle, X, Download, FileText, CheckCircle2, ChevronRight
} from 'lucide-react';

interface DocumentsProps {
  initialDocuments: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
}

export default function Documents({ initialDocuments, onAddDocument, onDeleteDocument }: DocumentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | DocumentCategory>('All');
  const [uploadModal, setUploadModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<DocumentCategory>('Operational');
  const [newDocCode, setNewDocCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter documents
  const filteredDocs = initialDocuments.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryFilter === 'All') return matchesSearch;
    return matchesSearch && doc.category === categoryFilter;
  });

  const getStatusStyle = (status: DocumentStatus) => {
    switch (status) {
      case 'Active':
      case 'Verified':
      case 'Paid':
        return 'bg-[#dcfce7] text-[#166534]';
      case 'Pending':
      case 'In Review':
        return 'bg-amber-100 text-amber-800';
      case 'Expiring':
        return 'bg-[#ffdad6] text-[#93000a] animate-pulse';
      default:
        return 'bg-[#eeeef0] text-[#43474f]';
    }
  };

  const getStatusLabelEsp = (status: DocumentStatus) => {
    switch (status) {
      case 'Active': return 'Activo';
      case 'Verified': return 'Verificado';
      case 'Paid': return 'Pagado';
      case 'Pending': return 'Pendiente';
      case 'In Review': return 'En Revisión';
      case 'Expiring': return 'Por Expirar';
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName || !newDocCode) {
      alert('Por favor complete el nombre y código del documento.');
      return;
    }

    const uploadedDoc: DocumentItem = {
      id: `DOC-${Math.floor(10 + Math.random() * 90)}`,
      name: newDocName,
      code: newDocCode,
      category: newDocCategory,
      status: 'Pending',
      date: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    onAddDocument(uploadedDoc);
    setNewDocName('');
    setNewDocCode('');
    setUploadModal(false);
    alert('Documento corporativo archivado exitosamente para validación de la Capitanía.');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3">
        <div>
          <h2 className="font-display font-bold text-2xl text-[#001736] mb-1">Document Management</h2>
          <p className="font-sans text-xs text-[#43474f]">Centralized repository for certificates, permits, and financial records.</p>
        </div>
        
        {/* Search Bar aligned right */}
        <div className="relative group w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#747780]" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c4c6d0] rounded-xl font-sans text-xs focus:ring-2 focus:ring-[#00658d]/20 focus:border-[#00658d] outline-none transition-all text-[#1a1c1e]"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Segmented Category Filter Carousel */}
      <div className="flex gap-2 border-b border-[#c4c6d0] pb-2 overflow-x-auto no-scrollbar">
        {(['All', 'Operational', 'Legal', 'Financial'] as const).map((cat) => {
          const active = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`py-2 px-4 font-sans font-bold text-xs border-b-2 justify-center transition-all cursor-pointer ${
                active 
                  ? 'border-[#001736] text-[#001736] font-extrabold' 
                  : 'border-transparent text-[#43474f] hover:text-[#1a1c1e]'
              }`}
            >
              {cat === 'All' ? 'Todos' : cat === 'Operational' ? 'Operacionales' : cat === 'Legal' ? 'Legal' : 'Finanzas'}
            </button>
          );
        })}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Category mapping lists */}
        {(['Operational', 'Legal', 'Financial'] as DocumentCategory[]).map((currentCategory) => {
          
          // Skip mapping is another category is currently filtered
          if (categoryFilter !== 'All' && categoryFilter !== currentCategory) return null;

          const categoryDocs = filteredDocs.filter(d => docCategoryMatch(d.category, currentCategory));

          return (
            <section key={currentCategory} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#c4c6d0]">
                <Folder className="text-[#00658d] w-4.5 h-4.5" />
                <h3 className="font-display font-medium text-sm sm:text-base text-[#001736]">
                  {currentCategory === 'Operational' ? 'Operacionales' : currentCategory === 'Legal' ? 'Legal' : 'Finanzas y Cobros'}
                </h3>
              </div>

              {categoryDocs.length > 0 ? (
                categoryDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white border border-[#c4c6d0] rounded-xl p-4 flex flex-col gap-3.5 hover:border-[#00658d] hover:shadow-md transition-all duration-300 relative group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="font-sans font-semibold text-sm text-[#001736] truncate">{doc.name}</p>
                        <p className="font-mono text-[10px] text-[#43474f] font-medium pt-0.5">{doc.code}</p>
                      </div>
                      <span className={`status-pill block py-0.5 px-2 text-[9px] font-bold rounded-full ${getStatusStyle(doc.status)}`}>
                        {getStatusLabelEsp(doc.status)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#f3f3f6]">
                      <span className="font-sans text-[10px] text-[#747780] font-medium">{doc.date}</span>
                      <div className="flex gap-1.5 opacity-90 group-hover:opacity-100">
                        <button
                          onClick={() => alert(`Iniciando descarga segura de ${doc.name} (${doc.code})`)}
                          className="p-1.5 text-[#00658d] hover:bg-[#c6e7ff]/30 rounded-lg transition-colors cursor-pointer"
                          title="Descargar PDF"
                        >
                          <FileDown className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => {
                            setNewDocName(doc.name);
                            setNewDocCode(doc.code);
                            setNewDocCategory(doc.category);
                            setUploadModal(true);
                          }}
                          className="p-1.5 text-[#00658d] hover:bg-[#c6e7ff]/30 rounded-lg transition-colors cursor-pointer"
                          title="Subir Nueva Versión"
                        >
                          <FileUp className="w-4.5 h-4.5" />
                        </button>
                        <div className="w-px h-6 bg-[#eeeef0] mx-1"></div>
                        <button
                          onClick={() => {
                            if(confirm(`¿Está seguro de eliminar ${doc.name} de los archivos?`)) {
                              onDeleteDocument(doc.id);
                            }
                          }}
                          className="p-1.5 text-[#93000a] hover:bg-[#ffdad6] rounded-lg transition-colors cursor-pointer"
                          title="Eliminar de Archivo"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#f3f3f6] rounded-xl p-6 text-center border-dashed border-2 border-[#c4c6d0] text-xs text-[#43474f]">
                  No hay documentos archivados en esta categoría.
                </div>
              )}
            </section>
          );
        })}

      </div>

      {/* Empty State Banner (Operational Transparency card layout as requested) */}
      <div className="relative rounded-xl overflow-hidden h-44 shadow-lg group">
        <img 
          alt="Puerto y Grúas Portuarias" 
          className="w-full h-full object-cover brightness-50 contrast-125 transition-transform duration-700 group-hover:scale-105" 
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001736] via-transparent to-transparent flex items-end p-5">
          <div className="text-white space-y-1">
            <h4 className="font-display font-bold text-sm sm:text-base">Transparencia Operativa &amp; Auditoría</h4>
            <p className="font-sans text-xs text-[#ebd78c] font-medium">12 nuevos certificados y permisos de lanchas archivados hoy de forma segura.</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) for doc upload */}
      <button
        onClick={() => {
          setNewDocName('');
          setNewDocCode('');
          setUploadModal(true);
        }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#001736] hover:bg-[#002b5c] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
        title="Subir archivo"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Upload Document Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-[#001736]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl border border-[#c4c6d0] max-w-md w-full overflow-hidden shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-[#001736] text-white p-4 flex justify-between items-center">
              <h3 className="font-display font-bold text-base">Archivar Documento Corporativo</h3>
              <button 
                onClick={() => setUploadModal(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Upload Form */}
            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4">
              
              <div className="space-y-1.5">
                <label className="font-sans font-bold text-xs text-[#1a1c1e] uppercase tracking-wider block">Nombre del Documento</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-xs focus:ring-2 focus:ring-[#00658d]/20 focus:border-[#00658d] outline-none transition-all text-[#1a1c1e]"
                  placeholder="Ej. Permiso de Atraque de Lancha"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans font-bold text-xs text-[#1a1c1e] uppercase tracking-wider block">Código / Referencia Única</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-xs focus:ring-2 focus:ring-[#00658d]/20 focus:border-[#00658d] outline-none transition-all text-[#1a1c1e]"
                  placeholder="Ej. OP-4491-2026"
                  value={newDocCode}
                  onChange={(e) => setNewDocCode(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans font-bold text-xs text-[#1a1c1e] uppercase tracking-wider block">Categoría del Archivo</label>
                <select
                  className="w-full bg-[#f3f3f6] border border-[#c4c6d0] rounded-lg p-3 font-sans text-xs focus:ring-2 focus:ring-[#00658d]/20 focus:border-[#00658d] outline-none transition-all text-[#1a1c1e]"
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value as DocumentCategory)}
                >
                  <option value="Operational">Operacionales</option>
                  <option value="Legal">Legal / Licencias / Concesiones</option>
                  <option value="Financial">Finanzas / Facturas / Tasar Portuaria</option>
                </select>
              </div>

              <div className="space-y-3.5 pt-2">
                <label className="font-sans font-bold text-xs text-[#1a1c1e] uppercase tracking-wider block">Seleccionar Archivo (PDF, IMG, XLS)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#c4c6d0] rounded-lg p-6 text-center hover:bg-[#f3f3f6] cursor-pointer transition-colors space-y-2 group"
                >
                  <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setNewDocName(e.target.files[0].name.split('.')[0]);
                    }
                  }} />
                  <FileUp className="w-8 h-8 text-[#747780] group-hover:text-[#00658d] mx-auto transition-colors" />
                  <p className="font-sans font-semibold text-xs text-[#001736]">Haga clic para examinar archivos locales</p>
                  <p className="text-[10px] text-[#747780]">Tamaño máximo permitido: 15MB</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#001736] hover:bg-[#002b5c] text-white font-bold py-3.5 rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer text-xs uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Subir y Guardar en Archivo</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

// Inline helper functions for TS safety
function docCategoryMatch(docCategory: string, expected: DocumentCategory): boolean {
  return docCategory === expected;
}
