"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Search, Loader2 } from "lucide-react";
import { creationsApi, categoriesApi, type ApiCreation, type ApiCategorie } from "@/lib/api";

export default function CataloguePage() {
  const [creations, setCreations]   = useState<ApiCreation[]>([]);
  const [categories, setCategories] = useState<ApiCategorie[]>([]);
  const [loading, setLoading]       = useState(true);
  const [activeSlug, setActiveSlug] = useState<string>("tous");
  const [search, setSearch]         = useState<string>("");

  useEffect(() => {
    Promise.all([
      creationsApi.getAll(),
      categoriesApi.getAll(),
    ]).then(([c, cats]) => {
      setCreations(c);
      setCategories(cats);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = creations.filter((c) => {
    const matchCat    = activeSlug === "tous" || c.categorie.slug === activeSlug;
    const matchSearch =
      search.trim() === "" ||
      c.titre.toLowerCase().includes(search.toLowerCase()) ||
      c.categorie.nom.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pb-nav">
      <header className="px-5 pt-12 pb-4">
        <h1 className="font-display text-2xl font-semibold text-brun-900 mb-1">Catalogue</h1>
        <p className="font-body text-sm text-brun-500">
          {filtered.length} création{filtered.length !== 1 ? "s" : ""}
        </p>
      </header>

      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-card">
          <Search size={16} className="text-brun-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher une tenue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent font-body text-sm text-brun-900 placeholder:text-brun-400 outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-brun-400 text-xs">✕</button>
          )}
        </div>
      </div>

      <div className="flex gap-2 px-5 overflow-x-auto pb-1 mb-6">
        <button
          onClick={() => setActiveSlug("tous")}
          className={`flex-shrink-0 font-body text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
            activeSlug === "tous" ? "bg-brun-900 text-white" : "bg-white text-brun-700 shadow-card"
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveSlug(cat.slug)}
            className={`flex-shrink-0 font-body text-sm font-medium px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeSlug === cat.slug ? "bg-terra-500 text-white" : "bg-white text-brun-700 shadow-card"
            }`}
          >
            {cat.emoji} {cat.nom}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin text-terra-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="px-5 text-center py-16">
          <p className="font-body text-brun-400 text-sm">Aucune création trouvée</p>
        </div>
      ) : (
        <div className="px-5 grid grid-cols-2 gap-4">
          {filtered.map((creation) => {
            const coverUrl = creation.medias?.[0]?.url;
            return (
              <Link
                key={creation.id}
                href={`/creation/${creation.slug}`}
                className="card overflow-hidden active:scale-95 transition-transform"
              >
                <div className="relative h-44 bg-creme-300">
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
                  <h3 className="font-display text-sm font-semibold text-brun-900 leading-tight mb-2">
                    {creation.titre}
                  </h3>
                  <p className="font-body text-xs font-semibold text-foret-600 mb-1">{creation.prix}</p>
                  <div className="flex items-center gap-1 text-brun-400">
                    <Clock size={10} />
                    <span className="font-body text-[10px]">{creation.delai}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
