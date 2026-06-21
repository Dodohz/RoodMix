import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import ConfigBanner from "@/components/ConfigBanner";

export const metadata: Metadata = {
  title: "سوق دي زاد | منصة الإعلانات المبوبة الأولى في الجزائر",
  description:
    "اشترِ وبِع كل شيء في الجزائر: سيارات، عقارات، هواتف، إعلام آلي، أثاث وأكثر. آلاف الإعلانات المجانية في كل الولايات.",
  keywords: [
    "إعلانات مبوبة",
    "الجزائر",
    "سيارات",
    "عقارات",
    "بيع",
    "شراء",
    "ouedkniss",
    "سوق",
  ],
  openGraph: {
    title: "سوق دي زاد | منصة الإعلانات المبوبة الأولى في الجزائر",
    description: "اشترِ وبِع كل شيء في الجزائر بسهولة وأمان.",
    type: "website",
    locale: "ar_DZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <ConfigBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
