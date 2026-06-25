const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const serverMutation= async(path,data) =>{
    const res = await fetch(`${baseUrl}${path}`,{
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify(data)
    });
    return res.json()
}

export const serverFetch = async(path)=>{
  const res = await fetch (`${baseUrl}${path}`);
  return res.json()
}

export const updateClientProfile = async (clientId, data) => {
    const res = await fetch(`${baseUrl}/api/profile/clients/${clientId}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}