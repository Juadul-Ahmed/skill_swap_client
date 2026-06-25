'use server'

import { serverMutation } from "../core/server"

export const createClientProfile = async(newClientData)=>{
  await serverMutation('/api/clients',newClientData)
}

