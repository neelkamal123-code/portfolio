import type { StackItem } from '@/components/CardStack';

export const profile = {
  name: 'Neel Kamal',
  title: 'Software Engineer II',
  bio: 'Software Engineer II at Deloitte specializing in .NET Core and enterprise application development within the Tax Transformation Office. Experienced in building scalable backend systems, secure APIs, and cloud-aligned solutions on Azure. Previously worked as a Flutter developer in early-stage startups, delivering production-ready mobile applications with strong focus on performance and user experience.',  location: 'Gurugram, Haryana, India',
  email: 'neelpunia382@gmail.com',
  github: 'https://github.com/neelkamal123-code',
  linkedin: 'https://www.linkedin.com/in/neelpunia/',
  resumeUrl: '/resume.pdf',
};

export const experience: StackItem[] = [
  {
    id: 'deloitte', name: 'Deloitte', accent: true,
    sub: 'Software Engineer II', period: 'August 2023 — Present',
    desc: "Promoted from BTA to SDE I and currently SDE II within the Tax Transformation Office. Contributing to the SDT Print Team by developing and optimizing enterprise-grade applications using .NET Core and .NET Framework. Building secure APIs, improving system performance, and supporting scalable, cloud-aligned solutions deployed on Azure with containerized workloads.",
    url: 'https://www2.deloitte.com/in/en.html',
    tech: ['.NET Core', '.NET Framework', 'Angular', 'Azure', 'Kubernetes', 'SQL Server', 'MongoDB', 'Redis']  },
  {
    id: 'culturecircle', name: 'Culture Circle', accent: false,
    sub: 'Flutter Developer', period: 'November 2022 — February 2023',
    desc: "One of the first engineers to join the early-stage sneaker marketplace startup. Built the initial Flutter application from template to production-ready MVP. Integrated blockchain-based sneaker authentication, implemented real-time updates, optimized app performance, and collaborated closely with backend teams to shape core product architecture.",
    tech: ['Flutter', 'Dart', 'Blockchain', 'Web3', 'Firebase', 'Redis', 'REST APIs', 'Git']  },
  {
    id: 'petmojo',
    name: 'Pet Mojo',
    accent: false,
    sub: 'Flutter Frontend Developer',
    period: 'May 2022 — August 2022',
    desc: "Developed and enhanced the Flutter mobile application for an at-home pet care services platform. Translated Figma designs into responsive UI components, implemented booking flows for pet services, integrated REST APIs, and improved app performance and state management. Collaborated closely with backend and design teams to deliver a seamless user experience.",
    tech: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Provider', 'Git', 'Figma']
  }
];

export const education: StackItem[] = [
  {
    id: 'mait',
    name: 'Maharaja Agrasen Institute of Technology',
    accent: false,
    sub: 'Bachelor of Technology (B.Tech)',
    period: 'May 2019 — 2023',
    desc: 'Pursuing B.Tech with focus on software engineering, data structures, and application development. Actively involved in building real-world projects and strengthening problem-solving skills.',
    tech: ['Data Structures', 'OOP', 'DBMS', 'Software Engineering']
  },
  {
    id: 'aps12',
    name: 'Army Public School Shankar Vihar',
    accent: false,
    sub: 'Class XII',
    period: 'May 2018 — May 2019',
    desc: 'Completed senior secondary education.',
    tech: []
  },
  {
    id: 'aps10',
    name: 'Army Public School Shankar Vihar',
    accent: false,
    sub: 'Class X',
    period: 'May 2016 — May 2017',
    desc: 'Completed secondary education.',
    tech: []
  }
];
export const projects: StackItem[] = [
  {
    id: 'hyperlog', name: 'Hyperlog', accent: true,
    sub: 'Distributed Logging Pipeline', period: 'Go · gRPC · React',
    desc: 'Structured logging pipeline with real-time query, alerting, and sub-50ms ingestion latency at 500k events/sec.',
    tech: ['Go','gRPC','React','ClickHouse','Kubernetes'],
    sourceUrl: '#', demoUrl: '#',
  },
  {
    id: 'coderaft', name: 'CodeRaft', accent: true,
    sub: 'Collaborative Code Editor', period: 'TypeScript · WebSocket · Monaco',
    desc: 'Operational transform sync engine with Monaco editor integration, real-time cursors, and AI completion hints.',
    tech: ['TypeScript','WebSocket','Monaco','Node.js','Redis'],
    sourceUrl: '#', demoUrl: '#',
  },
  {
    id: 'driftdb', name: 'DriftDB', accent: false,
    sub: 'Edge Key-Value Store', period: 'Rust · SQLite · WASM',
    desc: 'Embedded key-value store compiled to WebAssembly. Runs on Cloudflare Workers with <2ms read latency.',
    tech: ['Rust','WebAssembly','SQLite','Cloudflare Workers'],
    sourceUrl: '#', demoUrl: null,
  },
  {
    id: 'flightplan', name: 'Flightplan', accent: false,
    sub: 'AI Terminal Planner', period: 'Python · LLM · CLI',
    desc: 'Converts natural language into executable shell scripts using chain-of-thought prompting. 4.8k GitHub stars.',
    tech: ['Python','OpenAI API','Click','Rich'],
    sourceUrl: '#', demoUrl: null,
  },
];

