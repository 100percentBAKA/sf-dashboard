import { axiosInstance } from "./apis_head"

// ! GET ACCESS TOKEN
// const getAccessToken = () => {
//     // * check in both local and session storage
//     let token = localStorage.getItem("access_token")

//     if (token) {
//         return token
//     }

//     // * at this point it is confirm that the token is in session storage
//     token = sessionStorage.getItem("access_token")
//     return token
// }

// ! CATEGORY APIS
export async function postCategory(body) {
    return await axiosInstance.post("categories", body)
}

export async function getAllCategories() {
    return await axiosInstance.get("categories")
}

export async function getACategory(cat_name) {
    return await axiosInstance.get(`categories/${cat_name}`)
}

export async function updateCategory(body) {
    return await axiosInstance.put("categories", body)
}

export async function deleteCategory(cat_name) {
    return await axiosInstance.delete(`categories/${cat_name}`)
}

// ! SUB CATEGORY APIS
// export async function postSubCategory(body) {
//     return await axiosInstance.post("")
// }