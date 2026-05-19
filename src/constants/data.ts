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
    title: "Geofence Event Engine",
    description: "High-performance backend engine for real-time geofence monitoring and event triggering with sub-second latency.",
    tech: ["Node.js", "Redis", "PostgreSQL", "Webhooks"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/geofence-engine-ec306ff9-1779184587186.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Payment Integration API",
    description: "Secure and scalable API integrating multiple payment gateways with automated reconciliation and fraud detection.",
    tech: ["Express.js", "MongoDB", "Docker", "Stripe"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/payment-api-c50fcb6d-1779184587280.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Automated QA Framework",
    description: "Custom end-to-end testing framework using Playwright and Selenium with automated HTML reporting and CI integration.",
    tech: ["Playwright", "Selenium", "Node.js", "Github Actions"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/qa-framework-543dedb2-1779184586401.webp",
    category: "QA",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Delivery Estimation System",
    description: "Algorithm-driven system for real-time delivery time estimation based on live traffic, weather, and distance.",
    tech: ["Node.js", "Express", "Redis", "Google Maps"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/delivery-system-f3613d92-1779184587929.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Order Tracking Platform",
    description: "Real-time order tracking and management platform with automated status updates via WebSockets and SMS.",
    tech: ["Node.js", "React", "MongoDB", "Socket.io"],
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/order-tracking-d42910c6-1779184587190.webp",
    category: "Backend",
    github: "#",
    demo: "#",
  },
];

export const EXPERIENCE = [
  {
    title: "Senior Backend Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: "Leading the development of scalable microservices and optimizing database performance for high-traffic applications.",
    icon: Code2,
  },
  {
    title: "QA Automation Engineer",
    company: "QualityFirst Systems",
    period: "2020 - 2022",
    description: "Designed and implemented comprehensive automated testing suites reducing manual testing time by 60%.",
    icon: ShieldCheck,
  },
  {
    title: "Backend API Specialist",
    company: "API Connect",
    period: "2018 - 2020",
    description: "Developed and maintained RESTful APIs for various clients, ensuring high availability and security.",
    icon: Database,
  },
  {
    title: "Junior Software Developer",
    company: "StartUp Hub",
    period: "2016 - 2018",
    description: "Contributed to both frontend and backend tasks while focusing on software quality and documentation.",
    icon: Terminal,
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