import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { CostSummaryCard } from '../analytics/CostSummaryCard';
import { UtilizationHeatmap } from '../analytics/UtilizationHeatmap';
import { AttendanceStats } from '../analytics/AttendanceStats';
import { SpaceAdvisoryBanner } from '../analytics/SpaceAdvisoryBanner';
import { CheckCircle2, MapPin, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const DashboardScreen: React.FC = () => {
  const { selectedHub, resetPayment } = useOrchestrator();

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#0099FF] font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Workspace Analytics Dashboard</span>
        </div>

        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>CONFIRMED & ACTIVE</span>
        </span>
      </div>

      {/* Confirmation Status Banner */}
      <div className="relative p-3.5 rounded-2xl bg-gradient-to-r from-[#000105] via-[#0D1829] to-[#000105] text-white border border-slate-700/60 shadow-md flex items-center justify-between overflow-hidden">
        <BrandGridWatermark
          className="absolute top-2 right-2 pointer-events-none select-none"
          opacity="opacity-25"
        />
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>Payment Cleared & Booking Active</span>
              <span className="text-[9px] font-mono font-normal text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-700/50">
                #JC-PAY-2026-8842
              </span>
            </div>
            <div className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#21B5FF]" />
              <span>{selectedHub.name} • Level 2 Courtyard Wing</span>
            </div>
          </div>
        </div>

        <div className="text-right z-10 hidden xs:block">
          <div className="text-[10px] text-slate-400 font-mono">Status</div>
          <div className="text-xs font-bold text-emerald-400 font-mono">Live Active</div>
        </div>
      </div>

      {/* Section Header: Cost & Utilization Dashboard */}
      <div className="flex items-center gap-2 pt-1">
        <Layers className="w-3.5 h-3.5 text-[#0099FF]" />
        <h3 className="text-xs font-black uppercase tracking-wider text-[#000105] font-mono">
          Dashboard: Cost & Space Utilization
        </h3>
      </div>

      {/* 1. Real-Time Attendance Check-in Rate */}
      <AttendanceStats />

      {/* 2. Resource & Desk Utilization Heat Rate */}
      <UtilizationHeatmap />

      {/* 3. Consolidated Cost Summary (Credits vs Add-ons) */}
      <CostSummaryCard />

      {/* Section Header: Upgrade Plan Recommendation */}
      <div className="flex items-center gap-2 pt-1">
        <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
        <h3 className="text-xs font-black uppercase tracking-wider text-[#000105] font-mono">
          AI Space Advisory: Sample Upgrade Plan Recommendation
        </h3>
      </div>

      {/* 4. AI Space Advisory Intelligence Banner (Recommend Upgrade Plan) */}
      <SpaceAdvisoryBanner />

      {/* Bottom Actions: New Session */}
      <div className="relative p-4 rounded-2xl bg-white border border-[#21B5FF]/40 shadow-sm flex items-center justify-between overflow-hidden">
        <BrandGridWatermark
          className="absolute top-2 right-2 pointer-events-none select-none"
          opacity="opacity-30"
        />
        <div className="pr-4">
          <h4 className="text-xs font-bold text-[#000105]">
            Ready for your next workspace session?
          </h4>
          <p className="text-[11px] text-slate-500">
            Launch a new AI space orchestration workflow
          </p>
        </div>
        <button
          onClick={resetPayment}
          className="px-4 py-2 rounded-xl bg-[#21B5FF] hover:bg-[#0099FF] text-white font-bold text-xs shadow-glow-blue flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Schedule</span>
        </button>
      </div>
    </div>
  );
};
