"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/app/lib/FoldersContext";
import { useLinks } from "@/app/lib/LinksContext";

type Props = {
  selectedFolder: number | null;
};

export default function NewLinkForm({ selectedFolder }: Props) {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(
    selectedFolder != null ? String(selectedFolder) : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFolderId(selectedFolder != null ? String(selectedFolder) : "");
  }, [selectedFolder]);

  async function handleSave() {
    if (!url.trim()) {
      setError("URL을 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오픈 그래프 정보를 가져오지 못했습니다.");
      addLink({
        id: `link-${Date.now()}`,
        title: data.title || url,
        url: data.url || url,
        description: data.description || "",
        thumbnail: data.thumbnail ?? undefined,
        folderId,
      });
      router.push("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
        {error && (
          <p className="text-sm text-rose-500">{error}</p>
        )}
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary justify-center mt-1 w-full py-2.5 disabled:opacity-50"
        >
          {loading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}
