import { create } from "zustand";

type BackendStore = {
    VITE_BACKEND_URL:string;
    VITE_BACKEND_URL_VERSIONS:string;
};


export const useBackendStore = create<BackendStore>(() => ({
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  VITE_BACKEND_URL_VERSIONS: import.meta.env.VITE_BACKEND_URL_VERSIONS,
}));
