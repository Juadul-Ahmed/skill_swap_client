"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
  RadioGroup,
  Radio,
  Description,
} from "@heroui/react";

import {
  At,
  Eye,
  EyeSlash,
  Person,
  Persons,
  Picture,
  ShieldKeyhole,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role,
        image: image || undefined,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
      } else {
        setName("");
        setEmail("");
        setImage("");
        setPassword("");
        setRole("freelancer");

        if (role === "freelancer") {
          router.push("/dashboard/freelancer/profile");
        } else if (role === "client") {
          router.push("/dashboard/client/profile");
        } else {
          router.push("/dashboard/admin");
        }
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
            <Link
              href="/"
              className="inline-flex items-center gap-3 justify-center lg:justify-start group mb-2"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <span className="text-md font-black text-black tracking-tighter">
                  S
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Skill
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Swap
                </span>
              </span>
            </Link>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Join the engine fueling{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                micro-task mastery.
              </span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Create your unified account to tap into a high-performance
              network. Instantly coordinate secure contract deliverables, lock
              down escrow configurations, and clear milestones.
            </p>
          </div>

          {/* Feature Lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Escrow Protections
              </h4>
              <p className="text-xs text-zinc-400">
                Funds stay completely safe until your milestones evaluate
                perfectly.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                0% Built-in Risk
              </h4>
              <p className="text-xs text-zinc-400">
                Source vetted developers or bid straight onto micro-tasks
                instantly.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIGNUP FORM */}
        <div className="lg:col-span-6 flex justify-center">
          <Card className="w-full max-w-md p-6 shadow-2xl border border-zinc-800 bg-[#0E0E14]">
            {/* Header Container */}
            <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-800 mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
                Create an account
              </h1>
              <p className="text-sm text-zinc-400">
                Fill in the fields below to get started
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSignup} className="flex flex-col gap-5">
              {/* Name Field */}
              <TextField
                isRequired
                name="name"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Name
                </Label>
                <InputGroup className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900 focus-within:border-emerald-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 transition-colors">
                  <Person
                    className="text-zinc-400 pointer-events-none"
                    size={16}
                  />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent py-2 text-sm outline-none border-none ring-0 focus:ring-0 text-zinc-100"
                  />
                </InputGroup>
              </TextField>

              {/* Email Field */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Email Address
                </Label>
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

              {/* Image URL Field */}
              <TextField name="image" className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Profile Image URL
                </Label>
                <InputGroup className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900 focus-within:border-emerald-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 transition-colors">
                  <Picture
                    className="text-zinc-400 pointer-events-none"
                    size={16}
                  />
                  <Input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-transparent py-2 text-sm outline-none border-none ring-0 focus:ring-0 text-zinc-100"
                  />
                </InputGroup>
              </TextField>

              {/* Password Field */}
              <TextField
                isRequired
                name="password"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Password
                </Label>
                <InputGroup className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900 focus-within:border-emerald-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 transition-colors">
                  <ShieldKeyhole
                    className="text-zinc-400 pointer-events-none"
                    size={16}
                  />
                  <Input
                    type={isVisible ? "text" : "password"}
                    placeholder="Choose a password"
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

              {/* Account Role Selection Block */}
              <div className="flex flex-col gap-2 border border-zinc-800 rounded-xl p-4 bg-zinc-900/40">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Persons className="text-zinc-400" size={16} />
                    <span className="text-sm font-medium">
                      Select Marketplace Role
                    </span>
                  </div>
                  <RadioGroup
                    defaultValue="freelancer"
                    name="role"
                    orientation="horizontal"
                    onChange={(value) => setRole(value)}
                  >
                    <Radio value="freelancer">
                      <Radio.Content>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Freelancer
                      </Radio.Content>
                    </Radio>
                    <Radio value="client">
                      <Radio.Content>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Client
                      </Radio.Content>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>

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
                Sign Up
              </Button>

              {/* Navigation Option */}
              <div className="text-center pt-4 border-t border-zinc-800 mt-2 text-sm text-zinc-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium cursor-pointer text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Sign in instead
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
