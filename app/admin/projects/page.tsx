'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { FolderGit2, Plus, Edit3, Trash2, ExternalLink, X } from 'lucide-react';
import { ProjectData } from '@/data/projects';

export default function AdminProjectsPage() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<ProjectData | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState<ProjectData['domain']>('AI & Machine Learning');
  const [leadStudent, setLeadStudent] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const openCreateModal = () => {
    setEditingProj(null);
    setTitle('');
    setDescription('');
    setDomain('AI & Machine Learning');
    setLeadStudent('Justin Andre D. De Leon (CpE)');
    setTagsStr('Next.js, TypeScript, Supabase');
    setDemoUrl('https://ieeemusb.org');
    setModalOpen(true);
  };

  const openEditModal = (proj: ProjectData) => {
    setEditingProj(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setDomain(proj.domain);
    setLeadStudent(proj.leadStudent);
    setTagsStr(proj.tags.join(', '));
    setDemoUrl(proj.demoUrl || '');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingProj) {
      updateProject(editingProj.id, { title, description, domain, leadStudent, tags: tagsArr, demoUrl });
    } else {
      addProject({
        title,
        description,
        domain,
        leadStudent,
        tags: tagsArr,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
        demoUrl,
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-blue-400" />
            <span>Mapúa Engineering Projects Manager</span>
          </h1>
          <p className="text-xs text-slate-400">
            Showcase student research prototypes. Changes automatically synchronize live to the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Project Title</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Lead Student</th>
                <th className="px-6 py-4">Tech Tags</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-white max-w-xs">{proj.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-[#00629B] text-white">
                      {proj.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-400 font-mono">{proj.leadStudent}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors"
                      title="Delete Project"
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

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProj ? 'Edit Project' : 'Add New Project'}
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
                <label className="font-semibold text-slate-300">Project Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. IEEE-MUSB Hub Management Platform"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Engineering Domain</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as ProjectData['domain'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Robotics & Automation">Robotics & Automation</option>
                    <option value="IoT & Smart Cities">IoT & Smart Cities</option>
                    <option value="Electrical Power Systems">Electrical Power Systems</option>
                    <option value="Telecommunications & ECE">Telecommunications & ECE</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Lead Student</label>
                  <input
                    required
                    type="text"
                    value={leadStudent}
                    onChange={(e) => setLeadStudent(e.target.value)}
                    placeholder="e.g. Justin Andre D. De Leon (CpE)"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tech Stack Tags (Comma Separated)</label>
                <input
                  required
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="Next.js, Supabase, Tailwind, ESP32"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project overview..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
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
                  Save &amp; Sync to Public Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
