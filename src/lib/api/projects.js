'use server'

import { authHeader } from "../core/server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFreelancerProjects = async (freelancerEmail) => {
    const res = await fetch(
        `${baseUrl}/api/projects/freelancer/${encodeURIComponent(freelancerEmail)}`,
        { cache: "no-store" }
    );
    return res.json()
}

export const submitDeliverable = async (taskId, deliverableUrl) => {
    const res = await fetch(`${baseUrl}/api/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader(),
        },
        body: JSON.stringify({ deliverableUrl }),
    });
    return res.json();
}