"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const codeSnippet = `{
  "site_config": {
    "theme": "dark_modern",
    "layout": "responsive_grid",
    "components": [
      { "type": "Hero", "content": "Welcome" },
      { "type": "Projects", "source": "GitHub" },
      { "type": "Contact", "method": "Gemini_Agent" }
    ]
  },
  "generating_wireframes": true...
}`;

export default function Blueprint({ onComplete }: { onComplete: () => void }) {
    const [text, setText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(codeSnippet.slice(0, i));
            i++;
            if (i > codeSnippet.length) {
                clearInterval(interval);
                setTimeout(onComplete, 1500);
            }
        }, 30); // Typing speed

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-blue-400 font-mono text-sm sm:text-base">
            <div className="border border-blue-900 bg-blue-950/20 p-8 rounded-lg shadow-[0_0_30px_rgba(30,58,138,0.5)] w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-blue-900 pb-2">
                    <span>GEMINI_ARCHITECT.json</span>
                    <span className="animate-pulse text-xs uppercase">Computing Layout...</span>
                </div>
                <pre className="whitespace-pre-wrap">
                    {text}
                    <span className="inline-block w-2 h-4 bg-blue-500 animate-blink ml-1 align-middle"></span>
                </pre>
            </div>
        </div>
    );
}
