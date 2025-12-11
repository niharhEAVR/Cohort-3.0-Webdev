import { create } from "zustand";

export interface ShareItems {
  message: string;
  linkSharing: boolean;
  link: string;
}

type ShareStore = {
  share: ShareItems;

  setShare: (data: ShareItems) => void;
  stopShare: () => void;
};

export const useShareStore = create<ShareStore>((set) => ({
  share: { message: "", linkSharing: false, link: "" },

  setShare: (data) => set({ share: data }),

  stopShare: () =>
    set({
      share: { message: "", linkSharing: false, link: "" }
    })
}));
