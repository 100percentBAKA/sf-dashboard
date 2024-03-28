import axios from "axios"

export const BASE_URL = "http://13.233.65.5:8000/api/v2"
export const axiosInstance = axios.create({ baseURL: BASE_URL })

//! AUTH APIS

// * register
export async function registerAdmin(body) {
    return await axiosInstance.post("admin-signup", body)
}

// * login
export async function loginAdmin(body) {
    return await axiosInstance.post("admin-signin", body)
}

// * forgot
export async function forgetAdmin(body) {
    return await axiosInstance.post("generate-otp", body)
}

// * verify otp
export async function verifyOTP(body) {
    return await axiosInstance.post("verify-otp", body)
}

// * retype password 
export async function resetPassword(body) {
    return await axiosInstance.post("admin-reset-password", body)
}

// * get phone number 
export async function getPhoneNumber(body) {
    return await axiosInstance.post("get-phone-number", body)
}
