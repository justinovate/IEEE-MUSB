'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ANNOUNCEMENTS, AnnouncementData } from '@/data/announcements';
import { EVENTS, EventData } from '@/data/events';
import { PROJECTS, ProjectData } from '@/data/projects';
import { OfficersRoster, OfficerData } from '@/data/officers';

interface DataContextType {
  announcements: AnnouncementData[];
  events: EventData[];
  projects: ProjectData[];
  officers: OfficerData[];
  // Announcement Actions
  addAnnouncement: (ann: Omit<AnnouncementData, 'id' | 'date'>) => void;
  updateAnnouncement: (id: string, ann: Partial<AnnouncementData>) => void;
  deleteAnnouncement: (id: string) => void;
  togglePinAnnouncement: (id: string) => void;
  // Event Actions
  addEvent: (evt: Omit<EventData, 'id' | 'registeredCount'>) => void;
  updateEvent: (id: string, evt: Partial<EventData>) => void;
  deleteEvent: (id: string) => void;
  // Project Actions
  addProject: (proj: Omit<ProjectData, 'id'>) => void;
  updateProject: (id: string, proj: Partial<ProjectData>) => void;
  deleteProject: (id: string) => void;
  // Officer Actions
  addOfficer: (off: Omit<OfficerData, 'id'>) => void;
  updateOfficer: (id: string, off: Partial<OfficerData>) => void;
  toggleArchiveOfficer: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>(ANNOUNCEMENTS);
  const [events, setEvents] = useState<EventData[]>(EVENTS);
  const [projects, setProjects] = useState<ProjectData[]>(PROJECTS);
  const [officers, setOfficers] = useState<OfficerData[]>(OfficersRoster.currentOfficers);

  // Load from localStorage on mount if present
  useEffect(() => {
    try {
      const savedAnn = localStorage.getItem('ieee_announcements');
      if (savedAnn) setAnnouncements(JSON.parse(savedAnn));

      const savedEvt = localStorage.getItem('ieee_events');
      if (savedEvt) setEvents(JSON.parse(savedEvt));

      const savedProj = localStorage.getItem('ieee_projects');
      if (savedProj) setProjects(JSON.parse(savedProj));

      const savedOff = localStorage.getItem('ieee_officers');
      if (savedOff) setOfficers(JSON.parse(savedOff));
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
  }, []);

  // Save changes to localStorage helper
  const saveAnnouncements = (newAnn: AnnouncementData[]) => {
    setAnnouncements(newAnn);
    localStorage.setItem('ieee_announcements', JSON.stringify(newAnn));
  };

  const saveEvents = (newEvt: EventData[]) => {
    setEvents(newEvt);
    localStorage.setItem('ieee_events', JSON.stringify(newEvt));
  };

  const saveProjects = (newProj: ProjectData[]) => {
    setProjects(newProj);
    localStorage.setItem('ieee_projects', JSON.stringify(newProj));
  };

  const saveOfficers = (newOff: OfficerData[]) => {
    setOfficers(newOff);
    localStorage.setItem('ieee_officers', JSON.stringify(newOff));
  };

  // Announcement Handlers
  const addAnnouncement = (ann: Omit<AnnouncementData, 'id' | 'date'>) => {
    const newItem: AnnouncementData = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    saveAnnouncements([newItem, ...announcements]);
  };

  const updateAnnouncement = (id: string, ann: Partial<AnnouncementData>) => {
    saveAnnouncements(
      announcements.map((a) => (a.id === id ? { ...a, ...ann } : a))
    );
  };

  const deleteAnnouncement = (id: string) => {
    saveAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const togglePinAnnouncement = (id: string) => {
    saveAnnouncements(
      announcements.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    );
  };

  // Event Handlers
  const addEvent = (evt: Omit<EventData, 'id' | 'registeredCount'>) => {
    const newItem: EventData = {
      ...evt,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
    };
    saveEvents([newItem, ...events]);
  };

  const updateEvent = (id: string, evt: Partial<EventData>) => {
    saveEvents(events.map((e) => (e.id === id ? { ...e, ...evt } : e)));
  };

  const deleteEvent = (id: string) => {
    saveEvents(events.filter((e) => e.id !== id));
  };

  // Project Handlers
  const addProject = (proj: Omit<ProjectData, 'id'>) => {
    const newItem: ProjectData = {
      ...proj,
      id: `proj-${Date.now()}`,
    };
    saveProjects([newItem, ...projects]);
  };

  const updateProject = (id: string, proj: Partial<ProjectData>) => {
    saveProjects(projects.map((p) => (p.id === id ? { ...p, ...proj } : p)));
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter((p) => p.id !== id));
  };

  // Officer Handlers
  const addOfficer = (off: Omit<OfficerData, 'id'>) => {
    const newItem: OfficerData = {
      ...off,
      id: `off-${Date.now()}`,
    };
    saveOfficers([newItem, ...officers]);
  };

  const updateOfficer = (id: string, off: Partial<OfficerData>) => {
    saveOfficers(officers.map((o) => (o.id === id ? { ...o, ...off } : o)));
  };

  const toggleArchiveOfficer = (id: string) => {
    saveOfficers(
      officers.map((o) => (o.id === id ? { ...o, isCurrent: !o.isCurrent } : o))
    );
  };

  return (
    <DataContext.Provider
      value={{
        announcements,
        events,
        projects,
        officers,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        togglePinAnnouncement,
        addEvent,
        updateEvent,
        deleteEvent,
        addProject,
        updateProject,
        deleteProject,
        addOfficer,
        updateOfficer,
        toggleArchiveOfficer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
