import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Flame, BarChart2, CheckCircle2, Zap, Layers, Leaf } from 'lucide-react';

export const UtilizationHeatmap: React.FC = () => {
  const { desksCount, totalParticipants, selectedHub } = useOrchestrator();

  const hourlyHeat = [
    { time: '09:00', room: 85, desks: 60, status: 'Arrival & Coffee' },
    { time: '10:00', room: 95, desks: 75, status: 'Plenary Strategy' },
    { time: '11:30', room: 90, desks: 90, status: 'Breakout Sprints' },
    { time: '13:00', room: 30, desks: 85, status: 'Bento Lunch & Flex' },
    { time: '14:30', room: 95, desks: 80, status: 'Design Reviews' },
    { time: '16:00', room: 80, desks: 95, status: 'Wrap-up & Code' },
  ];

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Space & Resource Utilization Heat
            </h3>
            <p className="text-[11px] text-slate-400">Co-located cluster efficiency metrics</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-justco-teal bg-teal-500/15 border border-teal-500/30 px-2 py-0.5 rounded-full">
          89% Avg Efficiency
        </span>
      </div>

      {/* Heat Metric Scorecards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#10151E] p-3 rounded-2xl border border-[#1E2838] text-center">
          <div className="text-[10px] text-slate-400">Meeting Room Peak</div>
          <div className="text-base font-black text-justco-teal mt-0.5">95%</div>
          <div className="text-[9px] text-slate-500">Orion 1 Suite</div>
        </div>

        <div className="bg-[#10151E] p-3 rounded-2xl border border-[#1E2838] text-center">
          <div className="text-[10px] text-slate-400">Hot Desks Peak</div>
          <div className="text-base font-black text-cyan-400 mt-0.5">92%</div>
          <div className="text-[9px] text-slate-500">Zone B Cluster</div>
        </div>

        <div className="bg-[#10151E] p-3 rounded-2xl border border-[#1E2838] text-center">
          <div className="text-[10px] text-slate-400">Unused Idle Waste</div>
          <div className="text-base font-black text-emerald-400 mt-0.5">0.0%</div>
          <div className="text-[9px] text-emerald-400 font-medium">Optimal Booking ✓</div>
        </div>
      </div>

      {/* Hourly Utilization Heat Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Session Hourly Activity Heat</span>
          <div className="flex items-center gap-2 text-[10px] font-normal">
            <span className="flex items-center gap-1 text-teal-300">
              <span className="w-2 h-2 rounded bg-justco-teal" /> Meeting Room
            </span>
            <span className="flex items-center gap-1 text-cyan-300">
              <span className="w-2 h-2 rounded bg-cyan-400" /> Hot Desks
            </span>
          </div>
        </div>

        <div className="space-y-2 bg-[#0F141E] p-3 rounded-2xl border border-[#1F293A]">
          {hourlyHeat.map((slot) => (
            <div key={slot.time} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="font-mono text-slate-300">{slot.time}</span>
                <span className="text-slate-400">{slot.status}</span>
                <span className="text-justco-teal font-semibold">{Math.max(slot.room, slot.desks)}% active</span>
              </div>
              <div className="w-full h-2 bg-[#1A2230] rounded-full overflow-hidden flex gap-0.5">
                <div
                  className="h-full bg-justco-teal transition-all duration-300 rounded-l-full"
                  style={{ width: `${slot.room * 0.5}%` }}
                />
                <div
                  className="h-full bg-cyan-400 transition-all duration-300 rounded-r-full"
                  style={{ width: `${slot.desks * 0.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ESG Sustainability & Eco-Savings */}
      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Smart HVAC & Lighting motion sensing saved <strong>14.2 kWh</strong></span>
        </div>
        <span className="font-bold text-[11px]">ESG Certified</span>
      </div>
    </div>
  );
};
