const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFreelancerEarnings = async (freelancerEmail) => {
    const res = await fetch(
        `${baseUrl}/api/earnings/freelancer/${encodeURIComponent(freelancerEmail)}`,
        { cache: "no-store" }
    );
   return res.json()
}