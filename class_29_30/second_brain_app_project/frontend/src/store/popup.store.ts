import { create } from "zustand";

type PopupStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const usePopupStore = create<PopupStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
