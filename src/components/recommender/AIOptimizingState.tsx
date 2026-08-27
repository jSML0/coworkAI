import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

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
    <div className="relative p-6 rounded-3xl bg-white border border-[#21B5FF]/40 shadow-xl flex flex-col items-center justify-center text-center space-y-4 my-4 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-35" />
      
      {/* Glowing AI Core Indicator */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#21B5FF] via-cyan-400 to-blue-600 flex items-center justify-center p-[2px] shadow-glow-blue animate-pulse">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#21B5FF]">
            <BrainCircuit className="w-8 h-8 animate-spin-slow" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#21B5FF] rounded-full border-2 border-white flex items-center justify-center text-white font-black text-[9px]">
          ⚡
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0099FF] uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Constraint Optimization Engine</span>
        </div>
        <h3 className="text-sm font-extrabold text-[#000105] mt-1">
          Synthesizing Multi-Variable Workspace Match...
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs space-y-1">
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#21B5FF] via-[#0099FF] to-blue-600 transition-all duration-200"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Constraint Solver</span>
          <span className="text-[#0099FF] font-bold">{Math.min(100, progress)}%</span>
        </div>
      </div>

      {/* Step List */}
      <div className="w-full space-y-1.5 text-left text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
        {optimizationSteps.map((stepText, idx) => {
          const isDone = activeStep > idx;
          const isCurrent = activeStep === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 text-[11px] transition-colors ${
                isDone
                  ? 'text-emerald-700 font-medium'
                  : isCurrent
                  ? 'text-[#0099FF] font-semibold'
                  : 'text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              ) : isCurrent ? (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#21B5FF] border-t-transparent animate-spin flex-shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0" />
              )}
              <span className="truncate">{stepText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
