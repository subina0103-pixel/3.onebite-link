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
      <h2 className="text-lg font-semibold text-gray-900 mb-6">새 링크 추가</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">링크 URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">폴더</label>
          <select
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">폴더 선택</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSave}
          className="mt-1 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2.5 rounded-lg text-sm"
        >
          저장
        </button>
      </div>
    </div>
  );
}
