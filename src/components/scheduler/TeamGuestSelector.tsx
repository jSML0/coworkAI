import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Users, UserPlus, ShieldCheck, Check, Trash2, Plus } from 'lucide-react';

export const TeamGuestSelector: React.FC = () => {
  const {
    employees,
    selectedEmployeeIds,
    toggleEmployee,
    selectAllEmployees,
    visitors,
    removeVisitor,
    openModal,
  } = useOrchestrator();

  const selectedCount = selectedEmployeeIds.length;

  return (
    <div className="space-y-4">
      {/* Internal Team Multi-selector */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Internal Team Roster
              </h3>
              <p className="text-[11px] text-slate-400">
                {selectedCount} of {employees.length} members selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAllEmployees}
              className="text-[11px] font-semibold text-justco-teal hover:underline px-2 py-1 rounded bg-teal-500/10 border border-teal-500/20"
            >
              {selectedCount === employees.length ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={() => openModal('add_member')}
              className="flex items-center gap-1 text-[11px] font-bold text-black bg-justco-teal hover:bg-justco-teal-dark px-2.5 py-1 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {employees.map((emp) => {
            const isSelected = selectedEmployeeIds.includes(emp.id);
            return (
              <button
                key={emp.id}
                onClick={() => toggleEmployee(emp.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1A2536] border-justco-teal/60 shadow-sm'
                    : 'bg-[#101620] border-[#1E2738] opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className={`w-9 h-9 rounded-xl object-cover border ${
                      isSelected ? 'border-justco-teal' : 'border-[#28354A]'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-white truncate">{emp.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">{emp.role}</span>
                    <span className="text-[9px] font-mono text-justco-teal/80 block">{emp.department}</span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-justco-teal text-black' : 'border border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* External Visitors & Security Clearance */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                External Visitors ({visitors.length})
              </h3>
              <p className="text-[11px] text-slate-400">Auto-issues building gantry pass & NDA clearance</p>
            </div>
          </div>

          <button
            onClick={() => openModal('add_visitor')}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 px-2.5 py-1 rounded-lg transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Visitor</span>
          </button>
        </div>

        {visitors.length === 0 ? (
          <div className="p-4 rounded-xl bg-[#10151E] border border-dashed border-[#232E40] text-center">
            <p className="text-xs text-slate-400">No external visitors registered.</p>
            <button
              onClick={() => openModal('add_visitor')}
              className="text-xs font-semibold text-justco-teal hover:underline mt-1 inline-block"
            >
              + Register VIP Client or Investor
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {visitors.map((vis) => (
              <div
                key={vis.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#182230] border border-[#253245]"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {vis.avatar ? (
                    <img
                      src={vis.avatar}
                      alt={vis.name}
                      className="w-8 h-8 rounded-xl object-cover border border-amber-500/40 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {vis.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">{vis.name}</span>
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-semibold">
                        {vis.securityClearance}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">
                      {vis.company} • Host: {vis.hostName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-400 font-mono hidden xs:inline">
                    Gantry QR Ready
                  </span>
                  <button
                    onClick={() => removeVisitor(vis.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove visitor"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
