import { getUserSession, requireRole } from "@/lib/core/session";
import { getFreelancerStats } from "@/lib/api/stats";
import { FileText, Clock, CircleCheck, CircleDollar } from "@gravity-ui/icons";
import StatCard from "@/app/components/DashboardComponents/StatCard";

const FreelancerHomePage = async () => {
    await requireRole('freelancer');
    const user = await getUserSession();
    const stats = await getFreelancerStats(user?.email);

    const statsData = {
        totalProposals: stats?.totalProposals || 0,
        pendingProposals: stats?.pendingProposals || 0,
        acceptedProposals: stats?.acceptedProposals || 0,
        totalEarnings: stats?.totalEarnings || 0,
    };

    return (
        <div className="px-4 py-12">
            {/* Welcome Banner */}
            <div className="relative p-8 md:p-12 rounded-3xl bg-[#0E0E14] border border-white/5 overflow-hidden shadow-2xl mb-8">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Freelancer Account Active
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                        Welcome back,{" "}
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            {user?.name}
                        </span>
                        !
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 max-w-md font-medium leading-relaxed">
                        Track your proposals, active projects, and earnings all in one place.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    title="Total Proposals"
                    value={statsData.totalProposals}
                    subtext="All submitted applications"
                    icon={<FileText size={20} />}
                />
                <StatCard
                    title="Pending Proposals"
                    value={statsData.pendingProposals}
                    subtext="Awaiting client response"
                    icon={<Clock size={20} />}
                />
                <StatCard
                    title="Accepted Proposals"
                    value={statsData.acceptedProposals}
                    subtext="Projects won"
                    icon={<CircleCheck size={20} />}
                />
                <StatCard
                    title="Total Earnings"
                    value={`$${statsData.totalEarnings.toLocaleString()}`}
                    subtext="From completed projects"
                    icon={<CircleDollar size={20} />}
                />
            </div>
        </div>
    );
};

export default FreelancerHomePage;