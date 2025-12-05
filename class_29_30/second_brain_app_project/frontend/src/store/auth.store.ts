import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  token: string;

  login: (token: string) => void;
  logout: () => void;
};


export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  token: "",

  login: (token: string) =>
    set({
      isLoggedIn: true,
      token,
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      token: "",
    }),
}));
