"use client";

import { useState } from "react";
import { useFolders } from "@/app/lib/FoldersContext";
import { useLinks } from "@/app/lib/LinksContext";
import { LinkItem } from "@/app/lib/mockData";

type Props = {
  link: LinkItem;
  onClose: () => void;
};

export default function EditLinkModal({ link, onClose }: Props) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [folderId, setFolderId] = useState(link.folderId);

  function handleSave() {
    updateLink(link.id, { title, description, folderId });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-[var(--card-bg)] rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-semibold text-[var(--text)] mb-5">
          링크 수정
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="input-base resize-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">폴더</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="input-base"
            >
              <option value="">폴더 선택</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-sm text-white bg-[var(--accent)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
