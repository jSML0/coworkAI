import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { CreditCard, Sparkles, Download } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const CostSummaryCard: React.FC = () => {
  const {
    totalCreditsUsed,
    totalCateringCost,
    estimatedSavings,
    desksCount,
    privacyPodsCount,
    totalParticipants,
    isAfterHours,
    selectedTimeSlot,
    airConSurchargeTotal,
    selectedLayoutId,
  } = useOrchestrator();

  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadReport = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const totalCashAddons = totalCateringCost + (isAfterHours ? airConSurchargeTotal : 0);

  return (
    <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-4 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      {/* Header */}
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
              Consolidated Cost & Credit Summary
            </h3>
            <p className="text-[11px] text-slate-500">Unified billing ledger for room, desks & F&B</p>
          </div>
        </div>

        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-[#0099FF] bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 shadow-xs transition-colors"
        >
          <Download className="w-3 h-3" />
          <span>{downloaded ? 'Downloaded ✓' : 'Export PDF'}</span>
        </button>
      </div>

      {/* Hero Cost Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#EBF7FF]/70 p-3.5 rounded-2xl border border-[#21B5FF]/40">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
            Membership Credits
          </span>
          <div className="text-xl font-black text-[#000105] mt-1 font-mono">
            {totalCreditsUsed} <span className="text-xs text-[#0099FF] font-normal">Credits</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Deducted from JustCo Corporate Pool
          </div>
        </div>

        <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-300">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
            F&B & Cash Add-ons
          </span>
          <div className="text-xl font-black text-amber-700 mt-1 font-mono">
            ${totalCashAddons} <span className="text-xs text-slate-500 font-normal">SGD</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {isAfterHours ? 'Includes Air-Con Extension Surcharge' : 'Pre-authorized corporate card'}
          </div>
        </div>
      </div>

      {/* Itemized Line items */}
      <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
        <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
          <span>
            {selectedLayoutId === 'layout-presentation'
              ? 'Heritage Event Space & Stage'
              : 'Orion 1 Executive Boardroom'}{' '}
            ({selectedTimeSlot.hours}h Session)
          </span>
          <span className="font-mono font-semibold text-[#000105]">
            {selectedLayoutId === 'layout-presentation' ? 32 : 16} Credits
          </span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
          <span>Co-Located Hot Desks ({desksCount} Desks)</span>
          <span className="font-mono font-semibold text-[#000105]">{desksCount * 2} Credits</span>
        </div>

        {privacyPodsCount > 0 && (
          <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
            <span>Soundproof Privacy Pods ({privacyPodsCount} Pods)</span>
            <span className="font-mono font-semibold text-[#000105]">{privacyPodsCount * 1} Credits</span>
          </div>
        )}

        {isAfterHours && (
          <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
            <span>Building Central Air-Con Extension ({selectedTimeSlot.hours}h @ $75/hr)</span>
            <span className="font-mono font-semibold text-amber-800">+${airConSurchargeTotal} SGD</span>
          </div>
        )}

        <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
          <span>Dual 4K HDR Stage Displays & AV Setup</span>
          <span className="text-emerald-700 font-semibold font-mono">Included ($0)</span>
        </div>

        <div className="flex justify-between py-1 text-slate-700">
          <span>Artisan Catering & Refreshments ({totalParticipants} Pax)</span>
          <span className="font-mono font-semibold text-amber-700">${totalCateringCost} SGD</span>
        </div>
      </div>


      {/* AI Smart Cluster Savings Callout */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#EBF7FF] via-[#F4F9FF] to-white border border-[#21B5FF]/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#21B5FF] text-white flex items-center justify-center font-bold shadow-glow-blue flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#000105]">AI Cluster Co-Booking Discount</div>
            <div className="text-[10px] text-slate-600">
              Bundled room + adjacent hot desks saved 18% vs ad-hoc booking
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-xs font-black text-[#0099FF] font-mono">
            +${estimatedSavings} Saved
          </div>
          <div className="text-[9px] text-emerald-700 font-semibold font-mono">18% ROI</div>
        </div>
      </div>
    </div>
  );
};
