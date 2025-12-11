import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileStore = {
  username: string;
  setUsername: (data: string) => void;
  deleteUsername: () => void;
};

export const useProfieStore = create<ProfileStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (data) => set({ username: data }),
      deleteUsername: () => set({ username: "" }),
    }),
    {
      name: "profile-store",
    }
  )
);