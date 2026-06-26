"use client";

import React, { useState } from "react";
import { Button, Form, Fieldset, TextField, TextArea, Label, Input, FieldError } from "@heroui/react";
import { createProposal } from "@/lib/actions/propsal";
import toast from "react-hot-toast";


export default function ProposalForm({ taskId, user }) {

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // If not logged in
    if (!user) {
        return (
            <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 backdrop-blur-xl text-center">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h3 className="text-sm font-black text-white mb-2">Sign in to Apply</h3>
                <p className="text-zinc-500 text-xs mb-5">You need to be logged in as a freelancer to submit a proposal.</p>
                <a
                    href="/login"
                    className="inline-block bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black text-xs uppercase tracking-wider rounded-xl px-6 py-3 hover:brightness-110 transition-all duration-200"
                >
                    Sign In
                </a>
            </div>
        );
    }

    // If already submitted
    if (submitted) {
        return (
            <div className="bg-[#0E0E12]/90 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-xl text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-sm font-black text-white mb-2">Proposal Submitted!</h3>
                <p className="text-zinc-500 text-xs">Your proposal has been sent to the client. You'll be notified when they respond.</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.budget) newErrors.budget = "Proposed budget is required";
        if (!data.days) newErrors.days = "Estimated days is required";
        if (!data.message) newErrors.message = "Cover note is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        setErrors({});

        const payload = {
            taskId,
            freelancerEmail: user.email,
            budget: Number(data.budget),
            days: Number(data.days),
            message: data.message,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        const res = await createProposal(payload)
        if(res?.insertedId){
            toast.success('Proposal submitted successfully');
            setSubmitted(true)
        }else{
            toast.error("Failed to submit proposal")
        }
    };

    const inputClass = "w-full text-white bg-[#141416]/90 border border-zinc-800/80 hover:bg-[#1c1c1f] focus:border-emerald-500/50 rounded-xl h-12 px-4 text-sm placeholder:text-zinc-600 outline-none transition-all duration-200 shadow-inner";
    const textAreaClass = "w-full text-white bg-[#141416]/90 border border-zinc-800/80 hover:bg-[#1c1c1f] focus:border-emerald-500/50 rounded-xl p-4 text-sm placeholder:text-zinc-600 outline-none transition-all duration-200 min-h-[120px] shadow-inner";

    return (
        <div className="bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 backdrop-blur-xl">

            {/* Header */}
            <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Submit a Proposal
                </div>
                <h2 className="text-lg font-black text-white">Apply for this Task</h2>
                <p className="text-zinc-500 text-xs mt-1">Fill in your bid details and a short cover note to apply.</p>
            </div>

            <Form onSubmit={handleSubmit} className="space-y-5" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-5 w-full">

                    {/* Budget + Days Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField name="budget" isInvalid={!!errors.budget} className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Proposed Budget (USD)</Label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-zinc-500 text-sm font-semibold pointer-events-none">$</span>
                                <Input type="number" min="1" placeholder="250" className={`${inputClass} pl-8`} />
                            </div>
                            {errors.budget && <FieldError className="text-xs text-red-400 font-medium">{errors.budget}</FieldError>}
                        </TextField>

                        <TextField name="days" isInvalid={!!errors.days} className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Estimated Days</Label>
                            <Input type="number" min="1" placeholder="7" className={inputClass} />
                            {errors.days && <FieldError className="text-xs text-red-400 font-medium">{errors.days}</FieldError>}
                        </TextField>
                    </div>

                    {/* Cover Note */}
                    <TextField name="message" isInvalid={!!errors.message} className="flex flex-col gap-2 w-full">
                        <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Cover Note</Label>
                        <TextArea
                            placeholder="Describe your approach, relevant experience, and why you're the best fit for this task..."
                            className={textAreaClass}
                        />
                        {errors.message && <FieldError className="text-xs text-red-400 font-medium">{errors.message}</FieldError>}
                    </TextField>

                </Fieldset>

                {/* Freelancer email display */}
                <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Applying as</span>
                    <span className="text-xs text-zinc-300 font-semibold">{user.email}</span>
                </div>

                <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 hover:brightness-110 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shadow-[0_4px_25px_rgba(52,211,153,0.15)] flex items-center justify-center gap-2 cursor-pointer h-12"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Proposal"
                    )}
                </Button>
            </Form>
        </div>
    );
}