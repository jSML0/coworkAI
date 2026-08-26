import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { TeamGuestSelector } from './TeamGuestSelector';
import { HubDatePicker } from './HubDatePicker';
import { ResourceToggleCards } from './ResourceToggleCards';
import { Users, MapPin, Sliders, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Screen1Setup: React.FC = () => {
  const {
    totalParticipants,
    selectedEmployeeIds,
    visitors,
    selectedHub,
    desksCount,
    selectedLayoutId,
    nextStep,
  } = useOrchestrator();

  const [activeTab, setActiveTab] = useState<'team' | 'hub' | 'resources'>('team');

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-r from-[#172233] via-[#1A2538] to-[#121B27] border border-[#2B394E] shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-justco-teal">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Space Orchestrator</span>
          </div>
          <h2 className="text-base font-extrabold text-white tracking-tight">
            Schedule Hybrid Team & Meeting Cluster
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Multi-variable AI solver automatically bundles meeting rooms with adjacent hot-desk pods,
            manages guest security clearance, and coordinates barista catering.
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px]">
            <div className="bg-[#121824] px-2.5 py-1 rounded-lg border border-[#263347] text-slate-300">
              <strong className="text-white">{selectedEmployeeIds.length}</strong> Team +{' '}
              <strong className="text-amber-400">{visitors.length}</strong> Guests
            </div>
            <div className="bg-[#121824] px-2.5 py-1 rounded-lg border border-[#263347] text-slate-300">
              <strong className="text-justco-teal">{desksCount}</strong> Hot Desks
            </div>
            <div className="bg-[#121824] px-2.5 py-1 rounded-lg border border-[#263347] text-slate-300">
              {selectedHub.name.replace('JustCo ', '')}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#121722] p-1 rounded-2xl border border-[#222C3D]">
        <button
          onClick={() => setActiveTab('team')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'team'
              ? 'bg-[#1D283A] text-justco-teal border border-teal-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>1. Team & Guests</span>
        </button>

        <button
          onClick={() => setActiveTab('hub')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'hub'
              ? 'bg-[#1D283A] text-justco-teal border border-teal-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>2. Date & Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'resources'
              ? 'bg-[#1D283A] text-justco-teal border border-teal-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>3. Resources & F&B</span>
        </button>
      </div>

      {/* Sub-Tab Contents */}
      <div className="transition-all duration-200">
        {activeTab === 'team' && <TeamGuestSelector />}
        {activeTab === 'hub' && <HubDatePicker />}
        {activeTab === 'resources' && <ResourceToggleCards />}
      </div>

      {/* Next Step Jump button inside tab */}
      <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
        <span>Step 1 of 4: Configuration</span>
        {activeTab !== 'resources' ? (
          <button
            onClick={() => setActiveTab(activeTab === 'team' ? 'hub' : 'resources')}
            className="flex items-center gap-1 text-justco-teal font-semibold hover:underline"
          >
            <span>Next: {activeTab === 'team' ? 'Date & Hub' : 'Resources & F&B'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center gap-1 text-justco-teal font-bold hover:underline"
          >
            <span>Proceed to AI Matching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
