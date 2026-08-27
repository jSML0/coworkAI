import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { TeamGuestSelector } from './TeamGuestSelector';
import { HubDatePicker } from './HubDatePicker';
import { ResourceToggleCards } from './ResourceToggleCards';
import { Users, Calendar, Sliders, Sparkles, ArrowRight, Mic, X, Check, Volume2 } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const Screen1Setup: React.FC = () => {
  const {
    selectedEmployeeIds,
    visitors,
    desksCount,
    privacyPodsCount,
    setDesksCount,
    setPrivacyPodsCount,
    setSelectedLayoutId,
    setSpecialInstructions,
    nextStep,
  } = useOrchestrator();

  const [activeTab, setActiveTab] = useState<'team' | 'hub' | 'resources'>('team');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState(
    'Book 6 desks and 2 privacy pods near Orion room tomorrow with morning barista roast.'
  );
  const [voiceApplied, setVoiceApplied] = useState(false);

  const handleSimulateVoiceInput = (sampleText: string) => {
    setIsListening(true);
    setVoiceText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < sampleText.length) {
        setVoiceText((prev) => prev + sampleText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsListening(false);
      }
    }, 25);
  };

  const handleApplyVoiceInstruction = () => {
    setVoiceApplied(true);
    setDesksCount(6);
    setPrivacyPodsCount(2);
    setSelectedLayoutId('layout-workshop');
    setSpecialInstructions('Voice Prompt: 6 hot desks + 2 privacy pods adjacent to Orion suite with morning roast delivery.');
    setTimeout(() => {
      setVoiceApplied(false);
      setIsVoiceModalOpen(false);
    }, 1200);
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-r from-[#000105] via-[#0A1322] to-[#000105] text-white border border-slate-700/60 shadow-lg overflow-hidden">
        <BrandGridWatermark className="absolute top-3.5 right-3.5 pointer-events-none select-none" opacity="opacity-40" />
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#21B5FF]/15 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 pr-6">
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-[#21B5FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Space Orchestrator</span>
          </div>
          <h2 className="text-base font-extrabold text-white tracking-tight">
            Schedule Workspace
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Multi-variable AI solver automatically bundles meeting rooms with adjacent hot-desk pods,
            finds the optimal hub based on your criteria, manages guest clearance, and coordinates catering.
          </p>

          {/* Quick Stats Pill & Microphone Natural Language Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/15 text-slate-200">
                <strong className="text-white">{selectedEmployeeIds.length}</strong> Team +{' '}
                <strong className="text-amber-300">{visitors.length}</strong> Guests
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/15 text-slate-200">
                <strong className="text-[#21B5FF]">{desksCount}</strong> Desks
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/15 text-slate-200">
                <strong className="text-[#21B5FF]">{privacyPodsCount}</strong> Pods
              </div>
            </div>

            {/* Microphone icon button at bottom right */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              title="Use Natural Human Speech or Written Instructions"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#21B5FF]/20 hover:bg-[#21B5FF]/35 text-[#21B5FF] hover:text-white border border-[#21B5FF]/50 transition-all shadow-glow-blue cursor-pointer group flex-shrink-0"
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#21B5FF] opacity-40"></span>
                <Mic className="w-3.5 h-3.5 relative z-10 text-[#21B5FF] group-hover:text-white transition-colors" />
              </div>
              <span className="text-[11px] font-bold tracking-tight">Voice / Natural Prompt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Voice / Natural Language Instructions Modal */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            {/* Header */}
            <div className="relative p-5 pb-4 bg-[#000105] text-white border-b border-slate-800 flex items-center justify-between">
              <BrandGridWatermark className="absolute top-2 right-12 pointer-events-none select-none" opacity="opacity-30" />
              
              <div className="flex items-center space-x-2.5 z-10">
                <div className="w-8 h-8 rounded-xl bg-[#21B5FF] flex items-center justify-center text-white shadow-glow-blue">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Natural Human Instructions</h3>
                  <p className="text-[11px] text-slate-400">Speak or write your workspace requirements in plain English</p>
                </div>
              </div>

              <button
                onClick={() => setIsVoiceModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 pt-0 space-y-3.5">
              {/* Animated Transcript Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-[#0099FF]">
                    <Volume2 className="w-3.5 h-3.5" />
                    {isListening ? 'Listening & Transcribing...' : 'Natural Instruction Recognized'}
                  </span>
                  <span className="font-mono text-[10px]">AI Natural NLP</span>
                </div>

                <textarea
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
                  rows={3}
                  placeholder="e.g. 'I need 6 hot desks and 2 privacy pods next to Orion room tomorrow with barista catering...'"
                  className="w-full text-xs text-[#000105] font-medium bg-white border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#21B5FF] resize-none"
                />
              </div>

              {/* Sample Prompts to click */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Try Sample Instructions:
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() =>
                      handleSimulateVoiceInput(
                        'Book 6 desks and 2 privacy pods near Orion room tomorrow with morning barista roast.'
                      )
                    }
                    className="text-left text-[11px] p-2 rounded-xl bg-slate-100 hover:bg-[#EBF7FF] border border-slate-200 hover:border-[#21B5FF]/40 text-slate-700 transition-colors"
                  >
                    💬 "Book 6 desks & 2 privacy pods near Orion room with morning coffee."
                  </button>
                  <button
                    onClick={() =>
                      handleSimulateVoiceInput(
                        'Need an executive boardroom with 8 adjacent hot desks and 3 focus pods for an all-day client sprint.'
                      )
                    }
                    className="text-left text-[11px] p-2 rounded-xl bg-slate-100 hover:bg-[#EBF7FF] border border-slate-200 hover:border-[#21B5FF]/40 text-slate-700 transition-colors"
                  >
                    💬 "Executive boardroom with 8 adjacent desks and 3 focus pods for client sprint."
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyVoiceInstruction}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-glow-blue flex items-center justify-center gap-1.5 ${
                    voiceApplied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#21B5FF] hover:bg-[#0099FF] text-white'
                  }`}
                >
                  {voiceApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Instruction Applied ✓</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Apply & Auto-Configure</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('team')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'team'
              ? 'bg-white text-[#0099FF] border border-[#21B5FF]/40 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>1. Team & Guests</span>
        </button>

        <button
          onClick={() => setActiveTab('hub')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'hub'
              ? 'bg-white text-[#0099FF] border border-[#21B5FF]/40 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>2. Date & Time</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'resources'
              ? 'bg-white text-[#0099FF] border border-[#21B5FF]/40 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
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
      <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
        <span>Step 1 of 4: Configuration</span>
        {activeTab !== 'resources' ? (
          <button
            onClick={() => setActiveTab(activeTab === 'team' ? 'hub' : 'resources')}
            className="flex items-center gap-1 text-[#0099FF] font-semibold hover:underline"
          >
            <span>Next: {activeTab === 'team' ? 'Date & Time' : 'Resources & F&B'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center gap-1 text-[#0099FF] font-bold hover:underline"
          >
            <span>Proceed to AI Matching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
