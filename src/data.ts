import { ServiceRequest, NotificationItem, DocumentItem, UserItem, Vessel } from './types';

export const INITIAL_VESSELS: Vessel[] = [
  {
    name: 'MS MARINER',
    status: 'Docked',
    speed: '0.2 kn',
    eta: '14:45',
    cargoPercentage: 80,
    terminal: 'Terminal North',
    berth: 'Berth 4C',
    lat: -12.049,
    lng: -77.135,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'PACIFIC-7',
    status: 'Anchored',
    speed: '0.0 kn',
    eta: '18:15',
    cargoPercentage: 35,
    terminal: 'Callao Anchor Point Alpha',
    berth: 'N/A',
    lat: -12.045,
    lng: -77.120,
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'MV PACIFIC STAR',
    status: 'Docked',
    speed: '0.0 kn',
    eta: 'Completado',
    cargoPercentage: 100,
    terminal: 'Callao Hub',
    berth: 'Berth 1A',
    lat: -12.052,
    lng: -77.142,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'ANDES FREIGHTER',
    status: 'Transit',
    speed: '14.5 kn',
    eta: '04:30',
    cargoPercentage: 65,
    terminal: 'Chancay Port',
    berth: 'Berth Terminal 2',
    lat: -11.587,
    lng: -77.272,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300'
  }
];

export const INITIAL_SERVICES: ServiceRequest[] = [
  {
    id: 'SR-101',
    port: 'Callao',
    vesselName: 'MS Baltic Carrier',
    serviceType: 'Cambio de Tripulación (Crew Change)',
    date: '2026-10-24',
    time: '08:00',
    observations: 'Relevo de 4 tripulantes de cubierta. Todo aprobado por capitanía.',
    status: 'Completed',
    timestamp: Date.now() - 3600000 * 24 * 5
  },
  {
    id: 'SR-102',
    port: 'Chancay',
    vesselName: 'Oceanic Explorer',
    serviceType: 'Entrega de Víveres (Supply Delivery)',
    date: '2026-11-25',
    time: '11:30',
    observations: 'Entrega de raciones secas y agua potable para 15 días.',
    status: 'In Progress',
    timestamp: Date.now() - 3600000 * 4
  },
  {
    id: 'SR-103',
    port: 'Pisco',
    vesselName: 'Evergreen Star',
    serviceType: 'Inspección Técnica (Technical Survey)',
    date: '2026-10-22',
    time: '15:00',
    observations: 'Inspección de grúas de babor cancelada preventivamente por mal tiempo.',
    status: 'Cancelled',
    timestamp: Date.now() - 3600000 * 24 * 7
  },
  {
    id: 'SR-104',
    port: 'Callao',
    vesselName: 'Pacific Mariner',
    serviceType: 'Entrega de Repuestos Directos',
    date: '2026-10-20',
    time: '09:00',
    observations: 'Entrega de repuestos críticos para el sistema hidráulico de babor.',
    status: 'Completed',
    timestamp: Date.now() - 3600000 * 24 * 9
  },
  {
    id: 'SR-105',
    port: 'Paita',
    vesselName: 'Harbor Guard 04',
    serviceType: 'Patrullaje de Seguridad (Security Patrol)',
    date: '2026-10-19',
    time: '18:00',
    observations: 'Patrullaje rutinario del sector de fondeo norte.',
    status: 'Completed',
    timestamp: Date.now() - 3600000 * 24 * 10
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOT-001',
    title: 'Expiración de Documento',
    type: 'URGENT ACTION',
    content: 'La certificación de seguridad de la embarcación \"Northern Star\" expira en 48 horas. Se requiere renovación para ingresar al puerto del Callao.',
    timestamp: '12:45 PM',
    status: 'unread'
  },
  {
    id: 'NOT-002',
    title: 'Aproximación de Ever Given II',
    type: 'BOAT ARRIVAL',
    content: 'Arribo programado en el Puerto de Chancay - Terminal 03 en 2 horas. Tiempo estimado de amarre: 13:45.',
    timestamp: '11:30 AM',
    status: 'unread'
  },
  {
    id: 'NOT-003',
    title: 'Desaduanaje de Carga Completo',
    type: 'STATUS UPDATE',
    content: 'El Manifiesto ID #99218-CH ha sido verificado por las autoridades portuarias. Listo para descarga.',
    timestamp: '09:15 AM',
    status: 'read'
  },
  {
    id: 'NOT-004',
    title: 'Alerta de Fuerte Oleaje',
    type: 'WEATHER ALERT',
    content: 'Incremento de oleaje de fondo detectado en la bahía exterior del Callao. Las operaciones de amarre podrían sufrir demoramientos por seguridad.',
    timestamp: 'Ayer',
    status: 'unread'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'DOC-01',
    name: 'Vessel Arrival Permit',
    code: 'OP-7729-2024',
    category: 'Operational',
    status: 'Active',
    date: '12 Oct, 2024'
  },
  {
    id: 'DOC-02',
    name: 'Safety Manifest',
    code: 'OP-9910-2024',
    category: 'Operational',
    status: 'Pending',
    date: '14 Oct, 2024'
  },
  {
    id: 'DOC-03',
    name: 'Port Concession Lease',
    code: 'LEG-001-CH',
    category: 'Legal',
    status: 'Verified',
    date: '01 Ene, 2024'
  },
  {
    id: 'DOC-04',
    name: 'Environment Clearance',
    code: 'ENV-882-2024',
    category: 'Legal',
    status: 'Expiring',
    date: '28 Oct, 2024'
  },
  {
    id: 'DOC-05',
    name: 'Berthing Fee Invoice',
    code: 'INV-4456102',
    category: 'Financial',
    status: 'Paid',
    date: '10 Oct, 2024'
  },
  {
    id: 'DOC-06',
    name: 'Fuel Surcharge Rec.',
    code: 'INV-4456105',
    category: 'Financial',
    status: 'In Review',
    date: '11 Oct, 2024'
  }
];

export const AUTHORIZED_USERS: UserItem[] = [
  {
    initials: 'RC',
    name: 'Ricardo Castillo',
    role: 'Fleet Manager • Admin'
  },
  {
    initials: 'AM',
    name: 'Ana Martínez',
    role: 'Coordinadora de Logística'
  },
  {
    initials: 'JP',
    name: 'Jorge Pizarro',
    role: 'Despachador de Nave'
  }
];
