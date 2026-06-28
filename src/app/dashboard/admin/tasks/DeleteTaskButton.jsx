"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function DeleteTaskButton({ taskId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!confirm("Delete this task? This cannot be undone.")) return;
    setLoading(true);

    try {
      const token = session?.session?.token;
      //  console.log("token:", token);

      const res = await fetch(`${baseUrl}/api/admin/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (data?.deletedCount > 0) {
        toast.success("Task deleted");
        router.refresh();
      } else {
        toast.error(data?.error || "Failed to delete task");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}