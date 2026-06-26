
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientStats = async (clientId) => {
    const res = await fetch(`${baseUrl}/api/stats/client/${clientId}`);
    return res.json()
}