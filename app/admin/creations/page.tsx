"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { creations as initialCreations, type Creation } from "@/lib/data";

export default function AdminCreationsPage() {
  const [items, setItems]   = useState<Creation[]>(initialCreations);
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<string | null>(null);

  const filtered = items.filter(
    (c) =>
      c.titre.toLowerCase().includes(search.toLowerCase()) ||
      c.categorie.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = (id: string) =>
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c))
    );

  const confirmDelete = (id: string) => setToDelete(id);

  const doDelete = () => {
    if (toDelete) {
      setItems((prev) => prev.filter((c) => c.id !== toDelete));
      setToDelete(null);
    }
  };

  return (
    <div className="pb-10">
      {/* En-tête */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-brun-900">Créations</h1>
          <p className="font-body text-xs text-brun-500">{items.length} tenues publiées</p>
        </div>
        <Link
          href="/admin/creations/nouvelle"
          className="flex items-center gap-1.5 bg-terra-500 text-white font-body text-sm font-medium px-4 py-2.5 rounded-2xl"
        >
          <Plus size={15} /> Ajouter
        </Link>
      </div>

      {/* Recherche */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-card">
          <Search size={15} className="text-brun-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none"
          />
        </div>
      </div>

      {/* Liste */}
      <div className="px-5 space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="card p-3 flex items-center gap-3">
            {/* Miniature */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-creme-300 flex-shrink-0 relative">
              <Image src={c.images[0]} alt={c.titre} fill className="object-cover" />
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-[10px] text-terra-500 font-medium">{c.categorie}</p>
              <h3 className="font-display text-sm font-semibold text-brun-900 truncate">
                {c.titre}
              </h3>
              <p className="font-body text-xs text-foret-600 font-medium">{c.prix}</p>
              <div className="flex gap-1.5 mt-1">
                {c.nouveaute && (
                  <span className="badge-or text-[10px]">Nouveau</span>
                )}
                <span
                  className={`badge text-[10px] ${
                    c.featured ? "bg-foret-100 text-foret-600" : "bg-creme-200 text-brun-500"
                  }`}
                >
                  {c.featured ? "En vedette" : "Standard"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => togglePublish(c.id)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  c.featured ? "bg-foret-100" : "bg-creme-200"
                }`}
                title={c.featured ? "Retirer des vedettes" : "Mettre en vedette"}
              >
                {c.featured ? (
                  <Eye size={13} className="text-foret-600" />
                ) : (
                  <EyeOff size={13} className="text-brun-400" />
                )}
              </button>
              <button
                onClick={() => confirmDelete(c.id)}
                className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center"
              >
                <Trash2 size={13} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center font-body text-sm text-brun-400 py-12">
            Aucune création trouvée
          </p>
        )}
      </div>

      {/* Modal confirmation suppression */}
      {toDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6">
            <h3 className="font-display text-lg font-semibold text-brun-900 mb-2">
              Supprimer cette création ?
            </h3>
            <p className="font-body text-sm text-brun-500 mb-6">
              Cette action est irréversible. La création sera définitivement supprimée.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setToDelete(null)}
                className="flex-1 bg-creme-200 text-brun-800 font-body font-medium py-3 rounded-2xl"
              >
                Annuler
              </button>
              <button
                onClick={doDelete}
                className="flex-1 bg-red-500 text-white font-body font-medium py-3 rounded-2xl"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
