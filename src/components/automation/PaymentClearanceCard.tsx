import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { CreditCard, CheckCircle2, Sparkles, Receipt, Building2 } from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const PaymentClearanceCard: React.FC = () => {
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
    isPaid,
  } = useOrchestrator();

  const totalCashAddons = totalCateringCost + (isAfterHours ? airConSurchargeTotal : 0);

  return (
    <div className="relative bg-white border border-[#21B5FF]/50 rounded-3xl p-4 shadow-md space-y-4 overflow-hidden">
      <BrandGridWatermark className="absolute top-3 right-3 pointer-events-none select-none" opacity="opacity-30" />
      
      {/* Header with Verified Payment Badge */}
      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#21B5FF] text-white flex items-center justify-center font-bold shadow-glow-blue">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-[#000105] uppercase tracking-wider">
                Cost & Payment Breakdown
              </h3>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                isPaid
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-[#EBF7FF] text-[#0099FF] border border-[#21B5FF]/30'
              }`}>
                {isPaid ? 'INSTANT CLEAR' : 'READY TO AUTHORIZE'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Corporate Master Account Billing & Credit Pool</p>
          </div>
        </div>

        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 font-mono shadow-xs ${
          isPaid
            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
            : 'text-amber-700 bg-amber-50 border border-amber-200'
        }`}>
          {isPaid ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paid & Billed</span>
            </>
          ) : (
            <>
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Pay</span>
            </>
          )}
        </span>
      </div>

      {/* Hero Highlight Cost Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Credits Card */}
        <div className="bg-gradient-to-br from-[#EBF7FF] to-[#D9EFFF] p-3.5 rounded-2xl border border-[#21B5FF]/50 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-slate-600 font-semibold uppercase tracking-wider font-mono">
            <span>Corporate Credits</span>
            <Building2 className="w-3 h-3 text-[#0099FF]" />
          </div>
          <div className="text-2xl font-black text-[#000105] mt-1 font-mono tracking-tight">
            {totalCreditsUsed} <span className="text-xs text-[#0099FF] font-bold">Credits</span>
          </div>
          <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Pool: <strong>JC-CORP-SG-772</strong></span>
          </div>
        </div>

        {/* Cash Add-ons & Catering Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-3.5 rounded-2xl border border-amber-300 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-amber-800 font-semibold uppercase tracking-wider font-mono">
            <span>F&B & Services</span>
            <Receipt className="w-3 h-3 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1 font-mono tracking-tight">
            ${totalCashAddons} <span className="text-xs text-amber-700 font-bold">SGD</span>
          </div>
          <div className="text-[10px] text-amber-800 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Visa Corporate •••• 8819</span>
          </div>
        </div>
      </div>

      {/* Itemized Cost Breakdown Table */}
      <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 text-xs">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Itemized Cost Ledger</span>
          <span className="font-mono text-slate-400">Invoice #INV-2026-JC8842</span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
          <span className="truncate pr-2">
            {selectedLayoutId === 'layout-presentation'
              ? 'Heritage Event Space & Stage'
              : selectedLayoutId === 'layout-boardroom'
              ? 'Orion 1 Executive Boardroom Suite'
              : 'Atrium Workshop Studio 1'}{' '}
            ({selectedTimeSlot.hours}h)
          </span>
          <span className="font-mono font-semibold text-[#000105] flex-shrink-0">
            {selectedLayoutId === 'layout-presentation' ? 32 : selectedLayoutId === 'layout-boardroom' ? 24 : 16} Credits
          </span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
          <span>Co-Located Hot Desks ({desksCount} Desks in Zone B)</span>
          <span className="font-mono font-semibold text-[#000105]">{desksCount * 2} Credits</span>
        </div>

        {privacyPodsCount > 0 && (
          <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
            <span>Soundproof Focus Pods ({privacyPodsCount} Pods)</span>
            <span className="font-mono font-semibold text-[#000105]">{privacyPodsCount * 1} Credits</span>
          </div>
        )}

        {isAfterHours && (
          <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
            <span>Building Central HVAC Chiller Extension ({selectedTimeSlot.hours}h)</span>
            <span className="font-mono font-semibold text-amber-800">+${airConSurchargeTotal} SGD</span>
          </div>
        )}

        <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
          <span>Dual 4K HDR Stage Displays & Neat Bar AV</span>
          <span className="text-emerald-700 font-semibold font-mono">Included ($0)</span>
        </div>

        <div className="flex justify-between py-1 text-slate-700">
          <span>Artisan Catering & High-Tea Barista Roast ({totalParticipants} Pax)</span>
          <span className="font-mono font-semibold text-amber-800">${totalCateringCost} SGD</span>
        </div>
      </div>

      {/* Payment Method Badge & AI Savings Bar */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#EBF7FF] via-[#F4F9FF] to-white border border-[#21B5FF]/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#21B5FF] text-white flex items-center justify-center font-bold shadow-glow-blue flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#000105]">Co-Location Bundle Discount</div>
            <div className="text-[10px] text-slate-600">
              Bundled room + adjacent hot-desk pods saved 18%
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
