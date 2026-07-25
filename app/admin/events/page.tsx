'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { Calendar, Plus, Edit3, Trash2, MapPin, Clock, Users, X } from 'lucide-react';
import { EventData } from '@/data/events';

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [capacity, setCapacity] = useState(100);
  const [category, setCategory] = useState<EventData['category']>('Workshop');
  const [status, setStatus] = useState<EventData['status']>('Upcoming');

  const openCreateModal = () => {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setVenue('Mapúa University, Intramuros');
    setTargetDate('2026-08-30T10:00');
    setCapacity(100);
    setCategory('Workshop');
    setStatus('Upcoming');
    setModalOpen(true);
  };

  const openEditModal = (evt: EventData) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setDescription(evt.description);
    setVenue(evt.venue);
    setTargetDate(evt.targetDate.slice(0, 16));
    setCapacity(evt.capacity);
    setCategory(evt.category);
    setStatus(evt.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, { title, description, venue, targetDate, capacity, category, status });
    } else {
      addEvent({
        title,
        description,
        venue,
        targetDate,
        capacity,
        category,
        status,
        posterUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            <span>Event &amp; Workshop Manager</span>
          </h1>
          <p className="text-xs text-slate-400">
            Schedule workshops and countdowns. Changes automatically synchronize live to the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Event Title</th>
                <th className="px-6 py-4">Category &amp; Venue</th>
                <th className="px-6 py-4">Target Date</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 max-w-xs font-bold text-white">
                    {evt.title}
                  </td>
                  <td className="px-6 py-4 space-y-0.5">
                    <div className="text-blue-400 font-mono font-bold">{evt.category}</div>
                    <div className="text-[11px] text-slate-400 truncate">{evt.venue}</div>
                  </td>
                  <td className="px-6 py-4 font-mono">{new Date(evt.targetDate).toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-300">
                    {evt.registeredCount} / {evt.capacity}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        evt.status === 'Upcoming'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(evt)}
                      className="p-2 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors"
                      title="Delete Event"
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
                {editingEvent ? 'Edit Event Details' : 'Create New Event'}
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
                <label className="font-semibold text-slate-300">Event Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. KiCAD PCB Design Workshop"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EventData['category'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Technical">Technical</option>
                    <option value="Social">Social</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as EventData['status'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Date &amp; Time</label>
                  <input
                    required
                    type="datetime-local"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Seat Capacity</label>
                  <input
                    required
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Venue Location</label>
                <input
                  required
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Mapúa AV Hall, Intramuros"
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
                  placeholder="Event description..."
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
                  Save &amp; Sync to Public Events
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
