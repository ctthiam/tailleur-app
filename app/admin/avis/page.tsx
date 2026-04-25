"use client";

import { useState } from "react";
import { Check, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { avis as initialAvis, type Avis } from "@/lib/data";

type AvisAdmin = Avis & { publie: boolean; en_attente: boolean };

const avisAdmin: AvisAdmin[] = [
  ...initialAvis.map((a) => ({ ...a, publie: true, en_attente: false })),
  {
    id: "4",
    nom: "Oumar Sy",
    ville: "Ziguinchor",
    note: 5,
    commentaire: "Travail exceptionnel ! Mon boubou était parfait pour la cérémonie. Je reviendrai certainement.",
    tenue: "Grand Boubou Broderie Or",
    avatar: "OS",
    publie: false,
    en_attente: true,
  },
  {
    id: "5",
    nom: "Khady Diouf",
    ville: "Thiès",
    note: 4,
    commentaire: "Très satisfaite de ma robe. Légèrement en retard sur le délai mais le résultat valait l'attente.",
    tenue: "Robe Pagne Wax Festive",
    avatar: "KD",
    publie: false,
    en_attente: true,
  },
];

export default function AdminAvisPage() {
  const [items, setItems] = useState<AvisAdmin[]>(avisAdmin);

  const publies   = items.filter((a) => a.publie);
  const attente   = items.filter((a) => a.en_attente);

  const publier = (id: string) =>
    setItems((prev) =>
      prev.map((a) => a.id === id ? { ...a, publie: true, en_attente: false } : a)
    );

  const toggleVisi = (id: string) =>
    setItems((prev) =>
      prev.map((a) => a.id === id ? { ...a, publie: !a.publie } : a)
    );

  const supprimer = (id: string) =>
    setItems((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="pb-10">
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display text-xl font-semibold text-brun-900">Avis clients</h1>
        <p className="font-body text-xs text-brun-500">
          {publies.length} publiés · {attente.length} en attente
        </p>
      </div>

      {/* En attente de modération */}
      {attente.length > 0 && (
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-terra-500 rounded-full animate-pulse" />
            <h2 className="font-display text-base font-semibold text-brun-900">
              En attente ({attente.length})
            </h2>
          </div>
          <div className="space-y-3">
            {attente.map((a) => (
              <div key={a.id} className="card p-4 border-l-4 border-terra-400">
                <AvisCard avis={a} />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => publier(a.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-foret-500 text-white font-body text-sm font-medium py-2.5 rounded-xl"
                  >
                    <Check size={14} /> Publier
                  </button>
                  <button
                    onClick={() => supprimer(a.id)}
                    className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avis publiés */}
      <div className="px-5">
        <h2 className="font-display text-base font-semibold text-brun-900 mb-3">
          Publiés ({publies.length})
        </h2>
        <div className="space-y-3">
          {publies.map((a) => (
            <div key={a.id} className="card p-4">
              <AvisCard avis={a} />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleVisi(a.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 font-body text-sm font-medium py-2.5 rounded-xl ${
                    a.publie
                      ? "bg-creme-200 text-brun-700"
                      : "bg-foret-100 text-foret-700"
                  }`}
                >
                  {a.publie ? <><EyeOff size={14} /> Masquer</> : <><Eye size={14} /> Afficher</>}
                </button>
                <button
                  onClick={() => supprimer(a.id)}
                  className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AvisCard({ avis }: { avis: AvisAdmin }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-terra-100 flex items-center justify-center flex-shrink-0">
          <span className="font-body text-sm font-semibold text-terra-600">{avis.avatar}</span>
        </div>
        <div className="flex-1">
          <p className="font-body text-sm font-semibold text-brun-900">{avis.nom}</p>
          <p className="font-body text-xs text-brun-400">{avis.ville}</p>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < avis.note ? "#D4A017" : "transparent"}
              className={i < avis.note ? "text-or-500" : "text-brun-300"}
            />
          ))}
        </div>
      </div>
      <p className="font-body text-sm text-brun-700 leading-relaxed italic mb-3">
        &ldquo;{avis.commentaire}&rdquo;
      </p>
      <div className="inline-flex items-center gap-1.5 bg-creme-200 rounded-xl px-3 py-1.5">
        <span className="text-xs">✂️</span>
        <span className="font-body text-[11px] text-brun-600 font-medium">{avis.tenue}</span>
      </div>
    </>
  );
}
