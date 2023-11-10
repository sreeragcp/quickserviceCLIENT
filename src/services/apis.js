import {commonRequest} from "./ApiCalls";
import { BACKEND_URL } from "./helper";

export const userProfileFunction = async(userId)=>{
    return await commonRequest("GET",`${BACKEND_URL}/profile/${userId}`)
}

export const vehicleFetchFunction = async()=>{
    return await commonRequest("GET",`${BACKEND_URL}/partner/vehcileList`)
}

export const profileEditFunction = async(userId,data)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/profileEdit/${userId}`,data)
}

export const fetchPartnerEditFunction = async(partnerId,data)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/profileEdit/${partnerId}`,data)
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

export const verifyPartnerFunction = async(data)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/admin/verifyPartner`,data)
}

export const fetchVehicleDetails = async(vehicleId)=>{
    return await commonRequest("GET",`${BACKEND_URL}/vehicleDetail/${vehicleId}`)
}

export const functionAddCoupon = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/admin/coupon`,data)
}

export const functionFecthCoupon = async()=>{
    return await commonRequest("GET",`${BACKEND_URL}/admin/couponList`)
}

export const fetchCouponData = async()=>{
    return await commonRequest("GET",`${BACKEND_URL}/coupon`)
}

export const functionFetchPartnerData = async(partnerId)=>{
    console.log(partnerId,"this is the partnerId");
    return await commonRequest("GET",`${BACKEND_URL}/partner/partnerData/${partnerId}`)
}

export const functionBookingHandle = async(userId,data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/handleBooking/${userId}`,data)
}
export const functionRequestAccept = async(userId)=>{
    return await commonRequest("POST",`${BACKEND_URL}/partner/accept/${userId}`)
}

export const functionRequestReject = async(userId)=>{
    return await commonRequest("POST",`${BACKEND_URL}/partner/reject/${userId}`)
}

export const functionBookingCompletion = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/bookingCompletion`,data)
}

export const functionBookingDetails = async(partnerId)=>{
    return await commonRequest("GET",`${BACKEND_URL}/partner/bookingDetails/${partnerId}`)
}


export const functionUpdateBooking = async(partnerId,bookstatus)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/partner/updateBooking/${partnerId}`,bookstatus)
}

export const functionBookingDetail = async(userId)=>{
    return await commonRequest("GET",`${BACKEND_URL}/detailBooking/${userId}`)
}

export const functionBookingCancel = async(bookingId)=>{
    return await commonRequest("PATCH",`${BACKEND_URL}/cancelBooking/${bookingId}`)
}

export const functionFetchBookingDetails = async()=>{
    return await commonRequest("GET",`${BACKEND_URL}/admin/detailsBooking`)
}

export const functionFetchDetails = async(id)=>{
    return await commonRequest("GET",`${BACKEND_URL}/admin/bookingDetails/${id}`)
}

export const functionFetchDetail = async(id)=>{
    return await commonRequest("GET",`${BACKEND_URL}/bookingDetails/${id}`)
}

export const funtionGenerateOtp = async(partnerId)=>{
    return await commonRequest("POST",`${BACKEND_URL}/partner/orderOtp/${partnerId}`)
}

export const functionVerifyOtp = async(otpValue,partnerId)=>{
    return await commonRequest("POST",`${BACKEND_URL}/partner/verifyorderOtp/${partnerId}`,otpValue)
}

export const functionCurrentBooking = async(partnerId)=>{
    return await commonRequest("GET",`${BACKEND_URL}/partner/currentBooking/${partnerId}`)
}

