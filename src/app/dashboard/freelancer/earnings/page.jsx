import { getFreelancerEarnings } from "@/lib/api/earnings";
import { getUserSession } from "@/lib/core/session";

import Link from "next/link";

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const MyEarningsPage = async () => {
    const user = await getUserSession();
    const earnings = await getFreelancerEarnings(user?.email);

    const totalEarned = earnings.reduce((sum, e) => sum + (e.amountEarned || 0), 0);
    const totalProjects = earnings.length;

    return (
        <div className="min-h-screen bg-[#070709] text-white px-4 sm:px-6 lg:px-8 py-12">

            {/* Ambient glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[300px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-8 relative z-10">

                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {totalProjects} Completed Projects
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2">
                        My Earnings
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-xl">
                        A complete breakdown of your completed projects and payments received.
                    </p>
                </div>

                {/* Total Earnings Banner */}
                <div className="relative bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Earned</div>
                            <div className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                ${totalEarned.toLocaleString()}
                            </div>
                            <div className="text-xs text-zinc-500 mt-2 font-medium">
                                Across {totalProjects} completed project{totalProjects !== 1 ? "s" : ""}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-center">
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Projects</div>
                                <div className="text-2xl font-black text-white">{totalProjects}</div>
                            </div>
                            <div className="bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-center">
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Avg. Payout</div>
                                <div className="text-2xl font-black text-emerald-400">
                                    ${totalProjects > 0 ? Math.round(totalEarned / totalProjects).toLocaleString() : 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {earnings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No earnings yet</h3>
                        <p className="text-zinc-500 text-sm mb-6">Complete projects to see your earnings here.</p>
                        <Link
                            href="/browse-tasks"
                            className="bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black text-xs uppercase tracking-wider rounded-xl px-6 py-3 hover:brightness-110 transition-all duration-200"
                        >
                            Browse Tasks
                        </Link>
                    </div>
                ) : (
                    /* Earnings Table */
                    <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl overflow-hidden">

                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-zinc-900/80">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Task Title</div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Client</div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Amount</div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Completed</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-zinc-900/80">
                            {earnings.map((earning, index) => (
                                <div
                                    key={earning._id}
                                    className="grid grid-cols-4 gap-4 px-6 py-5 hover:bg-zinc-900/20 transition-colors duration-150"
                                >
                                    {/* Task Title */}
                                    <div className="flex flex-col justify-center">
                                        <span className="text-sm font-bold text-white truncate">
                                            {earning.taskTitle}
                                        </span>
                                        {earning.deliverableUrl && (
                                            <a
                                                href={earning.deliverableUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] text-emerald-400 hover:underline mt-0.5 truncate"
                                            >
                                                View Deliverable →
                                            </a>
                                        )}
                                    </div>

                                    {/* Client Name */}
                                    <div className="flex items-center">
                                        <span className="text-sm text-zinc-300 font-medium truncate">
                                            {earning.clientName}
                                        </span>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex items-center">
                                        <span className="text-sm font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                            ${earning.amountEarned?.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Completion Date */}
                                    <div className="flex items-center">
                                        <span className="text-sm text-zinc-400 font-medium">
                                            {formatDate(earning.completedAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Table Footer */}
                        <div className="grid grid-cols-4 gap-4 px-6 py-4 border-t border-zinc-900/80 bg-zinc-900/20">
                            <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
                                Total ({totalProjects} projects)
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-black text-emerald-400">
                                    ${totalEarned.toLocaleString()}
                                </span>
                            </div>
                            <div />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEarningsPage;