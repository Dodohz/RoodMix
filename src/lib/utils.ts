export function formatPrice(price: number | null, label?: string): string {
  if (price === null) return label || "السعر عند الطلب";
  return new Intl.NumberFormat("fr-DZ").format(price) + " دج";
}

export function timeAgo(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2025-06-09T12:00:00Z");
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "الآن";
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  if (diff < 2592000) return `منذ ${Math.floor(diff / 86400)} يوم`;
  return `منذ ${Math.floor(diff / 2592000)} شهر`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatViews(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return String(n);
}
