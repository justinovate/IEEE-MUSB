'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { Layers, UserPlus, Archive, CheckCircle2, Edit3, Trash2, X } from 'lucide-react';
import { OfficerData } from '@/data/officers';

export default function AdminOfficersPage() {
  const { officers, addOfficer, updateOfficer, toggleArchiveOfficer } = useData();
  const [activeTab, setActiveTab] = useState<'current' | 'archived'>('current');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<OfficerData | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [committee, setCommittee] = useState<OfficerData['committee']>('Executive Committee');
  const [program, setProgram] = useState('CpE');
  const [term, setTerm] = useState<'2025-2026' | '2024-2025'>('2025-2026');

  const openCreateModal = () => {
    setEditingOfficer(null);
    setName('');
    setPosition('');
    setCommittee('Executive Committee');
    setProgram('CpE');
    setTerm('2025-2026');
    setModalOpen(true);
  };

  const openEditModal = (officer: OfficerData) => {
    setEditingOfficer(officer);
    setName(officer.name);
    setPosition(officer.position);
    setCommittee(officer.committee);
    setProgram(officer.program || 'CpE');
    setTerm(officer.term);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOfficer) {
      updateOfficer(editingOfficer.id, { name, position, committee, program, term });
    } else {
      addOfficer({
        name,
        position,
        committee,
        program,
        term,
        isCurrent: true,
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      });
    }
    setModalOpen(false);
  };

  const displayedOfficers = officers.filter(
    (o) => (activeTab === 'current' ? o.isCurrent : !o.isCurrent)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#C41E3A]" />
            <span>Officer Roster &amp; Committee Manager</span>
          </h1>
          <p className="text-xs text-slate-400">
            Assign positions and terms. Changes automatically synchronize live to the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Officer</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'current'
              ? 'bg-[#00629B] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Officers (AY 2025–2026)
        </button>

        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'archived'
              ? 'bg-[#00629B] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Archived / Past Officers
        </button>
      </div>

      {/* Officers Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Officer Name</th>
                <th className="px-6 py-4">Position Title</th>
                <th className="px-6 py-4">Committee</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Term</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {displayedOfficers.map((officer) => (
                <tr key={officer.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-8 h-8 rounded-xl bg-slate-800 object-cover"
                    />
                    <span>{officer.name}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-400">
                    {officer.position}
                  </td>
                  <td className="px-6 py-4">{officer.committee}</td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-400">
                    {officer.program}
                  </td>
                  <td className="px-6 py-4 font-mono">{officer.term}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(officer)}
                      className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
                      title="Edit Officer Info"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleArchiveOfficer(officer.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 transition-colors ${
                        officer.isCurrent
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      <Archive className="w-3 h-3" />
                      <span>{officer.isCurrent ? 'Archive' : 'Activate'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingOfficer ? 'Edit Officer Information' : 'Add New Officer'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Full Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Justin Andre D. De Leon"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Position Title</label>
                  <input
                    required
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Web Developer"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Program Track</label>
                  <input
                    required
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    placeholder="e.g. CpE, EE, ECE"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Committee Assignment</label>
                <select
                  value={committee}
                  onChange={(e) => setCommittee(e.target.value as OfficerData['committee'])}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="Executive Committee">Executive Committee</option>
                  <option value="Board of Directors">Board of Directors</option>
                  <option value="Finance Committee">Finance Committee</option>
                  <option value="Membership Committee">Membership Committee</option>
                  <option value="Program Committee">Program Committee</option>
                  <option value="Publicity Committee">Publicity Committee</option>
                  <option value="Research & Development Committee">Research &amp; Development Committee</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold btn-ieee-primary"
                >
                  Save &amp; Sync to Public Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
