export interface EventData {
  id: string;
  title: string;
  description: string;
  targetDate: string; // ISO String for countdown calculations
  venue: string;
  category: 'Workshop' | 'Seminar' | 'Technical' | 'Social' | 'Competition';
  capacity: number;
  registeredCount: number;
  posterUrl: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  fbEventUrl?: string;
}

export const EVENTS: EventData[] = [
  {
    id: 'evt-1',
    title: 'IEEE-MUSB Mini-MSDT 2026 (Management Skills Training)',
    description:
      'The flagship developmental bootcamp of IEEE-MUSB. Featuring interactive team challenges, management simulation games, and leadership workshops for applicants and committee officers.',
    targetDate: '2026-08-15T09:00:00+08:00',
    venue: 'Mapúa Student Center & AV Hall, Intramuros',
    category: 'Seminar',
    capacity: 120,
    registeredCount: 94,
    posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
    status: 'Upcoming',
    fbEventUrl: 'https://www.facebook.com/ieeemapuasb',
  },
  {
    id: 'evt-2',
    title: 'IEEE Philippines Student Summit & STEP Workshop',
    description:
      'Collaborative summit hosted with IEEE Philippines Section and IEEE Young Professionals. Focuses on student transition to professional engineering careers, licensing, and international research.',
    targetDate: '2026-08-28T13:00:00+08:00',
    venue: 'Mapúa Seminar Room 302, Intramuros',
    category: 'Technical',
    capacity: 150,
    registeredCount: 118,
    posterUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
    status: 'Upcoming',
    fbEventUrl: 'https://www.facebook.com/ieeemapuasb',
  },
  {
    id: 'evt-3',
    title: 'Hands-on KiCAD PCB & Microcontroller Workshop',
    description:
      'Practical workshop led by R&D coordinators. Master schematic capture, 2-layer PCB routing, surface-mount soldering, and ESP32 microcontroller flashing.',
    targetDate: '2026-09-05T13:30:00+08:00',
    venue: 'ECE Simulation Lab 304, Mapúa Intramuros',
    category: 'Workshop',
    capacity: 45,
    registeredCount: 41,
    posterUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop&q=60',
    status: 'Upcoming',
    fbEventUrl: 'https://www.facebook.com/ieeemapuasb',
  },
];
