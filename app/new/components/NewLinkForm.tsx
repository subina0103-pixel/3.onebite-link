"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { folders } from "@/app/lib/mockData";

type Props = {
  selectedFolder: string | null;
};

export default function NewLinkForm({ selectedFolder }: Props) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(selectedFolder ?? "");

  useEffect(() => {
    setFolderId(selectedFolder ?? "");
  }, [selectedFolder]);

  function handleSave() {
    router.push("/");
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold text-[var(--text)] mb-6">새 링크 추가</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">링크 URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input-base"
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
        <button onClick={handleSave} className="btn-primary justify-center mt-1 w-full py-2.5">
          저장
        </button>
      </div>
    </div>
  );
}
