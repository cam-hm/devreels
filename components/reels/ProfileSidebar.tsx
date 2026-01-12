"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Link as LinkIcon, Download } from "lucide-react";
import { SKILLS } from "@/lib/data";
import { useState } from "react";
import ContactModal from "./ContactModal";

export default function ProfileSidebar() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="h-full flex flex-col bg-neutral-900 border-r border-neutral-800 text-white w-full shadow-2xl overflow-y-auto no-scrollbar relative">

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            {/* 1. HERO HEADER */}
            <div className="p-8 pb-4">
                <div className="w-24 h-24 rounded-full border-2 border-white/20 mb-6 overflow-hidden relative shadow-2xl group cursor-pointer">
                    <img src="/avatar.jpeg" alt="Cam Hoang" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900 animate-pulse"></div>
                </div>

                <h1 className="text-2xl font-bold tracking-tight mb-1">Cam Hoang</h1>
                <p className="text-blue-400 font-mono text-xs uppercase tracking-wider mb-4">Senior Product Engineer</p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Specializing in high-performance web & mobile applications.
                    I bridge the gap between complex backend systems and intuitive user experiences.
                    Focused on Fintech, Logistics, and Privacy.
                </p>

                <div className="flex space-x-3 text-gray-500">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                    <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="h-px bg-neutral-800 mx-8" />

            {/* 2. STATS / FACTS */}
            <div className="p-8 grid grid-cols-2 gap-4">
                <div>
                    <span className="block text-2xl font-bold text-white">9+</span>
                    <span className="text-xs text-gray-500 uppercase">Years Exp.</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-white">99+</span>
                    <span className="text-xs text-gray-500 uppercase">Projects</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-white">VN</span>
                    <span className="text-xs text-gray-500 uppercase">Based</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-green-400">Open</span>
                    <span className="text-xs text-gray-500 uppercase">To Work</span>
                </div>
            </div>

            <div className="h-px bg-neutral-800 mx-8" />

            {/* 3. SKILLS */}
            <div className="p-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Core Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-neutral-800 rounded border border-neutral-700 text-xs text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default">
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="h-px bg-neutral-800 mx-8" />

            {/* 4. EXPERIENCE TIMELINE */}
            <div className="p-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Timeline</h3>

                <div className="space-y-6 border-l border-neutral-800 ml-1 pl-6 relative">

                    <div className="relative group">
                        <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border border-neutral-900 group-hover:scale-150 transition-transform" />
                        <span className="text-xs text-blue-400 font-mono mb-1 block">2024 - Present</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Senior Product Eng.</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Fintech & SaaS Stealth</p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-neutral-700 border border-neutral-900 group-hover:bg-neutral-500 transition-colors" />
                        <span className="text-xs text-gray-500 font-mono mb-1 block">2022 - 2024</span>
                        <h4 className="text-sm font-bold text-gray-300">Full Stack Engineer</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Global Logistics Tech</p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-neutral-700 border border-neutral-900 group-hover:bg-neutral-500 transition-colors" />
                        <span className="text-xs text-gray-500 font-mono mb-1 block">2020 - 2022</span>
                        <h4 className="text-sm font-bold text-gray-300">Software Engineer</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Startups & freelance</p>
                    </div>

                </div>
            </div>

            {/* FOOTER ACTION */}
            <div className="mt-auto p-8 border-t border-neutral-800">
                <button
                    onClick={() => window.open("/resume.pdf", "_blank")}
                    className="w-full flex items-center justify-center space-x-2 bg-white text-black py-3 rounded font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                    <Download size={16} />
                    <span>Download Resume</span>
                </button>
            </div>

        </div>
    );
}
