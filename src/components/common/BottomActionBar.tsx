import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { ArrowLeft, ArrowRight, Sparkles, CreditCard, RefreshCw, Layers } from 'lucide-react';

export const BottomActionBar: React.FC = () => {
  const {
    step,
    nextStep,
    prevStep,
    isPaid,
    showDashboard,
    processPayment,
    resetPayment,
    totalParticipants,
    desksCount,
  } = useOrchestrator();

  const handleAction = () => {
    if (step === 1 || step === 2) {
      nextStep();
    } else if (step === 3) {
      if (!isPaid) {
        processPayment();
      } else {
        resetPayment();
      }
    }
  };

  const getButtonConfig = () => {
    if (showDashboard) {
      return { text: 'Schedule', icon: RefreshCw, isPrimary: false };
    }
    switch (step) {
      case 1:
        return { text: 'Schedule', icon: Sparkles, isPrimary: true };
      case 2:
        return { text: 'Approve', icon: Sparkles, isPrimary: true };
      case 3:
        return { text: 'Pay', icon: CreditCard, isPrimary: true };
    }
  };

  const { text: btnText, icon: BtnIcon, isPrimary } = getButtonConfig();

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sticky bottom-0 z-30 shadow-md">
      <div className="flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Back</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 pl-1">
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600">
              <Layers className="w-3.5 h-3.5 text-[#0099FF]" />
              <span className="font-bold text-[#000105] font-mono">{totalParticipants}</span> pax
              <span className="text-slate-300">•</span>
              <span className="font-bold text-[#000105] font-mono">{desksCount}</span> desks
            </div>
          </div>
        )}

        <button
          onClick={handleAction}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-glow-blue transition-all active:scale-[0.98] group ${
            isPrimary
              ? 'bg-[#21B5FF] hover:bg-[#0099FF]'
              : 'bg-[#000105] hover:bg-slate-800'
          }`}
        >
          <BtnIcon className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>{btnText}</span>
          {(step < 3 || (step === 3 && !isPaid)) && (
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
};
