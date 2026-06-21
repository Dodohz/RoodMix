"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  authErrorMessage,
} from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { wilayas } from "@/lib/categories";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { configured } = useAuth();
  const isLogin = mode === "login";

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [type, setType] = useState<"particulier" | "professionnel">("particulier");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!configured) {
      setError("لم يتم إعداد Firebase بعد. راجع ملف FIREBASE_SETUP.md");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail({ name, email, password, phone, wilaya, type });
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code: string }).code)
          : "";
      setError(code ? authErrorMessage(code) : (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    if (!configured) {
      setError("لم يتم إعداد Firebase بعد. راجع ملف FIREBASE_SETUP.md");
      return;
    }
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code: string }).code)
          : "";
      setError(code ? authErrorMessage(code) : "تعذّر الدخول عبر Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-xl font-extrabold text-white">
              س
            </div>
            <span className="text-2xl font-extrabold text-ink">
              سوق<span className="text-primary-600">دي زاد</span>
            </span>
          </Link>
          <h1 className="mt-4 text-xl font-bold text-ink">
            {isLogin ? "مرحباً بعودتك" : "إنشاء حساب جديد"}
          </h1>
          <p className="text-sm text-ink-light">
            {isLogin
              ? "سجّل الدخول للوصول إلى حسابك"
              : "انضم إلى آلاف المستخدمين الآن"}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="الاسم الكامل"
                className="input pr-10"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="البريد الإلكتروني"
              className="input pr-10"
            />
          </div>

          {!isLogin && (
            <>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="رقم الهاتف (0xx xx xx xx)"
                  className="input pr-10"
                />
              </div>
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
              <div className="flex gap-2">
                {[
                  ["particulier", "خاص"],
                  ["professionnel", "محترف"],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setType(val as typeof type)}
                    className={`chip flex-1 justify-center border py-2.5 ${
                      type === val
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-gray-200 text-ink-light"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="relative">
            <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="كلمة المرور"
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-light">
                <input type="checkbox" className="accent-primary-600" /> تذكرني
              </label>
              <Link href="#" className="text-primary-600 hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-3"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          أو
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="btn-outline w-full"
        >
          المتابعة عبر Google
        </button>

        <p className="mt-6 text-center text-sm text-ink-light">
          {isLogin ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-semibold text-primary-600 hover:underline"
          >
            {isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
          </Link>
        </p>
      </div>
    </div>
  );
}
