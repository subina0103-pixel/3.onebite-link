import { LinkItem } from "@/app/lib/mockData";

const FAVICON_COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-amber-500",
];

function getFaviconColor(id: string) {
  return FAVICON_COLORS[parseInt(id) % FAVICON_COLORS.length];
}

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
      <div className="flex items-start gap-3">
        <div
          className={`${getFaviconColor(link.id)} w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-sm`}
        >
          {link.title[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate">
            {link.title}
          </h3>
          <p className="text-xs text-blue-500 truncate mt-0.5">{link.url}</p>
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
            {link.description}
          </p>
        </div>
      </div>
    </div>
  );
}
