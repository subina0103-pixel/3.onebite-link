import Link from "next/link";

export default function Header() {
  return (
    <header className="h-14 flex-shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <Link href="/" className="text-lg font-bold text-blue-600 tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
      >
        + 새 링크
      </Link>
    </header>
  );
}
