'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  Upload,
  ShieldCheck,
  UserPlus,
  Edit3,
  Trash2,
  X,
  Camera,
  CheckCircle2,
} from 'lucide-react';

interface MemberRow {
  id: string;
  fullName: string;
  studentNumber: string;
  program: string;
  yearLevel: number;
  ieeeNo: string;
  status: 'Active' | 'Inactive' | 'Expiring';
  role: 'Non-member' | 'SB_Member' | 'IEEE_Intl_Member' | 'Officer' | 'Admin';
  volunteerHours: number;
  avatarUrl: string;
}

const INITIAL_MEMBERS: MemberRow[] = [
  {
    id: '1',
    fullName: 'Justin Andre De Leon',
    studentNumber: '2022109876',
    program: 'CpE',
    yearLevel: 4,
    ieeeNo: 'IEEE-99887766',
    status: 'Active',
    role: 'Admin',
    volunteerHours: 120.5,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JustinDeLeon',
  },
  {
    id: '2',
    fullName: 'Levie Yancy R. Cruz',
    studentNumber: '2022104321',
    program: 'EE',
    yearLevel: 4,
    ieeeNo: 'IEEE-99881122',
    status: 'Active',
    role: 'Officer',
    volunteerHours: 95.0,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LevieCruz',
  },
  {
    id: '3',
    fullName: 'Olivia Faith P. Anore',
    studentNumber: '2022105544',
    program: 'ECE',
    yearLevel: 4,
    ieeeNo: 'IEEE-99883344',
    status: 'Active',
    role: 'Officer',
    volunteerHours: 80.0,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OliviaAnore',
  },
  {
    id: '4',
    fullName: 'Kirsten Freya A. Domingo',
    studentNumber: '2023101122',
    program: 'CpE',
    yearLevel: 3,
    ieeeNo: 'IEEE-99885566',
    status: 'Inactive',
    role: 'SB_Member',
    volunteerHours: 25.0,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KirstenDomingo',
  },
];

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberRow[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberRow | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [program, setProgram] = useState('CpE');
  const [yearLevel, setYearLevel] = useState(4);
  const [ieeeNo, setIeeeNo] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Expiring'>('Active');
  const [role, setRole] = useState<MemberRow['role']>('SB_Member');
  const [volunteerHours, setVolunteerHours] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Member');

  const openAddModal = () => {
    setEditingMember(null);
    setFullName('');
    setStudentNumber('2023100000');
    setProgram('CpE');
    setYearLevel(2);
    setIeeeNo(`IEEE-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setStatus('Active');
    setRole('SB_Member');
    setVolunteerHours(0);
    setAvatarUrl('https://api.dicebear.com/7.x/avataaars/svg?seed=NewMember');
    setModalOpen(true);
  };

  const openEditModal = (m: MemberRow) => {
    setEditingMember(m);
    setFullName(m.fullName);
    setStudentNumber(m.studentNumber);
    setProgram(m.program);
    setYearLevel(m.yearLevel);
    setIeeeNo(m.ieeeNo);
    setStatus(m.status);
    setRole(m.role);
    setVolunteerHours(m.volunteerHours);
    setAvatarUrl(m.avatarUrl);
    setModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(
        members.map((m) =>
          m.id === editingMember.id
            ? { ...m, fullName, studentNumber, program, yearLevel, ieeeNo, status, role, volunteerHours, avatarUrl }
            : m
        )
      );
    } else {
      const newMember: MemberRow = {
        id: `mem-${Date.now()}`,
        fullName,
        studentNumber,
        program,
        yearLevel,
        ieeeNo,
        status,
        role,
        volunteerHours,
        avatarUrl,
      };
      setMembers([newMember, ...members]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this member from the database?')) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.studentNumber.includes(search) ||
      m.ieeeNo.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['ID,Full Name,Student Number,Program,Year Level,IEEE No,Status,Role,Volunteer Hours\n'];
    const rows = members.map(
      (m) =>
        `${m.id},"${m.fullName}",${m.studentNumber},${m.program},${m.yearLevel},${m.ieeeNo},${m.status},${m.role},${m.volunteerHours}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IEEE_MUSB_Members_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span>Mapúa Student Member Directory</span>
          </h1>
          <p className="text-xs text-slate-400">
            View student numbers, program tracks, volunteer hours, update info/status, upload avatars, and export CSV.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Member</span>
          </button>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member name or student number..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00629B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400">Status:</span>
          {['All', 'Active', 'Inactive', 'Expiring'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Avatar &amp; Full Name</th>
                <th className="px-6 py-4">Student No.</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">IEEE No.</th>
                <th className="px-6 py-4">Membership Status</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Volunteer Hrs</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <img
                      src={m.avatarUrl}
                      alt={m.fullName}
                      className="w-9 h-9 rounded-xl bg-slate-800 object-cover border border-slate-700"
                    />
                    <div>
                      <div>{m.fullName}</div>
                      {m.role === 'Admin' && (
                        <span className="badge-mapua px-1.5 py-0.2 rounded text-[9px]">SUPERADMIN</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">{m.studentNumber}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded font-mono font-bold bg-[#00629B] text-white text-[10px]">
                      {m.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-blue-400">{m.ieeeNo}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        m.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : m.status === 'Inactive'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-300">{m.role}</td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                    {m.volunteerHours} hrs
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(m)}
                      className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors"
                      title="Edit Member Info & Photo"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingMember ? 'Edit Member Info & Status' : 'Add New Member'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Photo Upload Input */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-800 border border-slate-700">
                <img
                  src={avatarUrl}
                  alt="Avatar Preview"
                  className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-700"
                />
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200">Profile Photo Avatar</div>
                  <label className="px-3 py-1 rounded-lg bg-slate-700 text-white font-bold cursor-pointer inline-flex items-center gap-1 hover:bg-slate-600">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Full Name</label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Juan Dela Cruz"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Student Number</label>
                  <input
                    required
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="2023101234"
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
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Membership Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MemberRow['status'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Expiring">Expiring</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as MemberRow['role'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="SB_Member">SB_Member</option>
                    <option value="IEEE_Intl_Member">IEEE_Intl_Member</option>
                    <option value="Officer">Officer</option>
                    <option value="Admin">Admin</option>
                    <option value="Non-member">Non-member</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">IEEE Membership No.</label>
                  <input
                    required
                    type="text"
                    value={ieeeNo}
                    onChange={(e) => setIeeeNo(e.target.value)}
                    placeholder="IEEE-99887766"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Volunteer Hours</label>
                  <input
                    required
                    type="number"
                    step="0.5"
                    value={volunteerHours}
                    onChange={(e) => setVolunteerHours(parseFloat(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
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
                  Save Member Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
