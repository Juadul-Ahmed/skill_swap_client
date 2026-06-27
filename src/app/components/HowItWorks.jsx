"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
    {
        number: "01",
        title: "Post a Task",
        description: "Describe what you need done, set your budget and deadline. Your task goes live instantly for freelancers to discover.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        color: "emerald",
    },
    {
        number: "02",
        title: "Get Proposals",
        description: "Skilled freelancers review your task and submit competitive proposals with their bid price, timeline, and cover note.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
        ),
        color: "teal",
    },
    {
        number: "03",
        title: "Hire and Pay",
        description: "Review proposals, accept the best fit, and pay securely via Stripe. The freelancer delivers and you mark it complete.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "cyan",
    },
];

const colorMap = {
    emerald: {
        icon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        number: "text-emerald-500/20",
        accent: "bg-emerald-500",
        glow: "bg-emerald-500/5",
    },
    teal: {
        icon: "bg-teal-500/10 border-teal-500/20 text-teal-400",
        number: "text-teal-500/20",
        accent: "bg-teal-500",
        glow: "bg-teal-500/5",
    },
    cyan: {
        icon: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
        number: "text-cyan-500/20",
        accent: "bg-cyan-500",
        glow: "bg-cyan-500/5",
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 80, damping: 18 },
    },
};

export default function HowItWorks({ user }) {
    const isClient = user?.role === "client";
    const isGuest = !user;

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070709] border-b border-white/5 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/3 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Simple Process
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4">
                        How It Works
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Get your project done in three simple steps. Fast, secure, and hassle-free.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
                >
                    {/* Connector line (desktop only) */}
                    <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 z-0" />

                    {steps.map((step) => {
                        const colors = colorMap[step.color];
                        return (
                            <motion.div
                                key={step.number}
                                variants={itemVariants}
                                className="relative bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-[0_0_40px_rgba(52,211,153,0.04)] flex flex-col gap-5 z-10"
                            >
                                {/* Step number + icon row */}
                                <div className="flex items-start justify-between">
                                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${colors.icon}`}>
                                        {step.icon}
                                    </div>
                                    <span className={`text-6xl font-black leading-none ${colors.number}`}>
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-black text-white tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bottom accent line */}
                                <div className={`h-0.5 w-12 rounded-full ${colors.accent} opacity-40`} />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
                >
                    {(isClient || isGuest) && (
                        <Link
                            href={isGuest ? "/auth/signin" : "/dashboard/client/tasks/new"}
                            className="px-8 py-4 rounded-xl font-black text-sm text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 shadow-lg shadow-emerald-500/10 transition-all duration-200"
                        >
                            Post a Task
                        </Link>
                    )}
                    <Link
                        href="/tasks"
                        className="px-8 py-4 rounded-xl font-black text-sm text-white bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-200"
                    >
                        Browse Tasks
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}