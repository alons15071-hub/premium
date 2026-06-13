export type PortType = 'Callao' | 'Chancay' | 'Paita' | 'Pisco';

export type ServiceStatus = 'Completed' | 'In Progress' | 'Cancelled' | 'Pending';

export interface ServiceRequest {
  id: string;
  port: PortType;
  vesselName: string;
  serviceType: string;
  date: string;
  time: string;
  observations: string;
  status: ServiceStatus;
  timestamp: number;
}

export type NotificationType = 'URGENT ACTION' | 'BOAT ARRIVAL' | 'STATUS UPDATE' | 'WEATHER ALERT';

export interface NotificationItem {
  id: string;
  title: string;
  type: NotificationType;
  content: string;
  timestamp: string;
  status: 'read' | 'unread';
}

export type DocumentCategory = 'Operational' | 'Legal' | 'Financial';
export type DocumentStatus = 'Active' | 'Pending' | 'Verified' | 'Expiring' | 'Paid' | 'In Review';

export interface DocumentItem {
  id: string;
  name: string;
  code: string;
  category: DocumentCategory;
  status: DocumentStatus;
  date: string;
}

export interface UserItem {
  initials: string;
  name: string;
  role: string;
}

export interface Vessel {
  name: string;
  status: 'Docked' | 'Transit' | 'Anchored';
  speed: string;
  eta: string;
  cargoPercentage: number;
  terminal: string;
  berth: string;
  lat: number;
  lng: number;
  image: string;
}

export type ActiveScreen = 
  | 'login' 
  | 'dashboard' 
  | 'request' 
  | 'tracking' 
  | 'history' 
  | 'documents' 
  | 'reports' 
  | 'profile'
  | 'about';
