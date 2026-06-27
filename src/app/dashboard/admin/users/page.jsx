import { requireRole } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";
import UserRowActions from "./UserRowActions";

const roleColors = {
    client: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    freelancer: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    admin: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400" },
};

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric",
    });
};

const ManageUsersPage = async () => {
    await requireRole("admin");
    const users = await serverFetch("/api/admin/users") || [];

    return (
        <div className="min-h-screen bg-[#070709] text-white px-4 sm:px-6 lg:px-8 py-12">
            <div className="fixed top-0 left-1/4 w-[500px] h-[400px] bg-violet-500/4 blur-[180px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 uppercase tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        {users.length} Registered Accounts
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2">
                        Manage Users
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-xl">
                        View all platform accounts. Block or unblock users to control access.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Clients", value: users.filter(u => u.role === "client").length, color: "text-blue-400" },
                        { label: "Freelancers", value: users.filter(u => u.role === "freelancer").length, color: "text-emerald-400" },
                        { label: "Blocked", value: users.filter(u => u.banned).length, color: "text-red-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-2xl p-5">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</div>
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-12 px-6 py-3 border-b border-zinc-900/80 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <div className="col-span-4">Name / Email</div>
                        <div className="col-span-2">Role</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Joined</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {users.length === 0 ? (
                        <div className="py-20 text-center text-zinc-500 text-sm">No users found</div>
                    ) : (
                        users.map((user) => {
                            const roleStyle = roleColors[user.role] || roleColors.client;
                            return (
                                <div key={user._id} className="grid grid-cols-12 px-6 py-4 border-b border-zinc-900/40 hover:bg-white/[0.02] transition-colors items-center">
                                    <div className="col-span-4">
                                        <div className="text-sm font-black text-white">{user.name}</div>
                                        <div className="text-[11px] text-zinc-500">{user.email}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${roleStyle.bg} ${roleStyle.border} ${roleStyle.text}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        {user.banned ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border bg-red-500/10 border-red-500/20 text-red-400">
                                                Blocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-[11px] text-zinc-500">
                                        {formatDate(user.createdAt)}
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <UserRowActions userId={user._id} isBanned={user.banned} />
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

export default ManageUsersPage;