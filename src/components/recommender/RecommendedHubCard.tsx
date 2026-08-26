import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import {
  Sparkles,
  MapPin,
  TrendingDown,
  Clock,
  CheckCircle2,
  Tv,
  Coffee,
  ShieldAlert,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const RecommendedHubCard: React.FC = () => {
  const { aiMatchResult, selectedHub, nextStep } = useOrchestrator();

  const hourlyCongestion = [
    { hour: '09:00', pct: 28, label: 'Low 🌿' },
    { hour: '11:00', pct: 35, label: 'Optimal' },
    { hour: '13:00', pct: 40, label: 'Moderate' },
    { hour: '15:00', pct: 32, label: 'Optimal' },
    { hour: '17:00', pct: 25, label: 'Low 🌿' },
  ];

  return (
    <div className="bg-[#141B26] border border-teal-500/50 rounded-3xl p-4 shadow-xl shadow-teal-500/5 space-y-4">
      {/* Top AI Match Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-justco-teal to-cyan-400 p-[1px] shadow-glow-teal flex items-center justify-center font-bold text-black text-xs">
            {aiMatchResult.confidence}%
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-extrabold text-white">{selectedHub.name}</h3>
              <span className="text-[9px] bg-teal-500/20 text-justco-teal border border-teal-500/40 px-1.5 py-0.2 rounded font-bold">
                TOP MATCH
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{selectedHub.district} • {selectedHub.level}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400">Congestion Index</div>
          <div className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{selectedHub.congestionScore}% (Low Peak)</span>
          </div>
        </div>
      </div>

      {/* Hourly Congestion Forecast Curve */}
      <div className="bg-[#0F141E] p-3 rounded-2xl border border-[#1F293A]">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
          <span className="font-semibold text-slate-300">Live Congestion Forecast</span>
          <span className="text-emerald-400">Current Occupancy: {selectedHub.capacityPercent}%</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 items-end h-16 pt-2">
          {hourlyCongestion.map((slot) => (
            <div key={slot.hour} className="flex flex-col items-center gap-1 h-full justify-end">
              <div
                className="w-full bg-gradient-to-t from-teal-500/40 to-justco-teal rounded-t-md transition-all"
                style={{ height: `${slot.pct * 1.3}%` }}
              />
              <span className="text-[9px] text-slate-400 font-mono">{slot.hour}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Factor AI Reasons */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-justco-teal" />
          Why AI Selected This Configuration:
        </h4>

        <div className="space-y-1.5">
          {aiMatchResult.reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs text-slate-300 bg-[#17212F] p-2.5 rounded-xl border border-[#233145]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-justco-teal flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown of Automatic Equipment & Catering Dispatch */}
      <div className="space-y-2 pt-1">
        <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          Auto-Dispatched Service Checklist:
        </h4>

        <div className="space-y-1.5">
          {aiMatchResult.dispatchSchedule.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#111722] border border-[#1E2838] text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="text-[10px] font-mono text-justco-teal bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20 flex-shrink-0">
                  {task.time}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-white truncate">{task.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">{task.description}</div>
                </div>
              </div>

              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded flex-shrink-0">
                Scheduled ✓
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
