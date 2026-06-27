import { getUserSession } from "@/lib/core/session";
import { getFreelancerProjects } from "@/lib/api/projects";

import Link from "next/link";
import DeliverableModal from "./Deliverablemodal";

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const categoryColors = {
    "web-development": { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    "ui-ux-design": { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
    "mobile-apps": { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
    "devops": { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400" },
};

const getCategoryStyle = (category) =>
    categoryColors[category] || { bg: "bg-zinc-500/10", border: "border-zinc-500/20", text: "text-zinc-400" };

const formatCategory = (cat) =>
    cat ? cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "General";

const ActiveProjectsPage = async () => {
    const user = await getUserSession();
    const projects = await getFreelancerProjects(user?.email);

    const inProgress = projects.filter(p => p.status === "in-progress");
    const completed = projects.filter(p => p.status === "completed");

    return (
        <div className="min-h-screen bg-[#070709] text-white px-4 sm:px-6 lg:px-8 py-12">

            {/* Ambient glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[300px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-10 relative z-10">

                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {inProgress.length} Active · {completed.length} Completed
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2">
                        Active Projects
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-xl">
                        Track your in-progress work and submit deliverables when done.
                    </p>
                </div>

                {/* Empty State */}
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No active projects yet</h3>
                        <p className="text-zinc-500 text-sm mb-6">Submit proposals to tasks and get hired to see your projects here.</p>
                        <Link
                            href="/browse-tasks"
                            className="bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black text-xs uppercase tracking-wider rounded-xl px-6 py-3 hover:brightness-110 transition-all duration-200"
                        >
                            Browse Tasks
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-10">

                        {/* In Progress Section */}
                        {inProgress.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">In Progress</h2>
                                    <div className="h-px flex-1 bg-zinc-900" />
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{inProgress.length}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {inProgress.map((project) => {
                                        const catStyle = getCategoryStyle(project.category);
                                        return (
                                            <div
                                                key={project._id}
                                                className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-6 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.05)] flex flex-col gap-4 backdrop-blur-xl"
                                            >
                                                {/* Top Row */}
                                                <div className="flex items-center justify-between">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}>
                                                        {formatCategory(project.category)}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                                                        In Progress
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-base font-black text-white leading-snug">
                                                    {project.taskTitle}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                                                    {project.description}
                                                </p>

                                                <div className="border-t border-zinc-900/80" />

                                                {/* Stats Row */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Your Bid</div>
                                                        <div className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                                            ${project.proposalBudget?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Deadline</div>
                                                        <div className="text-xs font-semibold text-zinc-300">
                                                            {formatDate(project.deadline)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Submit Deliverable */}
                                                <DeliverableModal taskId={project._id} taskTitle={project.taskTitle} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Completed Section */}
                        {completed.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Completed</h2>
                                    <div className="h-px flex-1 bg-zinc-900" />
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{completed.length}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {completed.map((project) => {
                                        const catStyle = getCategoryStyle(project.category);
                                        return (
                                            <div
                                                key={project._id}
                                                className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-6 flex flex-col gap-4 opacity-80"
                                            >
                                                {/* Top Row */}
                                                <div className="flex items-center justify-between">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}>
                                                        {formatCategory(project.category)}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                                        <span className="h-1 w-1 rounded-full bg-zinc-400" />
                                                        Completed
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-base font-black text-white leading-snug">
                                                    {project.taskTitle}
                                                </h3>

                                                <div className="border-t border-zinc-900/80" />

                                                {/* Stats + Deliverable */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Earned</div>
                                                        <div className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                                            ${project.proposalBudget?.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Completed</div>
                                                        <div className="text-xs font-semibold text-zinc-300">
                                                            {formatDate(project.completedAt)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Deliverable Link */}
                                                {project.deliverableUrl && (
                                                    <a
                                                        href={project.deliverableUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full text-center bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 rounded-xl py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200"
                                                    >
                                                        View Deliverable →
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveProjectsPage;