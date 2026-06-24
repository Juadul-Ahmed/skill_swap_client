'use client'
import DashboardStats from '@/app/components/DashboardComponents/DashboardStats';
import { useSession } from '@/lib/auth-client';
import React from 'react';

import { ClipLoader } from 'react-spinners';

const ClientHomepage = () => {
  const { data: session, isPending } = useSession();
  

  if (isPending) {
    return (
      <div className="min-h-[70vh] bg-[#0B0B0F] flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden my-6 mx-4">
        {/* Subtle decorative glowing mesh in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <ClipLoader color="#34d399" size={36} speedMultiplier={0.7} />
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em] animate-pulse">
          Syncing Profile
        </span>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className=" px-4 py-12 ">
      <div className="relative p-8 md:p-12 rounded-3xl bg-[#0E0E14] border border-white/5 overflow-hidden shadow-2xl mb-8">
      
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Client Account Active
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {user?.name }
            </span>
            !
          </h1>
          
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-medium leading-relaxed">
            Ready to find your next digital solutions provider? Jump directly into your project workflow engine below.
          </p>
        </div>
      </div>
      <DashboardStats/>
    </div>
  );
};

export default ClientHomepage;