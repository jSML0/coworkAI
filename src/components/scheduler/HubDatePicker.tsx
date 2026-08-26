import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { MapPin, Calendar, Clock, Train, Activity, Sparkles, Check } from 'lucide-react';
import { JUSTCO_HUBS } from '../../data/mockData';

export const HubDatePicker: React.FC = () => {
  const {
    selectedHubId,
    setSelectedHubId,
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
  } = useOrchestrator();

  const timeSlots = [
    { start: '09:00', end: '17:00', label: 'Full Day (09:00 - 17:00)', hours: 8 },
    { start: '09:00', end: '13:00', label: 'Morning Sprint (09:00 - 13:00)', hours: 4 },
    { start: '13:00', end: '18:00', label: 'Afternoon Collab (13:00 - 18:00)', hours: 5 },
  ];

  return (
    <div className="space-y-4">
      {/* Date & Time Selection */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Date & Orchestration Window
            </h3>
            <p className="text-[11px] text-slate-400">Select session date & duration</p>
          </div>
        </div>

        {/* Date presets + input */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={() => setSelectedDate('2026-08-25')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedDate === '2026-08-25'
                ? 'bg-justco-teal text-black font-bold border-justco-teal shadow-glow-teal'
                : 'bg-[#182130] text-slate-300 border-[#253245] hover:border-slate-500'
            }`}
          >
            Today (Aug 25)
          </button>
          <button
            onClick={() => setSelectedDate('2026-08-26')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedDate === '2026-08-26'
                ? 'bg-justco-teal text-black font-bold border-justco-teal shadow-glow-teal'
                : 'bg-[#182130] text-slate-300 border-[#253245] hover:border-slate-500'
            }`}
          >
            Tomorrow (Aug 26)
          </button>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-full bg-[#182130] border border-[#253245] rounded-xl px-2 text-[11px] text-slate-200 outline-none focus:border-justco-teal"
            />
          </div>
        </div>

        {/* Time duration chips */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-justco-teal" /> Duration Window
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot.label === slot.label;
              return (
                <button
                  key={slot.label}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`py-2 px-2.5 rounded-xl text-left border transition-all text-xs ${
                    isSelected
                      ? 'bg-[#1A2536] border-justco-teal text-white shadow-sm'
                      : 'bg-[#101620] border-[#1F293A] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold">{slot.label.split(' (')[0]}</div>
                  <div className="text-[10px] text-justco-teal">{slot.start} - {slot.end}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Singapore JustCo Regional Hub Selector */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Regional Singapore JustCo Hubs
              </h3>
              <p className="text-[11px] text-slate-400">AI evaluates congestion & hot-desk proximity</p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-justco-teal border border-teal-500/30">
            Live Telemetry
          </span>
        </div>

        {/* Hubs Cards */}
        <div className="space-y-2.5">
          {JUSTCO_HUBS.map((hub) => {
            const isSelected = selectedHubId === hub.id;
            const isLowPeak = hub.congestionScore <= 45;

            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`w-full p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1B273A] border-justco-teal shadow-lg shadow-teal-500/10'
                    : 'bg-[#111722] border-[#202B3C] hover:border-[#2F3E56]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{hub.name}</h4>
                      {hub.matchScore >= 95 && (
                        <span className="text-[9px] font-bold bg-teal-500 text-black px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5" /> AI Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{hub.address}</p>

                    {/* Metrics Row */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] bg-[#17202D] px-2 py-0.5 rounded-md text-slate-300 border border-[#253245] flex items-center gap-1">
                        <Train className="w-3 h-3 text-cyan-400" /> {hub.transitDistanceMins}m from MRT
                      </span>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border flex items-center gap-1 ${
                          isLowPeak
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        <Activity className="w-3 h-3" />
                        {hub.congestionScore}% Congestion ({isLowPeak ? 'Low Peak 🌿' : 'Moderate'})
                      </span>

                      <span className="text-[10px] text-slate-400">
                        {hub.availableRooms} rooms free
                      </span>
                    </div>
                  </div>

                  {/* Selection radio check */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                      isSelected ? 'bg-justco-teal text-black shadow-glow-teal' : 'border border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
