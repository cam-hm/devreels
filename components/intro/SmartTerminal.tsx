"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/logic/PortfolioContext";

interface SmartTerminalProps {
    initialLogs: string[];
}

export default function SmartTerminal({ initialLogs }: SmartTerminalProps) {
    const { focusedItem } = usePortfolio();
    const [logs, setLogs] = useState<string[]>(initialLogs);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Sync initial logs if they change (e.g. from the build process)
    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    // React to Focus Changes
    useEffect(() => {
        if (focusedItem.type === "project" && focusedItem.data?.aiInsight) {
            addLog(focusedItem.data.aiInsight, "info");
        } else if (focusedItem.type === "skill") {
            addLog(`> SKILL_CHECK: Verifying proficiency in ${focusedItem.data.name}... ${focusedItem.data.level}% MATCH.`, "success");
        }
    }, [focusedItem]);

    const addLog = (text: string, type: "info" | "success" | "error" = "info") => {
        setLogs(prev => [...prev, text]);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="h-full bg-black border-l border-neutral-800 p-4 font-mono text-xs md:text-sm overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex bg-neutral-900/80 p-2 mb-2 rounded border border-neutral-800 justify-between items-center backdrop-blur-sm">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">SENTIENT CORE v2.0</span>
                    <span className="text-[10px] text-blue-500">
                        STATUS: {focusedItem.type === "general" ? "IDLE" : "ANALYZING"}
                    </span>
                </div>
                <div className="flex space-x-1.5 opacity-50">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5 relative">
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`break-words leading-relaxed ${log.includes("Create") || log.includes("Error") ? "text-red-400" :
                                    log.includes("ANALYZING") ? "text-blue-400" : "text-green-500/80"
                                }`}
                        >
                            <span className="text-gray-700 mr-2 select-none">
                                {`00:${(i % 60).toString().padStart(2, '0')}`}
                            </span>
                            {log}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={bottomRef} />

                {/* Blinking Cursor */}
                <div className="mt-2 text-green-500 animate-pulse flex items-center">
                    <span className="mr-2">{'>'}</span> Awaiting Input_
                </div>
            </div>
        </div>
    );
}
