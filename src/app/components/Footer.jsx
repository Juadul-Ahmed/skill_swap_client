"use client";

import React from "react";
import Link from "next/link";
import { Envelope, LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";


export default function Footer() {
  // Main page navigation array
  const mainPages = [
    { label: "Home", href: "/" },
    { label: "Browse Tasks", href: "/tasks" },
    { label: "Browse Freelancers", href: "/freelancers" },
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-[#0B0B0F] py-12 z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* BLOCK 1: WEBSITE LOGO & BRAND NAME */}
        <div className="flex flex-col space-y-4 items-center md:items-start">
          <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-90">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center shadow-md shadow-emerald-500/10">
              <span className="text-lg font-black text-black tracking-tighter">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Skill<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Swap</span>
            </span>
          </Link>
          <p className="text-xs text-gray-500 text-center md:text-left max-w-xs leading-relaxed">
            The secure freelance micro-task engine designed to swap skills, track tasks, and execute clean deliverables natively.
          </p>
        </div>

        {/* BLOCK 2: NAVIGATION LINKS TO MAIN PAGES */}
        <div className="flex flex-col space-y-3 items-center md:items-center">
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Platform</h4>
          <ul className="space-y-2 text-center">
            {mainPages.map((page) => (
              <li key={page.href}>
                <Link 
                  href={page.href} 
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-emerald-400"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* BLOCK 3: CONTACT INFO & SOCIAL MEDIA */}
        <div className="flex flex-col space-y-4 items-center md:items-end">
          <div className="text-center md:text-right space-y-1">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Support Channel</h4>
            <a 
              href="mailto:support@skillswap.com" 
              className="inline-flex items-center gap-2 text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors pt-1"
            >
              <Envelope className="w-4 h-4 text-emerald-400" />
              support@skillswap.com
            </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4 pt-1">
            {/* Gravity UI LogoX Icon */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
              aria-label="X"
            >
              <LogoFacebook width={16} height={16} />
            </a>
            
            {/* Gravity UI LogoLinkedin Icon */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <LogoLinkedin width={16} height={16} />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM LEAN COPYRIGHT BAND */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 text-center">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} SkillSwap Inc. All rights reserved. Built for modern freelance tracking workflows.
        </p>
      </div>
    </footer>
  );
}