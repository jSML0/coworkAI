import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { AttendanceStats } from './AttendanceStats';
import { UtilizationHeatmap } from './UtilizationHeatmap';
import { CostSummaryCard } from './CostSummaryCard';
import { SpaceAdvisoryBanner } from './SpaceAdvisoryBanner';
import { BarChart3, RefreshCw, ArrowRight, Share2 } from 'lucide-react';

export const Screen4Analytics: React.FC = () => {
  const { setStep } = useOrchestrator();

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-justco-teal font-bold">
          <BarChart3 className="w-4 h-4" />
          <span>Step 4 of 4: Post-Meeting Analytics & Space Advisory</span>
        </div>
      </div>

      {/* 1. Real-Time Attendance Check-in Rate */}
      <AttendanceStats />

      {/* 2. Resource & Desk Utilization Heat Rate */}
      <UtilizationHeatmap />

      {/* 3. Consolidated Cost Summary (Credits vs Add-ons) */}
      <CostSummaryCard />

      {/* 4. AI Space Advisory Intelligence Banner */}
      <SpaceAdvisoryBanner />

      {/* Bottom Actions */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172335] to-[#121B27] border border-teal-500/30 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white">Ready for your next session?</h4>
          <p className="text-[11px] text-slate-400">Launch a new orchestration workflow</p>
        </div>
        <button
          onClick={() => setStep(1)}
          className="px-3.5 py-2 rounded-xl bg-justco-teal hover:bg-justco-teal-dark text-black font-bold text-xs shadow-glow-teal flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Session</span>
        </button>
      </div>
    </div>
  );
};
