import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-1 text-sm text-ink-light">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="hover:text-primary-600">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-ink">{item.label}</span>
          )}
          {i < items.length - 1 && (
            <ChevronLeft className="h-4 w-4 text-gray-300" />
          )}
        </span>
      ))}
    </nav>
  );
}
