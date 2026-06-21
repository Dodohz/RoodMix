import Link from "next/link";
import { categories } from "@/lib/categories";
import CategoryIcon from "./CategoryIcon";

export default function CategoriesGrid() {
  return (
    <section className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
          تصفح حسب الفئة
        </h2>
        <Link
          href="/annonces"
          className="text-sm font-semibold text-primary-600 hover:underline"
        >
          عرض الكل
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorie/${cat.slug}`}
            className="card group flex flex-col items-center gap-2 p-4 text-center hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110"
              style={{ backgroundColor: cat.color }}
            >
              <CategoryIcon name={cat.icon} className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold leading-tight text-ink sm:text-sm">
              {cat.name}
            </span>
            <span className="text-[11px] text-gray-400">
              {cat.count.toLocaleString("fr-DZ")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
