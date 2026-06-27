
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientStats = async (clientId) => {
    const res = await fetch(`${baseUrl}/api/stats/client/${clientId}`);
    return res.json()
}


export const getFreelancerStats = async (freelancerEmail) => {
    const res = await fetch(
        `${baseUrl}/api/stats/freelancer/${encodeURIComponent(freelancerEmail)}`,
        { cache: "no-store" }
    );
    return res.json()
}