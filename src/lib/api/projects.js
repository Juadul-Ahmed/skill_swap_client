const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFreelancerProjects = async (freelancerEmail) => {
    const res = await fetch(
        `${baseUrl}/api/projects/freelancer/${encodeURIComponent(freelancerEmail)}`,
        { cache: "no-store" }
    );
  return res.json()
}