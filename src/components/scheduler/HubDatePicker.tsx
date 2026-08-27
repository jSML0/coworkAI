import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { MapPin, Calendar, Clock, Train, Activity, Sparkles } from 'lucide-react';
import { JUSTCO_HUBS } from '../../data/mockData';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const HubDatePicker: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
  } = useOrchestrator();

  const timeSlots = [
    { start: '09:00', end: '17:00', label: 'Full Day (09:00 - 17:00)', hours: 8 },
    { start: '09:00', end: '13:00', label: 'Morning Sprint (09:00 - 13:00)', hours: 4 },
    { start: '13:00', end: '18:00', label: 'Afternoon Collab (13:00 - 18:00)', hours: 5 },
    { start: '18:00', end: '22:00', label: 'After-Hours Event (18:00 - 22:00)', hours: 4 },
  ];

  return (
    <div className="space-y-4">
      {/* Date & Time Selection */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center gap-2 mb-3 pr-6">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Date & Orchestration Window
            </h3>
            <p className="text-[11px] text-slate-500 font-mono">Select session date & duration</p>
          </div>
        </div>

        {/* Date presets + input */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={() => setSelectedDate('2026-08-25')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedDate === '2026-08-25'
                ? 'bg-[#21B5FF] text-white font-bold border-[#21B5FF] shadow-glow-blue'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            Today (Aug 25)
          </button>
          <button
            onClick={() => setSelectedDate('2026-08-26')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedDate === '2026-08-26'
                ? 'bg-[#21B5FF] text-white font-bold border-[#21B5FF] shadow-glow-blue'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            Tomorrow (Aug 26)
          </button>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-full bg-slate-50 border border-slate-200 rounded-xl px-2 text-[11px] text-slate-800 outline-none focus:border-[#21B5FF] font-mono"
            />
          </div>
        </div>

        {/* Time duration chips */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#0099FF]" /> Duration Window
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot.label === slot.label;
              const isAfter = slot.start >= '18:00';
              return (
                <button
                  key={slot.label}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`py-2 px-2.5 rounded-xl text-left border transition-all text-xs ${
                    isSelected
                      ? 'bg-[#EBF7FF] border-[#21B5FF] text-[#000105] shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{slot.label.split(' (')[0]}</div>
                    {isAfter && (
                      <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1 rounded font-mono">
                        🌙 AC Surcharge
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#0099FF] font-mono font-medium">{slot.start} - {slot.end}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* JustCo Regional Network — AI Discovery Pool */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between mb-3 pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                Location Discovery Scope
              </h3>
              <p className="text-[11px] text-slate-500">AI automatically matches optimal hub in Step 2</p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/30 flex items-center gap-1 font-mono">
            <Sparkles className="w-3 h-3" />
            4 Hubs in Pool
          </span>
        </div>

        {/* AI Discovery Callout */}
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-[#EBF7FF] via-[#F4F9FF] to-white border border-[#21B5FF]/30 text-[11px] text-slate-700 leading-relaxed">
          <span className="font-bold text-[#0099FF]">How Location Discovery Works:</span> Based on your selected team roster, guest security clearance, room layout, and required hot desks, the AI Space Recommender in <strong className="text-[#000105]">Step 2</strong> evaluates live occupancy, transit proximity, and contiguous desk pods to select the best hub.
        </div>

        {/* Candidate Hubs in Network Pool */}
        <div className="space-y-2">
          {JUSTCO_HUBS.map((hub) => {
            const isLowPeak = hub.congestionScore <= 45;

            return (
              <div
                key={hub.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#000105] truncate">{hub.name}</h4>
                    <span className="text-[9px] text-slate-500 font-medium truncate hidden xs:inline">
                      {hub.district}
                    </span>
                  </div>

                  {/* Metrics Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="text-[9px] bg-white px-1.5 py-0.5 rounded text-slate-600 border border-slate-200 flex items-center gap-1 font-mono">
                      <Train className="w-2.5 h-2.5 text-[#0099FF]" /> {hub.transitDistanceMins}m to MRT
                    </span>

                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold border flex items-center gap-1 font-mono ${
                        isLowPeak
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <Activity className="w-2.5 h-2.5" />
                      {hub.congestionScore}% Congestion
                    </span>

                    <span className="text-[9px] text-slate-500 font-mono">
                      {hub.availableRooms} rooms available
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-[#0099FF] bg-[#EBF7FF] px-2 py-1 rounded-lg border border-[#21B5FF]/30 font-semibold whitespace-nowrap">
                  Candidate Hub
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