export const certifications: StackItem[] = [
  {
    id: 'az204',
    name: 'Microsoft Certified: Azure Developer Associate',
    accent: true,
    sub: 'Microsoft',
    period: 'July 2025',
    desc: 'Validates expertise in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure.',
    tech: ['Azure App Services', 'Azure Functions', 'Cosmos DB', 'Storage', 'Azure AD'],
    url: 'https://learn.microsoft.com/en-us/users/neelkamal-6249/credentials/56a3a27298d0755c?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
    {
    id: 'ai102',
    name: 'Microsoft Certified: Azure AI Engineer Associate',
    accent: true,
    sub: 'Microsoft',
    period: 'February 2026',
    desc: 'Demonstrates skills in designing and implementing AI solutions using Azure Cognitive Services, Azure OpenAI, and ML services.',
    tech: ['Azure AI Services', 'Cognitive Services', 'Azure OpenAI', 'ML Solutions'],
    url: 'https://learn.microsoft.com/en-us/users/neelkamal-6249/credentials/certification/azure-ai-engineer?tab=credentials-tab',
  },
  {
    id: 'az900',
    name: 'Microsoft Certified: Azure Fundamentals',
    accent: true,
    sub: 'Microsoft',
    period: 'April 2025',
    desc: 'Foundational certification covering Azure cloud concepts, core services, security, compliance, and pricing.',
    tech: ['Cloud Concepts', 'Azure Core Services', 'Security', 'Governance'],
    url: 'https://learn.microsoft.com/en-us/users/neelkamal-6249/credentials/certification/azure-fundamentals?tab=credentials-tab',
  },
  {
    id: 'pythonml',
    name: 'Python for ML/AI',
    accent: true,
    sub: 'Elite Techno Group',
    period: '2021',
    desc: 'Hands-on training in Python programming with focus on machine learning fundamentals and AI concepts.',
    tech: ['Python', 'NumPy', 'Pandas', 'Machine Learning'],
    url: 'https://drive.google.com/file/d/164C8rK7BTl9-VoSJbx6M0jkF-RzwG2T1/view?usp=sharing',
  },
  {
    id: 'j2ee',
    name: 'Java J2EE Certification',
    accent: true,
    sub: 'Wipro',
    period: 'September 2022',
    desc: 'Training and certification covering Java, J2EE architecture, servlets, JSP, and enterprise application development concepts.',
    tech: ['Java', 'J2EE', 'Servlets', 'JSP'],
    url: 'https://drive.google.com/file/d/1lGtgtOTIn0Z1DHG78UMMeA9NZFc3Sp44/view?usp=sharing',
  },
];

export const skills = [
  { name: '.NET Core / .NET Framework', level: 90 },
  { name: 'C# & OOP', level: 88 },
  { name: 'Azure Cloud', level: 85 },
  { name: 'REST APIs & Backend Development', level: 88 },
  { name: 'SQL Server / DBMS', level: 82 },
  { name: 'Flutter & Dart', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'Microservices Architecture', level: 78 },
  { name: 'Docker / Kubernetes (Basics)', level: 70 },
];
