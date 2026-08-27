import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { X, ClipboardCheck, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { BrandGridWatermark } from './BrandGridWatermark';

export const TicketModal: React.FC = () => {
  const { modal, closeModal, opsTicket, toggleChecklistItem, advanceTicketStatus, selectedHub } = useOrchestrator();

  if (!modal.isOpen || modal.type !== 'ops_ticket') {
    return null;
  }

  const completedCount = opsTicket.checklist.filter((i) => i.done).length;
  const totalCount = opsTicket.checklist.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative p-5 pb-4 bg-[#000105] text-white border-b border-slate-800">
          <BrandGridWatermark className="absolute top-2 right-12 pointer-events-none select-none" opacity="opacity-30" />
          
          <div className="relative flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#21B5FF] flex items-center justify-center text-white shadow-glow-blue">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                  Operations Dispatch Ticket
                </span>
                <h3 className="text-sm font-bold text-white font-mono">
                  #{opsTicket.ticketId} • {selectedHub.name}
                </h3>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Ticket Assignee & Status */}
          <div className="relative grid grid-cols-2 gap-3 mt-4 z-10">
            <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400">Assigned Community Lead</span>
              <div className="text-xs font-bold text-white mt-0.5">{opsTicket.hostName}</div>
              <div className="text-[10px] text-slate-400">{opsTicket.hostRole}</div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400">Preparation SLA</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#21B5FF]" />
                <span className="text-xs font-bold text-white">15 Min Advance SLA</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-medium font-mono">On Schedule ✓</div>
            </div>
          </div>
        </div>

        {/* Checklist & Operations Status */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto bg-white">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 font-semibold">Room & Refreshment Staging</span>
              <span className="text-[#0099FF] font-bold font-mono">{progressPct}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#21B5FF] to-[#0099FF] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Interactive Checklist items */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Autonomous Dispatch Checklist
            </div>
            {opsTicket.checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left border transition-all ${
                  item.done
                    ? 'bg-[#EBF7FF]/50 border-[#21B5FF]/30 text-slate-600'
                    : 'bg-slate-50 border-slate-200 text-[#000105] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                      item.done ? 'bg-[#21B5FF] text-white shadow-xs' : 'border border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className={`text-xs ${item.done ? 'line-through text-slate-400' : 'font-medium'}`}>
                    {item.item}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                  {item.targetTime}
                </span>
              </button>
            ))}
          </div>

          {/* Advance ticket status trigger */}
          <div className="pt-2">
            <button
              onClick={advanceTicketStatus}
              className="w-full py-2.5 rounded-xl bg-[#EBF7FF] hover:bg-[#21B5FF] hover:text-white border border-[#21B5FF]/30 text-xs font-semibold text-[#0099FF] flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Current Status:{' '}
                <strong className="uppercase tracking-wider font-mono font-bold">
                  {opsTicket.status}
                </strong>{' '}
                (Tap to Advance)
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
