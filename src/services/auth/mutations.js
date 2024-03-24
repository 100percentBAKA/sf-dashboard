import { useMutation } from "@tanstack/react-query"
import { forgetAdmin, loginAdmin, registerAdmin } from "./apis"

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

export function useForgotMutation() {
    return useMutation({
        mutationFn: (body) => forgetAdmin(body)
    })
}