/**
 * IEEE-MUSB Hub: AI Intelligence Engine & Service Layer
 * Organization: IEEE - Mapúa University Student Branch (IEEE-MUSB)
 */

export const IEEE_MUSB_KNOWLEDGE_BASE = `
You are the official IEEE-MUSB Branch Assistant AI.
IEEE-MUSB (Institute of Electrical and Electronics Engineers - Mapúa University Student Branch) was established in 2002 at Mapúa University, Intramuros, Manila, Philippines.
Official Motto: "Professionalism. Integrity. Leadership. Esprit de Corps. Remuneration."
Official Email: ieeemapuasb@gmail.com | Facebook: https://www.facebook.com/ieeemapuasb

Key Officers:
- Branch Chair: Levie Yancy R. Cruz (EE)
- Vice-Chair Internal: Olivia Faith P. Anore (ECE)
- Vice-Chair External: Tyrone Wyeth O. Arceno (ECE)
- Web Developer / R&D Head: Justin Andre De Leon (CpE)
- Membership Committee Head: Tyrone Wyeth O. Arceno

Open Programs / Majors:
Mapúa School of EECE (Electrical Engineering - EE, Electronics Engineering - ECE, Computer Engineering - CpE).

Intramuros Campus Venues:
- Mapúa AV Hall (Admin Building, 2nd Floor)
- ECE Simulation & Design Lab (NW Building, 3rd Floor)
- IEEE Student Branch HQ Room (South Building)
- Mapúa Intramuros Quadrangle (Org Week Booth Location)

Membership Registration Steps:
1. Visit the IEEE-MUSB Student Portal (/portal or /login).
2. Complete membership application form with your Mapúa Student Number.
3. Pay branch dues or obtain your digital IEEE ID card at the Org Week booth.
4. Access your 3D digital card & event check-in QR code on /dashboard.
`;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function generateChatResponse(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes('register') || q.includes('join') || q.includes('membership') || q.includes('how to')) {
    return `To join IEEE-MUSB:
1. Go to the Member Portal (/portal) or visit our Org Week booth at the Mapúa Intramuros Quadrangle.
2. Verify your Student Number (EE, ECE, or CpE).
3. Once registered, log in to /dashboard to view your 3D Digital IEEE Membership Card and event check-in QR code!
For assistance, email ieeemapuasb@gmail.com or contact Tyrone Wyeth O. Arceno (Membership Head).`;
  }

  if (q.includes('officer') || q.includes('chair') || q.includes('contact') || q.includes('lead')) {
    return `IEEE-MUSB Executive Board (AY 2025–2026):
• Branch Chair: Levie Yancy R. Cruz (EE)
• Vice-Chair Internal: Olivia Faith P. Anore (ECE)
• Vice-Chair External: Tyrone Wyeth O. Arceno (ECE)
• Web Developer & R&D Lead: Justin Andre De Leon (CpE)
Contact us directly on Facebook (facebook.com/ieeemapuasb) or via email at ieeemapuasb@gmail.com.`;
  }

  if (q.includes('venue') || q.includes('location') || q.includes('where') || q.includes('room') || q.includes('kicad') || q.includes('lab')) {
    return `IEEE-MUSB Mapúa Intramuros Venues:
• ECE Simulation Lab: NW Building, 3rd Floor (Hands-on KiCAD & Microcontroller Workshops)
• Mapúa AV Hall: Admin Building, 2nd Floor (Mini-MSDT Leadership Bootcamps & General Assemblies)
• IEEE Branch HQ: South Building Room S-204
• Quadrangle: Org Week Booth & Tech Showcase.`;
  }

  if (q.includes('event') || q.includes('workshop') || q.includes('msdt') || q.includes('summit')) {
    return `Upcoming Featured IEEE-MUSB Events:
1. IEEE-MUSB Mini-MSDT 2026 Leadership Bootcamp (Mapúa AV Hall)
2. Hands-On KiCAD PCB Design & Microcontroller Workshop (ECE Simulation Lab)
3. IEEE Philippines Student Summit & STEP Delegation
Check out the full list and register on /events!`;
  }

  return `Hello! I'm the official IEEE-MUSB Branch Assistant AI. 
I can help you with:
• Membership registration steps & status checks
• Executive Board officers & committee leads
• Mapúa Intramuros campus event venues & lab locations
• Upcoming workshops, KiCAD sessions, and Mini-MSDT bootcamps!
What would you like to know?`;
}

