"use client";

import { Folder } from "@/app/lib/mockData";

type Props = {
  folders: Folder[];
  activeFolder: string | null;
  onSelect: (folderId: string | null) => void;
};

export default function Sidebar({ folders, activeFolder, onSelect }: Props) {
  return (
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
              <button
                key={folder.id}
                onClick={() => onSelect(folder.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm sidebar-item ${
                  activeFolder === folder.id
                    ? "sidebar-active"
                    : "text-[var(--text)]"
                }`}
              >
                {folder.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
