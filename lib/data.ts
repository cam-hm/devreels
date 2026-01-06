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
        id: "vortex-engine",
        title: "Vortex Engine",
        category: "Spatial Computing",
        description: "A browser-based OS for spatial computing. Features hand-tracking simulation via webcam, real-time 3D file manipulation, and WebRTC multiplayer sessions. Built with Three.js and React Fiber.",
        tech: ["Next.js", "R3F", "WebRTC", "TensorFlow.js"],
        year: "2025",
        aiInsight: "> ARCHITECTURE: Rendering loop optimized to 60fps using instanced mesh techniques. Latency < 15ms via P2P data channels.",
        stats: { likes: 3420, comments: 145, shares: 890 },
        placeholderColor: "from-indigo-950 to-purple-950",
        videoSrc: "/reels/vortex-demo.mp4",
        link: "https://vortex.demo",
        github: "https://github.com/camhm/vortex",
        details: {
            problem: "Traditional web interfaces are 2D and lack the depth required for spatial collaboration, while native AR/VR apps require heavy downloads.",
            solution: "A zero-install, high-performance 3D operating system that runs entirely in the browser, leveraging generic webcams for gestural input.",
            features: [
                "6DOF Object Manipulation via Hand Tracking",
                "Real-time Multiplayer workspaces (up to 4 users)",
                "Universal GLTF/GLB File Support",
                "Physics-based rendering engine"
            ]
        }
    },
    {
        id: "neural-canvas",
        title: "Neural Canvas",
        category: "Generative AI",
        description: "Collaborative whiteboard with real-time Stable Diffusion rendering.",
        tech: ["Next.js", "WebSockets", "FastAPI"],
        year: "2025",
        aiInsight: "> ARCHITECTURE: Handles 50ms latency using distinct WebSocket channels.",
        stats: { likes: 1205, comments: 45, shares: 320 },
        placeholderColor: "from-purple-900 to-indigo-900",
        details: {
            problem: "Designers struggle to visualize concepts instantly during brainstorming sessions.",
            solution: "An infinite canvas that turns rough sketches into high-fidelity renders in real-time using Latent Consistency Models (LCM).",
            features: [
                "Real-time Sketch-to-Image",
                "Multi-cursor collaboration",
                "Layer-based editing system"
            ]
        }
    },
    {
        id: "void-commerce",
        title: "Void Commerce",
        category: "E-Commerce",
        description: "Headless storefront with edge-cached waiting rooms.",
        tech: ["Hydrogen", "Redis", "Edge"],
        year: "2024",
        aiInsight: "> METRICS: 99/100 Lighthouse score. 100k concurrent users peak.",
        stats: { likes: 892, comments: 23, shares: 150 },
        placeholderColor: "from-slate-900 to-black",
    },
    {
        id: "chronos",
        title: "Chronos",
        category: "Productivity",
        description: "AI time prediction engine based on local git hooks.",
        tech: ["Rust", "Tauri", "Transformers"],
        year: "2024",
        aiInsight: "> SECURITY: Local-first architecture. Rust ensures memory safety.",
        stats: { likes: 3400, comments: 120, shares: 890 },
        placeholderColor: "from-emerald-900 to-teal-900",
    },
    {
        id: "echo-system",
        title: "Echo System",
        category: "Audio Viz",
        description: "3D Audio sentiment analysis dashboard.",
        tech: ["Three.js", "WebGL", "TensorFlow"],
        year: "2023",
        aiInsight: "> GPU: Offloads FFT calculations to client shaders.",
        stats: { likes: 567, comments: 12, shares: 45 },
        placeholderColor: "from-rose-900 to-red-950",
    }
];

export const SKILLS: Skill[] = [
    { name: "React/Next.js", category: "frontend", level: 95 },
    { name: "TypeScript", category: "frontend", level: 90 },
    { name: "Node.js", category: "backend", level: 85 },
    { name: "PostgreSQL", category: "backend", level: 80 },
    { name: "Google Cloud", category: "devops", level: 75 },
    { name: "Gemini API", category: "ai", level: 85 },
];
