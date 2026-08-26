import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { ActionChecklist } from './ActionChecklist';
import { PassDistributionList } from './PassDistributionList';
import { OpsServiceTicket } from './OpsServiceTicket';
import { Send, ArrowRight, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

export const Screen3Passes: React.FC = () => {
  const { nextStep } = useOrchestrator();

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-justco-teal font-bold">
          <Send className="w-4 h-4" />
          <span>Step 3 of 4: Automated Actions & Pass Distribution</span>
        </div>
      </div>

      {/* 1. Automated Execution Timeline Checklist */}
      <ActionChecklist />

      {/* 2. Ops Service Ticket Summary */}
      <OpsServiceTicket />

      {/* 3. Pass Distribution List */}
      <PassDistributionList />

      {/* Inline Proceed CTA */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172335] to-[#121B27] border border-teal-500/30 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white">All passes dispatched!</h4>
          <p className="text-[11px] text-slate-400">View post-meeting space utilization & AI advisory</p>
        </div>
        <button
          onClick={nextStep}
          className="px-3.5 py-2 rounded-xl bg-justco-teal hover:bg-justco-teal-dark text-black font-bold text-xs shadow-glow-teal flex items-center gap-1.5 transition-all"
        >
          <span>View Space Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
