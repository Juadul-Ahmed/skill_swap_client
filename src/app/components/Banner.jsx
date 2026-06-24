"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Banner() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0F] py-20 lg:py-32 flex items-center justify-center border-b border-white/5">
      
   
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
       
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-semibold text-emerald-400 tracking-wide uppercase"
          >
            🚀 Welcome to the Future of Micro-Tasks
          </motion.div>

      
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Get your tasks done by{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              skilled freelancers
            </span>
          </motion.h1>

     
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 font-normal leading-relaxed line-clamp-3 md:line-clamp-none"
          >
            SkillSwap simplifies your workflow. Post clear micro-tasks with budget parameters, 
            match instantly with vetted experts, track milestones in real-time, and release 
            secured payments only upon flawless execution.
          </motion.p>

       
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
           
            <Link href="/tasks/create" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 shadow-lg shadow-emerald-500/10 transition-shadow duration-200"
              >
                Post a Task
              </motion.button>
            </Link>

          
            <Link href="/tasks" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.015, y: -2, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.985 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-white/5 border border-white/10 transition-all duration-200"
              >
                Browse Tasks
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}