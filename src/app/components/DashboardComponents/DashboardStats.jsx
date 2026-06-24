import React, { Activity } from "react";
import StatCard from "./StatCard"; 
import { CircleDollar, Layers, Shield,   } from "@gravity-ui/icons";


export default function DashboardStats({ statsData }) {

  const stats = statsData || {
    totalTasks: 0,
    openTasks: 0,
    inProgressTasks: 0,
    totalSpent: 0
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      
 
      <StatCard
        title="Total Tasks"
        value={stats.totalTasks}
        subtext="All drafts & active postings"
        icon={<Layers size={20} />}
      />


      <StatCard
        title="Open Tasks"
        value={stats.openTasks}
        subtext="Awaiting freelancer proposals"
        icon={<Activity size={20} />}
      />


      <StatCard
        title="Tasks In Progress"
        value={stats.inProgressTasks}
        subtext="Active development milestones"
        icon={<Shield size={20} />}
      />


      <StatCard
        title="Total Spent (USD)"
        value={`$${stats.totalSpent.toLocaleString()}`}
        subtext="Processed via secure escrow"
        icon={<CircleDollar size={20} />}
      />
      
    </div>
  );
}