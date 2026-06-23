import Link from "next/link";

export default function Header() {
  return (
    <header className="h-12 flex-shrink-0 border-b border-[var(--border)] bg-[var(--card-bg)] flex items-center justify-between px-4">
      <Link href="/" className="text-base font-semibold text-[var(--text)] tracking-tight">
        한입 링크
      </Link>
      <Link href="/new" className="btn-primary">
        + 새 링크
      </Link>
    </header>
  );
}
