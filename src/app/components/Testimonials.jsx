"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        quote:
            "I posted a task on a Tuesday and had three solid proposals by Wednesday morning. The freelancer I hired shipped a cleaner dashboard than I imagined.",
        name: "Maria Chen",
        role: "Client",
        company: "Founder, Loop Analytics",
        avatarColor: "from-emerald-400 to-teal-400",
        initials: "MC",
    },
    {
        id: 2,
        quote:
            "Escrow payment is the reason I stopped chasing invoices. I deliver, the client approves, and the money is just there. No more awkward follow-up emails.",
        name: "Devon Okafor",
        role: "Freelancer",
        company: "Full-stack Developer",
        avatarColor: "from-cyan-400 to-blue-400",
        initials: "DO",
    },
    {
        id: 3,
        quote:
            "The proposal screen shows budget, timeline, and message side by side. I can compare five freelancers in under ten minutes and actually hire with confidence.",
        name: "Priya Sharma",
        role: "Client",
        company: "Product Lead, Northwind Co.",
        avatarColor: "from-purple-400 to-pink-400",
        initials: "PS",
    },
    {
        id: 4,
        quote:
            "Most platforms bury you in fees and red tape. SkillSwap got out of the way and let me focus on the actual work instead of fighting the tool.",
        name: "Jonas Weber",
        role: "Freelancer",
        company: "UI/UX Designer",
        avatarColor: "from-orange-400 to-amber-400",
        initials: "JW",
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Trusted on Both Sides
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4">
                        What people are saying
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base">
                        Real words from clients who hired and freelancers who got hired.
                    </p>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="relative group bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-7 hover:border-emerald-500/20 transition-all duration-300"
                        >
                            {/* Quote mark accent */}
                            <svg
                                className="w-8 h-8 text-emerald-500/20 mb-4"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                            >
                                <path d="M9.333 8C5.96 8 3.2 10.76 3.2 14.133v9.6h9.6v-9.6H7.467c0-1.84 1.493-3.333 3.333-3.333V8H9.333zm16 0c-3.373 0-6.133 2.76-6.133 6.133v9.6h9.6v-9.6h-5.334c0-1.84 1.494-3.333 3.334-3.333V8h-1.467z" />
                            </svg>

                            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                                {t.quote}
                            </p>

                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-black font-black text-xs shrink-0`}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">
                                        {t.name}
                                    </div>
                                    <div className="text-[11px] text-zinc-500 font-medium">
                                        {t.role} &middot; {t.company}
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}