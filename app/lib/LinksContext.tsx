"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LinkItem, links as initialLinks } from "@/app/lib/mockData";

type LinksContextType = {
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
  deleteLink: (id: string) => void;
  updateLink: (id: string, changes: Partial<Pick<LinkItem, "title" | "description" | "folderId">>) => void;
};

const LinksContext = createContext<LinksContextType | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(link: LinkItem) {
    setLinks((prev) => [link, ...prev]);
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: string, changes: Partial<Pick<LinkItem, "title" | "description" | "folderId">>) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...changes } : l)));
  }

  return (
    <LinksContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within LinksProvider");
  return ctx;
}
