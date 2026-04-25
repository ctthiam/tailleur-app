"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Scissors, ShoppingBag, Star } from "lucide-react";

const tabs = [
  { href: "/admin/dashboard",  icon: LayoutDashboard, label: "Dashboard"  },
  { href: "/admin/creations",  icon: Scissors,        label: "Créations"  },
  { href: "/admin/commandes",  icon: ShoppingBag,     label: "Commandes"  },
  { href: "/admin/avis",       icon: Star,            label: "Avis"       },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="bg-brun-900 max-w-md mx-auto px-3 pb-3">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                active
                  ? "bg-terra-500 text-white"
                  : "text-creme-300 hover:text-white"
              }`}
            >
              <Icon size={13} />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
