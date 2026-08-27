import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { SlidersHorizontal, Sparkles, Send, BarChart3, Check } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const StepHeader: React.FC = () => {
  const { step, setStep } = useOrchestrator();

  const steps = [
    { num: 1, title: 'Setup', desc: 'Params & Team', icon: SlidersHorizontal },
    { num: 2, title: 'AI Match', desc: 'Cluster & Hub', icon: Sparkles },
    { num: 3, title: 'Dispatch', desc: 'Passes & SLA', icon: Send },
    { num: 4, title: 'Advisory', desc: 'Analytics & ROI', icon: BarChart3 },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-3 sticky top-0 z-30 shadow-xs">
      {/* Top JustCo Brand Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="h-8 px-2 py-0.5 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-200">
            <img src={logoImg} alt="JustCo Logo" className="h-6 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-[#000105]">JustCo</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/30 font-mono">
                AI Orchestrator
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-semibold text-slate-700">SG CBD Network</span>
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
                  ? 'bg-white border border-[#21B5FF] shadow-sm'
                  : isCompleted
                  ? 'bg-[#EBF7FF]/50 hover:bg-[#EBF7FF] border border-[#21B5FF]/20'
                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 font-semibold transition-all ${
                  isCurrent
                    ? 'bg-[#21B5FF] text-white shadow-glow-blue font-bold scale-105'
                    : isCompleted
                    ? 'bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/40'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Icon className="w-3 h-3" />}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight truncate w-full ${
                  isCurrent ? 'text-[#0099FF] font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-500'
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
