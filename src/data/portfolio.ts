export interface Socials {
  github: string;
  linkedin: string;
}

export interface TechCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  details: {
    problem: string;
    architecture: string;
    impact: string;
  };
}

export interface TimelineNode {
  period: string;
  tag: string;
  title: string;
  organization: string;
  summary: string;
}

export interface PortfolioData {
  firstName: string;
  fullName: string;
  heroBannerTitle: string;
  heroTagLeft: string;
  heroTagRight: string;
  roleSubtitle: string;
  currentlyAt: string;
  location: string;
  email: string;
  socials: Socials;
  bioSummary: string;
  techStack: TechCategory[];
  projects: Project[];
  timeline: TimelineNode[];
}

export const portfolioData: PortfolioData = {
  firstName: 'WALEED',
  fullName: 'Waleed Hassan',
  heroBannerTitle: '< COMPUTER SCIENTIST />',
  heroTagLeft: '©2026',
  heroTagRight: '[[ WEB DEVELOPMENT & AI SYSTEMS ]]',
  roleSubtitle: 'Computer Scientist, Web Developer & AI Application Builder.',
  currentlyAt: 'BSc Computer Science @ University of Engineering and Technology, Lahore',
  location: 'Gujranwala, Pakistan',
  email: 'grw2206420@outlook.com',
  socials: {
    github: 'https://github.com/Waleedhasn',
    linkedin: 'https://www.linkedin.com/in/waleed-hassan-98768b330',
  },
  bioSummary:
    'Computer Science undergraduate at UET Lahore specializing in responsive web development, conversational AI architectures, relational database systems, and algorithmic software engineering with strict typing and clean architecture.',
  techStack: [
    {
      title: 'Languages & Frameworks',
      description: 'Typed systems, modern frontends, and native algorithmic runtimes.',
      skills: [
        'TypeScript',
        'JavaScript (ES6+)',
        'Python',
        'C++',
        'C#',
        'HTML5',
        'CSS3',
        'React',
        'Astro (Static Site Generation)',
        'Tailwind CSS v4',
        'Lucide React',
      ],
    },
    {
      title: 'AI & Retrieval Engineering',
      description: 'Conversational LLM pipelines, prompt systems, and vector integrations.',
      skills: [
        'Prompt Engineering',
        'Conversational AI Architecture',
        'Client-Side RAG',
        'OpenAI API',
        'Gemini API',
        'Anthropic API',
      ],
    },
    {
      title: 'Databases, Tools & Core Practices',
      description: 'Relational persistence, production tooling, and accessible design.',
      skills: [
        'SQL',
        'MySQL',
        'Relational Schema Design',
        'Git',
        'GitHub',
        'GitHub Pages',
        'Linux / Bash',
        'npm',
        'Vite',
        'WCAG AA Accessibility',
        'Mobile-First Architecture',
      ],
    },
  ],
  projects: [
    {
      id: 'assignment-management-system',
      title: 'Assignment Management System',
      subtitle: 'Algorithmic Workflow Coordination',
      category: 'ALGORITHMS & DSA',
      description:
        'Algorithmic workflow coordination system designed to automate submissions, deadlines, and evaluations utilizing optimized data structures.',
      tags: ['Python', 'DSA', 'Queue Logic'],
      githubUrl: 'https://github.com/Waleedhasn',
      details: {
        problem: 'Managing bulk course assignment submissions, priority scheduling, and automated grading pipelines with low overhead.',
        architecture: 'Custom priority queues, DAG-based deadline dependency graphs, and clean modular Python service layers.',
        impact: 'Eliminated evaluation bottlenecks and provided sub-second retrieval across hundreds of concurrent submissions.',
      },
    },
    {
      id: 'thesis-management-system',
      title: 'Thesis Management System',
      subtitle: 'Relational Academic Coordination',
      category: 'DATABASE ARCHITECTURE',
      description:
        'Relational database application engineered to coordinate undergraduate thesis proposals, evaluations, and supervisor allocations.',
      tags: ['SQL', 'MySQL', 'Relational Schema'],
      githubUrl: 'https://github.com/Waleedhasn',
      details: {
        problem: 'Disjointed academic proposals, supervisor load imbalances, and uncoordinated review schedules across departments.',
        architecture: 'Normalized 3NF schema, transactional integrity, stored procedures, and role-based access for students and supervisors.',
        impact: 'Streamlined academic proposal approvals, preventing double allocations and maintaining strict audit trails.',
      },
    },
    {
      id: 'solitaire-game',
      title: 'Solitaire Game',
      subtitle: 'Low-Latency Game Mechanics',
      category: 'GAME ENGINEERING',
      description:
        'Classic card game built in C++ featuring deck shuffling logic, legal move verification algorithms, and low-latency state machines.',
      tags: ['C++', 'Game Logic', 'Algorithms'],
      githubUrl: 'https://github.com/Waleedhasn',
      details: {
        problem: 'Implementing high-performance game loops, memory-efficient deck manipulations, and deterministic move histories.',
        architecture: 'Deterministic Fisher-Yates shuffle, bit-level card representation, and undo/redo state stacks in native C++.',
        impact: 'Smooth 60+ FPS performance, zero memory leaks, and instant validation of complex Klondike move rules.',
      },
    },
    {
      id: 'inventory-management-system',
      title: 'Inventory Management System',
      subtitle: 'Store & Stock Architecture',
      category: 'STORE & INVENTORY MANAGEMENT',
      description:
        'Object-oriented store and stock management desktop application featuring automated thresholds, catalog ledgers, and transaction logging.',
      tags: ['C#', 'OOP', 'Store Architecture'],
      githubUrl: 'https://github.com/Waleedhasn',
      details: {
        problem: 'Manual retail stock discrepancies, unmonitored reorder thresholds, and fragmented sales transaction logs.',
        architecture: 'Object-oriented repository pattern in C#, event-driven restock alerts, and atomic local transaction journals.',
        impact: 'Guaranteed 100% stock count accuracy with automated notifications before item depletion occurs.',
      },
    },
  ],
  timeline: [
    {
      period: 'Present',
      tag: 'Academic Focus',
      title: 'BSc Computer Science',
      organization: 'University of Engineering and Technology, Lahore',
      summary:
        'Pursuing undergraduate Computer Science studies focused on algorithms, database architecture, and modern web engineering.',
    },
    {
      period: 'Verified Employment',
      tag: 'Operations & Data',
      title: 'Data Entry Specialist',
      organization: 'H&R Mega Market',
      summary:
        'Managed operational data entry processes, maintaining accurate catalog records, inventory logging, and transactional data consistency with high attention to detail.',
    },
    {
      period: 'Practice Area',
      tag: 'Frontend & Architecture',
      title: 'Web Development',
      organization: 'Frontend & AI Systems',
      summary:
        'Building responsive mobile-first interfaces, accessible semantic HTML (WCAG AA), and client-side RAG / LLM web integrations.',
    },
    {
      period: 'Practice Area',
      tag: 'Desktop & Relational',
      title: 'Application Development',
      organization: 'Desktop & Relational Systems',
      summary:
        'Architecting object-oriented store management software in C# and normalized MySQL database applications.',
    },
    {
      period: 'Practice Area',
      tag: 'Core Systems',
      title: 'Game Development',
      organization: 'Systems & C++ Engineering',
      summary:
        'Developing low-latency state machines, deck shuffling algorithms, and rule verification engines in C++.',
    },
  ],
};
