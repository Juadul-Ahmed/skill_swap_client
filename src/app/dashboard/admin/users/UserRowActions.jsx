"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserRowActions({ userId, isBanned }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const handleToggle = async () => {
        setLoading(true);
        try {
            const token = session?.session?.token;

            const res = await fetch(`${baseUrl}/api/admin/users/${userId}/block`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { authorization: `Bearer ${token}` } : {}),
                },
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