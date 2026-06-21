import Link from "next/link";
import { Search, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-primary-700 via-primary-600 to-primary-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white" />
        <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-accent-400" />
      </div>

      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            كل ما تبحث عنه في مكان واحد
          </h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg">
            بيع واشترِ بسهولة وأمان — أكثر من{" "}
            <span className="font-bold text-accent-300">200,000</span> إعلان
            نشط في كل ولايات الجزائر
          </p>

          {/* Big search */}
          <form
            action="/annonces"
            className="mx-auto mt-8 flex max-w-2xl items-stretch overflow-hidden rounded-xl bg-white p-1.5 shadow-lg"
          >
            <input
              name="q"
              placeholder="ماذا تريد أن تشتري؟ سيارة، هاتف، شقة..."
              className="w-full bg-transparent px-4 text-sm text-ink outline-none sm:text-base"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 sm:px-7"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">بحث</span>
            </button>
          </form>

          {/* Quick tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-white/70">بحث شائع:</span>
            {["سيارات", "iPhone", "شقق للكراء", "لابتوب", "أثاث"].map((t) => (
              <Link
                key={t}
                href={`/annonces?q=${encodeURIComponent(t)}`}
                className="rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur hover:bg-white/25"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: "آمن وموثوق", sub: "بائعون موثقون" },
            { icon: Zap, title: "سريع ومجاني", sub: "انشر في دقيقة" },
            { icon: TrendingUp, title: "وصول واسع", sub: "آلاف المشترين" },
          ].map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 text-center text-white sm:flex-row sm:gap-3 sm:text-right"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold">{b.title}</div>
                <div className="text-xs text-white/70">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
