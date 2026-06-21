/** @type {import('next').NextConfig} */
const nextConfig = {
  // التصدير الثابت — مطلوب للاستضافة على Firebase Hosting
  output: "export",
  reactStrictMode: true,
  images: {
    // Firebase Hosting يقدّم ملفات ثابتة، لذا نعطّل تحسين الصور من الخادم
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // روابط أنظف على الاستضافة الثابتة
  trailingSlash: true,
};

export default nextConfig;
