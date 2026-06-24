import React from "react";

export default function StatCard({ title, value, subtext, icon, trend }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-[#0E0E14] border border-white/5 p-6 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(52,211,153,0.03)]">
      {/* Background Ambient Radial Glow on Hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-3">
          {/* Header Title */}
          <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 block">
            {title}
          </span>

          {/* Dynamic Numeric Metric Display */}
          <h3 className="text-3xl font-black text-white tracking-tight">
            {value}
          </h3>

          {/* Contextual Sub-label Footer */}
          {subtext && (
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
              {trend && (
                <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">
                  {trend}
                </span>
              )}
              {subtext}
            </p>
          )}
        </div>

        {/* Visual Icon Container Wrap */}
        <div className="p-3 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-colors duration-300">
          {icon}
        </div>
      </div>
    </div>
  );
}