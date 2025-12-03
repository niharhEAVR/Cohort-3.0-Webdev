import { createContext, type ReactNode, useContext } from "react";

interface BackendContextType {
  url: string;
  ves: string;
}

const BackendContext = createContext<BackendContextType | undefined>(undefined);

export const BackendProvider = ({ children, url, ves }: { children: ReactNode; url: string; ves: string }) => {
  return (
    <BackendContext.Provider value={{ url, ves }}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => {
  const context = useContext(BackendContext);
  if (!context) throw new Error("useBackend must be used within BackendProvider");
  return context;
};
