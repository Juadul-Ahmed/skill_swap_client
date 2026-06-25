"use client";

import { Magnifier } from "@gravity-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";


const categories = [
  { id: "", label: "All Tasks" },
  { id: "web-development", label: "Web Dev" },
  { id: "ui-ux-design", label: "UI/UX" },
  { id: "mobile-apps", label: "Mobile" },
  { id: "devops", label: "DevOps & Cloud" },
];

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const updateFilters = (category, searchTerm) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (searchTerm) params.set("search", searchTerm);

    router.push(`/tasks?${params.toString()}`);
  };

  return (
    <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 mb-8">
      {/* Search */}
      <div className="relative mb-6">
        <Magnifier
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          defaultValue={search}
          placeholder="Search tasks..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilters(selectedCategory, e.target.value);
            }
          }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilters(cat.id, "")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              selectedCategory === cat.id
                ? "bg-emerald-500 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}