"use client";

import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin/login") return <>{children}</>;

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-creme-100">
      {/* Top bar — pt accounts for iOS notch/Dynamic Island */}
      <div
        className="bg-brun-900 px-5 pb-3 flex items-center justify-between max-w-md mx-auto"
        style={{ paddingTop: "max(2.5rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-lg object-contain" />
          <span className="font-display text-white text-base font-semibold">
            Atelier — Admin
          </span>
        </div>
        <button
          onClick={logout}
          className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center"
          title="Se déconnecter"
        >
          <LogOut size={15} className="text-creme-300" />
        </button>
      </div>

      {/* Tab nav */}
      <AdminNav />

      {/* Contenu */}
      <div className="max-w-md mx-auto px-0">
        {children}
      </div>
    </div>
  );
}
