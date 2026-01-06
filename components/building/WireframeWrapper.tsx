"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WireframeWrapperProps {
    children: React.ReactNode;
    isBuilt: boolean;
    className?: string;
    delay?: number;
}

export default function WireframeWrapper({ children, isBuilt, className, delay = 0 }: WireframeWrapperProps) {
    return (
        <div className={cn("relative transition-all duration-1000", className)}>
            {/* Wireframe Overlay */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isBuilt ? 0 : 1 }}
                transition={{ duration: 0.8, delay }}
                className="absolute inset-0 border-2 border-dashed border-gray-600 bg-gray-900/50 z-10 flex items-center justify-center pointer-events-none"
            >
                {!isBuilt && <span className="text-xs text-gray-500 font-mono">WAITING_FOR_RENDER</span>}
            </motion.div>

            {/* Actual Content */}
            <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: isBuilt ? 1 : 0.2, filter: isBuilt ? "blur(0px)" : "blur(4px)" }}
                transition={{ duration: 0.8, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
}
