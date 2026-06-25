import { serverFetch } from "../core/server"


 export const getClientProfile = async(clientId) =>{
    return serverFetch(`/api/profile/clients?clientId=${clientId}`)
 }