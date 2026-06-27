"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Static placeholder — swap with real top-performer data later
const topFreelancer = {
    name: "Aisha Rahman",
    role: "Full-stack Developer",
    initials: "AR",
    avatarColor: "from-emerald-400 to-teal-400",
    month: "June 2026",
    tasksCompleted: 9,
    rating: 4.9,
    earned: 6200,
    badge: "Top Performer",
    blurb:
        "Delivered nine projects this month without a single missed deadline, ranging from dashboard rebuilds to a full mobile app MVP.",
};

export default function CommunityHighlights() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/5 blur-[180px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Community Highlights
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4">
                        Top Freelancer of the Month
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base">
                        Recognizing the freelancer who delivered the most this month.
                    </p>
                </div>

                {/* Highlight Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-[#0E0E14] border border-emerald-500/15 rounded-3xl p-8 md:p-10 overflow-hidden shadow-2xl"
                >
                    {/* Ambient glow inside card */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                        {/* Avatar + badge */}
                        <div className="flex flex-col items-center md:items-start gap-3 shrink-0">
                            <div
                                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${topFreelancer.avatarColor} flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-emerald-500/10`}
                            >
                                {topFreelancer.initials}
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                                <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.43.91-5.32L2.27 6.62l5.34-.78L10 1z" />
                                </svg>
                                {topFreelancer.badge}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-3 text-center md:text-left">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                {topFreelancer.month}
                            </div>
                            <h3 className="text-2xl font-black text-white">
                                {topFreelancer.name}
                            </h3>
                            <p className="text-sm text-emerald-400 font-bold">
                                {topFreelancer.role}
                            </p>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                                {topFreelancer.blurb}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 md:gap-6 shrink-0 w-full md:w-auto">
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">
                                    {topFreelancer.tasksCompleted}
                                </div>
                                <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-1">
                                    Tasks Done
                                </div>
                            </div>
                            <div className="text-center border-x border-zinc-800 px-4 md:px-6">
                                <div className="text-2xl font-black text-white">
                                    {topFreelancer.rating}
                                </div>
                                <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-1">
                                    Avg Rating
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    ${topFreelancer.earned.toLocaleString()}
                                </div>
                                <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-1">
                                    Earned
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <div className="text-center mt-8">
                    <Link
                        href="/freelancers"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                    >
                        Browse all freelancers
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}