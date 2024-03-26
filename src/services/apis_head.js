import axios from "axios"

export const BASE_URL = "http://13.233.65.5:8000/api/v2"
export const axiosInstance = axios.create({ baseURL: BASE_URL })