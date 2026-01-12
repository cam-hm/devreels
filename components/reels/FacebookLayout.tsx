"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PROJECTS, Project } from "@/lib/data";
import ReelItem from "./ReelItem";
import ProfileSidebar from "./ProfileSidebar";
import SidePanel from "./SidePanel";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FacebookLayout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);

    // Local state for Likes (Persists during session)
    const [likesState, setLikesState] = useState<Record<string, { count: number; isLiked: boolean }>>({});

    // Like Handler
    const handleLike = useCallback(() => {
        const projectId = activeProject.id;
        setLikesState(prev => {
            const current = prev[projectId] || { count: activeProject.stats.likes, isLiked: false };
            const newIsLiked = !current.isLiked;
            const newCount = newIsLiked ? current.count + 1 : current.count - 1;
            return {
                ...prev,
                [projectId]: { count: newCount, isLiked: newIsLiked }
            };
        });
    }, [activeProject]);

    const currentLikeState = likesState[activeProject.id] || { count: activeProject.stats.likes, isLiked: false };

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

                            {/* [Removed Redundant Avatar] */}

                            {/* LIKE */}
                            <div className="flex flex-col items-center group cursor-pointer" onClick={handleLike}>
                                <div className={cn(
                                    "p-3 rounded-full backdrop-blur-md border transition-all duration-300 relative overflow-hidden",
                                    currentLikeState.isLiked
                                        ? "bg-red-500/20 border-red-500"
                                        : "bg-neutral-800/50 border-white/10 group-hover:bg-white/10"
                                )}>
                                    <motion.div
                                        animate={currentLikeState.isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Heart
                                            className={cn(
                                                "w-6 h-6 transition-colors duration-300",
                                                currentLikeState.isLiked ? "text-red-500 fill-red-500" : "text-white"
                                            )}
                                        />
                                    </motion.div>
                                </div>
                                <span className={cn(
                                    "text-xs font-bold mt-1 transition-colors",
                                    currentLikeState.isLiked ? "text-red-400" : "text-white/70"
                                )}>
                                    {currentLikeState.count}
                                </span>
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
