import Link from "next/link";
import { serverFetch } from "@/lib/core/server";

const skillColors = [
    "bg-blue-500/10 border-blue-500/20 text-blue-400",
    "bg-purple-500/10 border-purple-500/20 text-purple-400",
    "bg-orange-500/10 border-orange-500/20 text-orange-400",
    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    "bg-pink-500/10 border-pink-500/20 text-pink-400",
];

const TopFreelancers = async () => {
    const freelancers = await serverFetch("/api/freelancers/top") || [];

    if (freelancers.length === 0) return null;

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070709] border-b border-white/5">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Top Talent
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                            Browse Freelancers
                        </h2>
                        <p className="text-zinc-400 text-sm mt-2 max-w-md">
                            Connect with skilled professionals ready to take on your next project.
                        </p>
                    </div>
                    <Link
                        href="/freelancers"
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 text-xs font-black uppercase tracking-wider transition-all duration-200"
                    >
                        View All Freelancers →
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {freelancers.map((freelancer) => (
                        <div
                            key={freelancer._id}
                            className="group bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-6 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.05)] flex flex-col gap-4"
                        >
                            {/* Avatar + Name */}
                            <div className="flex items-center gap-4">
                                {freelancer.image ? (
                                    <img
                                        src={freelancer.image}
                                        alt={freelancer.name}
                                        className="w-12 h-12 rounded-2xl object-cover border border-zinc-800"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg font-black text-zinc-500">
                                        {freelancer.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-sm font-black text-white">
                                        {freelancer.name || "Anonymous"}
                                    </h3>
                                    <div className="text-[10px] text-zinc-500 font-medium mt-0.5">
                                        ${freelancer.hourlyRate || 0}/hr
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            {freelancer.bio && (
                                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
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

                            <Link
                                href={`/freelancers/${freelancer.freelancerId}`}
                                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 font-black text-xs uppercase tracking-wider rounded-xl py-2.5 text-center transition-all duration-200"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopFreelancers;