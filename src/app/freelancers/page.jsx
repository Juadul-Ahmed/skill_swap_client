import { serverFetch } from "@/lib/core/server";
import Link from "next/link";

const skillColors = [
    "bg-blue-500/10 border-blue-500/20 text-blue-400",
    "bg-purple-500/10 border-purple-500/20 text-purple-400",
    "bg-orange-500/10 border-orange-500/20 text-orange-400",
    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    "bg-pink-500/10 border-pink-500/20 text-pink-400",
];

const FreelancersPage = async () => {
    const freelancers = await serverFetch("/api/freelancers/top") || [];

    return (
        <div className="min-h-screen bg-[#070709] text-white">

            {/* Ambient glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {freelancers.length} Freelancers Available
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-3">
                        Browse Freelancers
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                        Connect with skilled professionals ready to take on your next project. Find the perfect match for your task.
                    </p>
                </div>

                {/* Empty State */}
                {freelancers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No freelancers yet</h3>
                        <p className="text-zinc-500 text-sm">Check back later as more freelancers join the platform.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {freelancers.map((freelancer) => (
                            <div
                                key={freelancer._id}
                                className="group bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-6 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.05)] flex flex-col gap-4 backdrop-blur-xl"
                            >
                                {/* Avatar + Name + Rate */}
                                <div className="flex items-center gap-4">
                                    {freelancer.image ? (
                                        <img
                                            src={freelancer.image}
                                            alt={freelancer.name}
                                            className="w-14 h-14 rounded-2xl object-cover border border-zinc-800 shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-black text-zinc-500 shrink-0">
                                            {freelancer.name?.charAt(0).toUpperCase() || "?"}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-black text-white truncate">
                                            {freelancer.name || "Anonymous"}
                                        </h3>
                                        <div className="text-[10px] text-zinc-500 font-medium mt-0.5">
                                            {freelancer.email}
                                        </div>
                                        <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                            <span className="text-[10px] font-black text-emerald-400">
                                                ${freelancer.hourlyRate || 0}/hr
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                {freelancer.bio && (
                                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                                        {freelancer.bio}
                                    </p>
                                )}

                                {/* Skills */}
                                {freelancer.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {freelancer.skills.slice(0, 4).map((skill, i) => (
                                            <span
                                                key={skill}
                                                className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${skillColors[i % skillColors.length]}`}
                                            >
                                                {skill.replace(/-/g, " ")}
                                            </span>
                                        ))}
                                        {freelancer.skills.length > 4 && (
                                            <span className="text-[10px] text-zinc-600 font-bold self-center">
                                                +{freelancer.skills.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="border-t border-zinc-900/80" />

                                {/* View Profile Button */}
                                <Link
                                    href={`/freelancers/${freelancer.freelancerId}`}
                                    className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:brightness-110 transition-all duration-200 shadow-[0_4px_20px_rgba(52,211,153,0.1)]"
                                >
                                    View Profile
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FreelancersPage;