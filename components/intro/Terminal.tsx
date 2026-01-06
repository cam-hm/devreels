"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootSequence = [
    "> Initializing system core...",
    "> Allocating memory blocks...",
    "> Connecting to Gemini 1.5 Pro...",
    "> Connection established. Latency: 12ms",
    "> Fetching user identity context...",
    "> Identity Found: Creative Developer.",
    "> Analyzing portfolio constraints...",
    "> Objective: Build a dynamic portfolio website.",
    "> Status: READY.",
];

export default function Terminal({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex >= bootSequence.length) {
            setTimeout(onComplete, 1000);
            return;
        }

        const timeout = setTimeout(() => {
            setLines((prev) => [...prev, bootSequence[currentLineIndex]]);
            setCurrentLineIndex((prev) => prev + 1);
        }, 500); // Speed of lines appearing

        return () => clearTimeout(timeout);
    }, [currentLineIndex, onComplete]);

    return (
        <div className="flex flex-col items-start justify-center min-h-screen p-10 font-mono text-green-500 text-lg">
            <div className="w-full max-w-2xl">
                {lines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-2"
                    >
                        {line}
                    </motion.div>
                ))}
                {currentLineIndex < bootSequence.length && (
                    <motion.span
                        className="inline-block w-2 h-5 bg-green-500 ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                )}
            </div>
        </div>
    );
}
