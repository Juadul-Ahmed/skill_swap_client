import { getPublicTasks } from "@/lib/api/tasks";
import Link from "next/link";

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
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const BrowseTasksPage = async () => {
    const tasks = await getPublicTasks();

    return (
        <div className="min-h-screen bg-[#070709] text-white">

        
            <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

           
                <div className="mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {tasks.length} Active Tasks
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-3">
                        Browse Tasks
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                        Find your next project. Browse open tasks posted by clients and submit your proposal.
                    </p>
                </div>

              
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No tasks found</h3>
                        <p className="text-zinc-500 text-sm">Check back later for new tasks.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {tasks.map((task) => {
                            const catStyle = getCategoryStyle(task.category);
                            return (
                                <div
                                    key={task._id}
                                    className="group relative bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-6 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.05)] flex flex-col gap-4 backdrop-blur-xl"
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

                                 
                                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                                        {task.description || "No description provided."}
                                    </p>

                                    <div className="border-t border-zinc-900/80" />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-0.5">Budget</div>
                                            <div className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                                ${task.budget?.toLocaleString() || "0"}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-0.5">Deadline</div>
                                            <div className="text-xs font-semibold text-zinc-300">
                                                {formatDeadline(task.deadline)}
                                            </div>
                                        </div>
                                    </div>

                              
                                    <Link
                                        href={`/browse-tasks/${task._id}`}
                                        className="w-full mt-auto bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:brightness-110 transition-all duration-200 shadow-[0_4px_20px_rgba(52,211,153,0.1)]"
                                    >
                                        View & Apply
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseTasksPage;