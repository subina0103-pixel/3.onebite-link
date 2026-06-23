"use client";

import { Folder } from "@/app/lib/mockData";

type Props = {
  folders: Folder[];
  activeFolder: string | null;
  onSelect: (folderId: string | null) => void;
};

export default function Sidebar({ folders, activeFolder, onSelect }: Props) {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-y-auto">
      <div className="p-3 flex flex-col gap-1">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeFolder === null
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          ALL
        </button>

        <div className="mt-3">
          <p className="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            폴더
          </p>
          <div className="flex flex-col gap-0.5">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => onSelect(folder.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeFolder === folder.id
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
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
