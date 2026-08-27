import React, { useState } from 'react';
import { useOrchestrator } from '../../context/OrchestratorContext';
import { X, UserPlus } from 'lucide-react';
import { EmployeeRole } from '../../types/orchestrator';
import { BrandGridWatermark } from './BrandGridWatermark';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative p-5 bg-[#000105] text-white border-b border-slate-800 flex items-center justify-between">
          <BrandGridWatermark className="absolute top-2 right-12 pointer-events-none select-none" opacity="opacity-30" />
          
          <div className="relative flex items-center space-x-2.5 z-10">
            <div className="w-8 h-8 rounded-xl bg-[#21B5FF] flex items-center justify-center text-white shadow-glow-blue">
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

        <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-white">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder={isAddingEmployee ? 'e.g. Rachel Ng Li Ting' : 'e.g. Darren Teo Wei Ming'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#21B5FF] rounded-xl px-3.5 py-2.5 text-xs text-[#000105] placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          {isAddingEmployee ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role Title</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as EmployeeRole)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#21B5FF] rounded-xl px-3 py-2.5 text-xs text-[#000105] outline-none"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Core Tech, Product & Growth, AI Lab"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#21B5FF] rounded-xl px-3.5 py-2.5 text-xs text-[#000105] placeholder-slate-400 outline-none"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                required
                placeholder="e.g. Temasek, DBS Bank, Grab SG, GovTech Singapore"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#21B5FF] rounded-xl px-3.5 py-2.5 text-xs text-[#000105] placeholder-slate-400 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="e.g. name@company.sg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#21B5FF] rounded-xl px-3.5 py-2.5 text-xs text-[#000105] placeholder-slate-400 outline-none font-mono"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#21B5FF] hover:bg-[#0099FF] text-white font-bold text-xs shadow-glow-blue transition-all"
            >
              {isAddingEmployee ? 'Add Colleague' : 'Issue Visitor Pass'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
