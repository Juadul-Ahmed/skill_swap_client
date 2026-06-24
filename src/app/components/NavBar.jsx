"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Base Public Links visible to everyone
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Tasks", href: "/tasks" },
    { label: "Browse Freelancers", href: "/freelancers" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* BRAND LOGO (Left Aligned) */}
        <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-90 z-10">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-xl font-black text-black tracking-tighter">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            Skill<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Swap</span>
          </span>
        </Link>

        {/* CENTERED NAVIGATION LINKS (Clean with bottom underline hover effect) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <ul className="flex items-center gap-8">
            {publicLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white group"
                >
                  {link.label}
                  {/* Neon Line Accent Effect */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AUTH BUTTONS / MOBILE TOGGLE (Right Aligned) */}
        <div className="flex items-center gap-4 z-10">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/register"
              radius="lg"
              className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200 transition-all shadow-md shadow-white/5"
            >
              Get Started
            </Button>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-white/5 bg-[#0B0B0F]/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 md:hidden">
          <div className="px-6 py-6 space-y-5">
            <ul className="space-y-2">
              {publicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="w-full h-px bg-white/10" />

            <div className="flex flex-col gap-3 pt-1">
              <Link
                href="/auth/signin"
                className="text-center rounded-xl px-4 py-3 text-base font-medium text-emerald-400 hover:bg-white/5 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>

              <Button
                as={Link}
                href="/register"
                radius="lg"
                className="w-full bg-white font-semibold text-black hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}