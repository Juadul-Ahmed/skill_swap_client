 const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
 export const getClientTasks = async(clientId,status="open") =>{
    const res = await  fetch(`${baseUrl}/api/tasks?clientId=${clientId}&status=${status}`);
    return res.json()

 }