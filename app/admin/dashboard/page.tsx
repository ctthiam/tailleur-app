import Link from "next/link";
import {
  Scissors, ShoppingBag, Star, Eye,
  Plus, ArrowRight, Clock,
} from "lucide-react";
import { creations, avis } from "@/lib/data";

const stats = [
  { label: "Créations",      valeur: creations.length, icon: Scissors,    couleur: "terra" },
  { label: "Commandes",      valeur: 12,               icon: ShoppingBag, couleur: "foret" },
  { label: "Avis clients",   valeur: avis.length,      icon: Star,        couleur: "or"    },
  { label: "Vues ce mois",   valeur: 284,              icon: Eye,         couleur: "terra" },
];

const commandesRecentes = [
  { id: 1, nom: "Fatou Diallo",   tenue: "Grand Boubou",  statut: "nouveau",    date: "Aujourd'hui" },
  { id: 2, nom: "Ibra Sow",       tenue: "Costume 3 Pièces", statut: "en_cours", date: "Hier"      },
  { id: 3, nom: "Aïcha Mbaye",    tenue: "Robe Wax",      statut: "livré",      date: "22 avr."   },
];

const statutStyle: Record<string, string> = {
  nouveau:   "badge-terra",
  en_cours:  "badge-or",
  livré:     "badge-foret",
};

const statutLabel: Record<string, string> = {
  nouveau:  "Nouveau",
  en_cours: "En cours",
  livré:    "Livré",
};

export default function AdminDashboardPage() {
  return (
    <div className="pb-16 bg-creme-100 min-h-screen">
      {/* Header */}
      <div className="bg-brun-900 px-5 pt-12 pb-8">
        <p className="font-body text-creme-300 text-xs tracking-widest uppercase mb-1">
          Tableau de bord
        </p>
        <h1 className="font-display text-white text-2xl font-semibold">
          Mon Atelier
        </h1>
      </div>

      <div className="px-5 -mt-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="card p-4">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                  s.couleur === "terra" ? "bg-terra-100" :
                  s.couleur === "foret" ? "bg-foret-100" : "bg-or-100"
                }`}
              >
                <s.icon
                  size={16}
                  className={
                    s.couleur === "terra" ? "text-terra-500" :
                    s.couleur === "foret" ? "text-foret-500" : "text-or-500"
                  }
                />
              </div>
              <p className="font-display text-2xl font-semibold text-brun-900">{s.valeur}</p>
              <p className="font-body text-xs text-brun-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="mb-6">
          <h2 className="font-display text-base font-semibold text-brun-900 mb-3">
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/creations/nouvelle"
              className="card p-4 flex items-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-9 h-9 bg-terra-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Plus size={16} className="text-white" />
              </div>
              <span className="font-body text-sm font-medium text-brun-900">
                Nouvelle création
              </span>
            </Link>
            <Link
              href="/admin/commandes"
              className="card p-4 flex items-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-9 h-9 bg-foret-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <span className="font-body text-sm font-medium text-brun-900">
                Voir commandes
              </span>
            </Link>
          </div>
        </div>

        {/* Dernières commandes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-base font-semibold text-brun-900">
              Dernières commandes
            </h2>
            <Link href="/admin/commandes" className="font-body text-xs text-terra-500 font-medium flex items-center gap-1">
              Tout voir <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {commandesRecentes.map((cmd) => (
              <div key={cmd.id} className="card p-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-creme-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-body text-xs font-semibold text-brun-600">
                    {cmd.nom.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold text-brun-900 truncate">{cmd.nom}</p>
                  <p className="font-body text-xs text-brun-500 truncate">{cmd.tenue}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`${statutStyle[cmd.statut]} block mb-1`}>
                    {statutLabel[cmd.statut]}
                  </span>
                  <div className="flex items-center gap-1 justify-end text-brun-400">
                    <Clock size={9} />
                    <span className="font-body text-[10px]">{cmd.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lien retour public */}
        <Link
          href="/"
          className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
        >
          Voir le site public
        </Link>
      </div>
    </div>
  );
}
