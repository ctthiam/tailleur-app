"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock } from "lucide-react";
import { creationsApi, categoriesApi, avisApi, type ApiCreation, type ApiCategorie, type ApiAvis } from "@/lib/api";

export default function HomePage() {
  const [featured, setFeatured]     = useState<ApiCreation[]>([]);
  const [categories, setCategories] = useState<ApiCategorie[]>([]);
  const [topAvis, setTopAvis]       = useState<ApiAvis | null>(null);

  useEffect(() => {
    creationsApi.getFeatured().then(setFeatured).catch(() => {});
    categoriesApi.getAll().then(setCategories).catch(() => {});
    avisApi.getPublies().then((list) => setTopAvis(list[0] ?? null)).catch(() => {});
  }, []);

  return (
    <div className="pb-nav">
      <header className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-lg object-contain" />
            <span className="font-body text-xs font-medium text-terra-500 tracking-widest uppercase">
              Atelier
            </span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-brun-900 leading-tight">
            Couture sur mesure
          </h1>
        </div>
        <Link
          href="/admin/login"
          className="w-9 h-9 bg-creme-200 rounded-xl flex items-center justify-center"
          aria-label="Admin"
        >
          <span className="text-sm font-body font-semibold text-brun-700">A</span>
        </Link>
      </header>

      <section className="px-5 mb-6">
        <div className="relative rounded-3xl overflow-hidden h-52 bg-brun-900">
          <Image
            src="/Barham.jpeg"
            alt="Barham Design"
            fill
            className="object-cover object-top opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brun-900/80 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <p className="font-body text-creme-200 text-xs font-medium mb-1 tracking-wide uppercase">
              Créations uniques
            </p>
            <h2 className="font-display text-white text-2xl font-semibold leading-tight mb-4">
              Chaque tenue,<br />une histoire.
            </h2>
            <Link
              href="/commande"
              className="inline-flex items-center gap-2 bg-terra-500 text-white text-sm font-body font-medium px-4 py-2.5 rounded-xl w-fit"
            >
              Commander <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 mb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { valeur: "8+",   label: "Ans d'expérience" },
            { valeur: "500+", label: "Clients satisfaits" },
            { valeur: "48h",  label: "Délai minimum" },
          ].map((stat) => (
            <div key={stat.label} className="card px-3 py-4 text-center">
              <p className="font-display text-xl font-semibold text-terra-500 mb-0.5">{stat.valeur}</p>
              <p className="font-body text-[10px] text-brun-500 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mb-8">
          <div className="px-5 flex items-center justify-between mb-4">
            <h2 className="section-title">Catégories</h2>
            <Link href="/catalogue" className="font-body text-sm text-terra-500 font-medium">Tout voir</Link>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue?categorie=${cat.slug}`}
                className="flex-shrink-0 card px-4 py-3 flex flex-col items-center gap-1.5 min-w-[80px] active:scale-95 transition-transform"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="font-body text-[11px] font-medium text-brun-900 text-center leading-tight">
                  {cat.nom}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mb-8">
          <div className="px-5 flex items-center justify-between mb-4">
            <h2 className="section-title">Créations vedettes</h2>
            <Link href="/catalogue" className="font-body text-sm text-terra-500 font-medium">Tout voir</Link>
          </div>
          <div className="flex gap-4 px-5 overflow-x-auto pb-1">
            {featured.slice(0, 4).map((creation) => {
              const coverUrl = creation.medias?.[0]?.url;
              return (
                <Link
                  key={creation.id}
                  href={`/creation/${creation.slug}`}
                  className="flex-shrink-0 w-48 card overflow-hidden active:scale-95 transition-transform"
                >
                  <div className="relative h-56 w-full bg-creme-300">
                    {coverUrl && (
                      <Image src={coverUrl} alt={creation.titre} fill className="object-cover" />
                    )}
                    {creation.nouveaute && (
                      <div className="absolute top-2 left-2">
                        <span className="badge-or text-[10px]">Nouveau</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-body text-[10px] text-terra-500 font-medium mb-0.5">
                      {creation.categorie.nom}
                    </p>
                    <h3 className="font-display text-sm font-semibold text-brun-900 leading-tight mb-1.5">
                      {creation.titre}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs font-semibold text-foret-600">{creation.prix}</span>
                      <div className="flex items-center gap-1 text-or-500">
                        <Clock size={10} />
                        <span className="font-body text-[10px] text-brun-500">
                          {creation.delai.split(" ")[0]} j
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {topAvis && (
        <section className="px-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Avis clients</h2>
            <Link href="/avis" className="font-body text-sm text-terra-500 font-medium">Tout voir</Link>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: topAvis.note }).map((_, i) => (
                <Star key={i} size={14} fill="#D4A017" className="text-or-500" />
              ))}
            </div>
            <p className="font-body text-sm text-brun-800 leading-relaxed mb-4 italic">
              &ldquo;{topAvis.commentaire}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-terra-100 flex items-center justify-center">
                <span className="font-body text-xs font-semibold text-terra-600">
                  {topAvis.nom.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-brun-900">{topAvis.nom}</p>
                {topAvis.ville && <p className="font-body text-xs text-brun-500">{topAvis.ville}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-5 mb-4">
        <div className="bg-terra-500 rounded-3xl p-6 text-center">
          <p className="font-body text-terra-100 text-xs mb-1 tracking-wide uppercase font-medium">
            Votre tenue idéale vous attend
          </p>
          <h3 className="font-display text-white text-xl font-semibold mb-4">Prêt à commander ?</h3>
          <Link
            href="/commande"
            className="inline-flex items-center gap-2 bg-white text-terra-600 font-body font-semibold text-sm px-6 py-3 rounded-2xl"
          >
            Passer une commande <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
