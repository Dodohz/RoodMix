import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "./firebase";
import { UserProfile } from "./types";

const avatarFor = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "User"
  )}&background=e81111&color=fff&bold=true`;

function ensureConfigured() {
  if (!isFirebaseConfigured || !auth || !db) {
    throw new Error(
      "لم يتم إعداد Firebase. يرجى إضافة متغيرات البيئة في .env.local"
    );
  }
}

export async function registerWithEmail(params: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  wilaya?: string;
  type?: "particulier" | "professionnel";
}): Promise<User> {
  ensureConfigured();
  const cred = await createUserWithEmailAndPassword(
    auth!,
    params.email,
    params.password
  );
  await updateProfile(cred.user, {
    displayName: params.name,
    photoURL: avatarFor(params.name),
  });

  const profile: UserProfile = {
    uid: cred.user.uid,
    name: params.name,
    email: params.email,
    phone: params.phone || "",
    wilaya: params.wilaya || "",
    type: params.type || "particulier",
    avatar: avatarFor(params.name),
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db!, "users", cred.user.uid), {
    ...profile,
    createdAtServer: serverTimestamp(),
  });

  return cred.user;
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<User> {
  ensureConfigured();
  const cred = await signInWithEmailAndPassword(auth!, email, password);
  return cred.user;
}

export async function loginWithGoogle(): Promise<User> {
  ensureConfigured();
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth!, provider);
  const user = cred.user;

  // أنشئ ملف المستخدم إن لم يكن موجوداً
  const ref = doc(db!, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const profile: UserProfile = {
      uid: user.uid,
      name: user.displayName || "مستخدم",
      email: user.email || "",
      phone: user.phoneNumber || "",
      type: "particulier",
      avatar: user.photoURL || avatarFor(user.displayName || "U"),
      createdAt: new Date().toISOString(),
    };
    await setDoc(ref, { ...profile, createdAtServer: serverTimestamp() });
  }
  return user;
}

export async function logout(): Promise<void> {
  if (!auth) return;
  await fbSignOut(auth);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

/** ترجمة رسائل أخطاء Firebase إلى العربية */
export function authErrorMessage(code: string): string {
  const map: Record<string, string> = {
    "auth/email-already-in-use": "هذا البريد الإلكتروني مستخدم بالفعل",
    "auth/invalid-email": "البريد الإلكتروني غير صالح",
    "auth/weak-password": "كلمة المرور ضعيفة (6 أحرف على الأقل)",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد",
    "auth/wrong-password": "كلمة المرور غير صحيحة",
    "auth/invalid-credential": "البريد أو كلمة المرور غير صحيحة",
    "auth/too-many-requests": "محاولات كثيرة، حاول لاحقاً",
    "auth/popup-closed-by-user": "تم إغلاق نافذة الدخول",
    "auth/network-request-failed": "خطأ في الاتصال بالشبكة",
  };
  return map[code] || "حدث خطأ، يرجى المحاولة مرة أخرى";
}
