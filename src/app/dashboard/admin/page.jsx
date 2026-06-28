import { requireRole, getUserSession } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";
import StatCard from "@/app/components/DashboardComponents/StatCard";
import { Person, ListCheck, CircleDollar, Layers } from "@gravity-ui/icons";



const AdminHomePage = async () => {
    await requireRole("admin");
    const user = await getUserSession();
    const stats = await serverFetch("/api/admin/stats");

    return (
        <div className="px-4 py-12">
            <div className="relative p-8 md:p-12 rounded-3xl bg-[#0E0E14] border border-white/5 overflow-hidden shadow-2xl mb-8">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Admin Account Active
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                        Welcome back,{" "}
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                            {user?.name}
                        </span>
                        !
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 max-w-md font-medium leading-relaxed">
                        Monitor platform activity, manage users, and oversee all transactions from here.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    subtext="Registered accounts"
                    icon={<Person size={20} />}
                />
                <StatCard
                    title="Total Tasks"
                    value={stats?.totalTasks || 0}
                    subtext="All posted tasks"
                    icon={<ListCheck size={20} />}
                />
                <StatCard
                    title="Active Tasks"
                    value={stats?.activeTasks || 0}
                    subtext="Open and in-progress"
                    icon={<Layers size={20} />}
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
                    subtext="From completed tasks"
                    icon={<CircleDollar size={20} />}
                />
            </div>
        </div>
    );
};

export default AdminHomePage;