export function generateAnnouncementFromNotes(rawNotes: string): { markdown: string; facebookCaption: string } {
  const titleLine = rawNotes.split('\n')[0] || 'IEEE-MUSB Branch Event Update';
  
  const markdown = `# ${titleLine}

## 📢 Official Announcement
${rawNotes}

### 📌 Key Details:
- **Organizer**: IEEE - Mapúa University Student Branch (IEEE-MUSB)
- **Target Audience**: Mapúa EECE Students (EE, ECE, CpE)
- **Venue**: Mapúa Intramuros Campus / ECE Simulation Lab

---
*For registration and digital event check-in QR codes, visit [ieeemusb.org/events](https://ieeemusb.org/events).*`;

  const facebookCaption = `🚀 [IEEE-MUSB OFFICIAL NOTICE] 🚀

${titleLine}

${rawNotes}

📍 Location: Mapúa University Intramuros Campus
👥 Open to all Mapúa EECE Students (EE, ECE, CpE)

🔗 Register & get your digital QR check-in pass: https://ieeemusb.org/portal

#IEEEMUSB #MapuaUniversity #IEEEPhilippines #EECE #EngineeringExcellence #Intramuros`;

  return { markdown, facebookCaption };
}

export function summarizeAnnouncementText(content: string): string {
  return `✨ **AI Quick Executive Summary**:
• **Core Focus**: ${content.slice(0, 120)}...
• **Target Participants**: Mapúa EE, ECE, and CpE Engineering Students.
• **Action Required**: Register via the Member Portal (/portal) to secure event check-in QR codes.`;
}

export function matchStudentActivities(major: string, interests: string[]): Array<{ title: string; category: string; matchScore: number; reason: string }> {
  const majorUpper = major.toUpperCase();

  if (majorUpper.includes('CPE') || majorUpper.includes('COMPUTER')) {
    return [
      {
        title: 'KiCAD PCB Design & Microcontroller Workshop',
        category: 'Hardware & Embedded',
        matchScore: 98,
        reason: 'Directly aligns with CpE hardware synthesis, schematic layout, and firmware programming.',
      },
      {
        title: 'IEEE-MUSB AI & Machine Learning Research Group',
        category: 'R&D Committee',
        matchScore: 95,
        reason: 'Matches your interest in software architecture, neural networks, and computer engineering.',
      },
      {
        title: 'Mini-MSDT 2026 Executive Leadership Bootcamp',
        category: 'Leadership & Management',
        matchScore: 88,
        reason: 'Develop project management skills for leading engineering capstone teams.',
      },
    ];
  }

  if (majorUpper.includes('EE') || majorUpper.includes('ELECTRICAL')) {
    return [
      {
        title: 'Electrical Power Systems & Smart Grid Seminar',
        category: 'Power & Energy',
        matchScore: 99,
        reason: 'Tailored for Electrical Engineering majors exploring renewable grid infrastructure.',
      },
      {
        title: 'KiCAD PCB Schematic & Power Electronics Lab',
        category: 'Hardware R&D',
        matchScore: 92,
        reason: 'Hands-on practice designing power distribution boards and microcontroller drivers.',
      },
      {
        title: 'IEEE Philippines Student Summit Delegation',
        category: 'National Conference',
        matchScore: 90,
        reason: 'Network with industry electrical engineers and student leaders nationwide.',
      },
    ];
  }

  // Default ECE / General
  return [
    {
      title: 'Telecommunications & RF Board Design Workshop',
      category: 'Telecom & Electronics',
      matchScore: 97,
      reason: 'Perfect fit for ECE students building wireless sensor circuits and antenna networks.',
    },
    {
      title: 'KiCAD PCB Design & Microcontroller Workshop',
      category: 'Electronics R&D',
      matchScore: 94,
      reason: 'Essential skill for circuit design and hardware prototyping.',
    },
    {
      title: 'Mini-MSDT 2026 Executive Leadership Bootcamp',
      category: 'Leadership',
      matchScore: 89,
      reason: 'Prepare for officer roles in the IEEE-MUSB Student Branch.',
    },
  ];
}
