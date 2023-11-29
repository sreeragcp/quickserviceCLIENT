import {commonRequest} from "./ApiCalls.js";
import { commonRequestAdmin } from "./ApiCalls.js";
import { commonRequestPartner } from "./ApiCalls.js";
import { BACKEND_URL } from "./Helper.js";

export const userProfileFunction = async(userId,tocken)=>{
    return await commonRequest("GET",`${BACKEND_URL}/profile/${userId}`,null,null,tocken)
}

export const userRegisterFuction = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/register`,data)
}

export const userLoginFuction = async(data)=>{
    console.log(data,"this is the data");
    return await commonRequest("POST",`${BACKEND_URL}/login`,data)
}


export const vehicleFetchFunction = async()=>{
    return await commonRequestPartner("GET",`${BACKEND_URL}/partner/vehcileList`)
}

export const profileEditFunction = async(userId,data,tocken)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/profileEdit/${userId}`,data,null,tocken)
}

export const fetchPartnerEditFunction = async(partnerId,data,tocken)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/profileEdit/${partnerId}`,data,null,tocken)
}

export const forgetUserPasswordFunction = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/forgetPasword`,data)
}

export const verifyOtpFunction = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/verifyOtp`,data)
}

export const resetPasswordFunction = async(data)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/restPassword`,data)
}

export const verifyPartnerFunction = async(data,tocken)=>{
    return await commonRequestAdmin("PATCH",`${BACKEND_URL}/admin/verifyPartner`,data,null,tocken)
}

export const fetchVehicleDetails = async(vehicleId,tocken)=>{
    return await commonRequest("GET",`${BACKEND_URL}/vehicleDetail/${vehicleId}`,null,null,tocken)
}

export const functionAddCoupon = async(data,tocken)=>{
    return await commonRequestAdmin("POST",`${BACKEND_URL}/admin/coupon`,data,null,tocken)
}

export const functionFecthCoupon = async(tocken)=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/couponList`,null,null,tocken)
}

export const fetchCouponData = async(tocken)=>{
    return await commonRequest("GET",`${BACKEND_URL}/coupon`,null,null,tocken)
}

export const functionFetchPartnerData = async(partnerId,tocken)=>{
    return await commonRequestPartner("GET",`${BACKEND_URL}/partner/partnerData/${partnerId}`,null,null,tocken)
}

export const functionBookingHandle = async(userId,data,tocken)=>{
    return await commonRequest("POST",`${BACKEND_URL}/handleBooking/${userId}`,data,null,tocken)
}
export const functionRequestAccept = async(userId)=>{
    return await commonRequestPartner("POST",`${BACKEND_URL}/partner/accept/${userId}`)
}

export const functionRequestReject = async(userId)=>{
    return await commonRequestPartner("POST",`${BACKEND_URL}/partner/reject/${userId}`)
}

export const functionBookingCompletion = async(data,tocken)=>{
    return await commonRequest("POST",`${BACKEND_URL}/bookingCompletion`,data,null,tocken)
}

export const functionBookingDetails = async(partnerId,tocken)=>{
    return await commonRequestPartner("GET",`${BACKEND_URL}/partner/bookingDetails/${partnerId}`,null,null,tocken)
}


export const functionUpdateBooking = async(partnerId,bookstatus)=>{
    return await commonRequestPartner("PATCH",`${BACKEND_URL}/partner/updateBooking/${partnerId}`,bookstatus)
}

export const functionBookingDetail = async(userId,tocken)=>{
    return await commonRequest("GET",`${BACKEND_URL}/detailBooking/${userId}`,null,null,tocken)
}

export const functionBookingCancel = async(bookingId)=>{
    return await commonRequest("PUT",`${BACKEND_URL}/cancelBooking/${bookingId}`)
}

export const functionFetchBookingDetails = async(tocken)=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/detailsBooking`,null,null,tocken)
}

export const functionFetchDetails = async(id,tocken)=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/bookingDetails/${id}`,null,null,tocken)
}

export const functionFetchDetail = async(id,tocken)=>{
    return await commonRequest("GET",`${BACKEND_URL}/bookingDetails/${id}`,null,null,tocken)
}

export const funtionGenerateOtp = async(partnerId)=>{
    return await commonRequestPartner("POST",`${BACKEND_URL}/partner/orderOtp/${partnerId}`)
}

export const functionVerifyOtp = async(otpValue,partnerId)=>{
    return await commonRequestPartner("POST",`${BACKEND_URL}/partner/verifyorderOtp/${partnerId}`,otpValue)
}

export const functionCurrentBooking = async(partnerId,tocken)=>{
    return await commonRequestPartner("GET",`${BACKEND_URL}/partner/currentBooking/${partnerId}`,null,null,tocken)
}

export const functionCouponApply = async(data,tocken)=>{
    return await commonRequest("POST",`${BACKEND_URL}/applyCoupon`,data,null,tocken)
}

export const functionFetchPartner = async(id,tocken)=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/fetchPartner/${id}`,null,null,tocken)
}


export const functionPerdayEarnings = async(tocken)=>{
    return await commonRequestPartner("GET",`${BACKEND_URL}/partner/graph`,null,null,tocken)
}

export const functionGetAdminMonthData =async(tocken)=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/graph`,null,null,tocken)
}

export const getTotalBookingDetails =async(tocken)=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/bookingDetails`,null,null,tocken)
}

export const functionGetUserRegister = async()=>{
    return await commonRequestAdmin("GET",`${BACKEND_URL}/admin/getuserRegister`)
}
export const getbookedUserdata = async(userId)=>{
    return await commonRequestPartner("GET",`${BACKEND_URL}/partner/getuserData/${userId}`)
}










