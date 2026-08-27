import React from 'react';
import { Flame, Leaf } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const UtilizationHeatmap: React.FC = () => {
  const hourlyHeat = [
    { time: '09:00', room: 85, desks: 60, status: 'Arrival & Coffee' },
    { time: '10:00', room: 95, desks: 75, status: 'Plenary Strategy' },
    { time: '11:30', room: 90, desks: 90, status: 'Breakout Sprints' },
    { time: '13:00', room: 30, desks: 85, status: 'Bento Lunch & Flex' },
    { time: '14:30', room: 95, desks: 80, status: 'Design Reviews' },
    { time: '16:00', room: 80, desks: 95, status: 'Wrap-up & Code' },
  ];

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-4 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      {/* Header */}
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Space & Resource Utilization Heat
            </h3>
            <p className="text-[11px] text-slate-500">Co-located cluster efficiency metrics</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-[#0099FF] bg-[#EBF7FF] border border-[#21B5FF]/30 px-2 py-0.5 rounded-full font-mono">
          89% Avg Efficiency
        </span>
      </div>

      {/* Heat Metric Scorecards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 text-center">
          <div className="text-[10px] text-slate-500 font-mono">Meeting Room Peak</div>
          <div className="text-base font-black text-[#0099FF] mt-0.5 font-mono">95%</div>
          <div className="text-[9px] text-slate-400">Orion 1 Suite</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 text-center">
          <div className="text-[10px] text-slate-500 font-mono">Hot Desks Peak</div>
          <div className="text-base font-black text-cyan-600 mt-0.5 font-mono">92%</div>
          <div className="text-[9px] text-slate-400">Zone B Cluster</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 text-center">
          <div className="text-[10px] text-slate-500 font-mono">Unused Idle Waste</div>
          <div className="text-base font-black text-emerald-700 mt-0.5 font-mono">0.0%</div>
          <div className="text-[9px] text-emerald-700 font-semibold font-mono">Optimal Booking ✓</div>
        </div>
      </div>

      {/* Hourly Utilization Heat Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Session Hourly Activity Heat</span>
          <div className="flex items-center gap-2 text-[10px] font-normal">
            <span className="flex items-center gap-1 text-[#0099FF] font-medium">
              <span className="w-2 h-2 rounded bg-[#21B5FF]" /> Meeting Room
            </span>
            <span className="flex items-center gap-1 text-cyan-700 font-medium">
              <span className="w-2 h-2 rounded bg-cyan-400" /> Hot Desks
            </span>
          </div>
        </div>

        <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/90">
          {hourlyHeat.map((slot) => (
            <div key={slot.time} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="font-mono text-slate-700 font-medium">{slot.time}</span>
                <span className="text-slate-500">{slot.status}</span>
                <span className="text-[#0099FF] font-semibold font-mono">{Math.max(slot.room, slot.desks)}% active</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex gap-0.5">
                <div
                  className="h-full bg-[#21B5FF] transition-all duration-300 rounded-l-full"
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
      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Smart HVAC & Lighting motion sensing saved <strong>14.2 kWh</strong></span>
        </div>
        <span className="font-bold text-[11px] font-mono text-emerald-700">ESG Certified</span>
      </div>
    </div>
  );
};
