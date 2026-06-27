"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { submitDeliverable } from "@/lib/actions/projects";
import toast from "react-hot-toast";

export default function DeliverableModal({ taskId, taskTitle }) {
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!url.trim()) {
            setError("Deliverable URL is required");
            return;
        }
        if (!url.startsWith("http")) {
            setError("Please enter a valid URL starting with http");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            const res = await submitDeliverable(taskId, url.trim());
            if (res?.modifiedCount > 0) {
                toast.success("Deliverable submitted! Task marked as completed.");
                document.getElementById(`close-deliverable-${taskId}`)?.click();
                router.refresh();
            } else {
                toast.error("Failed to submit deliverable");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full text-white bg-[#141416]/90 border border-zinc-800/80 hover:bg-[#1c1c1f] focus:border-emerald-500/50 rounded-xl h-12 px-4 text-sm placeholder:text-zinc-600 outline-none transition-all duration-200 shadow-inner";

    return (
        <Modal>
            <Button
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 hover:brightness-110 transition-all duration-200 shadow-[0_4px_20px_rgba(52,211,153,0.1)] cursor-pointer h-11"
            >
                Submit Deliverable
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md bg-[#0E0E12] border border-zinc-800/80">
                        <Modal.CloseTrigger id={`close-deliverable-${taskId}`} />

                        <Modal.Header>
                            <Modal.Heading className="text-white font-black">Submit Deliverable</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-zinc-400">
                                Paste your deliverable link below. This will mark <strong className="text-white">{taskTitle}</strong> as completed.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <div className="flex flex-col gap-2">
                                <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">
                                    Deliverable URL
                                </Label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="https://github.com/your-repo or https://docs.google.com/..."
                                    className={inputClass}
                                />
                                {error && (
                                    <span className="text-xs text-red-400 font-medium">{error}</span>
                                )}
                                <p className="text-[10px] text-zinc-600 mt-1">
                                    Accepted: GitHub, Google Docs, Figma, Notion, or any public URL
                                </p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary" className="rounded-xl">
                                Cancel
                            </Button>
                            <Button
                                onPress={handleSubmit}
                                isDisabled={isSubmitting}
                                className="bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black rounded-xl px-5 text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-200 cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "Mark as Completed"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}