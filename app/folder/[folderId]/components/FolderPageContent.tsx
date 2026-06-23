"use client";

import { useRouter } from "next/navigation";
import { folders, links } from "@/app/lib/mockData";
import Sidebar from "@/app/components/Sidebar";
import LinkCard from "@/app/components/LinkCard";

type Props = {
  folderId: string;
};

export default function FolderPageContent({ folderId }: Props) {
  const router = useRouter();
  const filteredLinks = links.filter((link) => link.folderId === folderId);

  function handleFolderSelect(id: string | null) {
    if (id === null) {
      router.push("/");
    } else {
      router.push(`/folder/${id}`);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        folders={folders}
        activeFolder={folderId}
        onSelect={handleFolderSelect}
      />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
            이 폴더에 등록된 링크가 없습니다
          </div>
        )}
      </main>
    </div>
  );
}
