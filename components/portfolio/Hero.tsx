"use client";

import { motion } from "framer-motion";

export default function Hero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
    };

    return (
        <section className="min-h-[80vh] flex flex-col justify-end pb-20">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.p variants={item} className="text-gray-400 uppercase tracking-[0.2em] text-sm mb-6">
                    Creative Technologist
                </motion.p>

                <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 text-neutral-100">
                    Digital<br />
                    Architect<span className="text-blue-500">.</span>
                </motion.h1>

                <motion.div variants={item} className="max-w-xl text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                    Crafting systems that bridge the gap between <span className="text-white">artificial intelligence</span> and <span className="text-white">human intuition</span>.
                </motion.div>
            </motion.div>
        </section>
    );
}
