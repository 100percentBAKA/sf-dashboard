import { useMutation } from "@tanstack/react-query"
import { loginAdmin, registerAdmin } from "./apis"

export function useRegisterMutation() {
    return useMutation({
        mutationFn: (body) => registerAdmin(body)
    })
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: (body) => loginAdmin(body)
    })
}