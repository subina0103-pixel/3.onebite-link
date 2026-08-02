"use client";

import { useState } from "react";
import { useFolders } from "@/app/lib/FoldersContext";
import { Folder } from "@/app/lib/mockData";

type Props = {
  folder: Folder;
  onClose: () => void;
};

export default function EditFolderModal({ folder, onClose }: Props) {
  const [name, setName] = useState(folder.name);
  const { updateFolder } = useFolders();

  async function handleSave() {
    if (!name.trim()) return;
    await updateFolder(folder.id, name.trim());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-[var(--card-bg)] rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-semibold text-[var(--text)] mb-4">
          폴더 수정
        </h2>
        <input
          className="input-base mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button onClick={handleSave} className="btn-primary text-sm">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
