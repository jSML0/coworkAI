import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { X, QrCode, Wifi, Lock, ShieldCheck, CheckCircle2, Copy, Smartphone, Sparkles } from 'lucide-react';
import { Employee, Visitor } from '../../types/orchestrator';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#121722] border border-[#2B374C] rounded-3xl overflow-hidden shadow-2xl">
        {/* Hologram Header Bar */}
        <div className="relative p-5 pb-4 bg-gradient-to-b from-[#1E2738] to-[#141B26] border-b border-[#263347] overflow-hidden">
          <div className="absolute inset-0 hologram-shimmer opacity-40 pointer-events-none" />
          
          <div className="relative flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-justco-teal flex items-center justify-center font-black text-[10px] text-black shadow-glow-teal">
                JC
              </div>
              <span className="text-xs font-bold tracking-tight text-white uppercase">
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
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-justco-teal shadow-md"
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
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#121722] flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-black" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white truncate">
                {isEmployee ? employee?.name : visitor?.name}
              </h3>
              <p className="text-xs text-slate-400 truncate">
                {isEmployee ? employee?.role : `${visitor?.company} • Host: ${visitor?.hostName}`}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
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
        <div className="p-5 space-y-4">
          {/* Dynamic QR & NFC Tap Zone */}
          <div className="relative bg-[#0E131C] rounded-2xl border border-[#222C3D] p-4 flex flex-col items-center justify-center">
            {/* Animated Scan Line */}
            <div className="relative w-40 h-40 bg-white p-3 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-scanline z-10" />
              
              {/* Dynamic QR Graphic */}
              <div className="w-full h-full bg-slate-950 p-2 rounded-xl flex flex-col items-center justify-center text-center">
                <QrCode className="w-24 h-24 text-justco-teal" />
                <span className="text-[9px] font-mono text-slate-400 mt-1">
                  {isEmployee ? employee?.passId : visitor?.gantryPassCode}
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-justco-teal" />
                <span>NFC Turnstile Enabled</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Hold phone near turnstile reader or scan QR at Level 3
              </p>
            </div>
          </div>

          {/* Access Details Matrix */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#18202C] p-2.5 rounded-xl border border-[#253245]">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-justco-teal" />
                <span>Access Location</span>
              </div>
              <div className="font-semibold text-white mt-0.5 truncate">{selectedHub.name}</div>
              <div className="text-[10px] text-slate-400">{selectedHub.level}</div>
            </div>

            {isEmployee ? (
              <div className="bg-[#18202C] p-2.5 rounded-xl border border-[#253245]">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>Smart Locker & Desk</span>
                </div>
                <div className="font-semibold text-white mt-0.5">
                  Locker {employee?.lockerCode}
                </div>
                <div className="text-[10px] text-justco-teal font-medium">
                  Desk {employee?.assignedDeskId || 'Zone B'}
                </div>
              </div>
            ) : (
              <div className="bg-[#18202C] p-2.5 rounded-xl border border-[#253245]">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>Security Clearance</span>
                </div>
                <div className="font-semibold text-white mt-0.5">
                  {visitor?.securityClearance}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">NDA Signed ✓</div>
              </div>
            )}
          </div>

          {/* Wi-Fi & Quick Credential Bar */}
          <div className="flex items-center justify-between bg-[#151D28] px-3 py-2 rounded-xl border border-[#222D3E] text-xs">
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-justco-teal" />
              <div>
                <span className="text-[10px] text-slate-400">Hub Wi-Fi: </span>
                <span className="font-semibold text-white">JustCo-Enterprise-5G</span>
              </div>
            </div>
            <button
              onClick={() => handleCopyCode('JustCo@SG2026!')}
              className="text-[10px] text-justco-teal hover:underline flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              {copied ? 'Copied' : 'Copy PW'}
            </button>
          </div>

          {/* Simulate Tap Button */}
          <div className="pt-1">
            <button
              onClick={handleSimulateGantryTap}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                isNfcTapped
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'bg-[#222E42] hover:bg-[#2C3B54] text-slate-200 border border-[#334460]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isNfcTapped ? 'text-black' : 'text-justco-teal'}`} />
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
