import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { CheckCircle2, Zap, Send, ShieldCheck, Coffee, BellRing } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const ActionChecklist: React.FC = () => {
  const { visitors, selectedEmployeeIds } = useOrchestrator();

  const actions = [
    {
      id: 'a1',
      title: 'Dynamic Mobile Passes & NFC Credentials',
      description: `${selectedEmployeeIds.length} employee keycards synced with Apple/Google Wallet turnstile token`,
      status: 'Automated ✓',
      icon: Send,
      badgeColor: 'text-[#0099FF] bg-[#EBF7FF] border-[#21B5FF]/30',
    },
    {
      id: 'a2',
      title: 'Visitor Gantry Pre-Registration & NDA Clearance',
      description: `${visitors.length} external guests registered with building security; SMS clearance links sent`,
      status: 'Secured ✓',
      icon: ShieldCheck,
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      id: 'a3',
      title: 'Operations Service Ticket Auto-Dispatched',
      description: 'JustCo Community Experience Lead & Barista assigned 15-min preparation SLA',
      status: 'Dispatched ✓',
      icon: Coffee,
      badgeColor: 'text-cyan-800 bg-cyan-50 border-cyan-200',
    },
    {
      id: 'a4',
      title: 'Smart Calendar & Turnstile Sync Dispatched',
      description: 'Exchange/Google calendar invites updated with Level 3 indoor navigation link',
      status: 'Synced ✓',
      icon: BellRing,
      badgeColor: 'text-indigo-800 bg-indigo-50 border-indigo-200',
    },
  ];

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Autonomous Dispatch Pipeline
            </h3>
            <p className="text-[11px] text-slate-500">All 4 backend orchestration workflows triggered</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
          <CheckCircle2 className="w-3 h-3" /> 100% Executed
        </span>
      </div>

      <div className="space-y-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#0099FF] flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#0099FF]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#000105] truncate">{act.title}</h4>
                  <p className="text-[10px] text-slate-500 truncate leading-snug">{act.description}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${act.badgeColor}`}
              >
                {act.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
