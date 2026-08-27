import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { X, QrCode, Wifi, Lock, ShieldCheck, CheckCircle2, Copy, Smartphone, Sparkles } from 'lucide-react';
import { Employee, Visitor } from '../../types/orchestrator';
import { BrandGridWatermark } from './BrandGridWatermark';

export const PassModal: React.FC = () => {
  const { modal, closeModal, toggleEmployeeCheckIn, toggleVisitorCheckIn, selectedHub } = useOrchestrator();
  const [copied, setCopied] = useState(false);
  const [isNfcTapped, setIsNfcTapped] = useState(false);

  if (!modal.isOpen || (modal.type !== 'employee_pass' && modal.type !== 'visitor_pass')) {
    return null;
  }

  const isEmployee = modal.type === 'employee_pass';
  const employee = isEmployee ? (modal.data as Employee) : null;
  const visitor = !isEmployee ? (modal.data as Visitor) : null;

  const handleSimulateGantryTap = () => {
    setIsNfcTapped(true);
    if (isEmployee && employee) {
      toggleEmployeeCheckIn(employee.id);
    } else if (visitor) {
      toggleVisitorCheckIn(visitor.id);
    }
    setTimeout(() => {
      setIsNfcTapped(false);
    }, 1800);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCheckedIn = isEmployee ? employee?.checkedIn : visitor?.checkedIn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
        {/* Hologram Header Bar (High-Contrast JustCo Charcoal Card Top) */}
        <div className="relative p-5 pb-4 bg-[#000105] text-white border-b border-slate-800 overflow-hidden">
          <BrandGridWatermark className="absolute top-2 right-12 pointer-events-none select-none" opacity="opacity-30" />
          
          <div className="relative flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-[#21B5FF] flex items-center justify-center font-black text-[10px] text-white shadow-glow-blue">
                JC
              </div>
              <span className="text-xs font-bold tracking-tight text-white uppercase font-mono">
                {isEmployee ? 'JustCo Mobile Keycard' : 'Gantry Visitor Fast-Pass'}
              </span>
            </div>
            <button
              onClick={closeModal}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile in Header */}
          <div className="relative flex items-center gap-3.5 mt-4 z-10">
            <div className="relative">
              {isEmployee && employee ? (
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#21B5FF] shadow-md"
                />
              ) : visitor?.avatar ? (
                <img
                  src={visitor.avatar}
                  alt={visitor.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-bold text-lg border-2 border-amber-400">
                  {visitor?.name.charAt(0)}
                </div>
              )}
              {isCheckedIn && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#000105] flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white truncate">
                {isEmployee ? employee?.name : visitor?.name}
              </h3>
              <p className="text-xs text-slate-300 truncate">
                {isEmployee ? employee?.role : `${visitor?.company} • Host: ${visitor?.hostName}`}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono ${
                    isCheckedIn
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {isCheckedIn ? '● Checked-in to Hub' : '○ Awaiting Gantry Scan'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pass Body Content */}
        <div className="p-5 space-y-4 bg-white">
          {/* Dynamic QR & NFC Tap Zone */}
          <div className="relative bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center shadow-inner">
            {/* Animated Scan Line */}
            <div className="relative w-40 h-40 bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#21B5FF] to-transparent animate-scanline z-10" />
              
              {/* Dynamic QR Graphic */}
              <div className="w-full h-full bg-slate-900 p-2 rounded-xl flex flex-col items-center justify-center text-center">
                <QrCode className="w-24 h-24 text-[#21B5FF]" />
                <span className="text-[9px] font-mono text-slate-300 mt-1">
                  {isEmployee ? employee?.passId : visitor?.gantryPassCode}
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-700">
                <Smartphone className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>NFC Turnstile Enabled</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Hold phone near turnstile reader or scan QR at Level 3
              </p>
            </div>
          </div>

          {/* Access Details Matrix */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#0099FF]" />
                <span>Access Location</span>
              </div>
              <div className="font-semibold text-[#000105] mt-0.5 truncate">{selectedHub.name}</div>
              <div className="text-[10px] text-slate-500 font-mono">{selectedHub.level}</div>
            </div>

            {isEmployee ? (
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#0099FF]" />
                  <span>Smart Locker & Desk</span>
                </div>
                <div className="font-semibold text-[#000105] mt-0.5 font-mono">
                  Locker {employee?.lockerCode}
                </div>
                <div className="text-[10px] text-[#0099FF] font-medium font-mono">
                  Desk {employee?.assignedDeskId || 'Zone B'}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  <span>Security Clearance</span>
                </div>
                <div className="font-semibold text-[#000105] mt-0.5 font-mono">
                  {visitor?.securityClearance}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold font-mono">NDA Signed ✓</div>
              </div>
            )}
          </div>

          {/* Wi-Fi & Quick Credential Bar */}
          <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-[#0099FF]" />
              <div>
                <span className="text-[10px] text-slate-500">Hub Wi-Fi: </span>
                <span className="font-semibold text-[#000105] font-mono">JustCo-Enterprise-5G</span>
              </div>
            </div>
            <button
              onClick={() => handleCopyCode('JustCo@SG2026!')}
              className="text-[10px] text-[#0099FF] font-semibold hover:underline flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              {copied ? 'Copied' : 'Copy PW'}
            </button>
          </div>

          {/* Simulate Tap Button */}
          <div className="pt-1">
            <button
              onClick={handleSimulateGantryTap}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-blue ${
                isNfcTapped
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#21B5FF] hover:bg-[#0099FF] text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>
                {isNfcTapped
                  ? '✓ Gantry Turnstile Unlocked!'
                  : isCheckedIn
                  ? 'Simulate Gantry Re-Tap (Check-out/in)'
                  : 'Simulate NFC Tap at Gantry'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
