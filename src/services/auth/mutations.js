import { useMutation } from "@tanstack/react-query"
import { forgetAdmin, getPhoneNumber, loginAdmin, registerAdmin, resetPassword, verifyOTP } from "./apis"

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

export function useVerifyOTPMutation() {
    return useMutation({
        mutationFn: (body) => verifyOTP(body)
    })
}

export function useResetMutation() {
    return useMutation({
        mutationFn: (body) => resetPassword(body)
    })
}

export function usePhoneMutation() {
    return useMutation({
        mutationFn: (body) => getPhoneNumber(body)
    })
}