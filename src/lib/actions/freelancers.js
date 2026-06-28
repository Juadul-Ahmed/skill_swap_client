'use server'

import { serverFetch, authHeader } from "../core/server";
import { getUserSession } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFreelancerProfile = async (freelancerId) => {
    return serverFetch(`/api/profile/freelancers?freelancerId=${freelancerId}`);
}

export const getLoggedInFreelancerProfile = async () => {
    const user = await getUserSession();
    return getFreelancerProfile(user?.id);
}

export const createFreelancerProfile = async (newFreelancerData) => {
    const res = await fetch(`${baseUrl}/api/freelancers`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader(),
        },
        body: JSON.stringify(newFreelancerData)
    });
    return res.json();
}

export const updateFreelancerProfile = async (freelancerId, data) => {
    const res = await fetch(`${baseUrl}/api/profile/freelancers/${freelancerId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader(),
        },
        body: JSON.stringify(data)
    });
    return res.json();
}