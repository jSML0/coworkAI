import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Users, UserPlus, ShieldCheck, Check, Trash2, Plus } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

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
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between mb-3 pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                Internal Team Roster
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                {selectedCount} of {employees.length} members selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAllEmployees}
              className="text-[11px] font-semibold text-[#0099FF] hover:underline px-2 py-1 rounded bg-[#EBF7FF] border border-[#21B5FF]/20"
            >
              {selectedCount === employees.length ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={() => openModal('add_member')}
              className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#21B5FF] hover:bg-[#0099FF] px-2.5 py-1 rounded-lg shadow-sm transition-colors"
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
                    ? 'bg-[#EBF7FF] border-[#21B5FF] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/90 text-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className={`w-9 h-9 rounded-xl object-cover border ${
                      isSelected ? 'border-[#21B5FF]' : 'border-slate-300'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#000105] truncate">{emp.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">{emp.role}</span>
                    <span className="text-[9px] font-mono text-[#0099FF] font-medium block">{emp.department}</span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-[#21B5FF] text-white shadow-xs' : 'border border-slate-300 bg-white'
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
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between mb-3 pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                External Visitors ({visitors.length})
              </h3>
              <p className="text-[11px] text-slate-500">Auto-issues building gantry pass & NDA clearance</p>
            </div>
          </div>

          <button
            onClick={() => openModal('add_visitor')}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Visitor</span>
          </button>
        </div>

        {visitors.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center">
            <p className="text-xs text-slate-500">No external visitors registered.</p>
            <button
              onClick={() => openModal('add_visitor')}
              className="text-xs font-semibold text-[#0099FF] hover:underline mt-1 inline-block"
            >
              + Register VIP Client or Investor
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {visitors.map((vis) => (
              <div
                key={vis.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/70"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {vis.avatar ? (
                    <img
                      src={vis.avatar}
                      alt={vis.name}
                      className="w-8 h-8 rounded-xl object-cover border border-amber-300 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-black flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {vis.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#000105] truncate">{vis.name}</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded font-semibold font-mono">
                        {vis.securityClearance}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 truncate">
                      {vis.company} • Host: {vis.hostName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-600 font-mono font-medium hidden xs:inline bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Gantry QR Ready
                  </span>
                  <button
                    onClick={() => removeVisitor(vis.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
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
