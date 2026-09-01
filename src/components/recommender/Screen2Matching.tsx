import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { AIOptimizingState } from './AIOptimizingState';
import { FloorClusterMap } from './FloorClusterMap';
import { RecommendedHubCard } from './RecommendedHubCard';
import { TradeoffAlternatives } from './TradeoffAlternatives';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const Screen2Matching: React.FC = () => {
  const { isOptimizing, nextStep, runAIOptimization } = useOrchestrator();

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
        <div className="flex items-center gap-1.5 text-xs text-[#0099FF] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Step 2 of 3: AI Matching & Plan Approval</span>
        </div>

        <button
          onClick={runAIOptimization}
          className="text-[11px] font-semibold text-slate-600 hover:text-[#0099FF] flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs transition-colors"
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
      <div className="relative p-4 rounded-2xl bg-white border border-[#21B5FF]/40 shadow-sm flex items-center justify-between overflow-hidden">
        <BrandGridWatermark className="absolute top-2 right-2 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="pr-4">
          <h4 className="text-xs font-bold text-[#000105]">Satisfied with this cluster plan?</h4>
          <p className="text-[11px] text-slate-500">Proceed to review cost authorization & corporate payment</p>
        </div>
        <button
          onClick={nextStep}
          className="px-3.5 py-2 rounded-xl bg-[#21B5FF] hover:bg-[#0099FF] text-white font-bold text-xs shadow-glow-blue flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer"
        >
          <span>Approve</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
