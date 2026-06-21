"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, MapPin, Star, Truck, Eye } from "lucide-react";
import { Listing } from "@/lib/types";
import { formatPrice, timeAgo, formatViews } from "@/lib/utils";

export default function ListingCard({ listing }: { listing: Listing }) {
  const [fav, setFav] = useState(false);

  return (
    <Link
      href={`/annonce?id=${listing.id}`}
      className="card group block overflow-hidden hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {listing.featured && (
          <span className="absolute top-2 right-2 chip bg-accent-400 text-ink shadow">
            <Star className="h-3 w-3 fill-current" /> مميز
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFav((f) => !f);
          }}
          className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-light shadow transition hover:scale-110"
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={`h-4 w-4 ${fav ? "fill-primary-600 text-primary-600" : ""}`}
          />
        </button>
        {listing.conditionLabel && (
          <span className="absolute bottom-2 right-2 chip bg-black/60 text-white">
            {listing.conditionLabel}
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight text-ink group-hover:text-primary-600">
          {listing.title}
        </h3>
        <div className="mt-2 text-lg font-extrabold text-primary-600">
          {formatPrice(listing.price, listing.priceLabel)}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {listing.wilaya}
          </span>
          <span>{timeAgo(listing.createdAt)}</span>
        </div>
        <div className="mt-2 flex items-center gap-3 border-t border-gray-50 pt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {formatViews(listing.views)}
          </span>
          {listing.delivery && (
            <span className="flex items-center gap-1 text-green-600">
              <Truck className="h-3.5 w-3.5" /> توصيل
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
