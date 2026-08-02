"use client";

import { useFolders } from "@/app/lib/FoldersContext";
import { Folder } from "@/app/lib/mockData";

type Props = {
  folder: Folder;
  onClose: () => void;
};

export default function DeleteFolderModal({ folder, onClose }: Props) {
  const { deleteFolder } = useFolders();

  async function handleDelete() {
    await deleteFolder(folder.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-[var(--card-bg)] rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-semibold text-[var(--text)] mb-2">
          폴더 삭제
        </h2>
        <p className="text-sm text-[var(--text-sub)] mb-6">
          &ldquo;{folder.name}&rdquo; 폴더를 삭제하시겠습니까?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-sm text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
