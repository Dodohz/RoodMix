import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl font-extrabold text-primary-600">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">الصفحة غير موجودة</h1>
      <p className="mt-2 max-w-md text-ink-light">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">
          <Home className="h-5 w-5" /> الرئيسية
        </Link>
        <Link href="/annonces" className="btn-outline">
          <Search className="h-5 w-5" /> تصفح الإعلانات
        </Link>
      </div>
    </div>
  );
}
