import React from 'react';
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
  Utensils,
  Plus,
  Minus,
  Check,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { MEETING_LAYOUTS, VC_HARDWARE_OPTIONS, CATERING_PACKAGES } from '../../data/mockData';

export const ResourceToggleCards: React.FC = () => {
  const {
    desksCount,
    setDesksCount,
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
      {/* Dedicated Hot Desks Co-location Counter */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Dedicated Desks Needed
              </h3>
              <p className="text-[11px] text-slate-400">Co-located hot desks for pre/post meeting work</p>
            </div>
          </div>

          {/* Counter Controls */}
          <div className="flex items-center gap-2.5 bg-[#10151E] px-2.5 py-1.5 rounded-xl border border-[#242F42]">
            <button
              onClick={() => setDesksCount(Math.max(0, desksCount - 1))}
              className="w-7 h-7 rounded-lg bg-[#1B2433] hover:bg-[#253247] text-white flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-justco-teal font-mono">
              {desksCount}
            </span>
            <button
              onClick={() => setDesksCount(Math.min(16, desksCount + 1))}
              className="w-7 h-7 rounded-lg bg-[#1B2433] hover:bg-[#253247] text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Co-location Intelligence Highlight */}
        <div className="mt-3 p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-justco-teal flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-teal-200">
            <strong>Smart Co-Location:</strong> AI reserves {desksCount} contiguous desks in{' '}
            <strong>Zone B (Pods 12–{12 + Math.max(0, desksCount - 1)})</strong>, directly adjacent
            to your meeting suite for seamless breakout workflows.
          </p>
        </div>
      </div>

      {/* Meeting Room Layout */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Meeting Room Configuration
            </h3>
            <p className="text-[11px] text-slate-400">Select layout matching your agenda</p>
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
                    ? 'bg-[#1C2638] border-justco-teal shadow-md shadow-teal-500/10'
                    : 'bg-[#111722] border-[#202B3C] hover:border-[#2F3E56]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-justco-teal text-black' : 'bg-[#1C2534] text-slate-400'
                      }`}
                    >
                      <LayoutIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{layout.name}</h4>
                      <span className="text-[10px] text-justco-teal font-medium">{layout.tagline}</span>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-justco-teal text-black' : 'border border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{layout.description}</p>
                <div className="mt-2 text-[9px] text-slate-500 bg-[#161E2A] px-2 py-0.5 rounded inline-block">
                  Capacity: {layout.minPax} - {layout.maxPax} Pax
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* VC & Hardware Integration */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-justco-teal">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                VC Hardware & Audio/Visual Setup
              </h3>
              <p className="text-[11px] text-slate-400">Pre-calibrated and staged 15m prior to start</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-justco-teal bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
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
                    ? 'bg-[#192435] border-justco-teal/80 text-white'
                    : 'bg-[#101622] border-[#1F293A] text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-justco-teal text-black' : 'bg-[#1C2534] text-slate-500'
                    }`}
                  >
                    <HwIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">{hw.name}</span>
                      <span className="text-[9px] bg-cyan-500/15 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30">
                        {hw.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{hw.specs}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
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

      {/* Catering & F&B Packages */}
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                In-House Catering & Barista Packages
              </h3>
              <p className="text-[11px] text-slate-400">Freshly prepared & delivered directly to suite</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
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
                    ? 'bg-[#1C2536] border-amber-500/70 shadow-md'
                    : 'bg-[#111722] border-[#202B3C] hover:border-[#2F3E56]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{pkg.name}</h4>
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 font-semibold">
                        {pkg.timeSlot}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{pkg.description}</p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {pkg.dietaryTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-[#17202E] text-slate-300 px-1.5 py-0.5 rounded border border-[#263345]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-amber-400">
                      ${pkg.pricePerPax} <span className="text-[10px] text-slate-400 font-normal">/ pax</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      ~${totalPkgCost} total
                    </div>
                    <div
                      className={`w-5 h-5 rounded-lg ml-auto mt-1 flex items-center justify-center ${
                        isSelected ? 'bg-amber-400 text-black' : 'border border-slate-600'
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
      <div className="bg-[#141B26] border border-[#222C3D] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-justco-teal" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Special Admin Instructions (Optional)
          </h3>
        </div>
        <textarea
          rows={2}
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="e.g. VIP guests arrive at 09:15 AM via North Atrium, need 1 HDMI adapter for presenter..."
          className="w-full bg-[#10151E] border border-[#253245] focus:border-justco-teal rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none resize-none transition-colors"
        />
      </div>
    </div>
  );
};
