import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { X, ClipboardCheck, Clock, CheckCircle2, Circle, AlertCircle, ChefHat, Sparkles } from 'lucide-react';

export const TicketModal: React.FC = () => {
  const { modal, closeModal, opsTicket, toggleChecklistItem, advanceTicketStatus, selectedHub } = useOrchestrator();

  if (!modal.isOpen || modal.type !== 'ops_ticket') {
    return null;
  }

  const completedCount = opsTicket.checklist.filter((i) => i.done).length;
  const totalCount = opsTicket.checklist.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#121722] border border-[#2B374C] rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 pb-4 bg-gradient-to-b from-[#1C2536] to-[#141B26] border-b border-[#263347]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-justco-teal">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Operations Dispatch Ticket
                </span>
                <h3 className="text-sm font-bold text-white">
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
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#18202C] p-3 rounded-2xl border border-[#253245]">
              <span className="text-[10px] text-slate-400">Assigned Community Lead</span>
              <div className="text-xs font-bold text-white mt-0.5">{opsTicket.hostName}</div>
              <div className="text-[10px] text-slate-400">{opsTicket.hostRole}</div>
            </div>

            <div className="bg-[#18202C] p-3 rounded-2xl border border-[#253245]">
              <span className="text-[10px] text-slate-400">Preparation SLA</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-justco-teal" />
                <span className="text-xs font-bold text-white">15 Min Advance SLA</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">On Schedule ✓</div>
            </div>
          </div>
        </div>

        {/* Checklist & Operations Status */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">Room & Refreshment Staging</span>
              <span className="text-justco-teal font-bold">{progressPct}% Complete</span>
            </div>
            <div className="w-full h-2 bg-[#1A2230] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-justco-teal to-cyan-400 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Interactive Checklist items */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Autonomous Dispatch Checklist
            </div>
            {opsTicket.checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left border transition-all ${
                  item.done
                    ? 'bg-[#15202E]/60 border-teal-500/30 text-slate-300'
                    : 'bg-[#182130] border-[#29364A] text-white hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                      item.done ? 'bg-justco-teal text-black' : 'border border-slate-500 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className={`text-xs ${item.done ? 'line-through text-slate-400' : 'font-medium'}`}>
                    {item.item}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">
                  {item.targetTime}
                </span>
              </button>
            ))}
          </div>

          {/* Advance ticket status trigger */}
          <div className="pt-2">
            <button
              onClick={advanceTicketStatus}
              className="w-full py-2.5 rounded-xl bg-[#1D2738] hover:bg-[#253248] border border-[#2D3C54] text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-justco-teal" />
              <span>
                Current Status:{' '}
                <strong className="text-justco-teal uppercase tracking-wider">
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
