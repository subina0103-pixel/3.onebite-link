"use client";

import { useState } from "react";
import { Folder } from "@/app/lib/mockData";
import DeleteFolderModal from "./DeleteFolderModal";

type Props = {
  folders: Folder[];
  activeFolder: string | null;
  onSelect: (folderId: string | null) => void;
};

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default function Sidebar({ folders, activeFolder, onSelect }: Props) {
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  return (
    <>
      <aside className="w-56 flex-shrink-0 border-r border-[var(--border)] bg-[var(--card-bg)] flex flex-col overflow-y-auto">
        <div className="p-3 flex flex-col gap-0.5">
          <button
            onClick={() => onSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm sidebar-item ${
              activeFolder === null ? "sidebar-active" : "text-[var(--text)]"
            }`}
          >
            전체
          </button>

          <div className="mt-4">
            <p className="px-3 mb-1 text-xs font-medium text-[var(--text-sub)] uppercase tracking-wider">
              폴더
            </p>
            <div className="flex flex-col gap-0.5">
              {folders.map((folder) => (
                <div key={folder.id} className="group relative">
                  <button
                    onClick={() => onSelect(folder.id)}
                    className={`w-full text-left px-3 py-2 pr-8 rounded-md text-sm sidebar-item ${
                      activeFolder === folder.id
                        ? "sidebar-active"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {folder.name}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFolderToDelete(folder);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--text-sub)] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    title="폴더 삭제"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
        />
      )}
    </>
  );
}
