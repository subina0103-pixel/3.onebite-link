"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LinkItem } from "@/app/lib/mockData";
import { createClient } from "@/utils/supabase/client";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    title: row.title ?? "",
    url: row.url,
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id != null ? String(row.folder_id) : "",
  };
}

type LinksContextType = {
  links: LinkItem[];
  isAdding: boolean;
  addLink: (link: NewLinkInput) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  updateLink: (
    id: string,
    changes: Partial<Pick<LinkItem, "title" | "description" | "folderId">>
  ) => Promise<void>;
};

const LinksContext = createContext<LinksContextType | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setLinks(data.map(toLinkItem));
      });
  }, []);

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
        setLinks((prev) => [toLinkItem(data), ...prev]);
      }
    } finally {
      setIsAdding(false);
    }
  }

  async function deleteLink(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id", Number(id));
    if (!error) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    }
  }

  async function updateLink(
    id: string,
    changes: Partial<Pick<LinkItem, "title" | "description" | "folderId">>
  ) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .update({
        ...(changes.title !== undefined && { title: changes.title }),
        ...(changes.description !== undefined && {
          description: changes.description,
        }),
        ...(changes.folderId !== undefined && {
          folder_id: changes.folderId ? Number(changes.folderId) : null,
        }),
      })
      .eq("id", Number(id))
      .select()
      .single();
    if (!error && data) {
      const updated = toLinkItem(data);
      setLinks((prev) => prev.map((l) => (l.id === id ? updated : l)));
    }
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
