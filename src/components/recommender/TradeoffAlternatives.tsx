import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { ArrowRight, MapPin, Activity, Check, RefreshCw } from 'lucide-react';

export const TradeoffAlternatives: React.FC = () => {
  const { aiMatchResult, setSelectedHubId, runAIOptimization } = useOrchestrator();

  const handleSwitchHub = (hubId: string) => {
    setSelectedHubId(hubId);
    runAIOptimization();
  };

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Alternative Center Trade-Offs
          </h3>
          <p className="text-[11px] text-slate-400">Comparing other regional Singapore JustCo hubs</p>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          {aiMatchResult.alternatives.length} Evaluated
        </span>
      </div>

      <div className="space-y-2">
        {aiMatchResult.alternatives.map((alt) => (
          <div
            key={alt.hub.id}
            className="p-3 rounded-2xl bg-[#10151E] border border-[#1E2838] hover:border-[#2A3950] transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-200 truncate">{alt.hub.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {alt.matchScore}% Match
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{alt.hub.district}</p>

                <div className="mt-1.5 p-2 rounded-lg bg-[#151D2A] border border-[#202B3C] text-[10px] text-amber-300">
                  ⚠️ <strong>Trade-off:</strong> {alt.tradeoffNote}
                </div>
              </div>

              <button
                onClick={() => handleSwitchHub(alt.hub.id)}
                className="px-2.5 py-1.5 rounded-xl bg-[#1B2536] hover:bg-justco-teal hover:text-black text-slate-300 text-[11px] font-semibold border border-[#2A3A52] transition-all flex-shrink-0"
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
