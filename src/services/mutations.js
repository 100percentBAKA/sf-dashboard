import { useMutation } from "@tanstack/react-query";
import { deleteCategory, deleteSubCategory, postCategory, postSubCategory, updateCategory } from "./apis";

// ! CATEGORY MUTATIONS
export function usePostCatMutation() {
    return useMutation({
        mutationFn: (body) => postCategory(body)
    })
}

export function useDelCatMutation() {
    return useMutation({
        mutationFn: (cat_name) => deleteCategory(cat_name)
    })
}

export function usePutCatMutation() {
    return useMutation({
        mutationFn: (body) => updateCategory(body)
    })
}

// ! SUB CATEGORY MUTATIONS
export function useDelSubCatMutation() {
    return useMutation({
        mutationFn: (sub_cat_name) => deleteSubCategory(sub_cat_name)
    })
}

export function usePostSubCatMutation() {
    return useMutation({
        mutationFn: (body) => postSubCategory(body)
    })
}

// ! SUB TO SUB CATEGORY MUTATIONS
