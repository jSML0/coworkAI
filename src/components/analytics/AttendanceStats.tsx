import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { UserCheck } from 'lucide-react';

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
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Real-Time Attendance & Check-In
            </h3>
            <p className="text-[11px] text-slate-400">Live IoT gantry & room sensor data</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Telemetry
        </span>
      </div>

      {/* Hero Attendance Gauge */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172435] to-[#111A26] border border-[#26374D] flex items-center justify-between">
        <div>
          <div className="text-2xl font-black text-white flex items-center gap-2">
            <span>{checkedInCount} / {totalParticipants}</span>
            <span className="text-xs font-bold text-justco-teal px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-500/30">
              {attendanceRate}% Check-In
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {checkedInCount === totalParticipants
              ? '✓ Full team & visitor attendance verified'
              : `${totalParticipants - checkedInCount} attendees awaiting gantry tap`}
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400">Punctuality Score</div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5">96.4% on-time</div>
          <div className="text-[10px] text-slate-500">+4.2m avg lead time</div>
        </div>
      </div>

      {/* Live Attendee Quick Check-In Simulator Pills */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          <span>Interactive Attendee Check-in Status</span>
          <span className="text-[10px] text-justco-teal font-normal">Tap avatar to simulate NFC tap</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {selectedEmployees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => toggleEmployeeCheckIn(emp.id)}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                emp.checkedIn
                  ? 'bg-[#182638] border-emerald-500/40 text-slate-200'
                  : 'bg-[#10151E] border-[#222E40] text-slate-500 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={emp.avatar} alt={emp.name} className="w-6 h-6 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold truncate text-white">{emp.name.split(' ')[0]}</div>
                <div className="text-[9px] truncate">
                  {emp.checkedIn ? <span className="text-emerald-400">In Hub ✓</span> : 'Tap to scan'}
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
                  ? 'bg-[#222119] border-amber-500/50 text-slate-200'
                  : 'bg-[#10151E] border-[#222E40] text-slate-500 opacity-70 hover:opacity-100'
              }`}
            >
              {vis.avatar ? (
                <img src={vis.avatar} alt={vis.name} className="w-6 h-6 rounded-lg object-cover border border-amber-500/40" />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold text-xs">
                  {vis.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold truncate text-white">{vis.name.split(' ')[0]} (VIP)</div>
                <div className="text-[9px] truncate">
                  {vis.checkedIn ? <span className="text-amber-400">Gantry In ✓</span> : 'Tap to scan'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
