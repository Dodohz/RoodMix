"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import CategoriesGrid from "@/components/CategoriesGrid";
import ListingsSection from "@/components/ListingsSection";
import { fetchAllListings } from "@/lib/listings-service";
import { Listing } from "@/lib/types";
import Link from "next/link";
import { PlusCircle, Download, Loader2 } from "lucide-react";

export default function HomePage() {
  const [all, setAll] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchAllListings().then(setAll);
  }, []);

  const featured = all?.filter((l) => l.featured) ?? [];
  const recent = all?.slice(0, 10) ?? [];

  return (
    <>
      <Hero />
      <CategoriesGrid />

      {all === null ? (
        <div className="flex justify-center py-16 text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <ListingsSection
              title="إعلانات مميزة"
              listings={featured}
              accent
              href="/annonces?featured=1"
            />
          )}

          {/* CTA banner */}
          <section className="container-page py-8">
            <div className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-l from-ink to-ink-light p-8 text-white sm:flex-row">
              <div className="text-center sm:text-right">
                <h3 className="text-2xl font-extrabold">لديك شيء تريد بيعه؟</h3>
                <p className="mt-1 text-white/80">
                  انشر إعلانك مجاناً ووصل لآلاف المشترين في دقائق
                </p>
              </div>
              <Link
                href="/publier"
                className="btn-accent shrink-0 !px-6 !py-3 !text-base"
              >
                <PlusCircle className="h-5 w-5" />
                انشر إعلانك الآن
              </Link>
            </div>
          </section>

          <ListingsSection title="أحدث الإعلانات" listings={recent} accent />
        </>
      )}

      {/* App download */}
      <section className="container-page py-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-8 sm:flex-row">
          <div className="text-center sm:text-right">
            <h3 className="text-xl font-extrabold text-ink">
              حمّل تطبيق سوق دي زاد
            </h3>
            <p className="mt-1 text-ink-light">
              تصفح وانشر إعلاناتك من هاتفك بكل سهولة
            </p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="btn-outline !py-3">
              <Download className="h-5 w-5" /> App Store
            </a>
            <a href="#" className="btn-outline !py-3">
              <Download className="h-5 w-5" /> Google Play
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
