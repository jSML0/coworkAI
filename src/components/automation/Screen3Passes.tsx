import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { PaymentClearanceCard } from './PaymentClearanceCard';
import { ActionChecklist } from './ActionChecklist';
import { PassDistributionList } from './PassDistributionList';
import { OpsServiceTicket } from './OpsServiceTicket';
import { CreditCard, ArrowRight } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const Screen3Passes: React.FC = () => {
  const { nextStep } = useOrchestrator();

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#0099FF] font-bold">
          <CreditCard className="w-4 h-4" />
          <span>Step 3 of 4: Cost Authorization & Payment Clearance</span>
        </div>
      </div>

      {/* 1. Highlight Cost & Payment Authorization */}
      <PaymentClearanceCard />

      {/* 2. Automated Execution Timeline Checklist */}
      <ActionChecklist />

      {/* 3. Ops Service Ticket Summary */}
      <OpsServiceTicket />

      {/* 4. Pass Distribution List */}
      <PassDistributionList />

      {/* Inline Proceed CTA */}
      <div className="relative p-4 rounded-2xl bg-white border border-[#21B5FF]/40 shadow-sm flex items-center justify-between overflow-hidden">
        <BrandGridWatermark className="absolute top-2 right-2 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="pr-4">
          <h4 className="text-xs font-bold text-[#000105]">Payment Cleared & Passes Dispatched!</h4>
          <p className="text-[11px] text-slate-500">View post-meeting space analytics & plan recommendations</p>
        </div>
        <button
          onClick={nextStep}
          className="px-3.5 py-2 rounded-xl bg-[#21B5FF] hover:bg-[#0099FF] text-white font-bold text-xs shadow-glow-blue flex items-center gap-1.5 transition-all flex-shrink-0"
        >
          <span>Confirm & View Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
