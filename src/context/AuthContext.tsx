"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { getUserProfile, logout as fbLogout } from "@/lib/auth";
import { UserProfile, Seller } from "@/lib/types";

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  configured: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  asSeller: () => Seller | null;
}

const AuthContext = createContext<AuthState>({
  user: null,
  profile: null,
  loading: true,
  configured: false,
  logout: async () => {},
  refreshProfile: async () => {},
  asSeller: () => null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const p = await getUserProfile(u.uid);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await fbLogout();
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) setProfile(await getUserProfile(user.uid));
  };

  const asSeller = (): Seller | null => {
    if (!user) return null;
    return {
      uid: user.uid,
      name: profile?.name || user.displayName || "مستخدم",
      avatar:
        profile?.avatar ||
        user.photoURL ||
        `https://ui-avatars.com/api/?name=U&background=e81111&color=fff`,
      type: profile?.type || "particulier",
      phone: profile?.phone || "",
      memberSince: profile?.createdAt
        ? new Date(profile.createdAt).getFullYear().toString()
        : new Date().getFullYear().toString(),
      verified: false,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        configured: isFirebaseConfigured,
        logout,
        refreshProfile,
        asSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
