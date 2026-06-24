"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Folder, folders as initialFolders } from "@/app/lib/mockData";

type FoldersContextType = {
  folders: Folder[];
  addFolder: (name: string) => void;
};

const FoldersContext = createContext<FoldersContextType | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
    };
    setFolders((prev) => [...prev, newFolder]);
  }

  return (
    <FoldersContext.Provider value={{ folders, addFolder }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FoldersContext);
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider");
  return ctx;
}
