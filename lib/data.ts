export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tech: string[];
    year: string;
    link?: string;
    github?: string;
    // The 'AI Insight' is what the terminal will display when hovering
    aiInsight: string;
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
    placeholderColor: string;
    videoSrc?: string;

    // [NEW] Detailed Case Study Info
    details?: {
        problem: string;
        solution: string;
        features: string[];
    };
}

export interface Skill {
    name: string;
    category: "frontend" | "backend" | "devops" | "ai";
    level: number; // 1-100
}

export const PROJECTS: Project[] = [
    {
        id: "void-commerce",
        title: "Void Commerce",
        category: "E-Commerce",
        description: "A headless fashion e-commerce platform focusing on speed and exclusivity. Features 'drop' style functionality with edge-cached waiting rooms.",
        tech: ["Hydrogen", "Shopify", "Redis", "Cloudflare Workers"],
        year: "2024",
        aiInsight: "> PERFORMANCE: 99/100 Lighthouse score. Capable of handling peaks of 100k concurrent users during flash sales.",
        stats: { likes: 1243, comments: 42, shares: 187 },
        placeholderColor: "from-slate-900 to-black",
        videoSrc: "/reels/voice-commerce.mp4",
        details: {
            problem: "High-traffic product drops often crash standard Shopify frontends, leading to frustrated customers and bots buying everything.",
            solution: "A headless architecture with a custom queue system (waiting room) running on the Edge, ensuring fairness and 100% uptime.",
            features: [
                "Edge-cached 'Waiting Room' queue",
                "Bot protection middleware",
                "Instant-load page transitions",
                "Minimalist, monochromatic UX"
            ]
        }
    },
    {
        id: "chronos",
        title: "Chronos",
        category: "Productivity",
        description: "Smart time-tracking and prediction engine for developers. Integrates with local git hooks to estimate task duration automatically.",
        tech: ["Rust", "Tauri", "SQLite", "React"],
        year: "2024",
        aiInsight: "> PRIVACY: Local-first architecture. All data stays on the device. Rust backend ensures memory safety and near-zero footprint.",
        stats: { likes: 3421, comments: 128, shares: 563 },
        placeholderColor: "from-emerald-950 to-teal-950",
        videoSrc: "/reels/chronos.mp4",
        details: {
            problem: "Developers are terrible at estimating how long a task will take, and manual time tracking is tedious.",
            solution: "An AI-powered desktop app that watches your git activity and active window focus to build automatic timesheets and predictive estimates.",
            features: [
                "Automatic Git-based time logging",
                "Active Window Tracking",
                "Privacy-focused Local AI",
                "JIRA/Linear Integration"
            ]
        }
    },
    {
        id: "apex-logistics",
        title: "Apex Logistics",
        category: "SaaS / B2B",
        description: "Real-time fleet management dashboard for global shipping lines. Visualizes thousands of vessels and containers on an interactive globe.",
        tech: ["Mapbox GL", "React", "Supabase", "Go"],
        year: "2025",
        aiInsight: "> SCALE: Handles 50,000+ moving entities in real-time using WebSocket clustering and GeoHasing techniques.",
        stats: { likes: 2104, comments: 85, shares: 432 },
        placeholderColor: "from-blue-950 to-slate-900",
        videoSrc: "/reels/apex-logistic.mp4",
        details: {
            problem: "Supply chain managers lack real-time visibility into shipping delays, relying on outdated CSV reports.",
            solution: "A 'Control Tower' dashboard that aggregates GPS data from containers, predicting delays using weather APIs and historical port congestion data.",
            features: [
                "Live Global Fleet Tracking",
                "Weather Impact Prediction",
                "Automated Route Optimization",
                "Port Congestion Heatmaps"
            ]
        }
    },
    {
        id: "carbon-banking",
        title: "Carbon Banking",
        category: "Fintech",
        description: "A modern neobank mobile application focused on sustainability. Tracks the carbon footprint of every transaction you make.",
        tech: ["React Native", "Node.js", "GraphQL", "PostgreSQL"],
        year: "2024",
        aiInsight: "> IMPACT: Every transaction is enriched with ESG data to calculate estimated CO2 emissions in milliseconds.",
        stats: { likes: 4567, comments: 324, shares: 1205 },
        placeholderColor: "from-green-950 to-emerald-950",
        videoSrc: "/reels/carbon-banking.mp4",
        details: {
            problem: "Consumers want to be eco-friendly but don't understand the environmental impact of their daily spending habits.",
            solution: "A banking experience that converts spending into carbon data, offering offsets and eco-friendly alternatives for high-impact purchases.",
            features: [
                "Real-time Carbon Footprint tracker",
                "Auto-offset Integration",
                "Spending Analytics",
                "Virtual Cards & Apple Pay"
            ]
        }
    },
    {
        id: "revive-medical",
        title: "Revive Medical",
        category: "Healthcare",
        description: "Telemedicine platform connecting patients with specialists. Features secure video calls, digital prescriptions, and AI-assisted triage.",
        tech: ["Next.js", "WebRTC", "HIPAA Compliant Cloud", "Python"],
        year: "2023",
        aiInsight: "> SECURITY: End-to-end encryption for all video calls and patient records (EHR). Fully HIPAA/GDPR compliant.",
        stats: { likes: 1892, comments: 94, shares: 257 },
        placeholderColor: "from-cyan-950 to-blue-900",
        videoSrc: "/reels/revive-medical.mp4",
        details: {
            problem: "Access to specialists is slow and bureaucratic. Doctors spend too much time on paperwork instead of patients.",
            solution: "An all-in-one telehealth suite that streamlines booking, consultation, and follow-up, using AI to summarize patient notes.",
            features: [
                "HD Encrypted Video Consultations",
                "AI-generated SOAP Notes",
                "Digital Prescription Signing",
                "Wearable Device Integration"
            ]
        }
    },
    {
        id: "lumina-blog",
        title: "Lumina",
        category: "Publishing",
        description: "A distraction-free publishing platform for thoughtful writers. Designed with a focus on beautiful typography and reading experience.",
        tech: ["Next.js", "MDX", "Tailwind Typography", "Supabase"],
        year: "2024",
        aiInsight: "> UX/UI: Implements optimistic UI updates for instant autosave. Custom rendering engine ensures perfect vertical rhythm.",
        stats: { likes: 2753, comments: 156, shares: 612 },
        placeholderColor: "from-stone-900 to-neutral-900",
        videoSrc: "/reels/blog.mp4",
        details: {
            problem: "Modern content platforms are cluttered with ads and distractions, ruining the relationship between writer and reader.",
            solution: "An ultra-minimalist CMS that gets out of the way. It offers curated font pairings and a 'Focus Mode' for pure writing flow.",
            features: [
                "Distraction-free Markdown Editor",
                "Curated Google Fonts Pairings",
                "Built-in Newsletter Engine",
                "Automatic Dark/Sepia/Light Modes"
            ]
        }
    }
];

export const SKILLS: Skill[] = [
    { name: "React/Next.js", category: "frontend", level: 98 },
    { name: "TypeScript", category: "frontend", level: 95 },
    { name: "Rust / Tauri", category: "backend", level: 85 },
    { name: "React Native", category: "frontend", level: 90 },
    { name: "Node.js / Go", category: "backend", level: 92 },
    { name: "PostgreSQL", category: "backend", level: 88 },
    { name: "Mapbox / WebGL", category: "frontend", level: 85 },
    { name: "Google Cloud", category: "devops", level: 80 },
    { name: "Gemini AI", category: "ai", level: 90 },
];
