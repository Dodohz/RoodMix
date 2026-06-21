"use client";

import { Suspense, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import {
  fetchListing,
  fetchAllListings,
  getRelated,
  incrementViews,
} from "@/lib/listings-service";
import { Listing } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { formatPrice, timeAgo, formatViews } from "@/lib/utils";
import Gallery from "@/components/Gallery";
import ContactBox from "@/components/ContactBox";
import Breadcrumb from "@/components/Breadcrumb";
import ListingCard from "@/components/ListingCard";
import { MapPin, Eye, Clock, Truck, Tag, Loader2 } from "lucide-react";

function ListingContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [listing, setListing] = useState<Listing | null | undefined>(undefined);
  const [related, setRelated] = useState<Listing[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const l = await fetchListing(id);
      if (!mounted) return;
      setListing(l);
      if (l) {
        incrementViews(id);
        const all = await fetchAllListings();
        if (mounted) setRelated(getRelated(l, all));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (listing === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (listing === null) notFound();

  const cat = getCategory(listing.category);

  return (
    <div className="bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              ...(cat
                ? [{ label: cat.name, href: `/categorie/${cat.slug}` }]
                : []),
              { label: listing.title },
            ]}
          />
        </div>
      </div>

      <div className="container-page py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <Gallery images={listing.images} title={listing.title} />

            <div className="card mt-6 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-extrabold text-ink sm:text-2xl">
                    {listing.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-ink-light">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.wilaya}
                      {listing.city && ` - ${listing.city}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {timeAgo(listing.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {formatViews(listing.views)} مشاهدة
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-3xl font-extrabold text-primary-600">
                {formatPrice(listing.price, listing.priceLabel)}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {listing.conditionLabel && (
                  <span className="chip bg-gray-100 text-ink">
                    <Tag className="h-3.5 w-3.5" /> {listing.conditionLabel}
                  </span>
                )}
                {listing.delivery && (
                  <span className="chip bg-green-50 text-green-700">
                    <Truck className="h-3.5 w-3.5" /> توصيل متاح
                  </span>
                )}
              </div>
            </div>

            {/* Attributes */}
            {listing.attributes && listing.attributes.length > 0 && (
              <div className="card mt-6 p-5">
                <h2 className="mb-4 text-lg font-bold text-ink">التفاصيل</h2>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {listing.attributes.map((attr) => (
                    <div key={attr.label}>
                      <dt className="text-xs text-gray-400">{attr.label}</dt>
                      <dd className="font-semibold text-ink">{attr.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Description */}
            <div className="card mt-6 p-5">
              <h2 className="mb-3 text-lg font-bold text-ink">الوصف</h2>
              <p className="whitespace-pre-line leading-7 text-ink-light">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ContactBox seller={listing.seller} />
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-5 text-xl font-extrabold text-ink">
              إعلانات مشابهة
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ListingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <ListingContent />
    </Suspense>
  );
}
