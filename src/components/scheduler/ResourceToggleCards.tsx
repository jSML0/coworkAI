import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import {
  Layers,
  LayoutGrid,
  Users,
  Zap,
  MonitorPlay,
  Tv,
  Camera,
  Video,
  Mic,
  PenTool,
  Coffee,
  Plus,
  Minus,
  Check,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MEETING_LAYOUTS, VC_HARDWARE_OPTIONS, CATERING_PACKAGES } from '../../data/mockData';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const ResourceToggleCards: React.FC = () => {
  const {
    desksCount,
    setDesksCount,
    desksTimeWindow,
    setDesksTimeWindow,
    privacyPodsCount,
    setPrivacyPodsCount,
    podsTimeWindow,
    setPodsTimeWindow,
    selectedLayoutId,
    setSelectedLayoutId,
    selectedHardwareIds,
    toggleHardware,
    selectedCateringIds,
    toggleCatering,
    specialInstructions,
    setSpecialInstructions,
    totalParticipants,
  } = useOrchestrator();

  const [isDesksWindowOpen, setIsDesksWindowOpen] = useState(false);
  const [isPodsWindowOpen, setIsPodsWindowOpen] = useState(false);

  const deskWindowOptions = [
    'Full Day (09:00 - 17:00)',
    'Morning Half-Day (09:00 - 13:00)',
    'Afternoon & Evening (13:00 - 18:00)',
    'Custom 2-Hour Intensive (10:00 - 12:00)',
  ];

  const podWindowOptions = [
    '2-Hour Focus Slot (14:00 - 16:00)',
    'Morning Client Calls (10:00 - 12:00)',
    'Afternoon 1-on-1s (13:00 - 17:00)',
    'Full Day Window (09:00 - 17:00)',
  ];

  const getLayoutIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'LayoutGrid':
        return LayoutGrid;
      case 'Zap':
        return Zap;
      case 'MonitorPlay':
        return MonitorPlay;
      default:
        return LayoutGrid;
    }
  };

  const getHardwareIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv':
        return Tv;
      case 'Camera':
        return Camera;
      case 'Video':
        return Video;
      case 'Mic':
        return Mic;
      case 'PenTool':
        return PenTool;
      default:
        return Tv;
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Privacy Pods Needed Section */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                Privacy Pods Needed
              </h3>
              <p className="text-[11px] text-slate-500">Soundproof acoustic phone booths & 1-on-1 focus pods</p>
            </div>
          </div>

          {/* Counter Controls */}
          <div className="flex items-center gap-2.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setPrivacyPodsCount(Math.max(0, privacyPodsCount - 1))}
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-[#000105] flex items-center justify-center transition-colors shadow-xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-[#0099FF] font-mono">
              {privacyPodsCount}
            </span>
            <button
              onClick={() => setPrivacyPodsCount(Math.min(8, privacyPodsCount + 1))}
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-[#000105] flex items-center justify-center transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Independent Window Period Selection Trigger for Privacy Pods */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>Pod Window Period:</span>
            </div>

            <button
              onClick={() => setIsPodsWindowOpen(!isPodsWindowOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-[#EBF7FF] text-slate-700 hover:text-[#0099FF] border border-slate-200 text-[11px] font-semibold transition-all shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0099FF]" />
              <span className="font-mono">{podsTimeWindow}</span>
              {isPodsWindowOpen ? (
                <ChevronUp className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </div>

          {/* Collapsible Window Options */}
          {isPodsWindowOpen && (
            <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150">
              {podWindowOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setPodsTimeWindow(opt);
                    setIsPodsWindowOpen(false);
                  }}
                  className={`text-left text-[10px] p-2 rounded-lg border font-mono transition-all ${
                    podsTimeWindow === opt
                      ? 'bg-[#21B5FF] text-white border-[#21B5FF] font-bold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#21B5FF]/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Acoustic Pods Intelligence Callout */}
        {privacyPodsCount > 0 ? (
          <div className="mt-2.5 p-2.5 rounded-xl bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0099FF] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-700 leading-relaxed">
              <strong className="text-[#0099FF]">Smart Acoustic Co-Location:</strong> AI reserves{' '}
              <strong className="text-[#000105]">
                {privacyPodsCount} Soundproof Privacy Pod{privacyPodsCount > 1 ? 's' : ''} (Class A Acoustic Rating, HEPA ventilation & ring light)
              </strong>{' '}
              for <strong className="text-[#000105] font-mono">{podsTimeWindow}</strong> in Zone B adjacent to hot desks.
            </p>
          </div>
        ) : (
          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
            <span className="text-[11px] text-slate-400">No private acoustic pods reserved.</span>
          </div>
        )}
      </div>

      {/* 2. Dedicated Hot Desks Co-location Counter */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                Dedicated Desks Needed
              </h3>
              <p className="text-[11px] text-slate-500">Co-located hot desks for pre/post meeting work</p>
            </div>
          </div>

          {/* Counter Controls */}
          <div className="flex items-center gap-2.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setDesksCount(Math.max(0, desksCount - 1))}
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-[#000105] flex items-center justify-center transition-colors shadow-xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-[#0099FF] font-mono">
              {desksCount}
            </span>
            <button
              onClick={() => setDesksCount(Math.min(16, desksCount + 1))}
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-[#000105] flex items-center justify-center transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Independent Window Period Selection Trigger */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>Desk Window Period:</span>
            </div>

            <button
              onClick={() => setIsDesksWindowOpen(!isDesksWindowOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-[#EBF7FF] text-slate-700 hover:text-[#0099FF] border border-slate-200 text-[11px] font-semibold transition-all shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0099FF]" />
              <span className="font-mono">{desksTimeWindow}</span>
              {isDesksWindowOpen ? (
                <ChevronUp className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </div>

          {/* Collapsible Window Options */}
          {isDesksWindowOpen && (
            <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150">
              {deskWindowOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDesksTimeWindow(opt);
                    setIsDesksWindowOpen(false);
                  }}
                  className={`text-left text-[10px] p-2 rounded-lg border font-mono transition-all ${
                    desksTimeWindow === opt
                      ? 'bg-[#21B5FF] text-white border-[#21B5FF] font-bold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#21B5FF]/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Co-location Intelligence Highlight */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#0099FF] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed">
            <strong className="text-[#0099FF]">Smart Co-Location:</strong> AI reserves {desksCount} contiguous desks in{' '}
            <strong className="text-[#000105]">Zone B (Pods 12–{12 + Math.max(0, desksCount - 1)})</strong> for{' '}
            <strong className="text-[#000105] font-mono">{desksTimeWindow}</strong>, directly adjacent to your meeting suite.
          </p>
        </div>
      </div>


      {/* Meeting Room Layout */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center gap-2 mb-3 pr-6">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Meeting Room Configuration
            </h3>
            <p className="text-[11px] text-slate-500">Select layout matching your agenda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {MEETING_LAYOUTS.map((layout) => {
            const isSelected = selectedLayoutId === layout.id;
            const LayoutIcon = getLayoutIcon(layout.iconName);

            return (
              <button
                key={layout.id}
                onClick={() => setSelectedLayoutId(layout.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#EBF7FF] border-[#21B5FF] shadow-sm'
                    : 'bg-slate-50 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#21B5FF] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <LayoutIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#000105]">{layout.name}</h4>
                      <span className="text-[10px] text-[#0099FF] font-medium">{layout.tagline}</span>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-[#21B5FF] text-white shadow-xs' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">{layout.description}</p>
                <div className="mt-2 text-[9px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded inline-block font-mono">
                  Capacity: {layout.minPax} - {layout.maxPax} Pax
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* VC & Hardware Integration */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between mb-3 pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                VC Hardware & Audio/Visual Setup
              </h3>
              <p className="text-[11px] text-slate-500">Pre-calibrated and staged 15m prior to start</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#0099FF] bg-[#EBF7FF] px-2 py-0.5 rounded-full border border-[#21B5FF]/30 font-mono">
            {selectedHardwareIds.length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {VC_HARDWARE_OPTIONS.map((hw) => {
            const isSelected = selectedHardwareIds.includes(hw.id);
            const HwIcon = getHardwareIcon(hw.iconName);

            return (
              <button
                key={hw.id}
                onClick={() => toggleHardware(hw.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#EBF7FF] border-[#21B5FF] text-[#000105]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-[#21B5FF] text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <HwIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#000105] truncate">{hw.name}</span>
                      <span className="text-[9px] bg-cyan-50 text-cyan-700 px-1.5 py-0.2 rounded border border-cyan-200 font-mono font-medium">
                        {hw.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{hw.specs}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
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

      {/* Catering & F&B Packages */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center justify-between mb-3 pr-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                In-House Catering & Barista Packages
              </h3>
              <p className="text-[11px] text-slate-500">Freshly prepared & delivered directly to suite</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-mono">
            {selectedCateringIds.length} Selected
          </span>
        </div>

        <div className="space-y-2.5">
          {CATERING_PACKAGES.map((pkg) => {
            const isSelected = selectedCateringIds.includes(pkg.id);
            const totalPkgCost = pkg.pricePerPax * totalParticipants;

            return (
              <button
                key={pkg.id}
                onClick={() => toggleCatering(pkg.id)}
                className={`w-full p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#000105]">{pkg.name}</h4>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded border border-amber-300 font-semibold font-mono">
                        {pkg.timeSlot}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{pkg.description}</p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {pkg.dietaryTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-amber-600">
                      ${pkg.pricePerPax} <span className="text-[10px] text-slate-500 font-normal">/ pax</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      ~${totalPkgCost} total
                    </div>
                    <div
                      className={`w-5 h-5 rounded-lg ml-auto mt-1 flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 text-white shadow-xs' : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Instructions */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
        
        <div className="flex items-center gap-2 mb-2 pr-6">
          <MessageSquare className="w-4 h-4 text-[#0099FF]" />
          <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
            Special Admin Instructions (Optional)
          </h3>
        </div>
        <textarea
          rows={2}
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="e.g. VIP guests arrive at 09:15 AM via North Atrium, need 1 HDMI adapter for presenter..."
          className="w-full bg-slate-50 border border-slate-200 focus:border-[#21B5FF] rounded-xl p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none resize-none transition-colors"
        />
      </div>
    </div>
  );
};
