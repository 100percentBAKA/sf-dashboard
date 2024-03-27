import { create } from "zustand";

export const useStore = create((set) => ({
    username: "",
    phoneNo: "",
    setUsername: (username) => set({ username }),
    setPhoneNo: (phoneNo) => set({ phoneNo })
}))