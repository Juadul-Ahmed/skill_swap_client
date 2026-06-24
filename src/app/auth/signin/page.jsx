"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, RadioGroup, Radio } from "@heroui/react";

import { At, Eye, EyeSlash, Person, Persons, Picture, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
                
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setImage("");
                setPassword("");
                setRole("client");
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0B0B0F] text-white flex items-center justify-center relative overflow-hidden px-4 py-12 lg:p-8">
            
            {/* Background Mesh Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px]" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px]" />
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* LEFT COLUMN: MEANINGFUL VALUE PROPOSITION */}
                <div className="lg:col-span-6 space-y-8 flex flex-col justify-center text-center lg:text-left">
    <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-3 justify-center lg:justify-start group mb-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <span className="text-md font-black text-black tracking-tighter">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
                Skill<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Swap</span>
            </span>
        </Link>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
               Welcome back.
            </span>
        </h2>
        
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Sign in to resume tracking your micro-tasks, release ongoing milestones, and instantly connect with your workspace contracts. Your secure dashboard is ready.
        </p>
    </div>

    {/* Feature Lists / Platform Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Active Workspace</h4>
            <p className="text-xs text-zinc-400">Monitor active progress pipelines and pending item reviews immediately.</p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Instant Verification</h4>
            <p className="text-xs text-zinc-400">Your secure cryptographic sessions protect authorization endpoints natively.</p>
        </div>
    </div>
</div>

                {/* RIGHT COLUMN: SIGNUP FORM */}
                <div className="lg:col-span-6 flex justify-center">
                    <Card className="w-full max-w-md p-6 shadow-2xl border border-zinc-800 bg-[#0E0E14]">

                        {/* Header Container */}
                        <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-800 mb-6 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Create an account</h1>
                            <p className="text-sm text-zinc-400">Fill in the fields below to get started</p>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSignup} className="flex flex-col gap-5">

                           

                            {/* Email Field */}
                            <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                                <Label className="text-sm font-medium text-zinc-300">Email Address</Label>
                                <InputGroup className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900 focus-within:border-emerald-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 transition-colors">
                                    <At className="text-zinc-400 pointer-events-none" size={16} />
                                    <Input
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent py-2 text-sm outline-none border-none ring-0 focus:ring-0 text-zinc-100"
                                    />
                                </InputGroup>
                            </TextField>

                           

                            {/* Password Field */}
                            <TextField isRequired name="password" className="flex flex-col gap-1.5">
                                <Label className="text-sm font-medium text-zinc-300">Password</Label>
                                <InputGroup className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900 focus-within:border-emerald-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 transition-colors">
                                    <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                                    <Input
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Enter your valid password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent py-2 text-sm outline-none border-none ring-0 focus:ring-0 text-zinc-100"
                                    />
                                    <button
                                        className="focus:outline-none text-zinc-400 hover:text-zinc-200 transition"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                                    </button>
                                </InputGroup>
                            </TextField>

                           

                            {/* Dynamic Status Badges */}
                            {error && (
                                <div className="p-3.5 text-xs font-medium rounded-xl bg-red-950/50 text-red-400 border border-red-900">
                                    <span className="font-semibold">Error:</span> {error}
                                </div>
                            )}

                            {success && (
                                <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-900">
                                    <span className="font-semibold">Success:</span> {success}
                                </div>
                            )}

                            {/* Action Button */}
                            <Button
                                type="submit"
                                className="w-full font-semibold rounded-xl text-sm h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-md shadow-emerald-500/10"
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            >
                               Log in
                            </Button>

                            {/* Navigation Option */}
                            <div className="text-center pt-4 border-t border-zinc-800 mt-2 text-sm text-zinc-400">
                                Don't have an account?{" "}
                                <Link href="/auth/signup" className="font-medium cursor-pointer text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                                    Create an account
                                </Link>
                            </div>

                        </form>
                    </Card>
                </div>

            </div>
        </div>
    );
}