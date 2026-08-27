import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Map, Users, Coffee, ShieldCheck, Sparkles, Footprints, PhoneCall } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const FloorClusterMap: React.FC = () => {
  const { aiMatchResult, employees, selectedEmployeeIds, desksCount, privacyPodsCount, selectedHub } = useOrchestrator();
  const [selectedElement, setSelectedElement] = useState<'room' | 'desks' | 'pods'>('room');

  const selectedTeamMembers = employees.filter((e) => selectedEmployeeIds.includes(e.id));
  const plan = aiMatchResult.clusterPlan;

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-md space-y-3 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-35" />
      
      {/* Header */}
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <Map className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Co-Located Cluster Floorplan
            </h3>
            <p className="text-[11px] text-slate-500">
              {selectedHub.level} • {plan.roomZone}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-[#0099FF] bg-[#EBF7FF] px-2 py-0.5 rounded-full border border-[#21B5FF]/30 flex items-center gap-1 font-mono">
          <Footprints className="w-3 h-3" /> 4.2m Co-location Proximity
        </span>
      </div>

      {/* 2D Interactive Floorplan Diagram */}
      <div className="relative bg-slate-100/90 rounded-2xl border border-slate-200 p-4 overflow-hidden min-h-[260px] flex flex-col justify-between shadow-inner">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#21B5FF 1.5px, transparent 1.5px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Blueprint Room & Desks Cluster Layout */}
        <div className="relative z-10 grid grid-cols-12 gap-3 my-auto">
          {/* Main Booked Room: Orion 1 */}
          <div
            onClick={() => setSelectedElement('room')}
            className={`col-span-7 bg-white rounded-2xl p-3.5 border cursor-pointer transition-all ${
              selectedElement === 'room'
                ? 'border-[#21B5FF] shadow-glow-blue ring-1 ring-[#21B5FF]/50'
                : 'border-slate-200 hover:border-[#21B5FF]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#000105] truncate">{plan.roomName}</span>
              <span className="text-[9px] bg-[#EBF7FF] text-[#0099FF] px-1.5 py-0.2 rounded font-semibold font-mono border border-[#21B5FF]/30">
                Cap {plan.roomCapacity}
              </span>
            </div>

            {/* Room Blueprint Graphic */}
            <div className="w-full h-16 bg-slate-50 rounded-xl border border-slate-200 p-2 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="w-20 h-6 bg-[#EBF7FF] border border-[#21B5FF]/40 rounded-md flex items-center justify-center text-[9px] font-bold text-[#0099FF]">
                Display / AV
              </div>
              <div className="flex gap-1.5 mt-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#21B5FF] shadow-xs" />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-500 mt-2">
              <span>Neat Bar 360 Active</span>
              <span className="text-emerald-600 font-semibold font-mono">Acoustic Rated A+</span>
            </div>
          </div>

          {/* Adjacent Hot Desks & Privacy Pods: Zone B */}
          <div className="col-span-5 flex flex-col gap-2">
            <div
              onClick={() => setSelectedElement('desks')}
              className={`bg-white rounded-2xl p-3 border cursor-pointer transition-all ${
                selectedElement === 'desks'
                  ? 'border-[#21B5FF] shadow-glow-blue ring-1 ring-[#21B5FF]/50'
                  : 'border-slate-200 hover:border-[#21B5FF]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#000105]">Zone B Desks</span>
                <span className="text-[9px] bg-cyan-50 text-cyan-700 px-1.5 py-0.2 rounded font-semibold font-mono border border-cyan-200">
                  {desksCount} Desks
                </span>
              </div>

              {/* Desk Grid Mini Layout */}
              <div className="grid grid-cols-3 gap-1 my-1">
                {Array.from({ length: Math.min(Math.max(desksCount, 3), 6) }).map((_, i) => {
                  const assignedEmp = selectedTeamMembers[i];
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-center p-0.5 transition-all ${
                        i < desksCount
                          ? 'bg-[#EBF7FF] border-[#21B5FF] text-[#000105] shadow-xs'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}
                    >
                      {assignedEmp ? (
                        <img
                          src={assignedEmp.avatar}
                          alt={assignedEmp.name}
                          title={`Desk ${12 + i}: ${assignedEmp.name}`}
                          className="w-3.5 h-3.5 rounded-full object-cover border border-[#21B5FF]"
                        />
                      ) : (
                        <span className="text-[7px] font-mono text-slate-400">D{12 + i}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="text-[8px] text-[#0099FF] text-center font-bold">
                ✓ Contiguous Pods
              </div>
            </div>

            {/* Privacy Pods pill / card in floorplan */}
            {privacyPodsCount > 0 && (
              <div
                onClick={() => setSelectedElement('pods')}
                className={`bg-white rounded-2xl p-2 border cursor-pointer transition-all flex items-center justify-between ${
                  selectedElement === 'pods'
                    ? 'border-[#21B5FF] shadow-glow-blue ring-1 ring-[#21B5FF]/50'
                    : 'border-slate-200 hover:border-[#21B5FF]/50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-[#0099FF]" />
                  <span className="text-[10px] font-bold text-[#000105]">
                    {privacyPodsCount} Privacy Pod{privacyPodsCount > 1 ? 's' : ''}
                  </span>
                </div>
                <span className="text-[8px] bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded font-mono font-bold border border-emerald-200">
                  P1{privacyPodsCount > 1 ? `-P${privacyPodsCount}` : ''}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Amenities Line: Barista + Gantry */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-600 border-t border-slate-200 pt-2">
          <div className="flex items-center gap-1 text-amber-700 font-medium">
            <Coffee className="w-3.5 h-3.5" />
            <span>JustCo Barista Bar (18m)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>Level 3 Smart Gantry Entrance</span>
          </div>
        </div>
      </div>

      {/* Interactive Detail Box */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
        {selectedElement === 'room' ? (
          <div className="space-y-1">
            <div className="font-bold text-[#000105] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>{plan.roomName}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Equipped with calibrated dual 75" 4K displays, stage microphones, Neat Bar 360 AI framing, and high-speed
              dedicated Wi-Fi. Co-located directly with your hot-desk pods and private acoustic booths.
            </p>
          </div>
        ) : selectedElement === 'desks' ? (
          <div className="space-y-1">
            <div className="font-bold text-[#000105] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>{plan.desksZone} (D12–D{11 + desksCount})</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Reserved together in a single collaborative wing. Team members can step out of the
              event/meeting space directly to their assigned hot desks without walking across the floor.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="font-bold text-[#000105] flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>{plan.roomZone} Soundproof Privacy Pods (P1–P{privacyPodsCount})</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Class A acoustic insulated private phone booths equipped with HEPA ventilation, dimmable LED ring lights, and fast charging. Ideal for confidential client calls and 1-on-1 focus sprints.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

