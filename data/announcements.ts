/**
 * IEEE-MUSB Hub: Announcements Data Store
 * Organization: IEEE - Mapúa University Student Branch (IEEE-MUSB)
 */

export interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Workshops' | 'Competitions' | 'Membership Notices' | 'Urgent';
  isPinned: boolean;
  date: string;
  author: string;
  imageUrl?: string;
}

export const ANNOUNCEMENTS: AnnouncementData[] = [
  {
    id: 'ann-1',
    title: 'Registration Open: IEEE-MUSB Mini-MSDT 2026 Leadership Bootcamp',
    content:
      'Join us for the Management Skills & Development Training (Mini-MSDT) 2026! Designed for Mapúa engineering students aiming to develop executive leadership, project management, and branch organization skills.',
    category: 'Workshops',
    isPinned: true,
    date: '2026-07-20',
    author: 'Levie Yancy R. Cruz (Branch Chair)',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'ann-2',
    title: 'Hands-On KiCAD PCB Design & Microcontroller Workshop',
    content:
      'The Research & Development Committee is hosting an intensive 1-day KiCAD schematic capture and PCB layout workshop in the ECE Simulation Lab. Free for active IEEE-MUSB members!',
    category: 'Workshops',
    isPinned: true,
    date: '2026-07-08',
    author: 'Justin Andre De Leon (Web Developer / R&D)',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'ann-3',
    title: 'IEEE Philippines Student Summit 2026 Delegation',
    content:
      'IEEE-MUSB is sending an official student delegation to the IEEE Philippines Student Summit & STEP Workshop. Check your email for eligibility and travel stipend details.',
    category: 'Competitions',
    isPinned: false,
    date: '2026-06-15',
    author: 'Olivia Faith P. Anore (Vice-Chair)',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'ann-4',
    title: 'Mapúa Org Week Booth & Recruitment Drive AY 2025–2026',
    content:
      'Visit the IEEE-MUSB booth at the Mapúa Intramuros Quadrangle during Org Week! Connect with officers, explore tech projects, and secure your digital membership ID card.',
    category: 'Membership Notices',
    isPinned: false,
    date: '2026-05-28',
    author: 'Tyrone Wyeth O. Arceno (Membership Head)',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
  },
];
