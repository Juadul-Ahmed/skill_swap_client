"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { rejectProposal } from "@/lib/actions/proposals";
import toast from "react-hot-toast";

export default function ProposalRowActions({ proposalId, taskAccepted, taskId, taskTitle, budget }) {
    console.log("Props check:", { taskId, proposalId, taskTitle, budget });
    const router = useRouter();
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const handleAccept = async () => {
        setIsAccepting(true);
        try {
            const res = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskId, proposalId, taskTitle, budget })
            });
            const { url } = await res.json();
            window.location.href = url;
        } catch (err) {
            toast.error("Failed to initiate payment");
        } finally {
            setIsAccepting(false);
        }
    };

    const handleReject = async () => {
        setIsRejecting(true);
        try {
            const res = await rejectProposal(proposalId);
            if (res?.modifiedCount > 0) {
                toast.success("Proposal rejected");
                router.refresh();
            } else {
                toast.error("Failed to reject proposal");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <div className="flex items-center gap-2">

            {!taskAccepted && (
                <AlertDialog>
                    <Button
                        variant="secondary"
                        className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer h-9"
                    >
                        Accept
                    </Button>
                    <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-[400px]">
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                    <AlertDialog.Icon status="success" />
                                    <AlertDialog.Heading>Accept this proposal?</AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        Accepting this proposal will mark the task as <strong className="text-white">In Progress</strong> and automatically reject all other pending proposals for this task.
                                    </p>
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                        Cancel
                                    </Button>
                                    <Button
                                        slot="close"
                                        onPress={handleAccept}
                                        isDisabled={isAccepting}
                                        className="bg-emerald-500 text-black font-black rounded-xl px-4 py-2 text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all duration-200 cursor-pointer"
                                    >
                                        {isAccepting ? "Accepting..." : "Yes, Accept"}
                                    </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>
            )}

            <AlertDialog>
                <Button
                    variant="secondary"
                    className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer h-9"
                >
                    Reject
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Reject this proposal?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    This will mark the proposal as <strong className="text-white">Rejected</strong>. The freelancer will be notified. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button
                                    slot="close"
                                    onPress={handleReject}
                                    isDisabled={isRejecting}
                                    className="bg-red-500 text-white font-black rounded-xl px-4 py-2 text-xs uppercase tracking-wider hover:bg-red-400 transition-all duration-200 cursor-pointer"
                                >
                                    {isRejecting ? "Rejecting..." : "Yes, Reject"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

        </div>
    );
}