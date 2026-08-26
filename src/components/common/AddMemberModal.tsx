import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { X, UserPlus } from 'lucide-react';
import { EmployeeRole } from '../../types/orchestrator';

export const AddMemberModal: React.FC = () => {
  const { modal, closeModal, addEmployee, addVisitor } = useOrchestrator();

  const isAddingEmployee = modal.type === 'add_member';
  const isAddingVisitor = modal.type === 'add_visitor';

  const [name, setName] = useState('');
  const [role, setRole] = useState<EmployeeRole>('Senior Product Manager');
  const [department, setDepartment] = useState('Core Tech');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  if (!modal.isOpen || (!isAddingEmployee && !isAddingVisitor)) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isAddingEmployee) {
      addEmployee({
        name,
        role,
        department: department || 'Technology',
        email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@techcorp.sg`,
      });
    } else {
      addVisitor({
        name,
        company: company || 'Temasek Portfolio / Grab SG',
        email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@partner.sg`,
      });
    }

    setName('');
    setEmail('');
    setCompany('');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#121722] border border-[#2B374C] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 bg-gradient-to-b from-[#1C2536] to-[#141B26] border-b border-[#263347] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-justco-teal">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isAddingEmployee ? 'Add Team Colleague' : 'Register External Visitor'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isAddingEmployee
                  ? 'Auto-generates mobile keycard & assigns hot desk'
                  : 'Auto-dispatches building gantry security QR clearance'}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder={isAddingEmployee ? 'e.g. Rachel Ng Li Ting' : 'e.g. Darren Teo Wei Ming'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#182130] border border-[#2B384D] focus:border-justco-teal rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          {isAddingEmployee ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as EmployeeRole)}
                  className="w-full bg-[#182130] border border-[#2B384D] focus:border-justco-teal rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                >
                  <option value="VP Engineering">VP Engineering</option>
                  <option value="Senior Product Manager">Senior Product Manager</option>
                  <option value="Staff Product Designer">Staff Product Designer</option>
                  <option value="Lead Cloud Architect">Lead Cloud Architect</option>
                  <option value="Senior Data Scientist">Senior Data Scientist</option>
                  <option value="Principal DevOps">Principal DevOps</option>
                  <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                  <option value="Financial Analyst">Financial Analyst</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Core Tech, Product & Growth, AI Lab"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#182130] border border-[#2B384D] focus:border-justco-teal rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
              <input
                type="text"
                required
                placeholder="e.g. Temasek, DBS Bank, Grab SG, GovTech Singapore"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#182130] border border-[#2B384D] focus:border-justco-teal rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="e.g. name@company.sg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#182130] border border-[#2B384D] focus:border-justco-teal rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl bg-[#1A2230] hover:bg-[#232D40] text-xs font-semibold text-slate-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-justco-teal hover:bg-justco-teal-dark text-black font-bold text-xs shadow-glow-teal transition-all"
            >
              {isAddingEmployee ? 'Add Colleague' : 'Issue Visitor Pass'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
