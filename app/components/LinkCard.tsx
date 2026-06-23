import { folders, LinkItem } from "@/app/lib/mockData";

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
  return FAVICON_COLORS[parseInt(id) % FAVICON_COLORS.length];
}

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  const folder = folders.find((f) => f.id === link.folderId);

  return (
    <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--border)] p-4 card-hover cursor-pointer">
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
          <p className="text-xs text-[var(--accent)] truncate mt-0.5">{link.url}</p>
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
  );
}
