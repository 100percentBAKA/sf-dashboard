import axios from "axios"

const BASE_URL = "http://13.233.65.5:8000/api/v2"
const axiosInstance = axios.create({ baseURL: BASE_URL })

//! AUTH

// * register
export async function registerAdmin(body) {
    return await axiosInstance.post("admin-signup", body)
}

// * login
export async function loginAdmin(body) {
    return await axiosInstance.post("admin-signin", body)
}