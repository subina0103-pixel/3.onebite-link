import Header from "@/app/components/Header";
import FolderPageContent from "./components/FolderPageContent";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <FolderPageContent folderId={folderId} />
    </div>
  );
}
