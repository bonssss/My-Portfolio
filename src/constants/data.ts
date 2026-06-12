import { 
  Code2, 
  Terminal, 
  Database, 
  Layers, 
  Github, 
  Linkedin, 
  Mail, 
  Send, 
  CheckCircle2, 
  Search, 
  Activity, 
  Zap,
  Globe,
  Settings,
  ShieldCheck,
  Cpu,
  Smartphone,
  Server
} from "lucide-react";

export const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/bonssss", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/bonsa-desalegn", icon: Linkedin },
  { name: "Telegram", href: "https://t.me/bons2122", icon: Send },
  { name: "Email", href: "mailto:bons6710hos@gmail.com", icon: Mail },
];

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const SKILLS = [
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "Webhooks", "Docker", "Auth & Authz"],
  },
  {
    category: "QA",
    icon: ShieldCheck,
    items: ["Manual Testing", "Automation Testing", "Playwright", "Selenium", "API Testing", "Regression", "Performance", "Bug Reporting", "Test Design"],
  },
  {
    category: "Tools",
    icon: Settings,
    items: ["Git", "GitHub", "Postman", "Jira", "Trello", "Linux", "CI/CD", "VS Code"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "DAAS Queue & Dispatch Engine",
    description: "Secure, high-scale system managing orders, driver assignments, API key authentication, and caching/queuing architectures.",
    tech: ["Node.js", "Express", "Redis", "BullMQ", "MinIO", "Postgres"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/payment-api-c50fcb6d-1779184587280.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Aripay QA Automation Suite",
    description: "Full-coverage manual and automated test pipeline targeting core payment workflows across React web applications and React Native mobile apps.",
    tech: ["Playwright", "Selenium", "Mobile Testing", "API Testing"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/qa-framework-543dedb2-1779184586401.webp",
    category: "QA",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Ambalay Mapping & Routing API",
    description: "Engine for real-time map rendering, custom path routing, navigation directions, and distance estimation.",
    tech: ["Node.js", "PostgreSQL", "PostGIS", "GeoServer"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/geofence-engine-ec306ff9-1779184587186.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Medicine Locator & Tracking System",
    description: "Robust medicine tracking and pharmacy management system designed to easily locate available medicine across multiple store regions.",
    tech: ["Node.js", "Express", "PostgreSQL", "Inventory Tracking"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/delivery-system-f3613d92-1779184587929.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Binary Cosmo E2E Framework",
    description: "Comprehensive end-to-end regression testing framework for mobile and web systems ensuring clean release cycles.",
    tech: ["Selenium", "Playwright", "Postman", "CI/CD"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/order-tracking-d42910c6-1779184587190.webp",
    category: "QA",
    github: "#",
    demo: "#",
  },
];

export const EXPERIENCE = [
  {
    title: "Quality Assurance Specialist (Manual & Automation)",
    company: "Aripay Financial Technologies",
    period: "Feb 2025 - Present",
    description: "Designing and executing automated and manual test suites for fintech mobile (iOS/Android) and web applications, ensuring flawless transaction processing and security compliance.",
    icon: ShieldCheck,
  },

  {
    title: "Backend Developer",
    company: "Ambalay Maps",
    period: "2025 - Present",
    description: "Implemented complex geographic routing, duration/distance estimations, tile rendering, and navigation modules using Node.js, PostgreSQL, PostGIS, and GeoServer.",
    icon: Globe,
  },
  {
    title: "Backend Engineer",
    company: "DAAS (Delivery as a Service)",
    period: "2025 - 2026",
    description: "Built a secure, scalable delivery dispatcher with robust order, driver, and API key management. Optimized job queues and object storage with Redis, BullMQ, MinIO, and Postgres.",
    icon: Server,
  },
    {
    title: "Quality Assurance Engineer",
    company: "Binary Cosmo LLC",
    period: "June 2024 - Feb 2025",
    description: "Managed end-to-end QA verification processes, designed regressions test cases, and integrated automated test scripts into delivery pipelines.",
    icon: Terminal,
  },
  {
    title: "Backend Developer",
    company: "Everlink Digital Technologies",
    period: "2023 - 2024",
    description: "Engineered a medicine tracking and pharmacy inventory management system, implementing search/location indices for user-facing pharmacy routing.",
    icon: Database,
  },
];

export const SERVICES = [
  {
    title: "Backend API Development",
    description: "Designing and building robust, scalable, and secure APIs using modern technologies like Node.js and Go.",
    icon: Cpu,
  },
  {
    title: "QA Automation",
    description: "Creating comprehensive automated testing frameworks to ensure software reliability and speed up release cycles.",
    icon: Zap,
  },
  {
    title: "API Integration",
    description: "Seamlessly connecting third-party services and APIs into your existing systems for enhanced functionality.",
    icon: Globe,
  },
  {
    title: "Performance Optimization",
    description: "Analyzing and optimizing backend systems and database queries to handle high traffic and low latency.",
    icon: Activity,
  },
];