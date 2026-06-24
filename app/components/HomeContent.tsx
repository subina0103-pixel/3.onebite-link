"use client";

import { useRouter } from "next/navigation";
import { links } from "@/app/lib/mockData";
import { useFolders } from "@/app/lib/FoldersContext";
import Sidebar from "./Sidebar";
import LinkCard from "./LinkCard";

export default function HomeContent() {
  const router = useRouter();
  const { folders } = useFolders();

  function handleFolderSelect(folderId: string | null) {
    if (folderId === null) {
      router.push("/");
    } else {
      router.push(`/folder/${folderId}`);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        folders={folders}
        activeFolder={null}
        onSelect={handleFolderSelect}
      />
      <main className="flex-1 overflow-y-auto bg-[var(--bg)] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </main>
    </div>
  );
}
