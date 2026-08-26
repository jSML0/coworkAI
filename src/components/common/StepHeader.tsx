import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { SlidersHorizontal, Sparkles, Send, BarChart3, Check } from 'lucide-react';

export const StepHeader: React.FC = () => {
  const { step, setStep } = useOrchestrator();

  const steps = [
    { num: 1, title: 'Setup', desc: 'Params & Team', icon: SlidersHorizontal },
    { num: 2, title: 'AI Match', desc: 'Cluster & Hub', icon: Sparkles },
    { num: 3, title: 'Dispatch', desc: 'Passes & SLA', icon: Send },
    { num: 4, title: 'Advisory', desc: 'Analytics & ROI', icon: BarChart3 },
  ];

  return (
    <div className="w-full bg-[#10151E]/95 backdrop-blur-md border-b border-[#222B3A] px-4 pt-3 pb-3 sticky top-0 z-30">
      {/* Top JustCo Brand Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-justco-teal to-justco-cyan flex items-center justify-center shadow-glow-teal font-bold text-black text-xs tracking-tighter">
            JC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">JustCo</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/10 text-justco-teal border border-teal-500/30">
                AI Orchestrator
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-medium text-slate-300">SG CBD Core</span>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-4 gap-1.5 relative">
        {steps.map((s) => {
          const Icon = s.icon;
          const isCompleted = step > s.num;
          const isCurrent = step === s.num;

          return (
            <button
              key={s.num}
              onClick={() => setStep(s.num as 1 | 2 | 3 | 4)}
              className={`relative flex flex-col items-center text-center p-1.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-[#1C2534] border border-teal-500/40 shadow-sm'
                  : isCompleted
                  ? 'bg-[#141A24]/60 hover:bg-[#1C2534]/50 border border-transparent'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 font-semibold transition-all ${
                  isCurrent
                    ? 'bg-justco-teal text-black shadow-glow-teal font-bold scale-105'
                    : isCompleted
                    ? 'bg-teal-500/20 text-justco-teal border border-teal-500/40'
                    : 'bg-[#222B3A] text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Icon className="w-3 h-3" />}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight truncate w-full ${
                  isCurrent ? 'text-justco-teal' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
