import { getLoggedInClientProfile } from "@/lib/api/clients";
import Link from "next/link";
import ProposalRowActions from "./ProposalRowActions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getClientProposals = async (clientId) => {
    const res = await fetch(`${baseUrl}/api/proposals/client/${clientId}`, {
        cache: "no-store"
    });
    const text = await res.text();
    if (!text) return [];
    return JSON.parse(text);
};

const statusStyles = {
    pending:  { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
    accepted: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    rejected: { bg: "bg-red-500/10",    border: "border-red-500/20",    text: "text-red-400" },
};

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const ManageProposalsPage = async () => {
    const clientProfile = await getLoggedInClientProfile();
    const proposals = await getClientProposals(clientProfile?.clientId);

    const total = proposals.length;
    const pending = proposals.filter(p => p.status === "pending").length;
    const accepted = proposals.filter(p => p.status === "accepted").length;
    const rejected = proposals.filter(p => p.status === "rejected").length;

    // Group proposals by task
    const grouped = proposals.reduce((acc, proposal) => {
        const key = proposal.taskId;
        if (!acc[key]) {
            acc[key] = {
                taskTitle: proposal.taskTitle,
                taskCategory: proposal.taskCategory,
                taskStatus: proposal.taskStatus,
                proposals: []
            };
        }
        acc[key].proposals.push(proposal);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-[#070709] text-white px-4 sm:px-6 lg:px-8 py-12">

            {/* Ambient glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-0 w-[400px] h-[300px] bg-cyan-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-8 relative z-10">

                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {total} Proposals Received
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2">
                        Manage Proposals
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-xl">
                        Review freelancer applications for your tasks. Accept to proceed to payment or reject to pass.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Total",    value: total,    color: "text-white" },
                        { label: "Pending",  value: pending,  color: "text-yellow-400" },
                        { label: "Accepted", value: accepted, color: "text-emerald-400" },
                        { label: "Rejected", value: rejected, color: "text-red-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-5">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</div>
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {total === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No proposals yet</h3>
                        <p className="text-zinc-500 text-sm mb-6">Freelancers haven't applied to your tasks yet.</p>
                        <Link href="/dashboard/client/tasks/new" className="bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black text-xs uppercase tracking-wider rounded-xl px-6 py-3 hover:brightness-110 transition-all duration-200">
                            Post a Task
                        </Link>
                    </div>
                ) : (
                    // Grouped by task
                    <div className="space-y-8">
                        {Object.entries(grouped).map(([taskId, group]) => (
                            <div key={taskId} className="space-y-3">

                                {/* Task Header */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <h2 className="text-sm font-black text-white uppercase tracking-wide">
                                            {group.taskTitle}
                                        </h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                                                {group.taskCategory?.replace(/-/g, " ") || "General"}
                                            </span>
                                            <span className="text-zinc-700">•</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                group.taskStatus === "in-progress" ? "text-emerald-400" :
                                                group.taskStatus === "open" ? "text-yellow-400" : "text-zinc-400"
                                            }`}>
                                                {group.taskStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                        {group.proposals.length} proposal{group.proposals.length !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                {/* Proposals for this task */}
                                <div className="space-y-3 pl-0">
                                    {group.proposals.map((proposal) => {
                                        const statusStyle = statusStyles[proposal.status] || statusStyles.pending;
                                        const taskAccepted = group.taskStatus === "in-progress";

                                        return (
                                            <div
                                                key={proposal._id}
                                                className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-6 hover:border-zinc-800 transition-all duration-200"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                                    {/* Freelancer Info */}
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="text-xs font-black text-white">
                                                                {proposal.freelancerEmail}
                                                            </span>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
                                                                {proposal.status}
                                                            </span>
                                                        </div>

                                                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                                                            {proposal.message}
                                                        </p>

                                                        <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                                            <span>📅 {formatDate(proposal.createdAt)}</span>
                                                            <span>⏱ {proposal.days} days</span>
                                                        </div>
                                                    </div>

                                                    {/* Bid + Actions */}
                                                    <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 shrink-0">
                                                        <div className="text-right">
                                                            <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Bid</div>
                                                            <div className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                                                ${proposal.budget?.toLocaleString()}
                                                            </div>
                                                        </div>

                                                        {/* Accept / Reject buttons */}
                                                        {proposal.status === "pending" && (
                                                            <ProposalRowActions
                                                                proposalId={proposal._id.toString()}
                                                                taskAccepted={taskAccepted}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProposalsPage;