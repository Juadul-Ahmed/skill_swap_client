'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const submitDeliverable = async (taskId, deliverableUrl) => {
    const res = await fetch(`${baseUrl}/api/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliverableUrl })
    });
    return res.json();
}