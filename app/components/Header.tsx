"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "./NewFolderModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="h-12 flex-shrink-0 border-b border-[var(--border)] bg-[var(--card-bg)] flex items-center justify-between px-4">
        <Link
          href="/"
          className="text-base font-semibold text-[var(--text)] tracking-tight"
        >
          한입 링크
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 rounded-md text-sm text-[var(--text)] border border-[var(--border)] hover:bg-[var(--hover-bg)] transition-colors cursor-pointer"
          >
            + 새 폴더
          </button>
          <Link href="/new" className="btn-primary">
            + 새 링크
          </Link>
        </div>
      </header>
      {isModalOpen && (
        <NewFolderModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
