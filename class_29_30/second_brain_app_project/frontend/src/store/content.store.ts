import { create } from "zustand";
import type { ContentItem } from "@/types/content.type";

type ContentStore = {
  content: ContentItem[];

  setContent: (data: ContentItem[]) => void;
  addContent: (item: ContentItem) => void;
  deleteContent: (item: string) => void;
};

export const useContentStore = create<ContentStore>((set) => ({
  content: [],

  setContent: (data) => set({ content: data }),

  addContent: (item) =>
    set((state) => ({
      content: [...state.content, item],
    })),

  deleteContent: (id) =>
    set((state) => ({
      content: state.content.filter((item) => item._id !== id),
    })),
}));



interface ContentInputState {
  link: string;
  type: string;
  title: string;
  tagsInput: string;

  setLink: (value: string) => void;
  setType: (value: string) => void;
  setTitle: (value: string) => void;
  setTagsInput: (value: string) => void;

  reset: () => void;
}

export const useContentInputStore = create<ContentInputState>((set) => ({
  link: "",
  type: "",
  title: "",
  tagsInput: "",

  setLink: (value) => set({ link: value }),
  setType: (value) => set({ type: value }),
  setTitle: (value) => set({ title: value }),
  setTagsInput: (value) => set({ tagsInput: value }),

  reset: () => set({
    link: "",
    type: "",
    title: "",
    tagsInput: "",
  }),
}));