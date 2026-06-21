import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import BrowseListings from "@/components/BrowseListings";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryIcon from "@/components/CategoryIcon";
import Link from "next/link";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  return { title: cat ? `${cat.name} | سوق دي زاد` : "فئة غير موجودة" };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();

  return (
    <div>
      <div
        className="border-b border-gray-100"
        style={{
          background: `linear-gradient(to left, ${cat.color}15, transparent)`,
        }}
      >
        <div className="container-page py-5">
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "الفئات", href: "/annonces" },
              { label: cat.name },
            ]}
          />
          <div className="mt-3 flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: cat.color }}
            >
              <CategoryIcon name={cat.icon} className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-ink">{cat.name}</h1>
              <p className="text-sm text-ink-light">
                {cat.count.toLocaleString("fr-DZ")} إعلان متاح
              </p>
            </div>
          </div>

          {cat.subcategories && (
            <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto">
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/annonces?category=${cat.slug}`}
                  className="chip whitespace-nowrap border border-gray-200 bg-white py-1.5 text-ink-light hover:border-primary-400 hover:text-primary-600"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <BrowseListings initialCategory={cat.slug} />
    </div>
  );
}
