import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const TradeoffAlternatives: React.FC = () => {
  const { aiMatchResult, setSelectedHubId, runAIOptimization } = useOrchestrator();

  const handleSwitchHub = (hubId: string) => {
    setSelectedHubId(hubId);
    runAIOptimization();
  };

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      <div className="flex items-center justify-between pr-6">
        <div>
          <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
            Alternative Center Trade-Offs
          </h3>
          <p className="text-[11px] text-slate-500">Comparing other regional Singapore JustCo hubs</p>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {aiMatchResult.alternatives.length} Evaluated
        </span>
      </div>

      <div className="space-y-2">
        {aiMatchResult.alternatives.map((alt) => (
          <div
            key={alt.hub.id}
            className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#000105] truncate">{alt.hub.name}</h4>
                  <span className="text-[10px] text-[#0099FF] font-mono font-bold">
                    {alt.matchScore}% Match
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{alt.hub.district}</p>

                <div className="mt-1.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-800">
                  ⚠️ <strong>Trade-off:</strong> {alt.tradeoffNote}
                </div>
              </div>

              <button
                onClick={() => handleSwitchHub(alt.hub.id)}
                className="px-2.5 py-1.5 rounded-xl bg-[#EBF7FF] hover:bg-[#21B5FF] hover:text-white text-[#0099FF] text-[11px] font-semibold border border-[#21B5FF]/30 transition-all flex-shrink-0"
              >
                Switch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
