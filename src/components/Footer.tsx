import Link from "next/link";
import { Facebook, Instagram, Youtube, Smartphone, Mail, MapPin } from "lucide-react";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-lg font-extrabold text-white">
                س
              </div>
              <span className="text-xl font-extrabold text-ink">
                سوق<span className="text-primary-600">دي زاد</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-ink-light">
              منصة الإعلانات المبوبة الأولى في الجزائر. اشترِ وبِع كل شيء بسهولة
              وأمان في جميع الولايات.
            </p>
            <div className="mt-4 flex gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-ink-light hover:bg-primary-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">الفئات</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categorie/${c.slug}`} className="hover:text-primary-600">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">روابط مفيدة</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              {[
                ["كيف تنشر إعلان؟", "/publier"],
                ["نصائح الأمان", "/securite"],
                ["الأسئلة الشائعة", "/faq"],
                ["اتصل بنا", "/contact"],
                ["من نحن", "/about"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-primary-600">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">قانوني</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              {[
                ["شروط الاستخدام", "/terms"],
                ["سياسة الخصوصية", "/privacy"],
                ["سياسة ملفات الارتباط", "/cookies"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-primary-600">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-ink-light">
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary-600" />
                0770 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-600" />
                contact@soukdz.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-600" />
                الجزائر العاصمة
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-gray-500 sm:flex-row">
          <p>© 2025 سوق دي زاد. جميع الحقوق محفوظة.</p>
          <p>صُنع بكل ❤️ في الجزائر</p>
        </div>
      </div>
    </footer>
  );
}
