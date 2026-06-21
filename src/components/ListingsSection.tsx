import Link from "next/link";
import { Listing } from "@/lib/types";
import ListingCard from "./ListingCard";

export default function ListingsSection({
  title,
  listings,
  href = "/annonces",
  accent,
}: {
  title: string;
  listings: Listing[];
  href?: string;
  accent?: boolean;
}) {
  return (
    <section className="container-page py-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink sm:text-2xl">
          {accent && <span className="h-6 w-1.5 rounded bg-accent-400" />}
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm font-semibold text-primary-600 hover:underline"
        >
          عرض المزيد
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </section>
  );
}
