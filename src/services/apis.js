import {commonRequest} from "./ApiCalls";
import { BACKEND_URL } from "./helper";

export const userProfileFunction = async(userId)=>{
    return await commonRequest("GET",`${BACKEND_URL}/profile/${userId}`)
}

export const vehicleFetchFunction = async()=>{
    return await commonRequest("GET",`${BACKEND_URL}/partner/vehcileList`)
}