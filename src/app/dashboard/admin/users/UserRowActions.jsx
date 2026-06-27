"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const roleColors = {
    client: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    freelancer: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    admin: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400" },
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserRowActions({ userId, isBanned }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/admin/users/${userId}/block`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ banned: !isBanned }),
            });
            const data = await res.json();
            if (data?.modifiedCount > 0) {
                toast.success(isBanned ? "User unblocked" : "User blocked");
                router.refresh();
            } else {
                toast.error("Failed to update user");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                isBanned
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                    : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
            }`}
        >
            {loading ? "..." : isBanned ? "Unblock" : "Block"}
        </button>
    );
}