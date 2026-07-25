export interface ProjectData {
  id: string;
  title: string;
  description: string;
  domain: 'AI & Machine Learning' | 'Robotics & Automation' | 'IoT & Smart Cities' | 'Electrical Power Systems' | 'Telecommunications & ECE';
  leadStudent: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'proj-1',
    title: 'IEEE-MUSB Hub: Student Branch Management System',
    description:
      'Full-stack management system built with Next.js App Router, Tailwind CSS, Supabase PostgreSQL, and RLS security by R&D Web Developer Justin Andre De Leon.',
    domain: 'AI & Machine Learning',
    leadStudent: 'Justin Andre D. De Leon (CpE)',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind', 'RLS'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    githubUrl: 'https://github.com',
    demoUrl: 'https://ieeemusb.org',
  },
  {
    id: 'proj-2',
    title: 'Autonomous Intramuros Micro-Grid Monitor',
    description:
      'Real-time power quality monitoring system using ESP32 microcontrollers, Modbus power meters, and MQTT cloud analytics for campus energy efficiency.',
    domain: 'Electrical Power Systems',
    leadStudent: 'Inigo A. Mendoza (EE)',
    tags: ['ESP32', 'Modbus', 'MQTT', 'Smart Grid', 'C++'],
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'proj-3',
    title: '5G Small-Cell Antenna Array Beamforming Simulator',
    description:
      'MATLAB & Python simulation software analyzing phased-array antenna radiation patterns for dense urban environments.',
    domain: 'Telecommunications & ECE',
    leadStudent: 'Vhonne Raj N. Opeña (ECE)',
    tags: ['MATLAB', 'Python', '5G', 'RF Design', 'Beamforming'],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'proj-4',
    title: 'Robo-Rover AI: Vision-Guided Search Robot',
    description:
      'Computer vision search robot equipped with LiDAR, OpenCV target detection, and ROS2 navigation stack designed for search and rescue operations.',
    domain: 'Robotics & Automation',
    leadStudent: 'Bono Gabriel B. Causapin (CpE)',
    tags: ['ROS2', 'LiDAR', 'OpenCV', 'Raspberry Pi', 'Robotics'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
  },
];
