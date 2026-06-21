import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as fbLimit,
  serverTimestamp,
  Timestamp,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Listing, NewListingInput, Seller } from "./types";
import { listings as mockListings } from "./mock-listings";

const COL = "listings";

/* ------------------------------------------------------------------ *
 *  تحويل مستند Firestore إلى كائن Listing
 * ------------------------------------------------------------------ */
function fromDoc(id: string, data: Record<string, unknown>): Listing {
  const created = data.createdAt;
  let createdAt = new Date().toISOString();
  if (created instanceof Timestamp) createdAt = created.toDate().toISOString();
  else if (typeof created === "string") createdAt = created;

  return {
    id,
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    price: (data.price as number | null) ?? null,
    priceLabel: data.priceLabel as string | undefined,
    category: (data.category as string) || "autres",
    subcategory: data.subcategory as string | undefined,
    condition: data.condition as Listing["condition"],
    conditionLabel: data.conditionLabel as string | undefined,
    wilaya: (data.wilaya as string) || "",
    city: data.city as string | undefined,
    images:
      (data.images as string[])?.length
        ? (data.images as string[])
        : ["https://picsum.photos/seed/" + id + "/800/600"],
    featured: (data.featured as boolean) || false,
    delivery: (data.delivery as boolean) || false,
    createdAt,
    views: (data.views as number) || 0,
    seller: (data.seller as Seller) || {
      name: "مستخدم",
      avatar: "https://ui-avatars.com/api/?name=U&background=e81111&color=fff",
      type: "particulier",
      phone: "",
      memberSince: "2025",
    },
    attributes: (data.attributes as Listing["attributes"]) || [],
  };
}

/* ================================================================== *
 *  دوال القراءة (تعمل في الخادم والعميل)
 * ================================================================== */

export async function fetchAllListings(): Promise<Listing[]> {
  if (!isFirebaseConfigured || !db) return mockListings;
  try {
    const q = query(collection(db, COL), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const items = snap.docs.map((d) => fromDoc(d.id, d.data()));
    return items.length ? items : mockListings;
  } catch (e) {
    console.error("fetchAllListings error:", e);
    return mockListings;
  }
}

export async function fetchListing(id: string): Promise<Listing | null> {
  if (!isFirebaseConfigured || !db) {
    return mockListings.find((l) => l.id === id) || null;
  }
  try {
    const snap = await getDoc(doc(db, COL, id));
    if (snap.exists()) return fromDoc(snap.id, snap.data());
    return mockListings.find((l) => l.id === id) || null;
  } catch (e) {
    console.error("fetchListing error:", e);
    return mockListings.find((l) => l.id === id) || null;
  }
}

export async function fetchFeatured(): Promise<Listing[]> {
  const all = await fetchAllListings();
  const featured = all.filter((l) => l.featured);
  return featured.length ? featured : all.slice(0, 6);
}

export async function fetchRecent(n = 12): Promise<Listing[]> {
  const all = await fetchAllListings();
  return all.slice(0, n);
}

export async function fetchByCategory(slug: string): Promise<Listing[]> {
  const all = await fetchAllListings();
  return all.filter((l) => l.category === slug);
}

export function getRelated(listing: Listing, all: Listing[], n = 4): Listing[] {
  return all
    .filter((l) => l.id !== listing.id && l.category === listing.category)
    .slice(0, n);
}

export async function fetchUserListings(uid: string): Promise<Listing[]> {
  if (!isFirebaseConfigured || !db) {
    return mockListings.slice(0, 5);
  }
  try {
    const q = query(collection(db, COL), where("seller.uid", "==", uid));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => fromDoc(d.id, d.data()))
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } catch (e) {
    console.error("fetchUserListings error:", e);
    return [];
  }
}

/* ================================================================== *
 *  دوال الكتابة (العميل فقط)
 * ================================================================== */

export async function createListing(
  input: NewListingInput,
  seller: Seller
): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("لم يتم إعداد Firebase — لا يمكن نشر إعلان حقيقي.");
  }
  const ref = await addDoc(collection(db, COL), {
    ...input,
    images: input.images.length ? input.images : [],
    featured: false,
    views: 0,
    seller,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteListing(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  await deleteDoc(doc(db, COL, id));
}

export async function incrementViews(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    await updateDoc(doc(db, COL, id), { views: increment(1) });
  } catch {
    /* تجاهل */
  }
}

/* أداة مساعدة لتعرف الواجهة إن كان الوضع حقيقياً أم تجريبياً */
export { isFirebaseConfigured };
