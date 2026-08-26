import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { AIOptimizingState } from './AIOptimizingState';
import { FloorClusterMap } from './FloorClusterMap';
import { RecommendedHubCard } from './RecommendedHubCard';
import { TradeoffAlternatives } from './TradeoffAlternatives';
import { Sparkles, ArrowRight, ArrowLeft, Send } from 'lucide-react';

export const Screen2Matching: React.FC = () => {
  const { isOptimizing, prevStep, nextStep, runAIOptimization } = useOrchestrator();

  if (isOptimizing) {
    return (
      <div className="p-4">
        <AIOptimizingState />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Re-optimize floating button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-justco-teal font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Step 2 of 4: AI Matching & Cluster Plan</span>
        </div>

        <button
          onClick={runAIOptimization}
          className="text-[11px] font-semibold text-slate-400 hover:text-justco-teal flex items-center gap-1 bg-[#151D2A] px-2.5 py-1 rounded-lg border border-[#222E42] transition-colors"
        >
          <span>Re-calculate</span>
        </button>
      </div>

      {/* 1. Recommended Center Primary Card */}
      <RecommendedHubCard />

      {/* 2. Co-Located Floor Cluster Visualizer */}
      <FloorClusterMap />

      {/* 3. Trade-Off Alternatives */}
      <TradeoffAlternatives />

      {/* Bottom Inline Action Prompt */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172335] to-[#121B27] border border-teal-500/30 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white">Satisfied with this cluster plan?</h4>
          <p className="text-[11px] text-slate-400">Proceed to auto-issue mobile keycards & visitor passes</p>
        </div>
        <button
          onClick={nextStep}
          className="px-3.5 py-2 rounded-xl bg-justco-teal hover:bg-justco-teal-dark text-black font-bold text-xs shadow-glow-teal flex items-center gap-1.5 transition-all"
        >
          <span>Approve Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
