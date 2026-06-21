"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BrowseListings from "@/components/BrowseListings";
import Breadcrumb from "@/components/Breadcrumb";
import { Loader2 } from "lucide-react";

function AnnoncesContent() {
  const searchParams = useSearchParams();
  return (
    <div>
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[{ label: "الرئيسية", href: "/" }, { label: "كل الإعلانات" }]}
          />
          <h1 className="mt-2 text-2xl font-extrabold text-ink">
            تصفح الإعلانات
          </h1>
        </div>
      </div>
      <BrowseListings
        initialQuery={searchParams.get("q") || ""}
        initialCategory={searchParams.get("category") || ""}
        initialFeatured={searchParams.get("featured") === "1"}
      />
    </div>
  );
}

export default function AnnoncesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <AnnoncesContent />
    </Suspense>
  );
}
