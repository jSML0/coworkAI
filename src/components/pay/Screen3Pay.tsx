import React from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { PaymentClearanceCard } from '../automation/PaymentClearanceCard';
import {
  CreditCard,
  Lock,
  Building2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { BrandGridWatermark } from '../common/BrandGridWatermark';

export const Screen3Pay: React.FC = () => {
  const {
    processPayment,
    totalCreditsUsed,
    totalCateringCost,
    isAfterHours,
    airConSurchargeTotal,
  } = useOrchestrator();

  const totalCashAddons = totalCateringCost + (isAfterHours ? airConSurchargeTotal : 0);

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#0099FF] font-bold">
          <CreditCard className="w-4 h-4" />
          <span>Step 3 of 3: Cost Authorization & Payment</span>
        </div>

        <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>READY TO PAY</span>
        </span>
      </div>

      {/* Hero Instructions Banner */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-r from-[#000105] via-[#0A1322] to-[#000105] text-white border border-slate-700/60 shadow-lg overflow-hidden">
        <BrandGridWatermark
          className="absolute top-3.5 right-3.5 pointer-events-none select-none"
          opacity="opacity-35"
        />
        <div className="relative z-10 pr-6">
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-[#21B5FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>JustCo Corporate Billing Portal</span>
          </div>
          <h2 className="text-base font-extrabold text-white tracking-tight">
            Authorize Workspace Payment
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Review itemized corporate credit deduction and add-ons billing. Click{' '}
            <strong className="text-white">Pay</strong> to complete your reservation.
          </p>
        </div>
      </div>

      {/* 1. Itemized Cost & Clearance Card */}
      <PaymentClearanceCard />

      {/* 2. Corporate Payment Method Selector Card */}
      <div className="relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3 overflow-hidden">
        <BrandGridWatermark
          className="absolute top-3 right-3 pointer-events-none select-none"
          opacity="opacity-25"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF7FF] border border-[#21B5FF]/30 flex items-center justify-center text-[#0099FF]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000105]">Corporate Payment Method</h3>
              <p className="text-[10px] text-slate-500">Authorized corporate accounts on file</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
            Auto-Split Billing
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 font-mono">
              1. Corporate Credits Pool
            </div>
            <div className="font-bold text-[#000105] flex items-center justify-between">
              <span>JC-CORP-SG-772</span>
              <span className="text-[#0099FF] font-mono font-bold">
                {totalCreditsUsed} Cr
              </span>
            </div>
            <div className="text-[10px] text-slate-500">
              Balance after deduction: <strong>194 Credits</strong>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 font-mono">
              2. Cash Add-ons & Catering
            </div>
            <div className="font-bold text-[#000105] flex items-center justify-between">
              <span>Visa Corp •••• 8819</span>
              <span className="text-amber-800 font-mono font-bold">
                ${totalCashAddons} SGD
              </span>
            </div>
            <div className="text-[10px] text-slate-500">
              Receipt destination: <strong>billing@techcorp.io</strong>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>256-Bit Corporate SSL Encrypted & SOC-2 Compliant</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">Zero Transaction Fees</span>
        </div>
      </div>

      {/* 3. Primary Prominent "Pay" Button Card */}
      <div className="p-4 rounded-3xl bg-white border border-[#21B5FF]/50 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">Total Authorization</span>
          <div className="text-right">
            <span className="text-base font-black text-[#000105] font-mono">
              ${totalCashAddons} SGD
            </span>
            <span className="text-slate-400 font-normal"> + </span>
            <span className="text-base font-black text-[#0099FF] font-mono">
              {totalCreditsUsed} Credits
            </span>
          </div>
        </div>

        <button
          onClick={processPayment}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#21B5FF] hover:bg-[#0099FF] text-white font-black text-sm shadow-glow-blue flex items-center justify-center gap-2 transition-all active:scale-[0.98] group cursor-pointer"
        >
          <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Pay</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
