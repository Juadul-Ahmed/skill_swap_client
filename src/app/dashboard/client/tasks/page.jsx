import { getClientTasks } from "@/lib/api/tasks";
import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Pencil, TrashBin } from "@gravity-ui/icons";
import { getLoggedInClientProfile } from "@/lib/api/clients";
import { EditTaskModal } from "@/app/components/DashboardComponents/EditTaskModal";
import { DeleteTaskDialog } from "@/app/components/DashboardComponents/DeleteTaskDialog";
import Link from "next/link";

const ClientTasks = async () => {
  const task = await getLoggedInClientProfile();

  if (!task) {
    return (
      <div className="bg-black border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="text-emerald-500 text-xs font-mono uppercase tracking-widest mb-3">
          // PROFILE_REQUIRED
        </div>
        <h2 className="text-white text-lg font-semibold mb-2">
          Set up your profile to manage tasks
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mb-6">
          Your client profile hasn't been created yet. Set it up to start posting and tracking tasks.
        </p>
        
         <Link
          href="/dashboard/client/profile"
          className="inline-flex items-center gap-2 bg-emerald-500 text-black font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-emerald-400 transition-colors"
        >
          Set up profile <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  const tasks = await getClientTasks(task.clientId);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "success";
      case "closed":
        return "danger";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div className="absolute -left-20 -bottom-20 size-48 rounded-full bg-cyan-500/5 blur-[60px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Task Pipeline Active
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase">
            Manage All Tasks
          </h2>

          <p className="text-xs md:text-sm text-zinc-400 font-medium max-w-xl">
            Monitor your live task postings, tracking runtime specifications,
            active deployments, and candidate pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center bg-[#141416]/90 border border-zinc-800/80 rounded-2xl p-3 shadow-inner">
          <div className="px-3 border-r border-zinc-800/80 text-center">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Total
            </div>
            <div className="text-lg font-black text-white">
              {tasks?.length || 0}
            </div>
          </div>
          <div className="px-3 text-center">
            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
              Open
            </div>
            <div className="text-lg font-black text-emerald-400">
              {tasks?.filter((t) => t.status?.toLowerCase() === "open").length || 0}
            </div>
          </div>
        </div>
      </div>

      <Table aria-label="Company jobs management table" className="text-white">
        <Table.ResizableContainer>
          <Table.Content className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr" id="taskTitle" minWidth={200}>
                Task Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="category" minWidth={150}>
                Category
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="budget" minWidth={120}>
                Budget (USD)
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                Deadline
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="actions" minWidth={150}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No jobs found for this company."}>
              {tasks &&
                tasks.map((task) => (
                  <Table.Row key={task._id?.$oid || task._id}>
                    <Table.Cell>
                      <div className="font-medium text-zinc-100">
                        {task.taskTitle || "Untitled Task"}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm capitalize font-medium text-zinc-300">
                        {task.category ? task.category.replace("-", " ") : "Unassigned"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm font-semibold text-emerald-400">
                        {task.budget ? `$${task.budget.toLocaleString()}` : "$0"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-zinc-400">
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "No Date"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={getStatusColor(task.status)}
                        size="sm"
                        variant="flat"
                        className="capitalize font-semibold"
                      >
                        {task.status || "Unknown"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit Job">
                          <EditTaskModal task={task} />
                        </Tooltip>
                        <Tooltip content="Delete Job">
                          <DeleteTaskDialog task={task} />
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default ClientTasks;