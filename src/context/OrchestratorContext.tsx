import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Employee,
  Visitor,
  HubLocation,
  AIMatchResult,
  OpsTicket,
  DeviceViewMode,
} from '../types/orchestrator';
import {
  INITIAL_EMPLOYEES,
  INITIAL_VISITORS,
  JUSTCO_HUBS,
  MEETING_LAYOUTS,
  PRESET_SCENARIOS,
  CATERING_PACKAGES,
} from '../data/mockData';

interface OrchestratorContextType {
  step: 1 | 2 | 3 | 4;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  nextStep: () => void;
  prevStep: () => void;
  deviceView: DeviceViewMode;
  setDeviceView: (view: DeviceViewMode) => void;
  activePresetId: string;
  applyPreset: (presetId: string) => void;
  
  // Selection state
  employees: Employee[];
  selectedEmployeeIds: string[];
  toggleEmployee: (id: string) => void;
  selectAllEmployees: () => void;
  addEmployee: (emp: { name: string; role: any; department: string; email: string }) => void;
  
  visitors: Visitor[];
  addVisitor: (vis: { name: string; company: string; email: string }) => void;
  removeVisitor: (id: string) => void;
  toggleVisitorCheckIn: (id: string) => void;
  toggleEmployeeCheckIn: (id: string) => void;
  
