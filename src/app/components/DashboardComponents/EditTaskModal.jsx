"use client";

import { Pencil } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // swap for your actual toast import if different
import { updateTask } from "@/lib/actions/task";

const CATEGORY_OPTIONS = [
  { id: "web-development", label: "Web Development" },
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "mobile-apps", label: "Mobile Applications" },
  { id: "devops", label: "DevOps & Cloud" },
];

export function EditTaskModal({ task }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const taskId = task._id?.$oid || task._id;
  const isOpen = task.status?.toLowerCase() === "open";

  const deadlineValue = task.deadline
    ? new Date(task.deadline).toISOString().split("T")[0]
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const taskTitle = formData.get("taskTitle");
    const category = formData.get("category");
    const description = formData.get("description");
    const budget = formData.get("budget");
    const deadline = formData.get("deadline");

    const newErrors = {};
    if (!taskTitle) newErrors.taskTitle = "Task title is required";
    if (!category) newErrors.category = "Category is required";
    if (!description) newErrors.description = "Description is required";
    if (!budget) newErrors.budget = "Budget is required";
    if (!deadline) newErrors.deadline = "Deadline is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateTask(taskId, {
        taskTitle,
        category,
        description,
        budget: Number(budget),
        deadline,
      });

      if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
        toast.success("Task updated successfully");
        setErrors({});
        router.refresh();
        // close the modal programmatically since this is async, unlike the original template
        document.getElementById(`edit-close-trigger-${taskId}`)?.click();
      } else {
        toast.error(result?.error || "Failed to update task");
      }
    } catch (err) {
      console.error("Edit task error:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        aria-label="Edit job"
        // ✅ Added: bg color shifts, border changes, and group target setup
        className="group bg-transparent border border-transparent hover:bg-emerald-500/10 hover:border-emerald-500/20 rounded-xl transition-all duration-200 cursor-pointer"
      >
        <Pencil className="text-zinc-400 w-4 h-4 group-hover:text-emerald-400 transition-colors duration-200" />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger id={`edit-close-trigger-${taskId}`} />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Task</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update your task details below. Only open tasks can be edited.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  id={`edit-task-form-${taskId}`}
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    className="w-full"
                    name="taskTitle"
                    type="text"
                    variant="secondary"
                    defaultValue={task.taskTitle}
                    isInvalid={!!errors.taskTitle}
                  >
                    <Label>Task Title</Label>
                    <Input placeholder="Enter task title" />
                  </TextField>
                  {errors.taskTitle && (
                    <p className="text-red-500 text-xs">{errors.taskTitle}</p>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <Label>Category</Label>
                    <select
                      name="category"
                      defaultValue={task.category}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs">{errors.category}</p>
                    )}
                  </div>

                  <TextField
                    className="w-full"
                    name="budget"
                    type="number"
                    variant="secondary"
                    defaultValue={task.budget}
                    isInvalid={!!errors.budget}
                  >
                    <Label>Budget (USD)</Label>
                    <Input placeholder="Enter budget" />
                  </TextField>
                  {errors.budget && (
                    <p className="text-red-500 text-xs">{errors.budget}</p>
                  )}

                  <TextField
                    className="w-full"
                    name="deadline"
                    type="date"
                    variant="secondary"
                    defaultValue={deadlineValue}
                    isInvalid={!!errors.deadline}
                  >
                    <Label>Deadline</Label>
                    <Input />
                  </TextField>
                  {errors.deadline && (
                    <p className="text-red-500 text-xs">{errors.deadline}</p>
                  )}

                  <TextField
                    className="w-full"
                    name="description"
                    variant="secondary"
                    defaultValue={task.description}
                    isInvalid={!!errors.description}
                  >
                    <Label>Description</Label>
                    <Input placeholder="Enter description" />
                  </TextField>
                  {errors.description && (
                    <p className="text-red-500 text-xs">{errors.description}</p>
                  )}
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                form={`edit-task-form-${taskId}`}
                isDisabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
