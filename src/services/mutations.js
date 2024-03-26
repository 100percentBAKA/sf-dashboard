import { useMutation } from "@tanstack/react-query";
import { deleteCategory, postCategory } from "./apis";

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