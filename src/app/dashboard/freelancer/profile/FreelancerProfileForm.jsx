'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PulseLoader } from 'react-spinners';
import {
    Form,
    Fieldset,
    TextField,
    TextArea,
    Label,
    Input,
    FieldError,
    Button
} from '@heroui/react';
import { ArrowRight, ArrowUpToLine, Envelope, CircleDollar, Pencil, Person, Smartphone, Layers } from '@gravity-ui/icons';
import { createFreelancerProfile, updateFreelancerProfile } from '@/lib/actions/freelancers';
import toast from 'react-hot-toast';

const textInputClass = "w-full bg-black border border-zinc-800 text-white rounded-none px-3 py-3 outline-none placeholder:text-zinc-700 focus:border-emerald-500 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all duration-150 uppercase tracking-wide text-xs";
const textAreaClass = "w-full bg-black border border-zinc-800 text-white rounded-none p-3.5 outline-none placeholder:text-zinc-700 focus:border-emerald-500 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all duration-150 resize-none uppercase tracking-wide text-xs";

const SKILL_OPTIONS = [
    { id: "web-development", label: "Web Development" },
    { id: "mobile-apps", label: "Mobile Apps" },
    { id: "ui-ux-design", label: "UI/UX Design" },
    { id: "devops", label: "DevOps & Cloud" },
    { id: "writing-content", label: "Writing & Content" },
    { id: "graphic-design", label: "Graphic Design" },
];

// Mirrors LeftTelemetryPanel from ClientProfileForm, moved outside to prevent remounting
const LeftTelemetryPanel = ({ profile }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between h-full relative overflow-hidden select-none min-h-[500px] lg:min-h-full"
    >
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500" />

        <motion.div
            className="absolute left-0 right-0 h-[1px] bg-emerald-500/10 shadow-[0_0_8px_#10b981] pointer-events-none"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="space-y-8">
            <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest block">// FREELANCER_NODE_v4.2</span>
                <h2 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-wide leading-tight">
                    Your Skills, Deployed
                </h2>
            </div>

            <div className="space-y-4 font-mono text-xs">
                <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 bg-black/40 border border-zinc-900 p-3"
                >
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                        <span className="text-white font-bold block uppercase tracking-wide">Direct Client Access</span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">Browse open tasks and submit proposals in real time.</span>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 bg-black/40 border border-zinc-900 p-3"
                >
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                        <span className="text-white font-bold block uppercase tracking-wide">Secure Escrow Payments</span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">Get paid through verified checkout once tasks complete.</span>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 bg-black/40 border border-zinc-900 p-3"
                >
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                        <span className="text-white font-bold block uppercase tracking-wide">Verified Skill Profile</span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">Show clients exactly what you specialize in.</span>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="pt-6 border-t border-zinc-900/80 mt-6">
            <div className="bg-black border border-zinc-900 p-4 rounded-none font-mono flex items-center justify-between">
                <div>
                    <span className="text-[9px] text-zinc-600 block font-bold uppercase tracking-widest">ACTIVE OPERATOR</span>
                    <span className="text-xs text-zinc-400 block truncate max-w-[180px]">
                        {profile?.name || "GUEST_USER_NODE"}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] text-zinc-600 block font-bold uppercase tracking-widest">SYSTEM_STATUS</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 shadow-[0_0_4px_#10b981]" /> SYNCED
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
);

// Mirrors MasterDashboardContainer from ClientProfileForm, moved outside to prevent remounting
const MasterDashboardContainer = ({ profile, children }) => (
    <div className="max-w-6xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
        <div className="lg:col-span-5 h-full">
            <LeftTelemetryPanel profile={profile} />
        </div>
        <div className="lg:col-span-7 w-full">
            {children}
        </div>
    </div>
);

