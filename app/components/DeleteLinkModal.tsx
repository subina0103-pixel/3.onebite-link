"use client";

import { useLinks } from "@/app/lib/LinksContext";
import { LinkItem } from "@/app/lib/mockData";

type Props = {
  link: LinkItem;
  onClose: () => void;
};

export default function DeleteLinkModal({ link, onClose }: Props) {
  const { deleteLink } = useLinks();

  function handleDelete() {
    deleteLink(link.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-[var(--card-bg)] rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-semibold text-[var(--text)] mb-2">
          링크 삭제
        </h2>
        <p className="text-sm text-[var(--text-sub)] mb-6">
          &ldquo;{link.title}&rdquo; 링크를 삭제하시겠습니까?
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
