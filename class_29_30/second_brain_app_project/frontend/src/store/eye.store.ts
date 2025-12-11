import { create } from "zustand";

interface EyeStore {
    showPassword: boolean;
    togglePassword: () => void;
    setPasswordVisible: (value: boolean) => void;
}

export const useEyeStore = create<EyeStore>((set) => ({
    showPassword: false,

    togglePassword: () =>
        set((state) => ({ showPassword: !state.showPassword })),

    setPasswordVisible: (value) =>
        set(() => ({ showPassword: value })),
}));
