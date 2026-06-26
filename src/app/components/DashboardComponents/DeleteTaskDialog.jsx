"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // swap for your actual toast import if different
import { deleteTask } from "@/lib/actions/task";

export function DeleteTaskDialog({ task }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const taskId = task._id?.$oid || task._id;
  const hasAcceptedProposal = task.hasAcceptedProposal === true; 

  const handleDelete = async () => {
    setIsDeleting(true);
   
      const result = await deleteTask(taskId);

      if (result?.deletedCount > 0) {
        toast.success("Task deleted successfully");
        router.refresh();
      } else {
        toast.error(result?.error || "Failed to delete task");
      }
   
      setIsDeleting(false);
    
  };

  return (
    <AlertDialog>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        aria-label="Delete job"
        className="group bg-transparent border border-transparent hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all duration-200 cursor-pointer"
      >
        <TrashBin className="text-zinc-500 w-4 h-4 group-hover:text-red-400 transition-colors duration-200" />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete task permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{task.taskTitle || "this task"}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                isDisabled={isDeleting}
                onPress={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete Task"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
