import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Scissors, ShoppingBag, Star } from "lucide-react";
import { getBySlug, creations } from "@/lib/data";

export function generateStaticParams() {
  return creations.map((c) => ({ slug: c.slug }));
}

export default function CreationPage({
  params,
}: {
  params: { slug: string };
}) {
  const creation = getBySlug(params.slug);
  if (!creation) notFound();

  return (
    <div className="pb-nav">
      {/* Image principale plein écran */}
      <div className="relative h-96 w-full bg-creme-300">
        <Image
          src={creation.images[0]}
          alt={creation.titre}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Retour */}
        <Link
          href="/catalogue"
          className="absolute top-12 left-5 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-white" />
        </Link>

        {creation.nouveaute && (
          <div className="absolute top-12 right-5">
            <span className="badge-or">Nouveau</span>
          </div>
        )}

        {/* Titre sur image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-body text-terra-200 text-xs font-medium mb-1 tracking-wide uppercase">
            {creation.categorie}
          </p>
          <h1 className="font-display text-white text-2xl font-semibold leading-tight">
            {creation.titre}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="px-5 pt-5">

        {/* Prix + délai */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 card px-4 py-3 text-center">
            <p className="font-body text-[10px] text-brun-500 mb-1">Prix à partir de</p>
            <p className="font-display text-lg font-semibold text-foret-600">{creation.prix}</p>
          </div>
          <div className="flex-1 card px-4 py-3 text-center">
            <p className="font-body text-[10px] text-brun-500 mb-1">Délai estimé</p>
            <div className="flex items-center justify-center gap-1.5 text-brun-900">
              <Clock size={13} className="text-terra-500" />
              <p className="font-body text-sm font-medium">{creation.delai}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <h2 className="font-display text-lg font-semibold text-brun-900 mb-2">
            Description
          </h2>
          <p className="font-body text-sm text-brun-700 leading-relaxed">
            {creation.description}
          </p>
        </div>

        {/* Tissus */}
        <div className="mb-5">
          <h2 className="font-display text-lg font-semibold text-brun-900 mb-3">
            Matières utilisées
          </h2>
          <div className="flex flex-wrap gap-2">
            {creation.tissus.map((tissu) => (
              <div
                key={tissu}
                className="flex items-center gap-1.5 bg-creme-200 rounded-xl px-3 py-2"
              >
                <Scissors size={12} className="text-terra-500" />
                <span className="font-body text-sm text-brun-800">{tissu}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Autres images */}
        {creation.images.length > 1 && (
          <div className="mb-5">
            <h2 className="font-display text-lg font-semibold text-brun-900 mb-3">
              Plus de photos
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {creation.images.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden bg-creme-300 relative">
                  <Image src={img} alt={`${creation.titre} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Garanties */}
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-foret-100 rounded-xl flex items-center justify-center">
              <Star size={14} className="text-foret-600" fill="#2D5016" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-brun-900">Satisfaction garantie</p>
              <p className="font-body text-xs text-brun-500">Retouche offerte si nécessaire</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-terra-100 rounded-xl flex items-center justify-center">
              <Scissors size={14} className="text-terra-600" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-brun-900">Fait main</p>
              <p className="font-body text-xs text-brun-500">Chaque pièce est unique, taillée sur vos mesures</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/commande?tenue=${encodeURIComponent(creation.titre)}`}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base mb-3"
        >
          <ShoppingBag size={18} />
          Commander cette tenue
        </Link>
        <Link
          href="/catalogue"
          className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
        >
          Voir d&apos;autres créations
        </Link>
      </div>
    </div>
  );
}
