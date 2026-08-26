import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, CheckCircle2, Cpu, Zap } from 'lucide-react';

export const AIOptimizingState: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [activeStep, setActiveStep] = useState(0);

  const optimizationSteps = [
    'Evaluating Singapore CBD transit friction & Promenade MRT distance...',
    'Solving co-location geometry: pairing Orion 1 room with Zone B hot-desk pods...',
    'Checking AV diagnostics: Neat Bar 360 AI framing & dual 4K display readiness...',
    'Synthesizing Barista kitchen queue & building gantry visitor clearance...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete?.();
          return 100;
        }
        return prev + 18;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 25 && progress < 50) setActiveStep(1);
    else if (progress >= 50 && progress < 80) setActiveStep(2);
    else if (progress >= 80) setActiveStep(3);
  }, [progress]);

  return (
    <div className="p-6 rounded-3xl bg-[#121824] border border-teal-500/40 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 my-4">
      {/* Glowing AI Core Indicator */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-justco-teal via-cyan-400 to-indigo-600 flex items-center justify-center p-[2px] shadow-glow-teal animate-pulse">
          <div className="w-full h-full bg-[#0E141E] rounded-[14px] flex items-center justify-center text-justco-teal">
            <BrainCircuit className="w-8 h-8 animate-spin-slow" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full border-2 border-[#121824] flex items-center justify-center text-black font-black text-[9px]">
          ⚡
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-justco-teal uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Constraint Optimization Engine</span>
        </div>
        <h3 className="text-sm font-extrabold text-white mt-1">
          Synthesizing Multi-Variable Workspace Match...
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs space-y-1">
        <div className="w-full h-2 bg-[#1A2332] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-justco-teal via-cyan-400 to-indigo-500 transition-all duration-200"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>Constraint Solver</span>
          <span className="text-justco-teal font-bold">{Math.min(100, progress)}%</span>
        </div>
      </div>

      {/* Step List */}
      <div className="w-full space-y-1.5 text-left text-xs bg-[#0E131C] p-3 rounded-2xl border border-[#1E2738]">
        {optimizationSteps.map((stepText, idx) => {
          const isDone = activeStep > idx;
          const isCurrent = activeStep === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 text-[11px] transition-colors ${
                isDone
                  ? 'text-emerald-400'
                  : isCurrent
                  ? 'text-justco-teal font-semibold'
                  : 'text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              ) : isCurrent ? (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-justco-teal border-t-transparent animate-spin flex-shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />
              )}
              <span className="truncate">{stepText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
