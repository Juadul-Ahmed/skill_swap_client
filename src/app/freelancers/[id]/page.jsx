import { serverFetch } from "@/lib/core/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const skillColors = [
    "bg-blue-500/10 border-blue-500/20 text-blue-400",
    "bg-purple-500/10 border-purple-500/20 text-purple-400",
    "bg-orange-500/10 border-orange-500/20 text-orange-400",
    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    "bg-pink-500/10 border-pink-500/20 text-pink-400",
];

const FreelancerProfilePage = async ({ params }) => {
    const { id } = await params;
    const freelancer = await serverFetch(`/api/freelancers/${id}`);

    if (!freelancer) return notFound();

    return (
        <div className="min-h-screen bg-[#070709] text-white">

            {/* Ambient glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

                {/* Back */}
                <Link
                    href="/freelancers"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 mb-10"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Freelancers
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT — Main Profile */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Profile Card */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 backdrop-blur-xl">

                            {/* Avatar + Name */}
                            <div className="flex items-center gap-5 mb-6">
                                {freelancer.image ? (
                                    <img
                                        src={freelancer.image}
                                        alt={freelancer.name}
                                        className="w-20 h-20 rounded-2xl object-cover border border-zinc-800 shrink-0"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-3xl font-black text-zinc-500 shrink-0">
                                        {freelancer.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                )}
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">
                                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                                        Available for Work
                                    </div>
                                    <h1 className="text-2xl font-black text-white tracking-tight">
                                        {freelancer.name}
                                    </h1>
                                    <p className="text-zinc-500 text-sm mt-0.5">{freelancer.email}</p>
                                </div>
                            </div>

                            <div className="border-t border-zinc-900/80 mb-6" />

                            {/* Bio */}
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">// About</h3>
                                <p className="text-zinc-300 text-sm leading-relaxed">
                                    {freelancer.bio || "No bio provided."}
                                </p>
                            </div>
                        </div>

                        {/* Skills Card */}
                        {freelancer.skills?.length > 0 && (
                            <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">// Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {freelancer.skills.map((skill, i) => (
                                        <span
                                            key={skill}
                                            className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${skillColors[i % skillColors.length]}`}
                                        >
                                            {skill.replace(/-/g, " ")}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT — Sidebar */}
                    <div className="space-y-4">

                        {/* Hourly Rate */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">// Hourly Rate</div>
                            <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                ${freelancer.hourlyRate || 0}
                            </div>
                            <div className="text-[10px] text-zinc-600 mt-1">USD per hour</div>
                        </div>

                        {/* Member Since */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">// Member Since</div>
                            <div className="text-sm font-bold text-white">
                                {freelancer.createdAt
                                    ? new Date(freelancer.createdAt).toLocaleDateString(undefined, {
                                        year: "numeric", month: "long", day: "numeric"
                                    })
                                    : "N/A"
                                }
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl space-y-3">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">// Hire This Freelancer</div>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Post a task and this freelancer may apply. Accept their proposal to get started.
                            </p>
                            <Link
                                href="/dashboard/client/tasks/new"
                                className="w-full block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:brightness-110 transition-all duration-200 shadow-[0_4px_20px_rgba(52,211,153,0.1)]"
                            >
                                Post a Task
                            </Link>
                            <Link
                                href="/tasks"
                                className="w-full block bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center transition-all duration-200"
                            >
                                Browse Tasks
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfilePage;