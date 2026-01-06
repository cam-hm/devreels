"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PROJECTS, Project } from "@/lib/data";
import ReelItem from "./ReelItem";
import ProfileSidebar from "./ProfileSidebar";
import SidePanel from "./SidePanel";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Heart, Share2 } from "lucide-react";

export default function FacebookLayout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);

    // Handle Scroll Snap Detection to sync with SidePanel
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Calculate which project is in view based on scroll position
            const index = Math.round(container.scrollTop / container.clientHeight);
            if (index !== activeIndex && PROJECTS[index]) {
                setActiveIndex(index);
                setActiveProject(PROJECTS[index]);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [activeIndex]);

    // Navigation Logic
    const scrollToIndex = useCallback((index: number) => {
        if (containerRef.current && index >= 0 && index < PROJECTS.length) {
            const height = containerRef.current.clientHeight;
            containerRef.current.scrollTo({
                top: index * height,
                behavior: "smooth"
            });
        }
    }, []);

    const handleNext = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);
    const handlePrev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only trigger if active element isn't an input/textarea (to allow typing in chat)
            const tagName = document.activeElement?.tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                handlePrev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

    return (
        <div className="h-screen w-full bg-black flex overflow-hidden font-sans">

            {/* 1. LEFT: PROFILE SIDEBAR (Fixed - Desktop) */}
            <div className="hidden xl:block w-[350px] h-full border-r border-neutral-800 bg-neutral-900 z-30">
                <ProfileSidebar />
            </div>

            {/* 2. CENTER: VIDEO FEED (Flexible) */}
            <div
                className="flex-1 h-full bg-black relative flex justify-center bg-grid-white/[0.02]"
                onWheel={(e) => {
                    if (containerRef.current) {
                        containerRef.current.scrollBy({ top: e.deltaY, behavior: 'auto' });
                    }
                }}
            >

                {/* Navigation & Action Buttons (Desktop Only) - Anchored to Video Feed */}
                <div className="absolute inset-0 flex justify-center pointer-events-none z-50">
                    <div className="w-full max-w-[500px] relative h-full">
                        <div className="hidden md:flex absolute left-full bottom-8 ml-4 flex-col items-center gap-6 pointer-events-auto">

                            {/* AVATAR (Dev Profile) */}
                            <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden shadow-lg relative cursor-pointer hover:border-white transition-colors">
                                <img src="/avatar.jpeg" alt="Dev Avatar" className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                            </div>

                            {/* LIKE */}
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs font-bold mt-1 text-white/70">{activeProject.stats.likes}</span>
                            </div>

                            {/* SHARE */}
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors">
                                    <Share2 className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs font-bold mt-1 text-white/70">{activeProject.stats.shares}</span>
                            </div>

                            <div className="w-8 h-px bg-white/10 my-2"></div>

                            {/* UP */}
                            <button
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className="w-10 h-10 rounded-full bg-neutral-800/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronUp size={20} />
                            </button>

                            {/* DOWN */}
                            <button
                                onClick={handleNext}
                                disabled={activeIndex === PROJECTS.length - 1}
                                className="w-10 h-10 rounded-full bg-neutral-800/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronDown size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="h-full w-full max-w-[500px] overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth border-x border-neutral-800"
                >
                    {PROJECTS.map((project, i) => (
                        <div key={project.id} className="h-full w-full snap-start">
                            <ReelItem
                                project={project}
                                isActive={i === activeIndex}
                                onOpenComments={() => { }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. RIGHT: SIDE PANEL (Fixed - Context) */}
            <div className="hidden lg:block w-[400px] h-full border-l border-neutral-800 bg-neutral-900 z-30">
                <SidePanel project={activeProject} />
            </div>

        </div>
    );
}
