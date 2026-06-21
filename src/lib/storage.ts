import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage, isFirebaseConfigured } from "./firebase";

/**
 * رفع صورة واحدة إلى Firebase Storage وإرجاع رابطها العام.
 */
export async function uploadImage(
  file: File,
  uid: string
): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("لم يتم إعداد Firebase Storage.");
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `listings/${uid}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

/**
 * رفع مجموعة صور بالتوازي.
 */
export async function uploadImages(
  files: File[],
  uid: string
): Promise<string[]> {
  return Promise.all(files.map((f) => uploadImage(f, uid)));
}
