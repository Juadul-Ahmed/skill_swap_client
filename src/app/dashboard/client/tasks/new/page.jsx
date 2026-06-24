"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function PostTaskPage() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Client Assignment Validation Logic Check rules
        const newErrors = {};
        if (!data.taskTitle) newErrors.taskTitle = "Task title is required";
        if (!data.category) newErrors.category = "Please select a category";
        if (!data.description) newErrors.description = "Task description is required";
        if (!data.budget) newErrors.budget = "Budget configuration is required";
        if (!data.deadline) newErrors.deadline = "Deadline date is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        setErrors({});

       
        const payload = {
            taskTitle: data.taskTitle,
            category: data.category,
            description: data.description,
            budget: Number(data.budget),
            deadline: data.deadline,
            status: "open", 
            createdAt: new Date().toISOString()
        };

        // Mimic network request latency delay 
        await new Promise((resolve) => setTimeout(resolve, 1400));
        console.log("Database Payload Saved:", payload);
        setIsSubmitting(false);
        router.push("/dashboard/client");
    };

    // Premium styling variants matching dark cyberpunk dashboard design textures
    const textInputClass = "w-full text-white bg-[#141416]/90 border border-zinc-800/80 hover:bg-[#1c1c1f] focus:border-emerald-500/50 rounded-xl h-12 px-4 text-sm placeholder:text-zinc-600 outline-none transition-all duration-200 shadow-inner";
    const textAreaClass = "w-full text-white bg-[#141416]/90 border border-zinc-800/80 hover:bg-[#1c1c1f] focus:border-emerald-500/50 rounded-xl p-4 text-sm placeholder:text-zinc-600 outline-none transition-all duration-200 min-h-[120px] shadow-inner";
    const triggerClasses = "w-full flex items-center justify-between bg-[#141416]/90 border border-zinc-800/80 hover:bg-[#1c1c1f] h-12 rounded-xl px-4 text-white transition-all duration-200 text-sm outline-none data-[focused=true]:border-emerald-500/50 shadow-inner cursor-pointer";
    const popoverClasses = "bg-[#141416] border border-zinc-800/90 text-white rounded-xl shadow-2xl p-1.5 w-full absolute z-50 top-[calc(100%+6px)] left-0 backdrop-blur-md";
    const listItemClasses = "flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 cursor-pointer text-sm text-zinc-300 outline-none transition-colors duration-150 data-[focused=true]:bg-zinc-800";

    return (
        <div className="min-h-screen bg-[#070709] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
            
            {/* Background Ambient Cyberpunk Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-2xl w-full bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-xl">

                {/* Header Context Banner Block */}
                <div className="border-b border-zinc-900 pb-6 mb-8 relative">
                    <div className="absolute top-0 right-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        Engine Node Online
                    </div>
                    
                    <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                        Post a Task
                    </h1>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1.5 font-medium">
                        Publish an active job block specification into the client deployment stream pipelines.
                    </p>
                </div>

                {/* Core Execution Form Component Engine */}
                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                    <Fieldset className="space-y-6 w-full">
                        
                        {/* TASK TITLE */}
                        <TextField name="taskTitle" isInvalid={!!errors.taskTitle} className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Task Title</Label>
                            <Input placeholder="e.g., Build Next.js Landing Page Component" className={textInputClass} />
                            {errors.taskTitle && <FieldError className="text-xs text-red-400 font-medium mt-1">{errors.taskTitle}</FieldError>}
                        </TextField>

                        {/* CATEGORY SELECTOR - Anchored with relative contextual scoping */}
                        <div className="flex flex-col gap-2 w-full relative">
                            <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Category</Label>
                            <Select name="category" isInvalid={!!errors.category} className="w-full relative">
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value placeholder="Select relevant sector" className="text-white placeholder:text-zinc-600" />
                                    <Select.Indicator className="text-zinc-500 text-xs transition-transform" />
                                </Select.Trigger>
                                
                                {errors.category && <span className="text-xs text-red-400 font-medium mt-1 block">{errors.category}</span>}
                                
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none py-1">
                                        <ListBox.Item id="web-development" className={listItemClasses} textValue="Web Development">Web Development</ListBox.Item>
                                        <ListBox.Item id="ui-ux-design" className={listItemClasses} textValue="UI/UX Design">UI/UX Design</ListBox.Item>
                                        <ListBox.Item id="mobile-apps" className={listItemClasses} textValue="Mobile Applications">Mobile Applications</ListBox.Item>
                                        <ListBox.Item id="devops" className={listItemClasses} textValue="DevOps & Cloud">DevOps & Cloud</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* BUDGET & DEADLINE CONTAINER ROW */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* BUDGET */}
                            <TextField name="budget" isInvalid={!!errors.budget} className="flex flex-col gap-2 w-full">
                                <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Budget (USD)</Label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 text-zinc-500 text-sm font-semibold pointer-events-none">$</span>
                                    <Input placeholder="500" type="number" min="1" className={`${textInputClass} pl-8`} />
                                </div>
                                {errors.budget && <FieldError className="text-xs text-red-400 font-medium mt-1">{errors.budget}</FieldError>}
                            </TextField>

                            {/* DEADLINE DATE */}
                            <TextField name="deadline" isInvalid={!!errors.deadline} className="flex flex-col gap-2 w-full">
                                <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Deadline Date</Label>
                                <Input type="date" className={`${textInputClass} [color-scheme:dark] cursor-pointer`} />
                                {errors.deadline && <FieldError className="text-xs text-red-400 font-medium mt-1">{errors.deadline}</FieldError>}
                            </TextField>
                        </div>

                        {/* TASK DESCRIPTION */}
                        <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Description</Label>
                            <TextArea
                                placeholder="Describe the milestones, requirements, and deliverables expected from freelancers..."
                                className={textAreaClass}
                            />
                            {errors.description && <FieldError className="text-xs text-red-400 font-medium mt-1">{errors.description}</FieldError>}
                        </TextField>

                    </Fieldset>

                    {/* FORM ACTION CONTROLS FOOTER BAR */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-zinc-900/60 w-full">
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-transparent border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-900/50 hover:border-zinc-700/80 rounded-xl px-6 font-medium h-12 text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isDisabled={isSubmitting}
                            className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-bold hover:brightness-110 disabled:opacity-50 disabled:pointer-events-none rounded-xl px-7 h-12 text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_25px_rgba(52,211,153,0.15)] flex items-center justify-center cursor-pointer"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    <span>Syncing...</span>
                                </div>
                            ) : (
                                "Deploy Task Block"
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}