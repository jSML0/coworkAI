import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { CreditCard, DollarSign, Sparkles, Download, CheckCircle2, TrendingDown, Layers } from 'lucide-react';

export const CostSummaryCard: React.FC = () => {
  const {
    totalCreditsUsed,
    totalCateringCost,
    estimatedSavings,
    desksCount,
    totalParticipants,
    selectedHub,
  } = useOrchestrator();

  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadReport = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="bg-[#141B26] border border-[#222C3D] rounded-3xl p-4 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Consolidated Cost & Credit Summary
            </h3>
            <p className="text-[11px] text-slate-400">Unified billing ledger for room, desks & F&B</p>
          </div>
        </div>

        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-justco-teal bg-[#192332] px-2.5 py-1 rounded-xl border border-[#273549] transition-colors"
        >
          <Download className="w-3 h-3" />
          <span>{downloaded ? 'Downloaded ✓' : 'Export PDF'}</span>
        </button>
      </div>

      {/* Hero Cost Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-[#192435] to-[#121A26] p-3.5 rounded-2xl border border-teal-500/30">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Membership Credits
          </span>
          <div className="text-xl font-black text-white mt-1">
            {totalCreditsUsed} <span className="text-xs text-justco-teal font-normal">Credits</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Deducted from JustCo Corporate Pool
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#242119] to-[#161512] p-3.5 rounded-2xl border border-amber-500/30">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            F&B & Cash Add-ons
          </span>
          <div className="text-xl font-black text-amber-400 mt-1">
            ${totalCateringCost} <span className="text-xs text-slate-400 font-normal">SGD</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Pre-authorized corporate card
          </div>
        </div>
      </div>

      {/* Itemized Line items */}
      <div className="space-y-1.5 bg-[#0F141E] p-3 rounded-2xl border border-[#1F293A] text-xs">
        <div className="flex justify-between py-1 border-b border-[#1C2638] text-slate-300">
          <span>Orion 1 Executive Boardroom (4h Session)</span>
          <span className="font-mono font-semibold text-white">16 Credits</span>
        </div>

        <div className="flex justify-between py-1 border-b border-[#1C2638] text-slate-300">
          <span>Zone B Co-Located Hot Desks ({desksCount} Desks)</span>
          <span className="font-mono font-semibold text-white">{desksCount * 2} Credits</span>
        </div>

        <div className="flex justify-between py-1 border-b border-[#1C2638] text-slate-300">
          <span>Neat Bar 360 & Dual 4K AV Setup</span>
          <span className="text-emerald-400 font-medium">Included ($0)</span>
        </div>

        <div className="flex justify-between py-1 text-slate-300">
          <span>Artisan Barista & Bento Lunch ({totalParticipants} Pax)</span>
          <span className="font-mono font-semibold text-amber-400">${totalCateringCost} SGD</span>
        </div>
      </div>

      {/* AI Smart Cluster Savings Callout */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-500/15 via-teal-500/10 to-transparent border border-teal-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-justco-teal text-black flex items-center justify-center font-bold shadow-glow-teal flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">AI Cluster Co-Booking Discount</div>
            <div className="text-[10px] text-teal-200">
              Bundled room + adjacent hot desks saved 18% vs ad-hoc booking
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-xs font-black text-justco-teal font-mono">
            +${estimatedSavings} Saved
          </div>
          <div className="text-[9px] text-emerald-400 font-semibold">18% ROI</div>
        </div>
      </div>
    </div>
  );
};
