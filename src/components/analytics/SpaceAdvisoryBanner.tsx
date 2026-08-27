import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Sparkles, TrendingUp, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const SpaceAdvisoryBanner: React.FC = () => {
  const { selectedHub } = useOrchestrator();
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="relative p-4 rounded-3xl bg-white border border-[#21B5FF]/40 shadow-lg overflow-hidden space-y-3">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-35" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#21B5FF] text-white flex items-center justify-center font-bold shadow-glow-blue">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#0099FF] uppercase tracking-wider font-mono">
              AI Space Advisory Intelligence
            </span>
            <h3 className="text-xs font-bold text-[#000105]">Membership Tier & Pass Optimization</h3>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/30 font-mono">
          +22% Projected ROI
        </span>
      </div>

      {/* Advisory Insight Body */}
      <div className="relative z-10 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-[#000105]">Usage Trend Detected:</strong> Your team has orchestrated <strong>3+ collaborative sprints/month</strong> at {selectedHub.name}.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-[#EBF7FF] border border-[#21B5FF]/30 text-xs text-slate-700 space-y-1">
          <div className="font-bold text-[#000105] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>Recommended Plan: Dedicated Flex-Cluster (10-Desk Pod)</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Converting to an annual Flex-Cluster package reduces your monthly rate by <strong className="text-[#000105]">$640 SGD/month</strong> and grants unlimited VIP meeting room priority.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
        <div className="text-[10px] text-slate-500 font-mono">
          Estimated Annual Cost Reduction: <strong className="text-emerald-700">$7,680 SGD</strong>
        </div>

        <button
          onClick={handleApply}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
            applied
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-[#21B5FF] hover:bg-[#0099FF] text-white shadow-glow-blue'
          }`}
        >
          {applied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Advisory Saved ✓</span>
            </>
          ) : (
            <>
              <span>Upgrade Tier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
