export interface OfficerData {
  id: string;
  name: string;
  position: string;
  committee:
    | 'Executive Committee'
    | 'Board of Directors'
    | 'Finance Committee'
    | 'Membership Committee'
    | 'Program Committee'
    | 'Publicity Committee'
    | 'Research & Development Committee';
  program?: string;
  photoUrl: string;
  term: '2025-2026' | '2024-2025';
  isCurrent: boolean;
  email?: string;
  linkedinUrl?: string;
}

export class OfficersRoster {
  static currentOfficers: OfficerData[] = [
    // Executive Committee
    {
      id: 'exec-1',
      name: 'Levie Yancy R. Cruz',
      position: 'Branch Chairperson',
      committee: 'Executive Committee',
      program: 'EE / ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LevieCruz',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'exec-2',
      name: 'Olivia Faith P. Anore',
      position: 'Branch Vice-Chairperson',
      committee: 'Executive Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OliviaAnore',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'exec-3',
      name: 'Kirsten Freya A. Domingo',
      position: 'Branch Secretary',
      committee: 'Executive Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KirstenDomingo',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'exec-4',
      name: 'Ged Francis J. Mabag',
      position: 'Branch Treasurer',
      committee: 'Executive Committee',
      program: 'EE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GedMabag',
      term: '2025-2026',
      isCurrent: true,
    },

    // Board of Directors
    {
      id: 'bod-1',
      name: 'Levie Yancy R. Cruz',
      position: 'Board Chair',
      committee: 'Board of Directors',
      program: 'EE / ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LevieCruz',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'bod-2',
      name: 'Russel John P. Mallorca',
      position: 'Director',
      committee: 'Board of Directors',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RusselMallorca',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'bod-3',
      name: 'Euanne Jhasmine R. Villanueva',
      position: 'Director',
      committee: 'Board of Directors',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EuanneVillanueva',
      term: '2025-2026',
      isCurrent: true,
    },

    // Finance Committee
    {
      id: 'fin-1',
      name: 'Daniel S. Baron',
      position: 'Finance Head',
      committee: 'Finance Committee',
      program: 'EE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DanielBaron',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'fin-2',
      name: 'Karl Phillip C. Espino',
      position: 'Asst. Finance Head',
      committee: 'Finance Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KarlEspino',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'fin-3',
      name: 'Kylle Lorenzo G. Dacanay',
      position: 'Internal Coordinator',
      committee: 'Finance Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KylleDacanay',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'fin-4',
      name: 'Aaron Nufable',
      position: 'External Coordinator',
      committee: 'Finance Committee',
      program: 'EE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AaronNufable',
      term: '2025-2026',
      isCurrent: true,
    },

    // Membership Committee
    {
      id: 'mem-1',
      name: 'Tyrone Wyeth O. Arceno',
      position: 'Membership Head',
      committee: 'Membership Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TyroneArceno',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'mem-2',
      name: 'Sean D. Arboladura',
      position: 'Asst. Membership Head',
      committee: 'Membership Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SeanArboladura',
      term: '2025-2026',
      isCurrent: true,
    },

    // Program Committee
    {
      id: 'prog-1',
      name: 'Amos C. Cruz',
      position: 'Program Head',
      committee: 'Program Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmosCruz',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'prog-2',
      name: 'Mariella Faith M. Burdeos',
      position: 'Technical Coordinator',
      committee: 'Program Committee',
      program: 'EE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariellaBurdeos',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'prog-3',
      name: 'Marc Lorence E. Oracion',
      position: 'Asst. Tech Coordinator',
      committee: 'Program Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcOracion',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'prog-4',
      name: 'Karra Erice V. Villanueva',
      position: 'Social Coordinator',
      committee: 'Program Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KarraVillanueva',
      term: '2025-2026',
      isCurrent: true,
    },

    // Publicity Committee
    {
      id: 'pub-1',
      name: 'Trisha Santos',
      position: 'Publicity Head',
      committee: 'Publicity Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TrishaSantos',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'pub-2',
      name: 'Mae Jennilou M. De Guzman',
      position: 'Asst. Publicity Head',
      committee: 'Publicity Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaeDeGuzman',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'pub-3',
      name: 'John Camilo B. Dichoso',
      position: 'PR Coordinator',
      committee: 'Publicity Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDichoso',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'pub-4',
      name: 'Justine Medina',
      position: 'Asst. PR Coordinator',
      committee: 'Publicity Committee',
      program: 'EE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JustineMedina',
      term: '2025-2026',
      isCurrent: true,
    },

    // Research & Development Committee
    {
      id: 'rnd-1',
      name: 'Bono Gabriel B. Causapin',
      position: 'R&D Head',
      committee: 'Research & Development Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BonoCausapin',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'rnd-2',
      name: 'Inigo A. Mendoza',
      position: 'EE Coordinator',
      committee: 'Research & Development Committee',
      program: 'EE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=InigoMendoza',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'rnd-3',
      name: 'Vhonne Raj N. Opeña',
      position: 'ECE Coordinator',
      committee: 'Research & Development Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VhonneOpena',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'rnd-4',
      name: 'Kirsten Claire D. Bernardo',
      position: 'Asst. ECE Coordinator',
      committee: 'Research & Development Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KirstenBernardo',
      term: '2025-2026',
      isCurrent: true,
    },
    {
      id: 'rnd-5',
      name: 'Justin Andre D. De Leon',
      position: 'Web Developer / Superadmin',
      committee: 'Research & Development Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JustinDeLeon',
      term: '2025-2026',
      isCurrent: true,
      email: 'webdev.ieeemusb@gmail.com',
    },
  ];

  static pastOfficers: OfficerData[] = [
    {
      id: 'past-1',
      name: 'John Doe',
      position: 'Past Branch Chair',
      committee: 'Executive Committee',
      program: 'ECE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoePast',
      term: '2024-2025',
      isCurrent: false,
    },
    {
      id: 'past-2',
      name: 'Jane Smith',
      position: 'Past R&D Head',
      committee: 'Research & Development Committee',
      program: 'CpE',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JaneSmithPast',
      term: '2024-2025',
      isCurrent: false,
    },
  ];
}
