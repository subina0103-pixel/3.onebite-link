"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LinkItem, links as initialLinks } from "@/app/lib/mockData";
import { createClient } from "@/utils/supabase/client";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};

type LinksContextType = {
  links: LinkItem[];
  isAdding: boolean;
  addLink: (link: NewLinkInput) => Promise<void>;
  deleteLink: (id: string) => void;
  updateLink: (id: string, changes: Partial<Pick<LinkItem, "title" | "description" | "folderId">>) => void;
};

const LinksContext = createContext<LinksContextType | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [isAdding, setIsAdding] = useState(false);

  async function addLink(link: NewLinkInput) {
    if (isAdding) return;
    setIsAdding(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: link.url,
          title: link.title || null,
          description: link.description || null,
          thumbnail_url: link.thumbnail || null,
          folder_id: link.folderId ? Number(link.folderId) : null,
        })
        .select()
        .single();
      if (!error && data) {
        const newLink: LinkItem = {
          id: String(data.id),
          title: data.title ?? "",
          url: data.url,
          description: data.description ?? "",
          thumbnail: data.thumbnail_url ?? undefined,
          folderId: data.folder_id != null ? String(data.folder_id) : "",
        };
        setLinks((prev) => [newLink, ...prev]);
      }
    } finally {
      setIsAdding(false);
    }
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: string, changes: Partial<Pick<LinkItem, "title" | "description" | "folderId">>) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...changes } : l)));
  }

  return (
    <LinksContext.Provider
      value={{ links, isAdding, addLink, deleteLink, updateLink }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within LinksProvider");
  return ctx;
}
