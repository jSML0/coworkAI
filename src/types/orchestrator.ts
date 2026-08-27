export type EmployeeRole = 
  | 'VP Engineering'
  | 'Senior Product Manager'
  | 'Staff Product Designer'
  | 'Lead Cloud Architect'
  | 'Senior Data Scientist'
  | 'Principal DevOps'
  | 'Chief Marketing Officer'
  | 'Financial Analyst';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  department: string;
  email: string;
  avatar: string;
  checkedIn: boolean;
  passId: string;
  lockerCode: string;
  assignedDeskId?: string;
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  email: string;
  avatar?: string;
  hostName: string;
  securityClearance: 'Approved' | 'Pending' | 'VIP Fast-Track';
  ndaSigned: boolean;
  gantryPassCode: string;
  checkedIn: boolean;
  qrPayload: string;
}

export interface HubLocation {
  id: string;
  name: string;
  address: string;
  district: string;
  level: string;
  transitDistanceMins: number;
  congestionScore: number; // 0 - 100%
  capacityPercent: number; // current live capacity
  totalDesks: number;
  availableRooms: number;
  amenities: string[];
  thumbnail: string;
  matchScore: number;
  clusterProximityNote: string;
}

export interface MeetingLayout {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  minPax: number;
  maxPax: number;
  popularFor: string;
}

export interface VCHardware {
  id: string;
  name: string;
  category: 'Video' | 'Audio' | 'Display' | 'Collab';
  specs: string;
  badge: string;
  iconName: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  timeSlot: 'Morning (09:00)' | 'Lunch (12:30)' | 'Afternoon (15:00)';
  pricePerPax: number;
  description: string;
  dietaryTags: string[];
  highlights: string[];
}

export interface ClusterPlan {
  roomName: string;
  roomCapacity: number;
  roomZone: string;
  desksZone: string;
  deskIds: string[];
  privacyPodsCount?: number;
  distanceMeters: number;
  floorLevel: string;
}

export interface DispatchTask {
  id: string;
  time: string;
  title: string;
  description: string;
  assignee: string;
  role: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface AIMatchResult {
  hub: HubLocation;
  confidence: number;
  reasons: string[];
  clusterPlan: ClusterPlan;
  dispatchSchedule: DispatchTask[];
  alternatives: {
    hub: HubLocation;
    tradeoffNote: string;
    matchScore: number;
  }[];
}

export interface OpsTicket {
  ticketId: string;
  status: 'dispatched' | 'staged' | 'ready';
  hostName: string;
  hostRole: string;
  slaMinutes: number;
  createdAt: string;
  checklist: { id: string; item: string; done: boolean; targetTime: string }[];
}

export interface PresetScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  selectedEmployeeIds: string[];
  selectedVisitors: Visitor[];
  hubId: string;
  desksCount: number;
  privacyPodsCount?: number;
  layoutId: string;
  timeSlot?: { start: string; end: string; label: string; hours: number };
  hardwareIds: string[];
  cateringIds: string[];
}


export type DeviceViewMode = 'mobile' | 'tablet' | 'desktop';

