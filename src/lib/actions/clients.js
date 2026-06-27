'use server'

import { serverMutation } from "../core/server"

export const createClientProfile = async(newClientData)=>{
  const result = await serverMutation('/api/clients',newClientData)
  return result;
}