  selectedHubId: string;
  setSelectedHubId: (id: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTimeSlot: { start: string; end: string; label: string; hours: number };
  setSelectedTimeSlot: (slot: { start: string; end: string; label: string; hours: number }) => void;
  
  desksCount: number;
  setDesksCount: (count: number) => void;
  selectedLayoutId: string;
  setSelectedLayoutId: (id: string) => void;
  selectedHardwareIds: string[];
  toggleHardware: (id: string) => void;
  selectedCateringIds: string[];
  toggleCatering: (id: string) => void;
  specialInstructions: string;
  setSpecialInstructions: (note: string) => void;
  
  // AI & Results
  isOptimizing: boolean;
  runAIOptimization: () => void;
  aiMatchResult: AIMatchResult;
  
  // Ops Ticket
  opsTicket: OpsTicket;
  toggleChecklistItem: (id: string) => void;
  advanceTicketStatus: () => void;
  
  // Modal state
  modal: {
    isOpen: boolean;
    type: 'employee_pass' | 'visitor_pass' | 'ops_ticket' | 'add_member' | 'add_visitor' | null;
    data?: any;
  };
  openModal: (type: 'employee_pass' | 'visitor_pass' | 'ops_ticket' | 'add_member' | 'add_visitor', data?: any) => void;
  closeModal: () => void;
  
  // Derived Analytics Data
  totalParticipants: number;
  checkedInCount: number;
  attendanceRate: number;
  totalCreditsUsed: number;
  totalCateringCost: number;
  estimatedSavings: number;
  selectedHub: HubLocation;
}

const OrchestratorContext = createContext<OrchestratorContextType | undefined>(undefined);

export const OrchestratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [deviceView, setDeviceView] = useState<DeviceViewMode>('mobile');
  const [activePresetId, setActivePresetId] = useState<string>('preset-tech-sprint');
  
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([
    'emp-1', 'emp-2', 'emp-3', 'emp-4', 'emp-5', 'emp-6'
  ]);
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  
  const [selectedHubId, setSelectedHubId] = useState<string>('hub-marina-square');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start: string; end: string; label: string; hours: number }>({
    start: '09:00',
    end: '17:00',
    label: 'Full Day Intensive (09:00 - 17:00)',
    hours: 8,
  });
  
  const [desksCount, setDesksCount] = useState<number>(6);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('layout-workshop');
  const [selectedHardwareIds, setSelectedHardwareIds] = useState<string[]>([
    'hw-dual-4k', 'hw-neat-360', 'hw-zoom-rooms'
  ]);
  const [selectedCateringIds, setSelectedCateringIds] = useState<string[]>([
    'cat-morning-roast', 'cat-bento-lunch'
  ]);
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    'Ensure 4K displays are tested for Mac AirPlay; 2 vegetarian bento boxes needed.'
  );
  
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  
  const [opsTicket, setOpsTicket] = useState<OpsTicket>({
    ticketId: 'JC-OPS-99201',
    status: 'staged',
    hostName: 'Clarissa Tan',
    hostRole: 'JustCo Community Experience Lead',
    slaMinutes: 15,
    createdAt: '08:15 AM',
    checklist: [
      { id: 'c-1', item: 'Room Orion 1 sanitize & acoustic check', done: true, targetTime: '08:30 AM' },
      { id: 'c-2', item: 'Neat Bar 360 & Dual 4K HDMI sync test', done: true, targetTime: '08:45 AM' },
      { id: 'c-3', item: 'Reserve Hot Desks D12 - D17 in Zone B', done: true, targetTime: '08:45 AM' },
      { id: 'c-4', item: 'Barista Morning Roast delivery to credenza', done: true, targetTime: '09:10 AM' },
      { id: 'c-5', item: 'Gantry security bypass sync for 2 visitors', done: false, targetTime: '09:15 AM' },
      { id: 'c-6', item: 'Bento Gourmet Lunch delivery dispatch', done: false, targetTime: '12:15 PM' },
    ],
  });
  
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'employee_pass' | 'visitor_pass' | 'ops_ticket' | 'add_member' | 'add_visitor' | null;
    data?: any;
  }>({
    isOpen: false,
    type: null,
    data: null,
  });

  const selectedHub = useMemo(() => {
    return JUSTCO_HUBS.find((h) => h.id === selectedHubId) || JUSTCO_HUBS[0];
  }, [selectedHubId]);

  const totalParticipants = selectedEmployeeIds.length + visitors.length;
  
  const checkedInCount = useMemo(() => {
    const empChecked = employees.filter((e) => selectedEmployeeIds.includes(e.id) && e.checkedIn).length;
    const visChecked = visitors.filter((v) => v.checkedIn).length;
    return empChecked + visChecked;
  }, [employees, selectedEmployeeIds, visitors]);

  const attendanceRate = totalParticipants > 0 ? Math.round((checkedInCount / totalParticipants) * 100) : 0;

  // Real-time cost calculations
  const totalCreditsUsed = useMemo(() => {
    // Room credits: ~4 credits/hour for standard room, 6 credits/hour for boardroom
    const roomRatePerHour = selectedLayoutId === 'layout-boardroom' ? 6 : selectedLayoutId === 'layout-presentation' ? 8 : 4;
    const roomCredits = roomRatePerHour * (selectedTimeSlot.hours > 4 ? 4 : selectedTimeSlot.hours);
    // Desk credits: 2 credits per desk for full day
    const deskCredits = desksCount * 2;
    return roomCredits + deskCredits;
  }, [selectedLayoutId, selectedTimeSlot.hours, desksCount]);

  const totalCateringCost = useMemo(() => {
    const selectedPkgs = CATERING_PACKAGES.filter((p) => selectedCateringIds.includes(p.id));
    const costPerPax = selectedPkgs.reduce((acc, p) => acc + p.pricePerPax, 0);
    return costPerPax * totalParticipants;
  }, [selectedCateringIds, totalParticipants]);

  const estimatedSavings = useMemo(() => {
    // Co-locating desks adjacent to the booked room saves 18% vs booking disparate day passes + ad-hoc meeting rooms
    const standardCost = totalCreditsUsed * 18 + totalCateringCost * 1.15;
    const bundleCost = totalCreditsUsed * 14.5 + totalCateringCost;
    return Math.round(standardCost - bundleCost + 45);
  }, [totalCreditsUsed, totalCateringCost]);

  // AI Matching Result based on selections
  const aiMatchResult: AIMatchResult = useMemo(() => {
    const deskIds = Array.from({ length: Math.min(desksCount, 8) }, (_, i) => `D-${12 + i}`);
    const altHubs = JUSTCO_HUBS.filter((h) => h.id !== selectedHub.id);
    
    return {
      hub: selectedHub,
      confidence: selectedHub.matchScore,
      reasons: [
        `Optimal transit score (${selectedHub.transitDistanceMins}m from MRT) with only ${selectedHub.congestionScore}% predicted congestion index.`,
        `Direct Co-location: ${desksCount} Hot Desks grouped in Zone B, precisely 4.2m from Orion 1 Room.`,
        `Full hardware readiness: ${selectedHardwareIds.length} requested AV systems certified & calibrated on Level 3.`,
        `JustCo In-House Barista and Kitchen located on the same floor for zero-latency refreshment SLA.`,
      ],
      clusterPlan: {
        roomName: selectedLayoutId === 'layout-boardroom' ? 'Orion Boardroom Suite' : 'Atrium Workshop Studio 1',
        roomCapacity: Math.max(totalParticipants + 2, 10),
        roomZone: 'Zone B (Executive North)',
        desksZone: 'Zone B — Hot Desk Pods 12–19',
        deskIds,
        distanceMeters: 4.2,
        floorLevel: selectedHub.level,
      },
      dispatchSchedule: [
        {
          id: 'ds-1',
          time: '08:45 AM',
          title: 'AV & Room Calibration',
          description: 'Neat Bar 360 AI framing and dual 4K touch displays auto-diagnostics',
          assignee: 'JustCo Tech Ops',
          role: 'AV Technician',
          status: 'completed',
        },
        {
          id: 'ds-2',
          time: '08:50 AM',
          title: 'Hot Desk Cluster Locking',
          description: `Reserved ${desksCount} contiguous desks in Zone B with digital name e-ink labels`,
          assignee: 'Clarissa Tan',
          role: 'Community Lead',
          status: 'completed',
        },
        {
          id: 'ds-3',
          time: '09:15 AM',
          title: 'Barista Morning Roast Delivery',
          description: 'Handcrafted oat lattes & French croissants delivered to boardroom credenza',
          assignee: 'Sean Leong',
          role: 'Lead Barista',
          status: 'in_progress',
        },
        {
          id: 'ds-4',
          time: '12:20 PM',
          title: 'Executive Bento Box Catering',
          description: 'Pre-portioned lunch boxes & cold juices staged in breakout pantry',
          assignee: 'JustCo Kitchen',
          role: 'Catering Partner',
          status: 'pending',
        },
      ],
      alternatives: altHubs.map((h) => ({
        hub: h,
        matchScore: h.matchScore,
        tradeoffNote:
          h.congestionScore > 60
            ? 'Higher peak footfall (+28% congestion) during morning hours'
            : 'Slightly further hot-desk cluster (approx 12m from meeting room)',
      })),
    };
  }, [selectedHub, desksCount, selectedLayoutId, totalParticipants, selectedHardwareIds.length]);

  const toggleEmployee = (id: string) => {
    setSelectedEmployeeIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      // Keep at least 1 employee
      return next.length > 0 ? next : prev;
    });
  };

  const selectAllEmployees = () => {
    if (selectedEmployeeIds.length === employees.length) {
      setSelectedEmployeeIds([employees[0].id]);
    } else {
      setSelectedEmployeeIds(employees.map((e) => e.id));
    }
  };

  const addEmployee = (emp: { name: string; role: any; department: string; email: string }) => {
    const newId = `emp-${Date.now()}`;
    const newEmp: Employee = {
      id: newId,
      name: emp.name,
      role: emp.role || 'Senior Product Manager',
      department: emp.department || 'General Tech',
      email: emp.email || `${emp.name.toLowerCase().replace(/\s+/g, '.')}@techcorp.io`,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      checkedIn: true,
      passId: `JC-SG-${Math.floor(1000 + Math.random() * 9000)}-NFC`,
      lockerCode: `L-${Math.floor(200 + Math.random() * 50)}`,
      assignedDeskId: `D-${desksCount + 1}`,
    };
    setEmployees((prev) => [...prev, newEmp]);
    setSelectedEmployeeIds((prev) => [...prev, newId]);
  };

  const addVisitor = (vis: { name: string; company: string; email: string }) => {
    const newVis: Visitor = {
      id: `vis-${Date.now()}`,
      name: vis.name,
      company: vis.company,
      email: vis.email,
      hostName: employees[0]?.name || 'Sarah Chen',
      securityClearance: 'Approved',
      ndaSigned: true,
      gantryPassCode: `GANTRY-PASS-${Math.floor(1000 + Math.random() * 9000)}`,
      checkedIn: false,
      qrPayload: `JUSTCO://VISITOR/${vis.name.toUpperCase().replace(/\s+/g, '_')}`,
    };
    setVisitors((prev) => [...prev, newVis]);
  };

  const removeVisitor = (id: string) => {
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleVisitorCheckIn = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, checkedIn: !v.checkedIn } : v))
    );
  };

  const toggleEmployeeCheckIn = (id: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, checkedIn: !e.checkedIn } : e))
    );
  };

  const toggleHardware = (id: string) => {
    setSelectedHardwareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCatering = (id: string) => {
    setSelectedCateringIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const runAIOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 1200);
  };

  const toggleChecklistItem = (id: string) => {
    setOpsTicket((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      ),
    }));
  };

  const advanceTicketStatus = () => {
    setOpsTicket((prev) => {
      const nextStatus = prev.status === 'dispatched' ? 'staged' : prev.status === 'staged' ? 'ready' : 'dispatched';
      return { ...prev, status: nextStatus };
    });
  };

  const openModal = (
    type: 'employee_pass' | 'visitor_pass' | 'ops_ticket' | 'add_member' | 'add_visitor',
    data?: any
  ) => {
    setModal({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: undefined });
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (!preset) return;
    
    setActivePresetId(presetId);
    setSelectedEmployeeIds(preset.selectedEmployeeIds);
    setVisitors(preset.selectedVisitors);
    setSelectedHubId(preset.hubId);
    setDesksCount(preset.desksCount);
    setSelectedLayoutId(preset.layoutId);
    setSelectedHardwareIds(preset.hardwareIds);
    setSelectedCateringIds(preset.cateringIds);
    
    // Animate AI state
    runAIOptimization();
  };

  const nextStep = () => {
    if (step < 4) {
      const next = (step + 1) as 1 | 2 | 3 | 4;
      setStep(next);
      if (next === 2) {
        runAIOptimization();
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  return (
    <OrchestratorContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        prevStep,
        deviceView,
        setDeviceView,
        activePresetId,
        applyPreset,
        employees,
        selectedEmployeeIds,
        toggleEmployee,
        selectAllEmployees,
        addEmployee,
        visitors,
        addVisitor,
        removeVisitor,
        toggleVisitorCheckIn,
        toggleEmployeeCheckIn,
        selectedHubId,
        setSelectedHubId,
        selectedDate,
        setSelectedDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        desksCount,
        setDesksCount,
        selectedLayoutId,
        setSelectedLayoutId,
        selectedHardwareIds,
        toggleHardware,
        selectedCateringIds,
        toggleCatering,
        specialInstructions,
        setSpecialInstructions,
        isOptimizing,
        runAIOptimization,
        aiMatchResult,
        opsTicket,
        toggleChecklistItem,
        advanceTicketStatus,
        modal,
        openModal,
        closeModal,
        totalParticipants,
        checkedInCount,
        attendanceRate,
        totalCreditsUsed,
        totalCateringCost,
        estimatedSavings,
        selectedHub,
      }}
    >
      {children}
    </OrchestratorContext.Provider>
  );
};

export const useOrchestrator = () => {
  const context = useContext(OrchestratorContext);
  if (!context) {
    throw new Error('useOrchestrator must be used within an OrchestratorProvider');
  }
  return context;
};
