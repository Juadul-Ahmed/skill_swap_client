 const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
 export const getClientTasks = async(taskId,status="open") =>{
    const res = await  fetch(`${baseUrl}/api/tasks?taskId=${taskId}&status=${status}`);
    return res.json()

 }