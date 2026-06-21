"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/context/AuthContext";
import {
  fetchUserListings,
  deleteListing,
} from "@/lib/listings-service";
import { Listing } from "@/lib/types";
import { formatPrice, timeAgo, formatViews } from "@/lib/utils";
import {
  Eye,
  Heart,
  ListChecks,
  TrendingUp,
  PlusCircle,
  Trash2,
  Settings,
  MessageSquare,
  Loader2,
  LogIn,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, loading, configured } = useAuth();
  const [myListings, setMyListings] = useState<Listing[] | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user && configured) {
      router.push("/login");
      return;
    }
    if (user) {
      fetchUserListings(user.uid).then(setMyListings);
    } else {
      // وضع تجريبي بدون Firebase
      fetchUserListings("demo").then(setMyListings);
    }
  }, [user, loading, configured, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإعلان؟")) return;
    setDeleting(id);
    try {
      await deleteListing(id);
      setMyListings((prev) => prev?.filter((l) => l.id !== id) ?? null);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // غير مسجّل + Firebase مُفعّل
  if (!user && configured) {
    return (
      <div className="card mx-auto my-16 max-w-lg p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <LogIn className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-ink">
          سجّل الدخول للوصول للوحة التحكم
        </h2>
        <Link href="/login" className="btn-primary mt-6">
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  const displayName = profile?.name || user?.displayName || "مستخدم تجريبي";
  const avatar =
    profile?.avatar ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=e81111&color=fff&bold=true&size=128`;
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).getFullYear()
    : "2025";

  const totalViews = (myListings ?? []).reduce((s, l) => s + l.views, 0);
  const stats = [
    { label: "إعلاناتي النشطة", value: myListings?.length ?? 0, icon: ListChecks, color: "bg-blue-500" },
    { label: "إجمالي المشاهدات", value: formatViews(totalViews), icon: Eye, color: "bg-purple-500" },
    { label: "في المفضلة", value: 0, icon: Heart, color: "bg-pink-500" },
    { label: "الرسائل", value: 0, icon: MessageSquare, color: "bg-green-500" },
  ];

  return (
    <div className="bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[{ label: "الرئيسية", href: "/" }, { label: "لوحة التحكم" }]}
          />
        </div>
      </div>

      <div className="container-page py-6">
        {/* Profile header */}
        <div className="card flex flex-col items-center gap-4 p-6 sm:flex-row sm:text-right">
          <Image
            src={avatar}
            alt={displayName}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full"
          />
          <div className="flex-1 text-center sm:text-right">
            <h1 className="text-xl font-extrabold text-ink">{displayName}</h1>
            <p className="text-sm text-ink-light">
              عضو منذ {memberSince}
              {profile?.wilaya ? ` · ${profile.wilaya}` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/publier" className="btn-primary">
              <PlusCircle className="h-5 w-5" /> نشر إعلان
            </Link>
            <button className="btn-outline">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card flex items-center gap-3 p-4">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${s.color}`}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xl font-extrabold text-ink">{s.value}</div>
                <div className="text-xs text-ink-light">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* My listings */}
        <div className="card mt-6 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <TrendingUp className="h-5 w-5 text-primary-600" /> إعلاناتي
            </h2>
            <Link
              href="/annonces"
              className="text-sm font-semibold text-primary-600 hover:underline"
            >
              عرض الكل
            </Link>
          </div>

          {myListings === null ? (
            <div className="flex justify-center py-12 text-gray-400">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>
          ) : myListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <ListChecks className="h-12 w-12 text-gray-300" />
              <p className="text-ink-light">لم تنشر أي إعلان بعد</p>
              <Link href="/publier" className="btn-primary">
                <PlusCircle className="h-5 w-5" /> انشر أول إعلان
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myListings.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                >
                  <Link
                    href={`/annonce?id=${l.id}`}
                    className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100"
                  >
                    <Image
                      src={l.images[0]}
                      alt={l.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/annonce?id=${l.id}`}
                      className="line-clamp-1 font-semibold text-ink hover:text-primary-600"
                    >
                      {l.title}
                    </Link>
                    <div className="mt-1 text-sm font-bold text-primary-600">
                      {formatPrice(l.price, l.priceLabel)}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> {formatViews(l.views)}
                      </span>
                      <span>{timeAgo(l.createdAt)}</span>
                      <span className="chip bg-green-50 text-green-700">نشط</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(l.id)}
                    disabled={deleting === l.id}
                    className="rounded-lg p-2 text-ink-light hover:bg-gray-100 hover:text-red-600"
                  >
                    {deleting === l.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
