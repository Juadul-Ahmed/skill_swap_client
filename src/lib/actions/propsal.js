'use server'

import { serverMutation } from "../core/server";

export const createProposal = async(applicationData) => {
 
  return serverMutation('/api/proposals',applicationData)

  
}