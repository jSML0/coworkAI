import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { Smartphone, Tablet, Monitor, Zap } from 'lucide-react';
import { PRESET_SCENARIOS } from '../../data/mockData';
import logoImg from '../../assets/logo.png';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceView, setDeviceView, activePresetId, applyPreset } = useOrchestrator();

  const currentTime = '9:41';

  return (
    <div className="min-h-screen bg-[#EAEEF4] text-[#000105] flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 selection:bg-[#21B5FF] selection:text-white font-sans">
      {/* Top Prototype Navigation & Preset Bar */}
      <header className="w-full max-w-5xl mb-4 bg-white/95 border border-slate-200 backdrop-blur-xl rounded-2xl p-3 shadow-md flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Prototype Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 px-2 py-1 rounded-xl bg-white border border-[#21B5FF]/40 shadow-glow-blue flex items-center justify-center">
            <img src={logoImg} alt="JustCo Logo" className="h-7 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-[#000105] tracking-tight">JustCo App</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/30 font-mono">
                AI Orchestrator v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Autonomous Hybrid Meeting & Space Optimizer</p>
          </div>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" /> Presets:
          </span>
          {PRESET_SCENARIOS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#21B5FF] text-white font-bold shadow-glow-blue scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setDeviceView('mobile')}
            title="Mobile View (iPhone 16 Pro)"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'mobile'
                ? 'bg-[#21B5FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
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
                ? 'bg-[#21B5FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
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
                ? 'bg-[#21B5FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
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
          <div className="relative w-full max-w-[420px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 ring-1 ring-black/10 overflow-hidden">
            {/* Ambient edge highlight */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#21B5FF]/10 to-transparent pointer-events-none" />

            {/* Realistic iPhone Screen Container */}
            <div className="relative w-full bg-[#F8FAFC] rounded-[40px] overflow-hidden flex flex-col min-h-[820px] max-h-[880px] border border-slate-300/80 shadow-inner">
              {/* Dynamic Island & Status Bar */}
              <div className="relative w-full bg-white pt-3 px-6 pb-2 flex items-center justify-between text-xs text-[#000105] z-40 select-none border-b border-slate-100">
                <span className="font-bold text-[11px] tracking-tight font-mono">{currentTime}</span>
                {/* Dynamic Island */}
                <div className="w-24 h-5 bg-[#000105] rounded-full flex items-center justify-center space-x-2 px-2 border border-black/10 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-[#21B5FF] animate-pulse" />
                  <span className="text-[9px] font-mono text-[#21B5FF] font-medium">JustCo AI</span>
                </div>
                {/* Status Icons */}
                <div className="flex items-center space-x-1.5 text-slate-600">
                  <span className="text-[10px] font-bold font-mono">5G</span>
                  <div className="w-4 h-2.5 border border-slate-400 rounded-[3px] p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#21B5FF] rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-between bg-[#F8FAFC]">
                {children}
              </div>

              {/* iOS Home Indicator */}
              <div className="w-full bg-white pb-2 pt-1 flex justify-center z-40 border-t border-slate-100">
                <div className="w-32 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        ) : deviceView === 'tablet' ? (
          /* Tablet Frame (iPad) */
          <div className="relative w-full max-w-[740px] bg-slate-900 rounded-[36px] p-4 shadow-2xl border-4 border-slate-700 ring-1 ring-black/10">
            <div className="relative w-full bg-[#F8FAFC] rounded-[28px] overflow-hidden flex flex-col min-h-[780px] max-h-[860px] border border-slate-300">
              {/* Tablet Status Bar */}
              <div className="w-full bg-white px-6 py-2 flex items-center justify-between text-xs text-slate-600 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#000105] font-mono">9:41 AM</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-[#0099FF] font-medium">JustCo Enterprise Workspace</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] bg-[#EBF7FF] text-[#0099FF] px-2 py-0.5 rounded-full border border-[#21B5FF]/20 font-medium">
                    Singapore CBD Hub
                  </span>
                  <span className="text-xs font-mono">100% ⚡</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto flex flex-col justify-between bg-[#F8FAFC]">
                {children}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Expanded Full View */
          <div className="relative w-full max-w-5xl bg-[#F8FAFC] rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col min-h-[800px]">
            {/* Desktop Header Bar */}
            <div className="w-full bg-white px-6 py-3 flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="font-bold text-[#000105] ml-2">JustCo AI Smart Orchestrator — Desktop Management View</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Cluster Orchestrator Active</span>
                <span className="w-2 h-2 rounded-full bg-[#21B5FF] animate-pulse" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto flex flex-col justify-between bg-[#F8FAFC]">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

