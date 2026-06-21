"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ListingCard from "@/components/ListingCard";
import { fetchFeatured } from "@/lib/listings-service";
import { Listing } from "@/lib/types";
import { Loader2, Heart } from "lucide-react";

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<Listing[] | null>(null);

  useEffect(() => {
    // ملاحظة: نظام المفضلة يُحفظ محلياً حالياً؛ نعرض إعلانات مميزة كنموذج.
    fetchFeatured().then(setFavorites);
  }, []);

  return (
    <div className="bg-gray-50 min-h-[60vh]">
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[{ label: "الرئيسية", href: "/" }, { label: "المفضلة" }]}
          />
          <h1 className="mt-2 text-2xl font-extrabold text-ink">
            إعلاناتي المفضلة
          </h1>
          <p className="text-sm text-ink-light">
            {favorites?.length ?? 0} إعلان محفوظ
          </p>
        </div>
      </div>
      <div className="container-page py-6">
        {favorites === null ? (
          <div className="flex justify-center py-16 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Heart className="h-12 w-12 text-gray-300" />
            <h3 className="text-lg font-bold text-ink">لا توجد إعلانات محفوظة</h3>
            <p className="text-sm text-ink-light">
              اضغط على القلب في أي إعلان لإضافته هنا
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favorites.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
