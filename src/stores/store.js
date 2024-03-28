import { create } from "zustand";

export const useStore = create((set) => ({
    username: "",
    phoneNo: "+919876543210", // * fallback phone no
    currentSubCat: "",
    currentSubSubCat: "",
    setUsername: (username) => set({ username }),
    setPhoneNo: (phoneNo) => set({ phoneNo }),
    setCurrentSubCat: (currentSubCat) => set({ currentSubCat }),
    setCurrentSubSubCat: (currentSubSubCat) => set({ currentSubSubCat })
}))