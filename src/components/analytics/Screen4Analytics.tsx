import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { AttendanceStats } from './AttendanceStats';
import { UtilizationHeatmap } from './UtilizationHeatmap';
import { CostSummaryCard } from './CostSummaryCard';
import { SpaceAdvisoryBanner } from './SpaceAdvisoryBanner';
import { BarChart3, RefreshCw } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const Screen4Analytics: React.FC = () => {
  const { setStep } = useOrchestrator();

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#0099FF] font-bold">
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
      <div className="relative p-4 rounded-2xl bg-white border border-[#21B5FF]/40 shadow-sm flex items-center justify-between overflow-hidden">
        <BrandGridWatermark className="absolute top-2 right-2 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="pr-4">
          <h4 className="text-xs font-bold text-[#000105]">Ready for your next session?</h4>
          <p className="text-[11px] text-slate-500">Launch a new orchestration workflow</p>
        </div>
        <button
          onClick={() => setStep(1)}
          className="px-3.5 py-2 rounded-xl bg-[#21B5FF] hover:bg-[#0099FF] text-white font-bold text-xs shadow-glow-blue flex items-center gap-1.5 transition-all flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Session</span>
        </button>
      </div>
    </div>
  );
};
