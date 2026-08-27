import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { ClipboardCheck, Clock, Sparkles } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const OpsServiceTicket: React.FC = () => {
  const { opsTicket, openModal, selectedHub } = useOrchestrator();

  const completedCount = opsTicket.checklist.filter((i) => i.done).length;
  const totalCount = opsTicket.checklist.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              On-Site Operations Service Ticket
            </h3>
            <p className="text-[11px] text-slate-500">
              Assigned to {opsTicket.hostName} ({opsTicket.hostRole})
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold text-[#0099FF] bg-[#EBF7FF] border border-[#21B5FF]/30 px-2 py-0.5 rounded-full uppercase">
          {opsTicket.status}
        </span>
      </div>

      {/* SLA & Staging Status Bar */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>Room & Refreshment Staging</span>
          </div>
          <span className="font-bold text-[#0099FF] font-mono">{pct}% Complete ({completedCount}/{totalCount})</span>
        </div>

        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#21B5FF] to-[#0099FF] transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
          <span>{selectedHub.name} • Level 3 Suite</span>
          <span className="text-emerald-700 font-semibold">15-Min Advance SLA Active</span>
        </div>
      </div>

      {/* Button to open interactive ticket modal */}
      <button
        onClick={() => openModal('ops_ticket')}
        className="w-full py-2.5 rounded-xl bg-[#EBF7FF] hover:bg-[#21B5FF] hover:text-white border border-[#21B5FF]/30 text-[#0099FF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
        <span>Manage Operations Checklist & Prep</span>
      </button>
    </div>
  );
};
