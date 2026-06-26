const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFreelancerProposals = async (freelancerEmail) => {
    const res = await fetch(
        `${baseUrl}/api/proposals?freelancerEmail=${encodeURIComponent(freelancerEmail)}`
    );
    return res.json()
}