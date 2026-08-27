import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { UserCheck } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const AttendanceStats: React.FC = () => {
  const {
    totalParticipants,
    checkedInCount,
    attendanceRate,
    employees,
    selectedEmployeeIds,
    visitors,
    toggleEmployeeCheckIn,
    toggleVisitorCheckIn,
  } = useOrchestrator();

  const selectedEmployees = employees.filter((e) => selectedEmployeeIds.includes(e.id));

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-4 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      {/* Header */}
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Real-Time Attendance & Check-In
            </h3>
            <p className="text-[11px] text-slate-500">Live IoT gantry & room sensor data</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Telemetry
        </span>
      </div>

      {/* Hero Attendance Gauge */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EBF7FF] via-[#F4F9FF] to-white border border-[#21B5FF]/30 flex items-center justify-between">
        <div>
          <div className="text-2xl font-black text-[#000105] flex items-center gap-2 font-mono">
            <span>{checkedInCount} / {totalParticipants}</span>
            <span className="text-xs font-bold text-[#0099FF] px-2 py-0.5 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30">
              {attendanceRate}% Check-In
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {checkedInCount === totalParticipants
              ? '✓ Full team & visitor attendance verified'
              : `${totalParticipants - checkedInCount} attendees awaiting gantry tap`}
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-500 font-mono">Punctuality Score</div>
          <div className="text-sm font-bold text-emerald-700 mt-0.5 font-mono">96.4% on-time</div>
          <div className="text-[10px] text-slate-500 font-mono">+4.2m avg lead time</div>
        </div>
      </div>

      {/* Live Attendee Quick Check-In Simulator Pills */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          <span>Interactive Attendee Check-in Status</span>
          <span className="text-[10px] text-[#0099FF] font-medium font-mono">Tap avatar to simulate NFC tap</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {selectedEmployees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => toggleEmployeeCheckIn(emp.id)}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                emp.checkedIn
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-500 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={emp.avatar} alt={emp.name} className="w-6 h-6 rounded-lg object-cover border border-slate-200" />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold truncate text-[#000105]">{emp.name.split(' ')[0]}</div>
                <div className="text-[9px] truncate font-mono">
                  {emp.checkedIn ? <span className="text-emerald-700 font-semibold">In Hub ✓</span> : 'Tap to scan'}
                </div>
              </div>
            </button>
          ))}

          {visitors.map((vis) => (
            <button
              key={vis.id}
              onClick={() => toggleVisitorCheckIn(vis.id)}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                vis.checkedIn
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-500 opacity-70 hover:opacity-100'
              }`}
            >
              {vis.avatar ? (
                <img src={vis.avatar} alt={vis.name} className="w-6 h-6 rounded-lg object-cover border border-amber-300" />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-amber-400 text-black flex items-center justify-center font-bold text-xs">
                  {vis.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold truncate text-[#000105]">{vis.name.split(' ')[0]} (VIP)</div>
                <div className="text-[9px] truncate font-mono">
                  {vis.checkedIn ? <span className="text-amber-800 font-semibold">Gantry In ✓</span> : 'Tap to scan'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
