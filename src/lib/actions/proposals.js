'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const createProposal = async (data) => {
    const res = await fetch(`${baseUrl}/api/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const acceptProposal = async (id) => {
    const res = await fetch(`${baseUrl}/api/proposals/${id}/accept`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
}

export const rejectProposal = async (id) => {
    const res = await fetch(`${baseUrl}/api/proposals/${id}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
}