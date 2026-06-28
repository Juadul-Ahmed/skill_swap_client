'use server';

import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });
  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}


  


export const updateClientProfile = async (clientId, data) => {
  const res = await fetch(`${baseUrl}/api/profile/clients/${clientId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}