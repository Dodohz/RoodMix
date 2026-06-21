"use client";

import { useAuth } from "@/context/AuthContext";
import { AlertTriangle } from "lucide-react";

export default function ConfigBanner() {
  const { configured } = useAuth();
  if (configured) return null;

  return (
    <div className="bg-amber-500 text-amber-950">
      <div className="container-page flex items-center justify-center gap-2 py-1.5 text-center text-xs font-medium sm:text-sm">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        وضع العرض التجريبي — لتفعيل المصادقة والنشر الحقيقي، أضف مفاتيح Firebase
        في ملف .env.local (راجع FIREBASE_SETUP.md)
      </div>
    </div>
  );
}
