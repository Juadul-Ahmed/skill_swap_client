import { requireRole } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";

const statusStyles = {
    completed: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    "in-progress": { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    unknown: { bg: "bg-zinc-500/10", border: "border-zinc-500/20", text: "text-zinc-400" },
};

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const TransactionsPage = async () => {
    await requireRole("admin");
    const transactions = await serverFetch("/api/admin/transactions") || [];
    const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

    return (
        <div className="min-h-screen bg-[#070709] text-white px-4 sm:px-6 lg:px-8 py-12">
            <div className="fixed bottom-1/4 left-0 w-[400px] h-[300px] bg-violet-500/4 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        {transactions.length} Transactions
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2">
                        Transactions History
                    </h1>
                   
                </div>

                {/* Total Revenue Banner */}
                <div className="relative p-6 rounded-2xl bg-[#0E0E12]/90 border border-zinc-900/80 overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
                    <div className="relative z-10">
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Platform Revenue</div>
                        <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            ${totalRevenue.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-12 px-6 py-3 border-b border-zinc-900/80 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <div className="col-span-3">Client Email</div>
                        <div className="col-span-3">Freelancer Email</div>
                        <div className="col-span-2">Payout</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-2">Status</div>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="py-20 text-center text-zinc-500 text-sm">No transactions yet</div>
                    ) : (
                        <>
                            {transactions.map((tx) => {
                                const statusStyle = statusStyles[tx.status] || statusStyles.unknown;
                                return (
                                    <div key={tx._id} className="grid grid-cols-12 px-6 py-4 border-b border-zinc-900/40 hover:bg-white/[0.02] transition-colors items-center">
                                        <div className="col-span-3 text-[11px] text-zinc-300 font-medium truncate pr-2">
                                            {tx.clientEmail}
                                        </div>
                                        <div className="col-span-3 text-[11px] text-zinc-300 font-medium truncate pr-2">
                                            {tx.freelancerEmail}
                                        </div>
                                        <div className="col-span-2 text-sm font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                            ${tx.amount?.toLocaleString()}
                                        </div>
                                        <div className="col-span-2 text-[11px] text-zinc-500">
                                            {formatDate(tx.date)}
                                        </div>
                                        <div className="col-span-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
                                                {tx.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="grid grid-cols-12 px-6 py-4 bg-zinc-900/30">
                                <div className="col-span-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                    Total ({transactions.length} payments)
                                </div>
                                <div className="col-span-2 text-sm font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    ${totalRevenue.toLocaleString()}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;