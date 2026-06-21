"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, wilayas } from "@/lib/categories";
import CategoryIcon from "./CategoryIcon";
import { useAuth } from "@/context/AuthContext";
import { createListing } from "@/lib/listings-service";
import { uploadImages } from "@/lib/storage";
import {
  ImagePlus,
  Check,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Loader2,
  AlertCircle,
  LogIn,
} from "lucide-react";

const steps = ["الفئة", "التفاصيل", "الصور والسعر", "تأكيد"];

interface PreviewImage {
  file: File;
  url: string;
}

export default function PublishForm() {
  const router = useRouter();
  const { user, configured, asSeller, loading: authLoading } = useAuth();

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [condition, setCondition] = useState<"neuf" | "occasion">("occasion");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [delivery, setDelivery] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [newId, setNewId] = useState<string | null>(null);

  // تنظيف روابط المعاينة عند الخروج
  useEffect(() => {
    return () => images.forEach((i) => URL.revokeObjectURL(i.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canNext = () => {
    if (step === 0) return !!category;
    if (step === 1) return title.length > 4 && description.length > 9 && !!wilaya;
    return true;
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setImages((prev) => [...prev, ...previews].slice(0, 8));
  };

  const removeImage = (i: number) => {
    setImages((prev) => {
      const target = prev[i];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, j) => j !== i);
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (!configured) {
      setError("لم يتم إعداد Firebase بعد. راجع ملف FIREBASE_SETUP.md لتفعيل النشر الحقيقي.");
      return;
    }
    if (!user) {
      setError("يجب تسجيل الدخول أولاً لنشر إعلان.");
      return;
    }

    const seller = asSeller();
    if (!seller) {
      setError("تعذّر تحديد بيانات الحساب.");
      return;
    }

    setSubmitting(true);
    try {
      // 1) رفع الصور إلى Firebase Storage
      let imageUrls: string[] = [];
      if (images.length) {
        imageUrls = await uploadImages(
          images.map((i) => i.file),
          user.uid
        );
      }

      // 2) إنشاء الإعلان في Firestore
      const id = await createListing(
        {
          title,
          description,
          price: price ? Number(price) : null,
          priceLabel: price ? undefined : "السعر عند الطلب",
          category,
          condition,
          conditionLabel: condition === "neuf" ? "جديد" : "مستعمل",
          wilaya,
          images: imageUrls,
          delivery,
        },
        seller
      );

      setNewId(id);
      setDone(true);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "تعذّر نشر الإعلان، حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- شاشة: غير مسجّل الدخول ---------- */
  if (!authLoading && !user) {
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <LogIn className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-ink">
          سجّل الدخول لنشر إعلان
        </h2>
        <p className="mt-2 text-ink-light">
          يجب أن يكون لديك حساب لنشر إعلاناتك ومتابعتها.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="btn-primary">
            تسجيل الدخول
          </Link>
          <Link href="/register" className="btn-outline">
            إنشاء حساب
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- شاشة: تم النشر ---------- */
  if (done) {
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <PartyPopper className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-ink">
          تم نشر إعلانك بنجاح! 🎉
        </h2>
        <p className="mt-2 text-ink-light">إعلانك أصبح الآن مرئياً للجميع.</p>
        <div className="mt-6 flex justify-center gap-3">
          {newId && (
            <Link href={`/annonce?id=${newId}`} className="btn-primary">
              عرض الإعلان
            </Link>
          )}
          <Link href="/dashboard" className="btn-outline">
            لوحة التحكم
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {i < step ? <Check className="h-5 w-5" /> : i + 1}
              </div>
              <span
                className={`hidden text-xs sm:block ${
                  i === step ? "font-bold text-ink" : "text-gray-400"
                }`}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  i < step ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="card p-6">
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Step 0: Category */}
        {step === 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-ink">اختر الفئة</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  className={`flex items-center gap-3 rounded-xl border-2 p-3 text-right transition ${
                    category === cat.slug
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    <CategoryIcon name={cat.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-ink">تفاصيل الإعلان</h2>
            <div>
              <label className="label">عنوان الإعلان *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: iPhone 15 Pro Max جديد مختوم"
                className="input"
              />
            </div>
            <div>
              <label className="label">الوصف *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="اكتب وصفاً مفصلاً للمنتج..."
                className="input resize-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label">الولاية *</label>
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="input"
                >
                  <option value="">اختر الولاية</option>
                  {wilayas.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">الحالة</label>
                <div className="flex gap-2">
                  {[
                    ["neuf", "جديد"],
                    ["occasion", "مستعمل"],
                  ].map(([val, lbl]) => (
                    <button
                      key={val}
                      onClick={() => setCondition(val as "neuf" | "occasion")}
                      className={`chip flex-1 justify-center border py-2.5 ${
                        condition === val
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-ink-light"
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Images & price */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-ink">الصور والسعر</h2>
            <div>
              <label className="label">الصور (حتى 8 صور)</label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-primary-400 hover:text-primary-500">
                  <ImagePlus className="h-7 w-7" />
                  <span className="text-xs">أضف صورة</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImages}
                    className="hidden"
                  />
                </label>
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={`صورة ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="label">السعر (دج)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="أدخل السعر"
                className="input"
              />
              <p className="mt-1 text-xs text-gray-400">
                اتركه فارغاً إذا كان السعر عند الطلب
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
                className="h-4 w-4 rounded accent-primary-600"
              />
              التوصيل متاح
            </label>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-ink">مراجعة الإعلان</h2>
            <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
              <Row label="الفئة" value={categories.find((c) => c.slug === category)?.name || "-"} />
              <Row label="العنوان" value={title || "-"} />
              <Row label="الولاية" value={wilaya || "-"} />
              <Row label="الحالة" value={condition === "neuf" ? "جديد" : "مستعمل"} />
              <Row
                label="السعر"
                value={price ? `${Number(price).toLocaleString("fr-DZ")} دج` : "عند الطلب"}
              />
              <Row label="التوصيل" value={delivery ? "متاح" : "غير متاح"} />
              <Row label="عدد الصور" value={String(images.length)} />
            </div>
            <label className="flex items-start gap-2 text-sm text-ink-light">
              <input type="checkbox" defaultChecked className="mt-1 accent-primary-600" />
              أوافق على شروط الاستخدام وسياسة الخصوصية
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || submitting}
            className="btn-outline disabled:opacity-0"
          >
            <ChevronRight className="h-4 w-4" /> السابق
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => canNext() && setStep((s) => s + 1)}
              disabled={!canNext()}
              className="btn-primary"
            >
              التالي <ChevronLeft className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> جارٍ النشر...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" /> نشر الإعلان
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
