"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ChevronDown, AlertCircle } from "lucide-react";
import { commandesApi } from "@/lib/api";

const typesTenue = [
  "Boubou",
  "Costume",
  "Robe",
  "Tenue de fête / cérémonie",
  "Tenue enfant",
  "Uniforme",
  "Autre",
];

function CommandeForm() {
  const searchParams  = useSearchParams();
  const tenuePrefill  = searchParams.get("tenue") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm] = useState({
    nom:       "",
    telephone: "",
    email:     "",
    typeTenue: tenuePrefill || "",
    tissu:     "",
    mesures:   "",
    date:      "",
    message:   "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await commandesApi.create({
        nom:          form.nom,
        telephone:    form.telephone,
        email:        form.email || undefined,
        typeTenue:    form.typeTenue,
        tissu:        form.tissu   || undefined,
        mesures:      form.mesures || undefined,
        dateLivraison: form.date,
        message:      form.message || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pb-nav px-5 pt-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-foret-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={36} className="text-foret-500" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-brun-900 mb-2">
          Commande envoyée !
        </h2>
        <p className="font-body text-sm text-brun-600 leading-relaxed mb-8 max-w-xs">
          Merci {form.nom.split(" ")[0]} ! Votre commande a bien été reçue. Je vous contacterai sous 24h via WhatsApp pour confirmer les détails.
        </p>
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      <header className="px-5 pt-12 pb-6 flex items-center gap-4">
        <Link href="/catalogue" className="w-9 h-9 bg-white rounded-xl shadow-card flex items-center justify-center">
          <ArrowLeft size={18} className="text-brun-900" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-semibold text-brun-900">
            Passer une commande
          </h1>
          <p className="font-body text-xs text-brun-500">Remplissez le formulaire ci-dessous</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-5 space-y-5">

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Section contact */}
        <div>
          <h2 className="font-display text-base font-semibold text-brun-900 mb-3">
            Vos coordonnées
          </h2>
          <div className="space-y-3">
            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Nom complet *
              </label>
              <input
                type="text"
                required
                placeholder="Mamadou Diallo"
                value={form.nom}
                onChange={(e) => update("nom", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Téléphone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+221 77 000 00 00"
                value={form.telephone}
                onChange={(e) => update("telephone", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Email (facultatif)
              </label>
              <input
                type="email"
                placeholder="vous@exemple.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section tenue */}
        <div>
          <h2 className="font-display text-base font-semibold text-brun-900 mb-3">
            Votre tenue
          </h2>
          <div className="space-y-3">
            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Type de tenue *
              </label>
              <div className="relative">
                <select
                  required
                  value={form.typeTenue}
                  onChange={(e) => update("typeTenue", e.target.value)}
                  className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 outline-none focus:border-terra-400 transition-colors appearance-none"
                >
                  <option value="">Choisir un type...</option>
                  {typesTenue.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brun-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Tissu souhaité
              </label>
              <input
                type="text"
                placeholder="Bazin, wax, bogolan, soie..."
                value={form.tissu}
                onChange={(e) => update("tissu", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Mesures (si connues)
              </label>
              <input
                type="text"
                placeholder="Tour de poitrine, taille, hanches..."
                value={form.mesures}
                onChange={(e) => update("mesures", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Date de livraison souhaitée *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 outline-none focus:border-terra-400 transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
                Précisions supplémentaires
              </label>
              <textarea
                rows={4}
                placeholder="Couleur, broderies, occasion particulière, inspirations..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-or-50 border border-or-200 rounded-2xl px-4 py-3 flex gap-3">
          <span className="text-lg">💬</span>
          <p className="font-body text-xs text-or-700 leading-relaxed">
            Après votre commande, je vous contacte via WhatsApp pour confirmer les détails et le devis final.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-base py-4 disabled:opacity-60"
        >
          {loading ? "Envoi en cours..." : "Envoyer ma commande"}
        </button>
      </form>
    </div>
  );
}

export default function CommandePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-body text-brun-400">Chargement...</div>}>
      <CommandeForm />
    </Suspense>
  );
}
