"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Folder } from "@/app/lib/mockData";
import { createClient } from "@/utils/supabase/client";

type FoldersContextType = {
  folders: Folder[];
  isAdding: boolean;
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => void;
  updateFolder: (id: number, name: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextType | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setFolders(data);
      });
  }, []);

  async function addFolder(name: string) {
    if (isAdding) return;
    setIsAdding(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name })
        .select()
        .single();
      if (!error && data) {
        setFolders((prev) => [...prev, data]);
      }
    } finally {
      setIsAdding(false);
    }
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  async function updateFolder(id: number, name: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setFolders((prev) => prev.map((f) => (f.id === id ? data : f)));
    }
  }

  return (
    <FoldersContext.Provider
      value={{ folders, isAdding, addFolder, deleteFolder, updateFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FoldersContext);
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider");
  return ctx;
}
