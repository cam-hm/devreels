"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { usePortfolio } from "@/components/logic/PortfolioContext";

export default function Projects() {
    const { setFocusedItem } = usePortfolio();

    return (
        <section className="py-32">
            <div className="flex justify-between items-end mb-16 border-b border-neutral-800 pb-6">
                <h2 className="text-4xl font-medium tracking-tight text-white">Selected Works</h2>
                <span className="text-sm text-gray-500 hidden md:block">(2024 — 2026)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PROJECTS.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`group relative bg-neutral-900/50 hover:bg-neutral-800 transition-all duration-500 rounded-sm p-8 min-h-[300px] flex flex-col justify-between border border-neutral-800/50 hover:border-neutral-700 ${i % 3 === 0 ? "md:col-span-2" : "col-span-1"}`}
                        onMouseEnter={() => setFocusedItem({ type: "project", id: project.id, data: project })}
                        onMouseLeave={() => setFocusedItem({ type: "general" })}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{project.category}</span>
                            <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
                        </div>

                        <div>
                            <h3 className="text-3xl font-light text-neutral-300 group-hover:text-white transition-colors mb-2">{project.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
