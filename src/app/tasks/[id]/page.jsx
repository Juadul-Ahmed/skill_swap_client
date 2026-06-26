import { getTaskById } from '@/lib/api/tasks';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import ProposalForm from './ProposalForm';
import { redirect } from 'next/navigation';


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
        year: "numeric", month: "long", day: "numeric",
    });
};

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const TaskDetailPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    const task = await getTaskById(id);

    if(!user){
      redirect(`/auth/signin?redirect=/tasks/${id}`)
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-[#070709] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-2">Task Not Found</h2>
                    <p className="text-zinc-500 text-sm mb-6">This task may have been removed or doesn't exist.</p>
                    <Link href="/browse-tasks" className="text-emerald-400 text-sm font-bold hover:underline">
                        ← Back to Browse Tasks
                    </Link>
                </div>
            </div>
        );
    }

    const catStyle = getCategoryStyle(task.category);

    return (
        <div className="min-h-screen bg-[#070709] text-white">

            {/* Ambient glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

                {/* Back Link */}
                <Link
                    href="/browse-tasks"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 mb-10"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Tasks
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT — Task Details */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Main Card */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 backdrop-blur-xl">

                            {/* Top Row */}
                            <div className="flex items-center justify-between mb-6">
                                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}>
                                    {formatCategory(task.category)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {task.status || "Open"}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4">
                                {task.taskTitle || "Untitled Task"}
                            </h1>

                            {/* Divider */}
                            <div className="border-t border-zinc-900/80 my-6" />

                            {/* Description */}
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">// Task Description</h3>
                                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    {task.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        {/* Proposal Form */}
                        <ProposalForm taskId={id} user={user} />
                    </div>

                    {/* RIGHT — Sidebar Info */}
                    <div className="space-y-4">

                        {/* Budget */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">// Budget</div>
                            <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                ${task.budget?.toLocaleString() || "0"}
                            </div>
                            <div className="text-[10px] text-zinc-600 mt-1">USD · Fixed Price</div>
                        </div>

                        {/* Deadline */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">// Deadline</div>
                            <div className="text-sm font-bold text-white">{formatDeadline(task.deadline)}</div>
                        </div>

                        {/* Posted Date */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">// Posted On</div>
                            <div className="text-sm font-bold text-white">{formatDate(task.createdAt)}</div>
                        </div>

                        {/* Task ID */}
                        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">// Task ID</div>
                            <div className="text-[10px] font-mono text-zinc-400 break-all">{id}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;