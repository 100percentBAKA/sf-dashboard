import axios from "axios"
import { BASE_URL } from "./auth/apis"

const debug = true

export const axiosInstance2 = axios.create({ baseURL: BASE_URL })


// ! GET ACCESS TOKEN
const getAccessToken = () => {
    // * check in both local and session storage
    let token = localStorage.getItem("access_token")

    if (token) {
        return token
    }

    // * at this point it is confirm that the token is in session storage
    token = sessionStorage.getItem("access_token")
    return token
}

// !! INTERCEPT REQUESTS AND ADD TOKENS
axiosInstance2.interceptors.request.use(
    config => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // ! C H E C K - I add logic to refresh tokens here
        debug && console.log("Error while intercepting api calls to add access_tokens")
        return Promise.reject(error);
    }
);

// ! CATEGORY APIS
export async function postCategory(body) {
    return await axiosInstance2.post("categories/", body)
}

export async function getAllCategories() {
    return await axiosInstance2.get("categories")
}

export async function getACategory(cat_name) {
    return await axiosInstance2.get(`categories/${cat_name}`)
}

export async function updateCategory(body) {
    return await axiosInstance2.put(`categories/${body.name}/`, body)
}

export async function deleteCategory(cat_name) {
    return await axiosInstance2.delete(`categories/${cat_name}`)
}

// ! SUB CATEGORY APIS
// * '/' required at the end ( django api routing )
export async function getAllSubCategories() {
    return await axiosInstance2.get("subcategories/")
}

export async function deleteSubCategory(sub_cat_name) {
    return await axiosInstance2.delete(`subcategories/${sub_cat_name}/`)
}

export async function postSubCategory(body) {
    return await axiosInstance2.post("subcategories/", body)
}

// ! SUB SUB CATEGORY APIS
export async function getAllSubSubCategories() {
    return await axiosInstance2.get("subsubcategories/")
}

export async function postSubSubCategories(body) {
    return await axiosInstance2.post("subsubcategories/", body)
}
