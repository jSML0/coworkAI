import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { CheckCircle2, Zap, Send, ShieldCheck, Coffee, BellRing } from 'lucide-react';

export const ActionChecklist: React.FC = () => {
  const { totalParticipants, visitors, selectedEmployeeIds } = useOrchestrator();

  const actions = [
    {
      id: 'a1',
      title: 'Dynamic Mobile Passes & NFC Credentials',
      description: `${selectedEmployeeIds.length} employee keycards synced with Apple/Google Wallet turnstile token`,
      status: 'Automated ✓',
      icon: Send,
      badgeColor: 'text-justco-teal bg-teal-500/10 border-teal-500/30',
    },
    {
      id: 'a2',
      title: 'Visitor Gantry Pre-Registration & NDA Clearance',
      description: `${visitors.length} external guests registered with building security; SMS clearance links sent`,
      status: 'Secured ✓',
      icon: ShieldCheck,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'a3',
      title: 'Operations Service Ticket Auto-Dispatched',
      description: 'JustCo Community Experience Lead & Barista assigned 15-min preparation SLA',
      status: 'Dispatched ✓',
      icon: Coffee,
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'a4',
      title: 'Smart Calendar & Turnstile Sync Dispatched',
      description: 'Exchange/Google calendar invites updated with Level 3 indoor navigation link',
      status: 'Synced ✓',
      icon: BellRing,
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
  ];

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Autonomous Dispatch Pipeline
            </h3>
            <p className="text-[11px] text-slate-400">All 4 backend orchestration workflows triggered</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> 100% Executed
        </span>
      </div>

      <div className="space-y-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="p-3 rounded-2xl bg-[#10151E] border border-[#1E2838] flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-xl bg-[#192332] border border-[#26354B] flex items-center justify-center text-slate-300 flex-shrink-0">
                  <Icon className="w-4 h-4 text-justco-teal" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{act.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate leading-snug">{act.description}</p>
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
