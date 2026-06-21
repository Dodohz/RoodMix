export interface Category {
  slug: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  subcategories?: { slug: string; name: string }[];
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number | null;
  priceLabel?: string; // e.g. "قابل للتفاوض", "مجاني"
  category: string; // category slug
  subcategory?: string;
  condition?: "neuf" | "occasion";
  conditionLabel?: string;
  wilaya: string; // الولاية
  city?: string;
  images: string[];
  featured?: boolean;
  delivery?: boolean;
  createdAt: string; // ISO date
  views: number;
  seller: Seller;
  attributes?: { label: string; value: string }[];
}

export interface Seller {
  uid?: string; // معرّف المستخدم في Firebase (للإعلانات الحقيقية)
  name: string;
  avatar: string;
  type: "particulier" | "professionnel";
  phone: string;
  memberSince: string;
  rating?: number;
  verified?: boolean;
}

/** بيانات المستخدم المخزّنة في مجموعة users بـ Firestore */
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  wilaya?: string;
  type: "particulier" | "professionnel";
  avatar: string;
  createdAt: string;
}

/** المدخلات المطلوبة لإنشاء إعلان جديد */
export interface NewListingInput {
  title: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  category: string;
  subcategory?: string;
  condition?: "neuf" | "occasion";
  conditionLabel?: string;
  wilaya: string;
  city?: string;
  images: string[];
  delivery?: boolean;
  attributes?: { label: string; value: string }[];
}
