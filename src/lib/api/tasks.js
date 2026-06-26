import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getClientTasks = async (clientId, status = "open") => {
  const res = await fetch(
    `${baseUrl}/api/tasks?clientId=${clientId}&status=${status}`,
  );
  return res.json();
};

export const getPublicTasks = async (
  category = "",
  search = ""
) => {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const res = await fetch(
    `${baseUrl}/api/tasks/public?${params.toString()}`
  );

  return res.json();
};


export const getTaskById = async(taskId)=>{
   return serverFetch(`/api/tasks/${taskId}`)
}