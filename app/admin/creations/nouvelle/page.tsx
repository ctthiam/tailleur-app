"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, CheckCircle, ImagePlus, ChevronDown, AlertCircle } from "lucide-react";
import Image from "next/image";
import { creationsApi, categoriesApi, type ApiCategorie } from "@/lib/api";

const TISSUS_COURANTS = [
  "Bazin riche", "Bazin léger", "Wax", "Bogolan",
  "Kente", "Soie de coton", "Lin", "Organza",
  "Broderie dorée", "Fil broderie",
];

export default function NouvelleCreationPage() {
  const [saved, setSaved]           = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [tissuInput, setTissuInput] = useState("");
  const [previews, setPreviews]     = useState<string[]>([]);
  const [files, setFiles]           = useState<File[]>([]);
  const [categories, setCategories] = useState<ApiCategorie[]>([]);
  const fileRef                     = useRef<HTMLInputElement>(null);

  useEffect(() => {
    categoriesApi.getAll().then(setCategories).catch(() => {});
  }, []);

  const [form, setForm] = useState({
    titre:       "",
    categorieId: "",
    prix:        "",
    delai:       "",
    description: "",
    tissus:      [] as string[],
    nouveaute:   false,
    featured:    false,
  });

  const update = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addTissu = (t: string) => {
    if (t.trim() && !form.tissus.includes(t.trim()))
      update("tissus", [...form.tissus, t.trim()]);
    setTissuInput("");
  };

  const removeTissu = (t: string) =>
    update("tissus", form.tissus.filter((x) => x !== t));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Array.from(e.target.files ?? []).slice(0, 5);
    setFiles(chosen);
    setPreviews(chosen.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const creation = await creationsApi.create(form) as { id: string; titre: string };
      if (files.length > 0) {
        await creationsApi.uploadMedias(creation.id, files, true);
      }
      setSaved(true);
    } catch {
      setError("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (saved) {
    return (
      <div className="px-5 pt-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-foret-100 rounded-full flex items-center justify-center mb-5">
          <CheckCircle size={36} className="text-foret-500" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-brun-900 mb-2">
          Création enregistrée !
        </h2>
        <p className="font-body text-sm text-brun-500 mb-8">
          &ldquo;{form.titre}&rdquo; a été ajoutée à votre catalogue.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Link href="/admin/creations" className="btn-primary text-center">
            Voir toutes les créations
          </Link>
          <button
            onClick={() => {
              setSaved(false);
              setFiles([]);
              setPreviews([]);
              setForm({ titre: "", categorieId: "", prix: "", delai: "", description: "", tissus: [], nouveaute: false, featured: false });
            }}
            className="btn-secondary text-center"
          >
            Ajouter une autre création
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="px-5 pt-5 pb-4 flex items-center gap-3">
        <Link
          href="/admin/creations"
          className="w-9 h-9 bg-white rounded-xl shadow-card flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft size={17} className="text-brun-900" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-semibold text-brun-900">Nouvelle création</h1>
          <p className="font-body text-xs text-brun-500">Remplissez les informations</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-5 space-y-6">

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Photos */}
        <div>
          <p className="font-body text-xs font-medium text-brun-700 mb-2">Photos</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFiles}
          />
          {previews.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-1 mb-2">
              {previews.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden relative bg-creme-300">
                  <Image src={src} alt={`photo ${i + 1}`} fill className="object-cover" />
                  {i === 0 && (
                    <div className="absolute bottom-1 left-1 bg-terra-500 text-white text-[9px] font-body px-1.5 py-0.5 rounded-lg">
                      Couv.
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex-shrink-0 w-24 h-24 rounded-2xl border-2 border-dashed border-creme-400 flex items-center justify-center bg-white"
              >
                <Plus size={20} className="text-brun-400" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-creme-400 rounded-3xl p-8 flex flex-col items-center gap-2 text-center bg-white"
            >
              <div className="w-12 h-12 bg-creme-200 rounded-2xl flex items-center justify-center">
                <ImagePlus size={22} className="text-brun-400" />
              </div>
              <p className="font-body text-sm font-medium text-brun-700">Ajouter des photos</p>
              <p className="font-body text-xs text-brun-400">JPG, PNG · Max 5 photos</p>
            </button>
          )}
        </div>

        {/* Titre */}
        <div>
          <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
            Titre de la création *
          </label>
          <input
            type="text"
            required
            placeholder="ex: Grand Boubou Broderie Or"
            value={form.titre}
            onChange={(e) => update("titre", e.target.value)}
            className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">
            Catégorie *
          </label>
          <div className="relative">
            <select
              required
              value={form.categorieId}
              onChange={(e) => update("categorieId", e.target.value)}
              className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 outline-none focus:border-terra-400 transition-colors appearance-none"
            >
              <option value="">Choisir une catégorie...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.nom}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brun-400 pointer-events-none" />
          </div>
        </div>

        {/* Prix + Délai */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">Prix *</label>
            <input
              type="text" required placeholder="85 000 FCFA"
              value={form.prix} onChange={(e) => update("prix", e.target.value)}
              className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">Délai *</label>
            <input
              type="text" required placeholder="7 à 10 jours"
              value={form.delai} onChange={(e) => update("delai", e.target.value)}
              className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-body text-xs font-medium text-brun-700 mb-1.5 block">Description *</label>
          <textarea
            required rows={4}
            placeholder="Décrivez la tenue : style, occasion, détails particuliers..."
            value={form.description} onChange={(e) => update("description", e.target.value)}
            className="w-full bg-white border border-creme-300 rounded-2xl px-4 py-3 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors resize-none"
          />
        </div>

        {/* Tissus */}
        <div>
          <label className="font-body text-xs font-medium text-brun-700 mb-2 block">Matières utilisées</label>
          {form.tissus.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {form.tissus.map((t) => (
                <div key={t} className="flex items-center gap-1.5 bg-terra-100 text-terra-700 rounded-xl px-3 py-1.5 text-sm font-body">
                  {t}
                  <button type="button" onClick={() => removeTissu(t)}><X size={12} /></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {TISSUS_COURANTS.filter((t) => !form.tissus.includes(t)).map((t) => (
              <button key={t} type="button" onClick={() => addTissu(t)}
                className="font-body text-xs text-brun-600 bg-creme-200 px-3 py-1.5 rounded-xl hover:bg-creme-300 transition-colors">
                + {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text" placeholder="Autre tissu..."
              value={tissuInput} onChange={(e) => setTissuInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTissu(tissuInput); }}}
              className="flex-1 bg-white border border-creme-300 rounded-2xl px-4 py-2.5 font-body text-sm text-brun-900 placeholder:text-brun-300 outline-none focus:border-terra-400 transition-colors"
            />
            <button type="button" onClick={() => addTissu(tissuInput)}
              className="w-10 h-10 bg-terra-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Plus size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="font-body text-xs font-medium text-brun-700 block">Options</label>
          {[
            { field: "featured",  label: "Mettre en vedette",     sub: "Affichée sur la page d'accueil",             color: "bg-foret-500" },
            { field: "nouveaute", label: "Marquer comme nouveau",  sub: 'Badge "Nouveau" affiché sur la carte',       color: "bg-or-500"   },
          ].map(({ field, label, sub, color }) => (
            <div key={field} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-brun-900">{label}</p>
                <p className="font-body text-xs text-brun-500">{sub}</p>
              </div>
              <button
                type="button"
                onClick={() => update(field, !form[field as keyof typeof form])}
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                  form[field as keyof typeof form] ? color : "bg-creme-400"
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form[field as keyof typeof form] ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-base py-4 disabled:opacity-60"
        >
          {loading ? "Enregistrement..." : "Enregistrer la création"}
        </button>
      </form>
    </div>
  );
}
