"use client";

import { chatWithProject } from "@/app/actions";

import { Project } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Code2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SidePanelProps {
    project: Project;
}

interface Message {
    role: "user" | "ai";
    text: string;
}

export default function SidePanel({ project }: SidePanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", text: project.aiInsight }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Reset chat when project changes
    useEffect(() => {
        setMessages([{ role: "ai", text: project.aiInsight }]);
    }, [project.id]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await chatWithProject(userMsg, project.id);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: "ai", text: response }]);
        } catch (e) {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: "ai", text: "Error connecting to neural net." }]);
        }
    };

    return (
        <div className="h-full flex flex-col bg-neutral-900 border-l border-neutral-800 text-white w-full max-w-md shadow-2xl z-20">


            {/* 2. PROJECT DETAILS (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">

                {/* Caption Area */}
                <div className="p-4 pb-6">
                    <h1 className="text-3xl font-bold mb-4 text-white leading-tight">{project.title}</h1>

                    {/* Category & Status */}
                    <div className="mb-4 flex items-center gap-3">
                        <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-white/10">
                            {project.category}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-xs text-green-400 font-bold tracking-wider uppercase">Deployed • {project.year}</span>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map(t => (
                            <span key={t} className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-md text-xs border border-neutral-700 font-medium font-mono">
                                #{t}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-200 text-sm leading-relaxed mb-6 font-light tracking-wide">
                        {project.description}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3 mb-8">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-center text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 cursor-pointer">
                                Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-neutral-800 border border-neutral-700 text-white py-3 rounded-lg text-center text-sm font-bold hover:bg-neutral-700 transition-all cursor-pointer">
                                Source Code
                            </a>
                        )}
                    </div>

                    {/* CASE STUDY */}
                    {project.details && (
                        <div className="space-y-8 mb-8">
                            <div>
                                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <span className="w-8 h-px bg-blue-500/50"></span>
                                    The Challenge
                                </h4>
                                <p className="text-white/90 text-sm leading-7">{project.details.problem}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <span className="w-8 h-px bg-green-500/50"></span>
                                    The Solution
                                </h4>
                                <p className="text-white/90 text-sm leading-7">{project.details.solution}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <span className="w-8 h-px bg-purple-500/50"></span>
                                    Key Features
                                </h4>
                                <ul className="space-y-3">
                                    {project.details.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-200">
                                            <span className="mr-2 text-blue-500">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-px bg-neutral-800 w-full mb-4" />

                {/* 3. AI CHAT INTERFACE (The "Comments") */}
                <div className="flex-1 px-4 pb-4 flex flex-col relative" ref={scrollRef}>
                    <div className="flex items-center space-x-2 mb-6">
                        <Code2 className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-blue-200 font-bold">Ask the Architect 🤖</span>
                    </div>

                    <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn("flex mb-4 gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs",
                                    msg.role === "ai" ? "bg-blue-600/20 text-blue-400" : "bg-neutral-700 text-gray-300"
                                )}>
                                    {msg.role === "ai" ? <Bot size={14} /> : <User size={14} />}
                                </div>

                                <div className={cn(
                                    "py-2 px-3 rounded-2xl text-sm max-w-[85%]",
                                    msg.role === "ai"
                                        ? "bg-neutral-800/50 text-gray-300 rounded-tl-none border border-neutral-800"
                                        : "bg-blue-600 text-white rounded-tr-none"
                                )}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center"><Bot size={14} /></div>
                            <div className="bg-neutral-800/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </motion.div>
                    )}

                    {/* Spacer for input area */}
                    <div className="h-16 flex-shrink-0" />
                </div>

            </div>

            {/* 4. INPUT AREA (Fixed Bottom) */}
            <div className="p-4 bg-neutral-900 border-t border-neutral-800">
                <div className="relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={`Ask AI about ${project.title}...`}
                        className="w-full bg-neutral-800 border-transparent focus:border-neutral-600 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none transition-colors"
                        autoComplete="off"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-blue-500 hover:bg-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

        </div>
    );
}
