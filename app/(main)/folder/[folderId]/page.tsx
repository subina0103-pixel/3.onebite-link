import FolderPageContent from "@/app/folder/[folderId]/components/FolderPageContent";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <FolderPageContent folderId={folderId} />
    </div>
  );
}
