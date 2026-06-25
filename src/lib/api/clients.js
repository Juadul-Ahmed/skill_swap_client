import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"


 export const getClientProfile = async(clientId) =>{
    return serverFetch(`/api/profile/clients?clientId=${clientId}`)
 }


 export const  getLoggedInClientProfile = async () => {
   const user = await getUserSession()
   return getClientProfile(user?.id)
 }


 