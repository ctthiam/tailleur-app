"use client";

import { useState } from "react";
import { Phone, MessageCircle, ChevronRight, ChevronDown, X } from "lucide-react";
import { commandes as initial, STATUTS, type Commande, type StatutCommande } from "@/lib/commandes";

const ORDRE_STATUTS: StatutCommande[] = ["nouveau", "en_cours", "pret", "livre", "annule"];

export default function AdminCommandesPage() {
  const [items, setItems]           = useState<Commande[]>(initial);
  const [filtre, setFiltre]         = useState<StatutCommande | "tous">("tous");
  const [selected, setSelected]     = useState<Commande | null>(null);

  const filtered = filtre === "tous" ? items : items.filter((c) => c.statut === filtre);

  const updateStatut = (id: string, statut: StatutCommande) => {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, statut } : c)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, statut } : s);
  };

  const countByStatut = (s: StatutCommande) => items.filter((c) => c.statut === s).length;

  return (
    <div className="pb-10">
      {/* En-tête */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display text-xl font-semibold text-brun-900">Commandes</h1>
        <p className="font-body text-xs text-brun-500">
          {items.length} commandes · {countByStatut("nouveau")} nouvelles
        </p>
      </div>

      {/* Filtres statut */}
      <div className="flex gap-2 px-5 overflow-x-auto pb-1 mb-4">
        <button
          onClick={() => setFiltre("tous")}
          className={`flex-shrink-0 font-body text-xs font-medium px-3 py-2 rounded-xl transition-colors ${
            filtre === "tous" ? "bg-brun-900 text-white" : "bg-white text-brun-700 shadow-card"
          }`}
        >
          Tous ({items.length})
        </button>
        {ORDRE_STATUTS.map((s) => {
          const { label, color, bg } = STATUTS[s];
          const count = countByStatut(s);
          if (count === 0) return null;
          return (
            <button
              key={s}
              onClick={() => setFiltre(s)}
              className={`flex-shrink-0 font-body text-xs font-medium px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                filtre === s
                  ? `${bg} ${color} ring-1 ring-current`
                  : "bg-white text-brun-700 shadow-card"
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Liste */}
      <div className="px-5 space-y-3">
        {filtered.map((cmd) => {
          const { label, color, bg } = STATUTS[cmd.statut];
          return (
            <button
              key={cmd.id}
              onClick={() => setSelected(cmd)}
              className="card p-4 w-full text-left flex items-center gap-3 active:scale-95 transition-transform"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-terra-100 flex items-center justify-center flex-shrink-0">
                <span className="font-body text-sm font-semibold text-terra-600">
                  {cmd.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-body text-sm font-semibold text-brun-900 truncate">{cmd.nom}</p>
                  {cmd.statut === "nouveau" && (
                    <span className="w-2 h-2 bg-terra-500 rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className="font-body text-xs text-brun-500 truncate">{cmd.typeTenue}</p>
                <p className="font-body text-[10px] text-brun-400 mt-0.5">
                  {new Date(cmd.dateCommande).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  {" · livraison "}
                  {new Date(cmd.datelivraison).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                </p>
              </div>

              {/* Statut */}
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <span className={`badge text-[10px] ${bg} ${color}`}>{label}</span>
                <ChevronRight size={14} className="text-brun-300" />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center font-body text-sm text-brun-400 py-12">
            Aucune commande dans cette catégorie
          </p>
        )}
      </div>

      {/* Drawer détail commande */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelected(null)}>
          <div
            className="bg-white w-full max-w-md mx-auto rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-creme-300 rounded-full" />
            </div>

            <div className="px-5 pb-8 pt-2">
              {/* Header drawer */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-brun-900">{selected.nom}</h2>
                  <p className="font-body text-xs text-brun-500">{selected.telephone}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 bg-creme-200 rounded-xl flex items-center justify-center">
                  <X size={15} className="text-brun-700" />
                </button>
              </div>

              {/* Détails tenue */}
              <div className="bg-creme-100 rounded-2xl p-4 space-y-2.5 mb-5">
                <Row label="Type de tenue" value={selected.typeTenue} />
                {selected.tissu   && <Row label="Tissu"    value={selected.tissu} />}
                {selected.mesures && <Row label="Mesures"  value={selected.mesures} />}
                <Row
                  label="Date de livraison"
                  value={new Date(selected.datelivraison).toLocaleDateString("fr-FR", {
                    weekday: "long", day: "numeric", month: "long",
                  })}
                />
              </div>

              {/* Message */}
              {selected.message && (
                <div className="mb-5">
                  <p className="font-body text-xs font-medium text-brun-500 mb-2">Message du client</p>
                  <div className="bg-white border border-creme-300 rounded-2xl p-4">
                    <p className="font-body text-sm text-brun-800 leading-relaxed italic">
                      &ldquo;{selected.message}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Changer statut */}
              <div className="mb-5">
                <p className="font-body text-xs font-medium text-brun-700 mb-2">Statut de la commande</p>
                <div className="relative">
                  <select
                    value={selected.statut}
                    onChange={(e) => updateStatut(selected.id, e.target.value as StatutCommande)}
                    className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 outline-none focus:border-terra-400 appearance-none"
                  >
                    {ORDRE_STATUTS.map((s) => (
                      <option key={s} value={s}>{STATUTS[s].label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brun-400 pointer-events-none" />
                </div>
              </div>

              {/* Contacter */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selected.telephone}`}
                  className="flex items-center justify-center gap-2 bg-creme-200 text-brun-800 font-body font-medium text-sm py-3 rounded-2xl"
                >
                  <Phone size={15} /> Appeler
                </a>
                <a
                  href={`https://wa.me/${selected.telephone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-foret-500 text-white font-body font-medium text-sm py-3 rounded-2xl"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-body text-xs text-brun-400 w-28 flex-shrink-0">{label}</span>
      <span className="font-body text-xs text-brun-800 font-medium flex-1">{value}</span>
    </div>
  );
}
