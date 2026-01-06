"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                            <h2 className="text-xl font-bold text-white">Let's Connect</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-400 text-sm mb-6">
                                I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                                    <input
                                        type="text"
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Project Inquiry"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Hello..."
                                    />
                                </div>
                                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-500 transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
