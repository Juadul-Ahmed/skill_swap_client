'use server'

import { serverMutation } from "../core/server"

export const createTask = async(newTaskData) =>{
    return serverMutation('/api/tasks',newTaskData)
}