export default function FreelancerProfileForm({ user, freelancerProfile }) {

    const [profile, setProfile] = useState(freelancerProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState(freelancerProfile?.skills || []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
                ...prev,
                image: "File size exceeds 5MB limit",
            }));
            return;
        }

        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

        if (!IMGBB_API_KEY) {
            setErrors((prev) => ({
                ...prev,
                image: "ImgBB API key is missing",
            }));
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data?.error?.message || "Failed to upload image"
                );
            }

            setImageUrl(data.data.url);

            setErrors((prev) => ({
                ...prev,
                image: null,
            }));
        } catch (error) {
            console.error("Upload Error:", error);

            setErrors((prev) => ({
                ...prev,
                image: error.message || "Image upload failed",
            }));
        } finally {
            setIsUploading(false);
        }
    };

    const toggleSkill = (skillId) => {
        setSelectedSkills((prev) =>
            prev.includes(skillId)
                ? prev.filter((s) => s !== skillId)
                : [...prev, skillId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const fullName = formData.get('fullName');
        const phoneNumber = formData.get('phoneNumber');
        const emailAddress = formData.get('emailAddress');
        const hourlyRate = formData.get('hourlyRate');
        const bio = formData.get('bio');

        const newErrors = {};
        if (!fullName) newErrors.fullName = "FULL NAME IS REQUIRED";
        if (!phoneNumber) newErrors.phoneNumber = "PHONE NUMBER IS REQUIRED";
        if (!emailAddress) newErrors.emailAddress = "EMAIL ADDRESS IS REQUIRED";
        if (!hourlyRate) newErrors.hourlyRate = "HOURLY RATE IS REQUIRED";
        if (!bio) newErrors.bio = "BIO CONFIGURATION IS REQUIRED";
        if (selectedSkills.length === 0) newErrors.skills = "SELECT AT LEAST ONE SKILL";
        if (!imageUrl && !profile?.image) newErrors.image = "PROFILE PICTURE IS REQUIRED";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedProfileData = {
            name: fullName,
            phone: phoneNumber,
            email: emailAddress,
            hourlyRate: Number(hourlyRate),
            skills: selectedSkills,
            bio,
            image: imageUrl || (profile ? profile.image : ''),
            freelancerId: user.id
        };

        try {
            let payload;

            if (profile?._id) {
                payload = await updateFreelancerProfile(user.id, updatedProfileData);
                if (payload?.modifiedCount > 0 || payload?.matchedCount > 0) {
                    setProfile({ ...updatedProfileData, _id: profile._id });
                    setIsEditing(false);
                    setImageUrl('');
                    setErrors({});
                    toast.success("Profile updated successfully");
                } else {
                    toast.error("Failed to update profile");
                }
            } else {
                payload = await createFreelancerProfile(updatedProfileData);
                if (payload?.insertedId) {
                    setProfile({ ...updatedProfileData, _id: payload.insertedId });
                    setIsEditing(false);
                    setImageUrl('');
                    setErrors({});
                    toast.success("Profile created successfully");
                } else {
                    toast.error("Failed to save profile");
                }
            }
        } catch (err) {
            console.error("Submit error:", err);
            toast.error("Something went wrong");
        }
    };

    const startSetup = () => {
        setImageUrl('');
        setSelectedSkills([]);
        setIsEditing(true);
    };

    const startEditing = () => {
        setImageUrl(profile?.image || '');
        setSelectedSkills(profile?.skills || []);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setImageUrl('');
        setErrors({});
        setSelectedSkills(profile?.skills || []);
        setIsEditing(false);
    };

    if (!profile?._id && !isEditing) {
        return (
            <MasterDashboardContainer profile={profile}>
                <div className="bg-black border border-zinc-800 p-10 text-center relative h-full flex flex-col justify-center items-center">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500" />

                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6">
                        <Person size={20} className="text-zinc-500" />
                    </div>
                    <div className="space-y-2 mb-8">
                        <h2 className="text-sm font-semibold text-white tracking-widest uppercase">// INITIALIZE_IDENTITY</h2>
                        <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed uppercase tracking-wider">
                            Profile missing. Deploy terminal metadata to configure your access node.
                        </p>
                    </div>
                    <Button
                        onPress={startSetup}
                        className="bg-emerald-500 text-black font-bold rounded-none px-6 h-10 hover:bg-emerald-400 transition duration-150 text-xs uppercase tracking-widest"
                    >
                        Setup Profile <ArrowRight size={12} className="ml-2" />
                    </Button>
                </div>
            </MasterDashboardContainer>
        );
    }

    if (profile && !isEditing) {
        return (
            <MasterDashboardContainer profile={profile}>
                <div className="bg-black border border-zinc-800 p-8 space-y-6 relative h-full">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500" />

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-zinc-900 pb-6">
                        <div className="flex items-center gap-4">
                            {profile.image ? (
                                <img src={profile.image} alt={profile.name} className="w-14 h-14 rounded-none object-cover border border-zinc-800" />
                            ) : (
                                <div className="w-14 h-14 bg-zinc-950 flex items-center justify-center border border-zinc-800">
                                    <Person size={20} className="text-zinc-600" />
                                </div>
                            )}
                            <div className="space-y-1">
                                <h1 className="text-lg font-bold text-white uppercase tracking-wider">{profile.name}</h1>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Envelope size={12} className="text-zinc-600" /> {profile.email}</span>
                                    <span className="text-zinc-800">•</span>
                                    <span className="flex items-center gap-1.5"><Smartphone size={12} className="text-zinc-600" /> {profile.phone}</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onPress={startEditing}
                            variant="bordered"
                            className="border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white rounded-none px-4 font-bold h-9 text-[10px] uppercase tracking-widest transition duration-150 flex items-center gap-2"
                        >
                            <Pencil size={12} /> Edit Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="bg-zinc-950/50 border border-zinc-900 p-4 sm:col-span-2">
                            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold block mb-1">// HOURLY_RATE</span>
                            <span className="text-zinc-300 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                                <CircleDollar size={12} className="text-zinc-600" /> ${profile.hourlyRate}/HR
                            </span>
                        </div>
                        <div className="bg-zinc-950/50 border border-zinc-900 p-4 sm:col-span-2">
                            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold block mb-1">// SECURITY_STATUS</span>
                            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-500 inline-block shadow-[0_0_6px_#10b981]" /> VERIFIED FREELANCER NODE
                            </span>
                        </div>
                        <div className="bg-zinc-950/50 border border-zinc-900 p-4 sm:col-span-4">
                            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold block mb-2 flex items-center gap-1.5">
                                <Layers size={11} className="text-zinc-600" /> // SKILL_TAGS
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {(profile.skills || []).map((skillId) => {
                                    const skill = SKILL_OPTIONS.find((s) => s.id === skillId);
                                    return (
                                        <span
                                            key={skillId}
                                            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                        >
                                            {skill?.label || skillId}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">// USER_BIOGRAPHY</h3>
                        <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap bg-zinc-950/30 border border-zinc-900 p-4 uppercase tracking-wide">
                            {profile.bio}
                        </p>
                    </div>
                </div>
            </MasterDashboardContainer>
        );
    }

    return (
        <MasterDashboardContainer profile={profile}>
            <div className="bg-black p-8 border border-zinc-800 relative h-full">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500" />

                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-xs font-bold text-white uppercase tracking-widest border-b border-zinc-900 w-full pb-4 mb-2">
                            {profile ? '// UPDATE_FREELANCER_PROFILE' : '// REGISTER_FREELANCER_NODE'}
                        </legend>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-1 w-full border-b border-zinc-900 pb-6">
                            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Image*</span>
                            <div className="flex items-center gap-5 mt-3">
                                <label className="w-14 h-14 border border-zinc-800 hover:border-zinc-600 bg-zinc-950 flex flex-col items-center justify-center cursor-pointer transition duration-150 group relative overflow-hidden shrink-0">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={isUploading}
                                    />
                                    {isUploading ? (
                                        <PulseLoader color="#10b981" size={5} speedMultiplier={0.8} />
                                    ) : imageUrl ? (
                                        <img src={imageUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                        {isUploading ? 'SYNCHRONIZING BINARY...' : 'UPLOAD PROFILE BINARY'}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 mt-0.5 uppercase tracking-wide">PNG / JPG UP TO 5MB MAX</span>
                                    {errors.image && <span className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.image}</span>}
                                </div>
                            </div>
                        </div>

                        {/* ROW 1: Full Name + Phone Number */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <TextField name="fullName" defaultValue={profile?.name || ''} isInvalid={!!errors.fullName} className="flex flex-col gap-2 w-full">
                                <Label className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Full Name*</Label>
                                <div className="relative flex items-center">
                                    <Person size={14} className="absolute left-3 text-zinc-700 pointer-events-none z-10" />
                                    <Input placeholder="JUADUL AHMED BHUIYAN" className={`${textInputClass} pl-10`} />
                                </div>
                                {errors.fullName && <FieldError className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.fullName}</FieldError>}
                            </TextField>

                            <TextField name="phoneNumber" defaultValue={profile?.phone || ''} isInvalid={!!errors.phoneNumber} className="flex flex-col gap-2 w-full">
                                <Label className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Phone Number*</Label>
                                <div className="relative flex items-center">
                                    <Smartphone size={14} className="absolute left-3 text-zinc-700 pointer-events-none z-10" />
                                    <Input placeholder="+86 130 0000 0000" className={`${textInputClass} pl-10`} />
                                </div>
                                {errors.phoneNumber && <FieldError className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.phoneNumber}</FieldError>}
                            </TextField>
                        </div>

                        {/* ROW 2: Email Address + Hourly Rate */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <TextField name="emailAddress" type="email" defaultValue={profile?.email || ''} isInvalid={!!errors.emailAddress} className="flex flex-col gap-2 w-full">
                                <Label className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Email Address*</Label>
                                <div className="relative flex items-center">
                                    <Envelope size={14} className="absolute left-3 text-zinc-700 pointer-events-none z-10" />
                                    <Input placeholder="IDENTITY@DOMAIN.COM" className={`${textInputClass} pl-10`} />
                                </div>
                                {errors.emailAddress && <FieldError className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.emailAddress}</FieldError>}
                            </TextField>

                            <TextField name="hourlyRate" type="number" defaultValue={profile?.hourlyRate || ''} isInvalid={!!errors.hourlyRate} className="flex flex-col gap-2 w-full">
                                <Label className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Hourly Rate (USD)*</Label>
                                <div className="relative flex items-center">
                                    <CircleDollar size={14} className="absolute left-3 text-zinc-700 pointer-events-none z-10" />
                                    <Input placeholder="25" className={`${textInputClass} pl-10`} />
                                </div>
                                {errors.hourlyRate && <FieldError className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.hourlyRate}</FieldError>}
                            </TextField>
                        </div>

                        {/* ROW 3: Skills Checklist */}
                        <div className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Skills*</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {SKILL_OPTIONS.map((skill) => {
                                    const isSelected = selectedSkills.includes(skill.id);
                                    return (
                                        <button
                                            key={skill.id}
                                            type="button"
                                            onClick={() => toggleSkill(skill.id)}
                                            className={`text-left px-3 py-2.5 border text-[10px] font-bold uppercase tracking-wider transition duration-150 ${
                                                isSelected
                                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                                                    : "bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                                            }`}
                                        >
                                            {skill.label}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.skills && <span className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.skills}</span>}
                        </div>

                        {/* ROW 4: Bio Textarea */}
                        <TextField name="bio" defaultValue={profile?.bio || ''} isInvalid={!!errors.bio} className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Bio*</Label>
                            <TextArea
                                placeholder="GENERATE SYSTEM OVERVIEW DESCRIPTION..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.bio && <FieldError className="text-[10px] text-rose-500 font-bold uppercase mt-1">{errors.bio}</FieldError>}
                        </TextField>
                    </Fieldset>

                    {/* Form Controls */}
                    <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                        {profile?._id && (
                            <Button
                                type="button"
                                variant="bordered"
                                onPress={handleCancel}
                                className="border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white rounded-none px-5 font-bold h-10 text-[10px] uppercase tracking-widest transition duration-150"
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="bg-emerald-500 text-black font-bold hover:bg-emerald-400 rounded-none px-6 transition duration-150 h-10 text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        >
                            {profile?._id ? 'Save Updates' : 'Complete Setup'}
                        </Button>
                    </div>
                </Form>
            </div>
        </MasterDashboardContainer>
    );
}