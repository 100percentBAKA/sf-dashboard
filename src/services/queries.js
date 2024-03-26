import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "./apis";

export function useGetCatsQuery() {
    return useQuery({
        queryKey: ['get-all-categories'],
        queryFn: getAllCategories
    })
}