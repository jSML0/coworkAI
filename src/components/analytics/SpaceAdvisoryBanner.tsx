import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Sparkles, TrendingUp, ArrowRight, CheckCircle2, Shield, Building2, Zap } from 'lucide-react';

export const SpaceAdvisoryBanner: React.FC = () => {
  const { desksCount, selectedHub } = useOrchestrator();
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="relative p-4 rounded-3xl bg-gradient-to-br from-[#1C2538] via-[#161F2E] to-[#111724] border border-teal-500/50 shadow-xl overflow-hidden space-y-3">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-justco-teal/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-justco-teal text-black flex items-center justify-center font-bold shadow-glow-teal">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-justco-teal uppercase tracking-wider">
              AI Space Advisory Intelligence
            </span>
            <h3 className="text-xs font-bold text-white">Membership Tier & Pass Optimization</h3>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-justco-teal border border-teal-500/40">
          +22% Projected ROI
        </span>
      </div>

      {/* Advisory Insight Body */}
      <div className="relative z-10 bg-[#0E141F]/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#233145] space-y-2">
        <div className="flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-200 leading-relaxed">
            <strong>Usage Trend Detected:</strong> Your team has orchestrated <strong>3+ collaborative sprints/month</strong> at {selectedHub.name}.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200 space-y-1">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-justco-teal" />
            <span>Recommended Plan: Dedicated Flex-Cluster (10-Desk Pod)</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Converting to an annual Flex-Cluster package reduces your monthly rate by <strong>$640 SGD/month</strong> and grants unlimited VIP meeting room priority.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
        <div className="text-[10px] text-slate-400">
          Estimated Annual Cost Reduction: <strong className="text-emerald-400">$7,680 SGD</strong>
        </div>

        <button
          onClick={handleApply}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
            applied
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
              : 'bg-justco-teal hover:bg-justco-teal-dark text-black shadow-glow-teal'
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
