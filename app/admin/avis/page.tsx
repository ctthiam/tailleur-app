"use client";

import { useState, useEffect } from "react";
import { Check, Trash2, Star, EyeOff, Loader2 } from "lucide-react";
import { avisApi, type ApiAvis } from "@/lib/api";

function initials(nom: string) {
  return nom.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function AdminAvisPage() {
  const [items, setItems]     = useState<ApiAvis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    avisApi.getAllAdmin()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const publies = items.filter((a) => a.publie);
  const attente = items.filter((a) => !a.publie);

  const toggle = async (id: string) => {
    try {
      await avisApi.toggle(id);
      setItems((prev) => prev.map((a) => (a.id === id ? { ...a, publie: !a.publie } : a)));
    } catch {}
  };

  const supprimer = async (id: string) => {
    try {
      await avisApi.remove(id);
      setItems((prev) => prev.filter((a) => a.id !== id));
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 size={24} className="animate-spin text-terra-500" />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display text-xl font-semibold text-brun-900">Avis clients</h1>
        <p className="font-body text-xs text-brun-500">
          {publies.length} publiés · {attente.length} en attente
        </p>
      </div>

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
                    onClick={() => toggle(a.id)}
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
                  onClick={() => toggle(a.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-creme-200 text-brun-700 font-body text-sm font-medium py-2.5 rounded-xl"
                >
                  <EyeOff size={14} /> Masquer
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
          {publies.length === 0 && (
            <p className="text-center font-body text-sm text-brun-400 py-8">Aucun avis publié</p>
          )}
        </div>
      </div>
    </div>
  );
}

function AvisCard({ avis }: { avis: ApiAvis }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-terra-100 flex items-center justify-center flex-shrink-0">
          <span className="font-body text-sm font-semibold text-terra-600">{initials(avis.nom)}</span>
        </div>
        <div className="flex-1">
          <p className="font-body text-sm font-semibold text-brun-900">{avis.nom}</p>
          {avis.ville && <p className="font-body text-xs text-brun-400">{avis.ville}</p>}
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
      {avis.tenue && (
        <div className="inline-flex items-center gap-1.5 bg-creme-200 rounded-xl px-3 py-1.5">
          <span className="text-xs">✂️</span>
          <span className="font-body text-[11px] text-brun-600 font-medium">{avis.tenue}</span>
        </div>
      )}
    </>
  );
}
