import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { ClipboardCheck, Clock, ChefHat, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const OpsServiceTicket: React.FC = () => {
  const { opsTicket, openModal, selectedHub } = useOrchestrator();

  const completedCount = opsTicket.checklist.filter((i) => i.done).length;
  const totalCount = opsTicket.checklist.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              On-Site Operations Service Ticket
            </h3>
            <p className="text-[11px] text-slate-400">
              Assigned to {opsTicket.hostName} ({opsTicket.hostRole})
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold text-justco-teal bg-teal-500/15 border border-teal-500/30 px-2 py-0.5 rounded-full uppercase">
          {opsTicket.status}
        </span>
      </div>

      {/* SLA & Staging Status Bar */}
      <div className="p-3 rounded-2xl bg-[#10151E] border border-[#1E2838] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-justco-teal" />
            <span>Room & Refreshment Staging</span>
          </div>
          <span className="font-bold text-justco-teal">{pct}% Complete ({completedCount}/{totalCount})</span>
        </div>

        <div className="w-full h-2 bg-[#1A2332] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-justco-teal to-cyan-400 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <span>{selectedHub.name} • Level 3 Suite</span>
          <span className="text-emerald-400 font-medium">15-Min Advance SLA Active</span>
        </div>
      </div>

      {/* Button to open interactive ticket modal */}
      <button
        onClick={() => openModal('ops_ticket')}
        className="w-full py-2.5 rounded-xl bg-[#1A2536] hover:bg-[#223046] border border-[#2B3B52] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-justco-teal" />
        <span>Manage Operations Checklist & Prep</span>
      </button>
    </div>
  );
};
