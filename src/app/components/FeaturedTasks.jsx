import Link from "next/link";
import { serverFetch } from "@/lib/core/server";

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

const formatDeadline = (date) => {
    if (!date) return "No deadline";
    return new Date(date).toLocaleDateString(undefined, {
        month: "short", day: "numeric", year: "numeric",
    });
};

const FeaturedTasks = async () => {
    const tasks = await serverFetch("/api/tasks/featured") || [];

    if (tasks.length === 0) return null;

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] border-b border-white/5">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Opportunities
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                            Featured Tasks
                        </h2>
                        <p className="text-zinc-400 text-sm mt-2 max-w-md">
                            Browse the latest open tasks posted by clients on the platform.
                        </p>
                    </div>
                    <Link
                        href="/tasks"
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 text-xs font-black uppercase tracking-wider transition-all duration-200"
                    >
                        View All Tasks →
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {tasks.map((task) => {
                        const catStyle = getCategoryStyle(task.category);
                        return (
                            <div
                                key={task._id}
                                className="group bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-6 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.05)] flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}>
                                        {formatCategory(task.category)}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                                        Open
                                    </span>
                                </div>

                                <h3 className="text-base font-black text-white leading-snug group-hover:text-emerald-50 transition-colors duration-200">
                                    {task.taskTitle || "Untitled Task"}
                                </h3>

                                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                                    {task.description || "No description provided."}
                                </p>

                                <div className="border-t border-zinc-900/80" />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Budget</div>
                                        <div className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                            ${task.budget?.toLocaleString() || "0"}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Deadline</div>
                                        <div className="text-xs font-semibold text-zinc-300">
                                            {formatDeadline(task.deadline)}
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/tasks/${task._id}`}
                                    className="w-full mt-auto bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:brightness-110 transition-all duration-200"
                                >
                                    View & Apply
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTasks;