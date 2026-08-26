import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Map, Users, Tv, Coffee, ShieldCheck, Info, Sparkles, Footprints } from 'lucide-react';

export const FloorClusterMap: React.FC = () => {
  const { aiMatchResult, employees, selectedEmployeeIds, desksCount, selectedHub } = useOrchestrator();
  const [selectedElement, setSelectedElement] = useState<string | null>('room');

  const selectedTeamMembers = employees.filter((e) => selectedEmployeeIds.includes(e.id));
  const plan = aiMatchResult.clusterPlan;

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-lg space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
            <Map className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Co-Located Cluster Floorplan
            </h3>
            <p className="text-[11px] text-slate-400">
              {selectedHub.level} • {plan.roomZone}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-justco-teal bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
          <Footprints className="w-3 h-3" /> 4.2m Co-location Proximity
        </span>
      </div>

      {/* 2D Interactive Floorplan Diagram */}
      <div className="relative bg-[#0C1017] rounded-2xl border border-[#222D3E] p-4 overflow-hidden min-h-[260px] flex flex-col justify-between">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00D2B4 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Level & Ambient indicators */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>NORTH ATRIUM WING</span>
          <span className="text-justco-teal">● LIVE OCCUPANCY MAP</span>
        </div>

        {/* Floor Map Layout Area */}
        <div className="relative z-10 grid grid-cols-12 gap-3 my-3">
          {/* Main Booked Room: Orion 1 Boardroom */}
          <div
            onClick={() => setSelectedElement('room')}
            className={`col-span-7 bg-[#152030] rounded-2xl p-3 border cursor-pointer transition-all ${
              selectedElement === 'room'
                ? 'border-justco-teal shadow-glow-teal ring-1 ring-justco-teal/50'
                : 'border-[#283952] hover:border-teal-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-justco-teal animate-ping" />
                <span className="text-xs font-bold text-white">{plan.roomName}</span>
              </div>
              <span className="text-[9px] bg-teal-500/20 text-justco-teal px-1.5 py-0.2 rounded font-semibold">
                Booked
              </span>
            </div>

            {/* Room Inner Graphic */}
            <div className="bg-[#0E1522] rounded-xl p-2.5 border border-[#223046] flex flex-col items-center justify-center text-center">
              {/* VC Screen Bar */}
              <div className="w-24 h-2 bg-cyan-400 rounded-full mb-2 flex items-center justify-center text-[7px] text-black font-bold">
                DUAL 4K DISPLAYS
              </div>

              {/* Conference Table Graphic */}
              <div className="w-28 h-10 rounded-lg bg-[#1C2638] border border-teal-500/40 flex items-center justify-center text-[9px] text-teal-300 font-bold">
                {plan.roomCapacity} Pax Suite
              </div>

              {/* Seating Dots */}
              <div className="flex items-center justify-center gap-1 mt-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-justco-teal/80 shadow-xs" />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2">
              <span>Neat Bar 360 Active</span>
              <span className="text-emerald-400 font-medium">Acoustic Rated A+</span>
            </div>
          </div>

          {/* Adjacent Hot Desks Pods: Zone B */}
          <div
            onClick={() => setSelectedElement('desks')}
            className={`col-span-5 bg-[#152030] rounded-2xl p-3 border cursor-pointer transition-all ${
              selectedElement === 'desks'
                ? 'border-justco-teal shadow-glow-teal ring-1 ring-justco-teal/50'
                : 'border-[#283952] hover:border-teal-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-white">Zone B Desks</span>
              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-semibold">
                {desksCount} Desks
              </span>
            </div>

            <div className="text-[9px] text-slate-400 mb-2">4.2m from Orion 1</div>

            {/* Desk Grid Mini Layout */}
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: Math.max(desksCount, 6) }).map((_, i) => {
                const assignedEmp = selectedTeamMembers[i];
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-center p-0.5 transition-all ${
                      i < desksCount
                        ? 'bg-teal-500/15 border-justco-teal text-white shadow-xs'
                        : 'bg-[#101520] border-[#222E40] text-slate-600'
                    }`}
                  >
                    {assignedEmp ? (
                      <img
                        src={assignedEmp.avatar}
                        alt={assignedEmp.name}
                        title={`Desk ${12 + i}: ${assignedEmp.name}`}
                        className="w-4 h-4 rounded-full object-cover border border-justco-teal"
                      />
                    ) : (
                      <span className="text-[8px] font-mono text-slate-400">D{12 + i}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-2 text-[8px] text-justco-teal text-center font-medium">
              ✓ Contiguous Hot-Desk Cluster
            </div>
          </div>
        </div>

        {/* Amenities Line: Barista + Gantry */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-[#1C2638] pt-2">
          <div className="flex items-center gap-1 text-amber-300">
            <Coffee className="w-3.5 h-3.5" />
            <span>JustCo Barista Bar (18m)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-justco-teal" />
            <span>Level 3 Smart Gantry Entrance</span>
          </div>
        </div>
      </div>

      {/* Interactive Detail Box */}
      <div className="p-3 rounded-2xl bg-[#182232] border border-[#253347] text-xs">
        {selectedElement === 'room' ? (
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-justco-teal" />
              <span>Orion 1 Executive Boardroom Suite</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Equipped with calibrated dual 75" 4K displays, Neat Bar 360 AI framing, and high-speed
              dedicated Wi-Fi. Co-located directly with your hot-desk pods.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-justco-teal" />
              <span>Zone B Adjacent Hot-Desk Pods (D12–D{11 + desksCount})</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Reserved together in a single collaborative wing. Team members can step out of the
              meeting room directly to their assigned hot desks without walking across the floor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
