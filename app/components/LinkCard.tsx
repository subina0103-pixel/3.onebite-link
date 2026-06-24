"use client";

import { useState } from "react";
import { useFolders } from "@/app/lib/FoldersContext";
import { LinkItem } from "@/app/lib/mockData";
import DeleteLinkModal from "./DeleteLinkModal";
import EditLinkModal from "./EditLinkModal";

const FAVICON_COLORS = [
  "bg-blue-400",
  "bg-violet-400",
  "bg-emerald-400",
  "bg-orange-400",
  "bg-rose-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-amber-400",
];

function getFaviconColor(id: string) {
  const num = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return FAVICON_COLORS[num % FAVICON_COLORS.length];
}

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  const { folders } = useFolders();
  const folder = folders.find((f) => f.id === link.folderId);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="relative bg-[var(--card-bg)] rounded-lg border border-[var(--border)] overflow-hidden card-hover cursor-pointer group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEdit(true);
          }}
          className="absolute top-2 right-10 z-10 w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-sub)] hover:text-[var(--accent)] hover:bg-[var(--hover-bg)] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="링크 수정"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDelete(true);
          }}
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-sub)] hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="링크 삭제"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>

        {link.thumbnail && (
          <img
            src={link.thumbnail}
            alt={link.title}
            className="w-full h-36 object-cover"
          />
        )}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={`${getFaviconColor(link.id)} w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm`}
            >
              {link.title[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--text)] text-sm truncate">
                {link.title}
              </h3>
              <p className="text-xs text-[var(--accent)] truncate mt-0.5">
                {link.url}
              </p>
              <p className="text-xs text-[var(--text-sub)] mt-1.5 line-clamp-2 leading-relaxed">
                {link.description}
              </p>
              {folder && (
                <span className="inline-block mt-2 px-2 py-0.5 text-xs text-[var(--text-sub)] bg-[var(--hover-bg)] rounded">
                  {folder.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditLinkModal link={link} onClose={() => setShowEdit(false)} />
      )}
      {showDelete && (
        <DeleteLinkModal link={link} onClose={() => setShowDelete(false)} />
      )}
    </>
  );
}
