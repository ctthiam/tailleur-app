import { Star } from "lucide-react";
import { avis } from "@/lib/data";

export default function AvisPage() {
  const moyenne = avis.reduce((acc, a) => acc + a.note, 0) / avis.length;

  return (
    <div className="pb-nav">
      <header className="px-5 pt-12 pb-4">
        <h1 className="font-display text-2xl font-semibold text-brun-900 mb-1">Avis clients</h1>
        <p className="font-body text-sm text-brun-500">{avis.length} avis vérifiés</p>
      </header>

      {/* Score global */}
      <div className="px-5 mb-6">
        <div className="card p-5 flex items-center gap-5">
          <div className="text-center">
            <p className="font-display text-5xl font-semibold text-brun-900">{moyenne.toFixed(1)}</p>
            <div className="flex items-center justify-center gap-0.5 mt-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.round(moyenne) ? "#D4A017" : "transparent"}
                  className={i < Math.round(moyenne) ? "text-or-500" : "text-brun-300"}
                />
              ))}
            </div>
            <p className="font-body text-[10px] text-brun-400">sur 5</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((note) => {
              const count = avis.filter((a) => a.note === note).length;
              const pct   = (count / avis.length) * 100;
              return (
                <div key={note} className="flex items-center gap-2">
                  <span className="font-body text-[11px] text-brun-500 w-4">{note}</span>
                  <div className="flex-1 h-1.5 bg-creme-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-or-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-body text-[11px] text-brun-400 w-4">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Liste avis */}
      <div className="px-5 space-y-4">
        {avis.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-terra-100 flex items-center justify-center flex-shrink-0">
                <span className="font-body text-sm font-semibold text-terra-600">{a.avatar}</span>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-brun-900">{a.nom}</p>
                <p className="font-body text-xs text-brun-400">{a.ville}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: a.note }).map((_, i) => (
                  <Star key={i} size={12} fill="#D4A017" className="text-or-500" />
                ))}
              </div>
            </div>
            <p className="font-body text-sm text-brun-700 leading-relaxed mb-3 italic">
              &ldquo;{a.commentaire}&rdquo;
            </p>
            <div className="inline-flex items-center gap-1.5 bg-creme-200 rounded-xl px-3 py-1.5">
              <span className="text-xs">✂️</span>
              <span className="font-body text-[11px] text-brun-600 font-medium">{a.tenue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
