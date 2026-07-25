'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/components/data-provider';
import { Bell, Plus, Pin, Edit3, Trash2, Search, X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AnnouncementData } from '@/data/announcements';

// Smart Curated Photo Presets matching event types
const SMART_IMAGE_PRESETS = [
  {
    label: 'KiCAD PCB & Microcontroller Workshop',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
  },
  {
    label: 'Mini-MSDT & Leadership Bootcamp',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
  },
  {
    label: 'IEEE Philippines Summit & STEP Event',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60',
  },
  {
    label: 'Mapúa Org Week Recruitment Drive',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
  },
  {
    label: 'Hackathon & Engineering Competition',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60',
  },
];

export default function AdminAnnouncementsPage() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, togglePinAnnouncement } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<AnnouncementData | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<AnnouncementData['category']>('General');
  const [isPinned, setIsPinned] = useState(false);
  const [imageUrl, setImageUrl] = useState(SMART_IMAGE_PRESETS[0].url);

  const openCreateModal = () => {
    setEditingAnn(null);
    setTitle('');
    setContent('');
    setCategory('General');
    setIsPinned(false);
    setImageUrl(SMART_IMAGE_PRESETS[0].url);
    setModalOpen(true);
  };

  const openEditModal = (ann: AnnouncementData) => {
    setEditingAnn(ann);
    setTitle(ann.title);
    setContent(ann.content);
    setCategory(ann.category);
    setIsPinned(ann.isPinned);
    setImageUrl(ann.imageUrl || SMART_IMAGE_PRESETS[0].url);
    setModalOpen(true);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnn) {
      updateAnnouncement(editingAnn.id, { title, content, category, isPinned, imageUrl });
    } else {
      addAnnouncement({
        title,
        content,
        category,
        isPinned,
        imageUrl,
        author: 'Justin Andre De Leon (Admin)',
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(id);
    }
  };

  const filtered = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" />
            <span>Announcements &amp; News Manager</span>
          </h1>
          <p className="text-xs text-slate-400">
            Publish official branch notices. Upload custom photos or use Smart Auto-Match Preset Photos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/announcements/ai"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Caption Generator</span>
          </Link>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Announcement</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search announcements..."
          className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00629B]"
        />
      </div>

      {/* Announcements List Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Cover Photo</th>
                <th className="px-6 py-4">Title &amp; Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Pinned</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((ann) => (
                <tr key={ann.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-10 rounded-lg bg-slate-800 overflow-hidden border border-slate-700">
                      <img src={ann.imageUrl || SMART_IMAGE_PRESETS[0].url} alt={ann.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1 max-w-xs">
                    <div className="font-bold text-white text-sm line-clamp-1">{ann.title}</div>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold badge-mapua">
                      {ann.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono">{ann.author}</td>
                  <td className="px-6 py-4 font-mono">{ann.date}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePinAnnouncement(ann.id)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1 transition-colors ${
                        ann.isPinned
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Pin className="w-3 h-3" />
                      <span>{ann.isPinned ? 'PINNED' : 'Pin'}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(ann)}
                      className="p-2 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors"
                      title="Edit Announcement"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors"
                      title="Delete Announcement"
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
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingAnn ? 'Edit Announcement' : 'Post New Announcement'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Photo Selector Section */}
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <span>Cover Photo Selector</span>
                  </div>

                  <label className="px-3 py-1 rounded-lg bg-[#00629B] text-white font-bold text-[11px] cursor-pointer inline-flex items-center gap-1 hover:bg-blue-600 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Selected Preview */}
                <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                  <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-white">
                    Selected Image
                  </span>
                </div>

                {/* Smart Auto-Match Presets */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Smart Auto-Match Matching Presets</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SMART_IMAGE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`p-1.5 rounded-xl border text-left text-[10px] transition-colors flex items-center gap-2 ${
                          imageUrl === preset.url
                            ? 'bg-[#00629B]/30 border-blue-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-6 h-6 rounded object-cover shrink-0" />
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. IEEE-MUSB General Assembly AY 2026"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AnnouncementData['category'])}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="General">General</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Membership Notices">Membership Notices</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Content / Details</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Announcement body text..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 text-[#00629B] rounded border-slate-700 bg-slate-800"
                />
                <label htmlFor="pinCheck" className="text-slate-300 cursor-pointer font-medium">
                  Pin to top of bulletin feed
                </label>
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
                  Save &amp; Sync to Public Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
