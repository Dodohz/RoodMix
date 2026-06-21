"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle, ShieldCheck, Star, Flag, Share2 } from "lucide-react";
import { Seller } from "@/lib/types";

export default function ContactBox({ seller }: { seller: Seller }) {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="card p-5">
      {/* Seller */}
      <div className="flex items-center gap-3">
        <Image
          src={seller.avatar}
          alt={seller.name}
          width={52}
          height={52}
          className="h-13 w-13 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-bold text-ink">{seller.name}</span>
            {seller.verified && (
              <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-light">
            <span>
              {seller.type === "professionnel" ? "بائع محترف" : "بائع خاص"}
            </span>
            {seller.rating && (
              <span className="flex items-center gap-0.5">
                <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                {seller.rating}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400">عضو منذ {seller.memberSince}</div>
        </div>
      </div>

      {/* Contact buttons */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => setShowPhone(true)}
          className="btn-primary w-full !py-3"
        >
          <Phone className="h-5 w-5" />
          {showPhone ? seller.phone : "إظهار رقم الهاتف"}
        </button>
        <a
          href={`https://wa.me/213${seller.phone.replace(/[^0-9]/g, "").slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full !py-3 bg-green-600 text-white hover:bg-green-700"
        >
          <MessageCircle className="h-5 w-5" />
          مراسلة عبر واتساب
        </a>
      </div>

      {/* Secondary actions */}
      <div className="mt-4 flex items-center justify-around border-t border-gray-100 pt-3 text-sm text-ink-light">
        <button className="flex items-center gap-1.5 hover:text-primary-600">
          <Share2 className="h-4 w-4" /> مشاركة
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary-600">
          <Flag className="h-4 w-4" /> إبلاغ
        </button>
      </div>

      {/* Safety tip */}
      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
        ⚠️ <strong>نصيحة أمان:</strong> لا تدفع مقدماً أبداً. قابل البائع في مكان
        عام وتأكد من المنتج قبل الدفع.
      </div>
    </div>
  );
}
