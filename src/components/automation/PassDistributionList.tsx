import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';

export const PassDistributionList: React.FC = () => {
  const {
    employees,
    selectedEmployeeIds,
    visitors,
    openModal,
  } = useOrchestrator();

  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const selectedEmployees = employees.filter((e) => selectedEmployeeIds.includes(e.id));

  const handleResendAll = () => {
    setResendStatus('Resending notifications...');
    setTimeout(() => {
      setResendStatus('All passes & QR links re-sent successfully ✓');
      setTimeout(() => setResendStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Issued Passes & NFC Credentials
            </h3>
            <p className="text-[11px] text-slate-400">
              Tap any pass below to inspect the dynamic keycard & QR payload
            </p>
          </div>
        </div>

        <button
          onClick={handleResendAll}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-justco-teal bg-[#182230] px-2.5 py-1 rounded-xl border border-[#273549] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Resend All</span>
        </button>
      </div>

      {resendStatus && (
        <div className="p-2.5 rounded-xl bg-teal-500/15 border border-teal-500/30 text-xs text-justco-teal text-center font-medium animate-in fade-in">
          {resendStatus}
        </div>
      )}

      {/* Internal Employee Passes Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Team Keycards ({selectedEmployees.length})</span>
          <span className="text-justco-teal font-normal text-[10px]">Apple / Google Wallet Ready</span>
        </div>

        <div className="space-y-2">
          {selectedEmployees.map((emp) => (
            <div
              key={emp.id}
              className="p-3 rounded-2xl bg-[#10151E] border border-[#1E2838] hover:border-[#2C3D56] flex items-center justify-between gap-2 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#273449] flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white truncate">{emp.name}</h4>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        emp.checkedIn
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      {emp.checkedIn ? 'Checked-in' : 'Pass Issued'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{emp.role}</p>
                  <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono mt-0.5">
                    <span>{emp.passId}</span>
                    <span>•</span>
                    <span className="text-justco-teal">Desk {emp.assignedDeskId}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openModal('employee_pass', emp)}
                  className="px-2.5 py-1.5 rounded-xl bg-justco-teal/15 hover:bg-justco-teal text-justco-teal hover:text-black font-bold text-[11px] border border-teal-500/30 flex items-center gap-1 transition-all"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Visitors Gantry Pass Section */}
      {visitors.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>External Visitor Fast-Passes ({visitors.length})</span>
            <span className="text-amber-400 font-normal text-[10px]">Building Gantry Authorized</span>
          </div>

          <div className="space-y-2">
            {visitors.map((vis) => (
              <div
                key={vis.id}
                className="p-3 rounded-2xl bg-[#10151E] border border-amber-500/20 hover:border-amber-500/40 flex items-center justify-between gap-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {vis.avatar ? (
                    <img
                      src={vis.avatar}
                      alt={vis.name}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {vis.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{vis.name}</h4>
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-semibold">
                        {vis.securityClearance}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{vis.company} • Host: {vis.hostName}</p>
                    <div className="text-[9px] font-mono text-amber-300/80 mt-0.5">
                      {vis.gantryPassCode}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openModal('visitor_pass', vis)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-400 text-amber-300 hover:text-black font-bold text-[11px] border border-amber-500/30 flex items-center gap-1 transition-all"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Gantry Pass</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
