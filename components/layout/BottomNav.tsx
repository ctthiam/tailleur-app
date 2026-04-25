"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, Star } from "lucide-react";

const navItems = [
  { href: "/",           icon: Home,        label: "Accueil"   },
  { href: "/catalogue",  icon: Grid3X3,     label: "Catalogue" },
  { href: "/commande",   icon: ShoppingBag, label: "Commander" },
  { href: "/avis",       icon: Star,        label: "Avis"      },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-md mx-auto">
        <div className="mx-4 mb-3 bg-brun-900 rounded-3xl shadow-card-lg px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map(({ href, icon: Icon, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 ${
                    active
                      ? "bg-terra-500 text-white"
                      : "text-creme-300 hover:text-creme-100"
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                  <span className="text-[10px] font-body font-medium leading-none">
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
