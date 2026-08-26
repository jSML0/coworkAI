import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Smartphone, Tablet, Monitor, Sparkles, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { PRESET_SCENARIOS } from '../../data/mockData';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceView, setDeviceView, activePresetId, applyPreset, runAIOptimization } = useOrchestrator();

  const currentTime = '9:41';

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 selection:bg-justco-teal selection:text-black">
      {/* Top Prototype Navigation & Preset Bar */}
      <header className="w-full max-w-5xl mb-4 bg-[#111722]/90 border border-[#222E42] backdrop-blur-xl rounded-2xl p-3 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Prototype Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-justco-teal via-cyan-400 to-indigo-500 p-[1.5px] shadow-glow-teal">
            <div className="w-full h-full bg-[#0E131C] rounded-[10px] flex items-center justify-center font-black text-xs text-justco-teal">
              JC
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-white tracking-tight">JustCo App</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-justco-teal border border-teal-500/30">
                AI Orchestrator v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous Hybrid Meeting & Space Optimizer</p>
          </div>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          {PRESET_SCENARIOS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-justco-teal text-black font-bold shadow-glow-teal scale-105'
                    : 'bg-[#182130] hover:bg-[#222F42] text-slate-300 border border-[#2A3950]'
                }`}
              >
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-[#161F2C] p-1 rounded-xl border border-[#26354A]">
          <button
            onClick={() => setDeviceView('mobile')}
            title="Mobile View (iPhone 16 Pro)"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'mobile'
                ? 'bg-justco-teal text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Mobile</span>
          </button>

          <button
            onClick={() => setDeviceView('tablet')}
            title="Tablet View (iPad)"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'tablet'
                ? 'bg-justco-teal text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Tablet</span>
          </button>

          <button
            onClick={() => setDeviceView('desktop')}
            title="Desktop Expanded"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'desktop'
                ? 'bg-justco-teal text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Expanded</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="w-full flex justify-center items-start transition-all duration-300">
        {deviceView === 'mobile' ? (
          /* Mobile Phone Frame (iPhone 16 Pro) */
          <div className="relative w-full max-w-[420px] bg-[#0E131C] rounded-[48px] p-3 shadow-2xl border-4 border-[#242F42] ring-1 ring-white/10 overflow-hidden">
            {/* Ambient edge highlight */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none" />

            {/* Realistic iPhone Screen Container */}
            <div className="relative w-full bg-[#0D121B] rounded-[40px] overflow-hidden flex flex-col min-h-[820px] max-h-[880px] border border-[#202B3D]">
              {/* Dynamic Island & Status Bar */}
              <div className="relative w-full bg-[#10151E] pt-3 px-6 pb-2 flex items-center justify-between text-xs text-white z-40 select-none">
                <span className="font-semibold text-[11px] tracking-tight">{currentTime}</span>
                {/* Dynamic Island */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center space-x-2 px-2 border border-white/5 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-teal-400">JustCo AI</span>
                </div>
                {/* Status Icons */}
                <div className="flex items-center space-x-1.5 text-slate-300">
                  <span className="text-[10px] font-bold">5G</span>
                  <div className="w-4 h-2.5 border border-slate-300 rounded-[3px] p-0.5 flex items-center">
                    <div className="w-full h-full bg-teal-400 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-between">
                {children}
              </div>

              {/* iOS Home Indicator */}
              <div className="w-full bg-[#10151E] pb-2 pt-1 flex justify-center z-40">
                <div className="w-32 h-1 bg-slate-500/60 rounded-full" />
              </div>
            </div>
          </div>
        ) : deviceView === 'tablet' ? (
          /* Tablet Frame (iPad) */
          <div className="relative w-full max-w-[740px] bg-[#0E131C] rounded-[36px] p-4 shadow-2xl border-4 border-[#242F42] ring-1 ring-white/10">
            <div className="relative w-full bg-[#0D121B] rounded-[28px] overflow-hidden flex flex-col min-h-[780px] max-h-[860px] border border-[#202B3D]">
              {/* Tablet Status Bar */}
              <div className="w-full bg-[#10151E] px-6 py-2 flex items-center justify-between text-xs text-slate-300 border-b border-[#1E2738]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">9:41 AM</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-justco-teal font-medium">JustCo Enterprise Workspace</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] bg-teal-500/10 text-justco-teal px-2 py-0.5 rounded-full border border-teal-500/20">
                    Singapore CBD Hub
                  </span>
                  <span className="text-xs">100% ⚡</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto flex flex-col justify-between">
                {children}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Expanded Full View */
          <div className="relative w-full max-w-5xl bg-[#0D121B] rounded-2xl shadow-2xl border border-[#222E42] overflow-hidden flex flex-col min-h-[800px]">
            {/* Desktop Header Bar */}
            <div className="w-full bg-[#10151E] px-6 py-3 flex items-center justify-between text-xs text-slate-300 border-b border-[#222E42]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-bold text-white ml-2">JustCo AI Smart Orchestrator — Desktop Management View</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Cluster Orchestrator Active</span>
                <span className="w-2 h-2 rounded-full bg-justco-teal animate-pulse" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto flex flex-col justify-between">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
