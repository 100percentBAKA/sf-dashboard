import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllSubCategories, getAllSubSubCategories } from "./apis";

// ! CATEGORY QUERIES
export function useGetCatsQuery() {
    return useQuery({
        queryKey: ['get-all-categories'],
        queryFn: getAllCategories
    })
}

// ! SUB CATEGORY QUERIES
export function useGetSubCatsQuery() {
    return useQuery({
        queryKey: ['get-all-sub-categories'],
        queryFn: getAllSubCategories
    })
}

// ! SUB SUB CATEGORY QUERIES
export function useGetSubSubCatsQuery() {
    return useQuery({
        queryKey: ['get-all-sub-sub-categories'],
        queryFn: getAllSubSubCategories
    })
}