"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Menu,
  X,
  User,
  Heart,
  Bell,
  PlusCircle,
  ChevronDown,
  MapPin,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { categories } from "@/lib/categories";
import CategoryIcon from "./CategoryIcon";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, profile, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="container-page flex h-16 items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-lg font-extrabold text-white">
              س
            </div>
            <span className="hidden text-xl font-extrabold text-ink sm:block">
              سوق<span className="text-primary-600">دي زاد</span>
            </span>
          </Link>

          {/* Search */}
          <form
            action="/annonces"
            className="hidden flex-1 items-center md:flex"
          >
            <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-gray-300 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
              <input
                name="q"
                placeholder="ابحث عن سيارة، هاتف، شقة..."
                className="w-full px-4 py-2.5 text-sm outline-none"
              />
              <div className="hidden items-center gap-1 border-r border-gray-200 px-3 text-sm text-ink-light lg:flex">
                <MapPin className="h-4 w-4" />
                <select
                  name="wilaya"
                  className="bg-transparent text-sm outline-none"
                  defaultValue=""
                >
                  <option value="">كل الولايات</option>
                  <option>الجزائر</option>
                  <option>وهران</option>
                  <option>قسنطينة</option>
                  <option>عنابة</option>
                </select>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                <Search className="h-4 w-4" />
                بحث
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="ms-auto flex items-center gap-1 md:ms-0">
            <Link
              href="/favoris"
              className="hidden rounded-lg p-2.5 text-ink-light hover:bg-gray-100 sm:block"
              aria-label="المفضلة"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="hidden rounded-lg p-2.5 text-ink-light hover:bg-gray-100 sm:block"
              aria-label="الإشعارات"
            >
              <Bell className="h-5 w-5" />
            </Link>

            {!loading && user ? (
              <div
                className="relative hidden sm:block"
                onMouseEnter={() => setUserMenu(true)}
                onMouseLeave={() => setUserMenu(false)}
              >
                <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-ink hover:bg-gray-100">
                  <Image
                    src={
                      profile?.avatar ||
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "U")}&background=e81111&color=fff`
                    }
                    alt={profile?.name || "حسابي"}
                    width={30}
                    height={30}
                    className="h-7 w-7 rounded-full"
                  />
                  <span className="hidden max-w-[100px] truncate lg:block">
                    {profile?.name || "حسابي"}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenu && (
                  <div className="absolute left-0 top-full z-50 w-48 rounded-xl border border-gray-100 bg-white p-1.5 shadow-card-hover animate-fade-in">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-gray-50"
                    >
                      <LayoutDashboard className="h-4 w-4" /> لوحة التحكم
                    </Link>
                    <Link
                      href="/favoris"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-gray-50"
                    >
                      <Heart className="h-4 w-4" /> المفضلة
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink-light hover:bg-gray-100 sm:flex"
              >
                <User className="h-5 w-5" />
                دخول
              </Link>
            )}

            <Link href="/publier" className="btn-accent !px-3 sm:!px-4">
              <PlusCircle className="h-5 w-5" />
              <span className="hidden sm:inline">نشر إعلان</span>
              <span className="sm:hidden">نشر</span>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-ink md:hidden"
              aria-label="القائمة"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories nav (desktop) */}
      <nav className="hidden border-b border-gray-100 bg-white md:block">
        <div className="container-page flex h-11 items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-ink hover:bg-gray-100">
              <Menu className="h-4 w-4" />
              كل الفئات
              <ChevronDown className="h-4 w-4" />
            </button>
            {catOpen && (
              <div className="absolute right-0 top-full z-50 grid w-[640px] grid-cols-2 gap-1 rounded-xl border border-gray-100 bg-white p-3 shadow-card-hover animate-fade-in">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categorie/${cat.slug}`}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-gray-50"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      <CategoryIcon name={cat.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {cat.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {cat.count.toLocaleString("fr-DZ")} إعلان
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="hide-scrollbar flex items-center gap-1 overflow-x-auto">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-ink-light hover:bg-gray-100 hover:text-ink"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile search */}
      <div className="border-b border-gray-100 px-4 py-2.5 md:hidden">
        <form action="/annonces" className="flex items-center">
          <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-gray-300">
            <input
              name="q"
              placeholder="ابحث..."
              className="w-full px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="flex items-center bg-primary-600 px-4 text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white shadow-xl animate-fade-in">
            <div className="flex items-center justify-between border-b p-4">
              <span className="text-lg font-extrabold">
                سوق<span className="text-primary-600">دي زاد</span>
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-1 border-b p-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg p-3">
                    <Image
                      src={
                        profile?.avatar ||
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=U&background=e81111&color=fff`
                      }
                      alt="حسابي"
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full"
                    />
                    <span className="font-semibold">
                      {profile?.name || "حسابي"}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
                  >
                    <LayoutDashboard className="h-5 w-5" /> لوحة التحكم
                  </Link>
                  <Link
                    href="/favoris"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
                  >
                    <Heart className="h-5 w-5" /> المفضلة
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" /> تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
                  >
                    <User className="h-5 w-5" /> تسجيل الدخول
                  </Link>
                  <Link
                    href="/favoris"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
                  >
                    <Heart className="h-5 w-5" /> المفضلة
                  </Link>
                </>
              )}
            </div>
            <div className="p-3">
              <div className="mb-2 px-2 text-xs font-bold text-gray-400">
                الفئات
              </div>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categorie/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-gray-50"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    <CategoryIcon name={cat.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
