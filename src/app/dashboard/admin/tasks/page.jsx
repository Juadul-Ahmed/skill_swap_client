import { requireRole } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";
import DeleteTaskButton from "./DeleteTaskButton";

const statusStyles = {
    open: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
    "in-progress": { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    completed: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
};

const categoryColors = {
    "web-development": "text-blue-400",
    "ui-ux-design": "text-purple-400",
    "mobile-apps": "text-orange-400",
    "devops": "text-cyan-400",
};

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const ManageTasksPage = async () => {
    await requireRole("admin");
    const tasks = await serverFetch("/api/tasks") || [];

    return (
        <div className="min-h-screen bg-[#070709] text-white px-4 sm:px-6 lg:px-8 py-12">
            <div className="fixed top-0 right-1/4 w-[500px] h-[400px] bg-violet-500/4 blur-[180px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        {tasks.length} Total Tasks
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2">
                        Manage Tasks
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-xl">
                        View all platform tasks. Delete any that violate guidelines.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Open", value: tasks.filter(t => t.status === "open").length, color: "text-yellow-400" },
                        { label: "In Progress", value: tasks.filter(t => t.status === "in-progress").length, color: "text-blue-400" },
                        { label: "Completed", value: tasks.filter(t => t.status === "completed").length, color: "text-emerald-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-5">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</div>
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-12 px-6 py-3 border-b border-zinc-900/80 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <div className="col-span-4">Task</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Budget</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="py-20 text-center text-zinc-500 text-sm">No tasks found</div>
                    ) : (
                        tasks.map((task) => {
                            const statusStyle = statusStyles[task.status] || statusStyles.open;
                            const catColor = categoryColors[task.category] || "text-zinc-400";
                            return (
                                <div key={task._id} className="grid grid-cols-12 px-6 py-4 border-b border-zinc-900/40 hover:bg-white/[0.02] transition-colors items-center">
                                    <div className="col-span-4">
                                        <div className="text-sm font-black text-white line-clamp-1">{task.taskTitle}</div>
                                        <div className="text-[11px] text-zinc-500">{formatDate(task.createdAt)}</div>
                                    </div>
                                    <div className={`col-span-2 text-[11px] font-bold uppercase tracking-wider ${catColor}`}>
                                        {task.category?.replace(/-/g, " ")}
                                    </div>
                                    <div className="col-span-2 text-sm font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                        ${task.budget?.toLocaleString()}
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <DeleteTaskButton taskId={task._id?.toString()} />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTasksPage;