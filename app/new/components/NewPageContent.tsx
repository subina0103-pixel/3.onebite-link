"use client";

import { useState } from "react";
import { folders } from "@/app/lib/mockData";
import Sidebar from "@/app/components/Sidebar";
import NewLinkForm from "./NewLinkForm";

export default function NewPageContent() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        onSelect={setActiveFolder}
      />
      <main className="flex-1 overflow-y-auto bg-[var(--bg)] p-6">
        <NewLinkForm selectedFolder={activeFolder} />
      </main>
    </div>
  );
}
