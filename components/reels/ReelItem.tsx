"use client";

import { Project } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Code2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReelItemProps {
    project: Project;
    isActive: boolean;
    onOpenComments: () => void;
}

export default function ReelItem({ project, isActive, onOpenComments }: ReelItemProps) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="h-screen w-full snap-start relative bg-black flex items-center justify-center overflow-hidden">

            {/* BACKGROUND (Video or Gradient) */}
            <div className={cn("absolute inset-0 bg-gradient-to-br z-0", project.placeholderColor)}>
                {project.videoSrc && (
                    <video
                        src={project.videoSrc}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                )}
                {!project.videoSrc && (
                    <motion.div
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"
                    />
                )}
            </div>

            {/* CONTENT LAYER - Hidden on Desktop to rely on SidePanel */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 pb-24 md:pb-12 bg-gradient-to-t from-black/90 via-transparent to-transparent lg:hidden">

                {/* INFO */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-2 mb-2"
                    >
                        <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-white">
                            {project.category}
                        </span>
                        <span className="text-gray-400 text-xs">{project.year}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
                    >
                        {project.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 text-sm md:text-base max-w-lg mb-6 leading-relaxed"
                    >
                        {project.description}
                    </motion.p>

                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded border border-blue-500/20">
                                #{t}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

            {/* INTERACTION SIDEBAR - Hidden on Desktop (Moved to Layout) */}
            <div className="absolute right-4 bottom-20 md:right-8 md:bottom-20 z-20 flex flex-col items-center space-y-6 lg:hidden">

                {/* AVATAR (Dev Profile) */}
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden mb-4 shadow-lg relative group cursor-pointer hover:scale-110 transition-transform">
                    <img src="/avatar.jpeg" alt="Dev" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                </div>

                {/* LIKE */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setLiked(!liked)}>
                    <div className={cn("p-3 rounded-full bg-white/10 backdrop-blur-md transition-all active:scale-95", liked && "text-red-500 bg-red-500/20")}>
                        <Heart className={cn("w-8 h-8", liked && "fill-current")} />
                    </div>
                    <span className="text-xs font-bold mt-1 text-white shadow-black drop-shadow-md">{project.stats.likes + (liked ? 1 : 0)}</span>
                </div>

                {/* COMMENT (AI Code Review) */}
                <div className="flex flex-col items-center cursor-pointer group" onClick={onOpenComments}>
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all">
                        <Code2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs font-bold mt-1 text-white shadow-black drop-shadow-md">{project.stats.comments}</span>
                </div>

                {/* SHARE */}
                <div className="flex flex-col items-center cursor-pointer">
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md">
                        <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs font-bold mt-1 text-white shadow-black drop-shadow-md">{project.stats.shares}</span>
                </div>

            </div>
        </div>
    );
}
