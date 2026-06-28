'use server'

import { serverMutation, authHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createProposal = async (applicationData) => {
  return serverMutation('/api/proposals', applicationData)
}

export const acceptProposal = async (proposalId) => {
  const res = await fetch(`${baseUrl}/api/proposals/${proposalId}/accept`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      ...await authHeader(),
    },
  });
  return res.json();
}

export const rejectProposal = async (proposalId) => {
  const res = await fetch(`${baseUrl}/api/proposals/${proposalId}/reject`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      ...await authHeader(),
    },
  });
  return res.json();
}