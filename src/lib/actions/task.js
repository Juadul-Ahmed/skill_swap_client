'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

import { serverMutation } from "../core/server"

export const createTask = async(newTaskData) =>{
    return serverMutation('/api/tasks',newTaskData)
}



export const updateTask = async (id, data) => {
    const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const deleteTask = async (id) => {
    const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
        method: "DELETE",
    });
    return res.json();
}