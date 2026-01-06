"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface PersistentTerminalProps {
    logs: string[];
}

export default function PersistentTerminal({ logs }: PersistentTerminalProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="h-full bg-black border-l border-neutral-800 p-4 font-mono text-green-500 text-sm overflow-hidden flex flex-col">
            <div className="flex bg-neutral-900/50 p-2 mb-2 rounded border border-neutral-800 justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-gray-400">Antigravity Core</span>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="break-words"
                    >
                        <span className="text-gray-600 mr-2">
                            {/* Just a mock timestamp generator relying on index for simplicity */}
                            {`00:00:${(i * 2).toString().padStart(2, '0')}`}
                        </span>
                        {log}
                    </motion.div>
                ))}
                <div ref={bottomRef} />

                {/* Blinking Cursor at the end */}
                <div className="mt-2 text-green-400 animate-pulse">_</div>
            </div>
        </div>
    );
}
