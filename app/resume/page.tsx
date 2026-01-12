"use client";

import { SKILLS, PROFILE, PROJECTS } from "@/lib/data";
import { Mail, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans print:p-0 p-8 flex justify-center">
            <div className="max-w-[21cm] w-full bg-white relative">

                {/* HEAD */}
                <header className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Hoang Manh Cam</h1>
                        <p className="text-xl font-medium text-gray-600">Senior Product Engineer</p>
                    </div>
                    <div className="text-right text-sm space-y-1">
                        <div className="flex items-center justify-end gap-2">
                            <span>Vietnam</span>
                            <MapPin size={14} />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <a href="mailto:cam.hm@example.com" className="hover:underline">Contact via Email</a>
                            <Mail size={14} />
                        </div>
                        <div className="flex gap-3 justify-end mt-2">
                            <Link href="https://github.com/camhm" target="_blank"><Github size={18} /></Link>
                            <Link href="https://linkedin.com/in/hoang-manh-cam" target="_blank"><Linkedin size={18} /></Link>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-[2fr_1fr] gap-8">

                    {/* LEFT COLUMN: EXPERIENCE & PROJECTS */}
                    <div className="space-y-8">

                        <section>
                            <h2 className="text-lg font-black uppercase border-b border-gray-200 mb-4 pb-1">Summary</h2>
                            <p className="text-sm leading-relaxed text-gray-700">
                                Senior Product Engineer with 9+ years of experience specializing in high-performance web & mobile applications.
                                Proven track record in Fintech, Logistics, and Privacy-focused architectures.
                                Passionate about bridging the gap between complex backend systems and intuitive user experiences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black uppercase border-b border-gray-200 mb-4 pb-1">Experience</h2>

                            {PROFILE.experience.map((role, i) => (
                                <div key={i} className="mb-6 last:mb-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{role.role}</h3>
                                        <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{role.year}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">{role.company}</p>
                                    <p className="text-xs text-gray-500">{role.description}</p>
                                </div>
                            ))}
                        </section>

                        <section>
                            <h2 className="text-lg font-black uppercase border-b border-gray-200 mb-4 pb-1">Selected Projects</h2>
                            {PROJECTS.filter(p => p.details).map((project) => (
                                <div key={project.id} className="mb-5 last:mb-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-sm">{project.title}</h3>
                                            <span className="text-[10px] uppercase border border-gray-300 px-1.5 rounded text-gray-500">{project.category}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1.5">{project.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-[10px] font-mono text-gray-500 bg-gray-50 px-1 rounded">#{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>

                    </div>


                    {/* RIGHT COLUMN: SKILLS & META */}
                    <div className="space-y-8">

                        <section>
                            <h2 className="text-lg font-black uppercase border-b border-gray-200 mb-4 pb-1">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {SKILLS.map(skill => (
                                    <span key={skill.name} className="bg-black text-white text-xs font-bold px-2 py-1 rounded-sm">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-black uppercase border-b border-gray-200 mb-4 pb-1">Languages</h2>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li className="flex justify-between"><span>Vietnamese</span> <span className="text-gray-500">Native</span></li>
                                <li className="flex justify-between"><span>English</span> <span className="text-gray-500">Professional</span></li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-black uppercase border-b border-gray-200 mb-4 pb-1">Awards</h2>
                            <div className="text-sm text-gray-700 space-y-2">
                                <p><span className="font-bold">1st Place</span> <br /><span className="text-gray-500 text-xs">Global Hackathon 2024</span></p>
                                <p><span className="font-bold">Tech Lead of the Year</span> <br /><span className="text-gray-500 text-xs">Innovation Summit</span></p>
                            </div>
                        </section>

                    </div>

                </div>

                <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-400">
                        Generated by DevReels Platform • View interactive portfolio at github.com/camhm/devreels
                    </p>
                </div>

                {/* FAB Print Button */}
                <button
                    onClick={() => window.print()}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl print:hidden hover:bg-blue-700 transition-colors"
                    title="Print to PDF"
                >
                    <ExternalLink />
                </button>

            </div>
        </div>
    )
}
