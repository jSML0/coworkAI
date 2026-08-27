import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import {
  Sparkles,
  TrendingDown,
  Clock,
  CheckCircle2,
  Moon,
  ThermometerSnowflake,
  ShieldCheck,
} from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const RecommendedHubCard: React.FC = () => {
  const {
    aiMatchResult,
    selectedHub,
    isAfterHours,
    selectedTimeSlot,
    airConSurchargePerHour,
    airConSurchargeTotal,
  } = useOrchestrator();

  const hourlyCongestion = isAfterHours
    ? [
        { hour: '18:00', pct: 20, label: 'Evening Start 🌙' },
        { hour: '19:00', pct: 25, label: 'Low Peak' },
        { hour: '20:00', pct: 18, label: 'Quiet' },
        { hour: '21:00', pct: 12, label: 'Low' },
        { hour: '22:00', pct: 5, label: 'Close' },
      ]
    : [
        { hour: '09:00', pct: 28, label: 'Low 🌿' },
        { hour: '11:00', pct: 35, label: 'Optimal' },
        { hour: '13:00', pct: 40, label: 'Moderate' },
        { hour: '15:00', pct: 32, label: 'Optimal' },
        { hour: '17:00', pct: 25, label: 'Low 🌿' },
      ];

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-md space-y-4 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-35" />
      
      {/* Top AI Match Badge */}
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#21B5FF] shadow-glow-blue flex items-center justify-center font-bold text-white text-xs font-mono">
            {aiMatchResult.confidence}%
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-extrabold text-[#000105]">{selectedHub.name}</h3>
              <span className="text-[9px] bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/30 px-1.5 py-0.2 rounded font-bold font-mono">
                TOP MATCH
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{selectedHub.district} • {selectedHub.level}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-500">Congestion Index</div>
          <div className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1 font-mono">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{selectedHub.congestionScore}% (Low Peak)</span>
          </div>
        </div>
      </div>

      {/* After-Hours Event & Air-Con Extension Highlight Banner */}
      {isAfterHours && (
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Moon className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>After-Hours Event Booking ({selectedTimeSlot.start} – {selectedTimeSlot.end})</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 border border-amber-300 font-mono">
              🌙 Evening Operations
            </span>
          </div>

          <p className="text-[11px] text-slate-700 leading-relaxed">
            This booking runs outside standard building HVAC operating hours (08:00 – 18:00). 
            Building facility management mandates an <strong>Air-Conditioning Chiller Extension</strong> for the entire wing.
          </p>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/90 border border-amber-200/90 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700">
                <ThermometerSnowflake className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-[#000105]">Central Air-Con Extension Surcharge</span>
                <div className="text-[10px] text-slate-500 font-mono">
                  ${airConSurchargePerHour} SGD/hr × {selectedTimeSlot.hours} hours ({selectedTimeSlot.start}–{selectedTimeSlot.end})
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-extrabold text-amber-800 font-mono text-sm">
                +${airConSurchargeTotal} SGD
              </span>
              <div className="text-[9px] text-emerald-700 font-medium">Auto-Coordinated ✓</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 pt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Night security turnstiles & building access bypass auto-synced for all attendees.</span>
          </div>
        </div>
      )}

      {/* Hourly Congestion Forecast Curve */}
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90">
        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
          <span className="font-semibold text-slate-700">
            {isAfterHours ? 'Evening Occupancy Profile' : 'Live Congestion Forecast'}
          </span>
          <span className="text-emerald-700 font-mono font-medium">
            Current Occupancy: {selectedHub.capacityPercent}%
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 items-end h-16 pt-2">
          {hourlyCongestion.map((slot) => (
            <div key={slot.hour} className="flex flex-col items-center gap-1 h-full justify-end">
              <div
                className="w-full bg-gradient-to-t from-[#21B5FF]/30 to-[#21B5FF] rounded-t-md transition-all"
                style={{ height: `${slot.pct * 1.3}%` }}
              />
              <span className="text-[9px] text-slate-500 font-mono">{slot.hour}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Multi-Factor AI Reasons */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
          Why AI Selected This Configuration:
        </h4>

        <div className="space-y-1.5">
          {aiMatchResult.reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/90"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF] flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown of Automatic Equipment & Catering Dispatch */}
      <div className="space-y-2 pt-1">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#0099FF]" />
          Auto-Dispatched Service Checklist:
        </h4>

        <div className="space-y-1.5">
          {aiMatchResult.dispatchSchedule.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="text-[10px] font-mono text-[#0099FF] bg-[#EBF7FF] px-1.5 py-0.5 rounded border border-[#21B5FF]/20 flex-shrink-0 font-medium">
                  {task.time}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-[#000105] truncate">{task.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">{task.description}</div>
                </div>
              </div>

              <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex-shrink-0 font-medium font-mono">
                Scheduled ✓
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
