"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X, Grid2x2, List, MapPin, Loader2 } from "lucide-react";
import { fetchAllListings } from "@/lib/listings-service";
import { Listing } from "@/lib/types";
import { categories, wilayas } from "@/lib/categories";
import ListingCard from "./ListingCard";

interface Props {
  initialCategory?: string;
  initialQuery?: string;
  initialFeatured?: boolean;
}

type SortKey = "recent" | "price-asc" | "price-desc" | "views";

export default function BrowseListings({
  initialCategory = "",
  initialQuery = "",
  initialFeatured = false,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [wilaya, setWilaya] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(initialFeatured);
  const [sort, setSort] = useState<SortKey>("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [allListings, setAllListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchAllListings().then(setAllListings);
  }, []);

  const results = useMemo(() => {
    let r = [...(allListings ?? [])];
    if (query)
      r = r.filter(
        (l) =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.description.toLowerCase().includes(query.toLowerCase())
      );
    if (category) r = r.filter((l) => l.category === category);
    if (wilaya) r = r.filter((l) => l.wilaya === wilaya);
    if (condition) r = r.filter((l) => l.condition === condition);
    if (deliveryOnly) r = r.filter((l) => l.delivery);
    if (featuredOnly) r = r.filter((l) => l.featured);
    if (minPrice) r = r.filter((l) => (l.price ?? 0) >= Number(minPrice));
    if (maxPrice) r = r.filter((l) => (l.price ?? Infinity) <= Number(maxPrice));

    switch (sort) {
      case "price-asc":
        r.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "price-desc":
        r.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "views":
        r.sort((a, b) => b.views - a.views);
        break;
      default:
        r.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return r;
  }, [query, category, wilaya, condition, deliveryOnly, featuredOnly, minPrice, maxPrice, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setWilaya("");
    setCondition("");
    setMinPrice("");
    setMaxPrice("");
    setDeliveryOnly(false);
    setFeaturedOnly(false);
  };

  const FilterPanel = (
    <div className="space-y-5">
      <div>
        <label className="label">الفئة</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="">كل الفئات</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">الولاية</label>
        <select
          value={wilaya}
          onChange={(e) => setWilaya(e.target.value)}
          className="input"
        >
          <option value="">كل الولايات</option>
          {wilayas.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">الحالة</label>
        <div className="flex gap-2">
          {[
            ["", "الكل"],
            ["neuf", "جديد"],
            ["occasion", "مستعمل"],
          ].map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setCondition(val)}
              className={`chip flex-1 justify-center border py-2 ${
                condition === val
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-gray-200 text-ink-light"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">السعر (دج)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="من"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="إلى"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={deliveryOnly}
            onChange={(e) => setDeliveryOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-primary-600"
          />
          توصيل متاح فقط
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-primary-600"
          />
          إعلانات مميزة فقط
        </label>
      </div>

      <button onClick={resetFilters} className="btn-outline w-full">
        إعادة تعيين الفلاتر
      </button>
    </div>
  );

  return (
    <div className="container-page py-6">
      {/* Search bar */}
      <div className="mb-5 flex items-stretch overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-primary-500">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في الإعلانات..."
          className="w-full px-4 py-2.5 text-sm outline-none"
        />
        <span className="flex items-center px-3 text-gray-400">
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <div className="flex gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="card sticky top-28 p-5">
            <h3 className="mb-4 flex items-center gap-2 font-bold text-ink">
              <SlidersHorizontal className="h-5 w-5" /> تصفية النتائج
            </h3>
            {FilterPanel}
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-light">
              <span className="font-bold text-ink">{results.length}</span> إعلان
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(true)}
                className="btn-outline !py-2 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> فلترة
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="input !w-auto !py-2"
              >
                <option value="recent">الأحدث</option>
                <option value="price-asc">السعر: الأقل أولاً</option>
                <option value="price-desc">السعر: الأعلى أولاً</option>
                <option value="views">الأكثر مشاهدة</option>
              </select>
              <div className="hidden items-center rounded-lg border border-gray-200 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 ${view === "grid" ? "text-primary-600" : "text-gray-400"}`}
                >
                  <Grid2x2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 ${view === "list" ? "text-primary-600" : "text-gray-400"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {allListings === null ? (
            <div className="flex justify-center py-20 text-gray-400">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : results.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="text-5xl">🔍</div>
              <h3 className="text-lg font-bold text-ink">لا توجد نتائج</h3>
              <p className="text-sm text-ink-light">
                جرّب تعديل الفلاتر أو كلمات البحث
              </p>
              <button onClick={resetFilters} className="btn-primary mt-2">
                إعادة تعيين
              </button>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
                  : "space-y-3"
              }
            >
              {results.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">تصفية النتائج</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setShowFilters(false)}
              className="btn-primary mt-4 w-full"
            >
              عرض {results.length} نتيجة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
