export type Categorie = {
  id: string;
  nom: string;
  slug: string;
  emoji: string;
  count: number;
  couleur: string;
};

export type Creation = {
  id: string;
  slug: string;
  titre: string;
  categorie: string;
  categorieSlug: string;
  description: string;
  prix: string;
  delai: string;
  tissus: string[];
  images: string[];
  featured: boolean;
  nouveaute: boolean;
};

export type Avis = {
  id: string;
  nom: string;
  ville: string;
  note: number;
  commentaire: string;
  tenue: string;
  avatar: string;
};

export const categories: Categorie[] = [
  { id: "1", nom: "Boubous",          slug: "boubous",          emoji: "👘", count: 12, couleur: "terra"  },
  { id: "2", nom: "Costumes",         slug: "costumes",         emoji: "🧥", count: 8,  couleur: "foret"  },
  { id: "3", nom: "Robes",            slug: "robes",            emoji: "👗", count: 15, couleur: "or"     },
  { id: "4", nom: "Tenues de fête",   slug: "tenues-fete",      emoji: "✨", count: 6,  couleur: "terra"  },
  { id: "5", nom: "Uniformes",        slug: "uniformes",        emoji: "👔", count: 4,  couleur: "foret"  },
  { id: "6", nom: "Enfants",          slug: "enfants",          emoji: "🌟", count: 9,  couleur: "or"     },
];

export const creations: Creation[] = [
  {
    id: "1",
    slug: "grand-boubou-broderie-or",
    titre: "Grand Boubou Broderie Or",
    categorie: "Boubous",
    categorieSlug: "boubous",
    description: "Grand boubou en bazin riche avec broderie dorée faite main. Élégance et raffinement pour vos grandes occasions.",
    prix: "85 000 FCFA",
    delai: "7 à 10 jours",
    tissus: ["Bazin riche", "Broderie dorée"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4a5b?w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    ],
    featured: true,
    nouveaute: false,
  },
  {
    id: "2",
    slug: "costume-trois-pieces-anthracite",
    titre: "Costume 3 Pièces Anthracite",
    categorie: "Costumes",
    categorieSlug: "costumes",
    description: "Costume élégant taillé sur mesure dans un tissu anthracite premium. Parfait pour mariages et cérémonies.",
    prix: "95 000 FCFA",
    delai: "10 à 14 jours",
    tissus: ["Laine fine", "Doublure soie"],
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4a5b?w=600&q=80",
    ],
    featured: true,
    nouveaute: true,
  },
  {
    id: "3",
    slug: "robe-pagne-wax-festive",
    titre: "Robe Pagne Wax Festive",
    categorie: "Robes",
    categorieSlug: "robes",
    description: "Robe longue confectionnée dans un pagne wax aux couleurs vives. Coupe ajustée mettant en valeur la silhouette.",
    prix: "35 000 FCFA",
    delai: "5 à 7 jours",
    tissus: ["Pagne wax", "Organza"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    ],
    featured: true,
    nouveaute: false,
  },
  {
    id: "4",
    slug: "boubou-enfant-ceremonie",
    titre: "Boubou Enfant Cérémonie",
    categorie: "Enfants",
    categorieSlug: "enfants",
    description: "Boubou pour enfant parfaitement ajusté, idéal pour baptêmes et fêtes de famille.",
    prix: "20 000 FCFA",
    delai: "4 à 6 jours",
    tissus: ["Bazin léger", "Broderie colorée"],
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    ],
    featured: false,
    nouveaute: true,
  },
  {
    id: "5",
    slug: "tenue-mariage-bogolan",
    titre: "Tenue Mariage Bogolan",
    categorie: "Tenues de fête",
    categorieSlug: "tenues-fete",
    description: "Tenue de cérémonie en tissu bogolan authentique, symbole de l'artisanat africain. Unique et mémorable.",
    prix: "120 000 FCFA",
    delai: "14 à 21 jours",
    tissus: ["Bogolan", "Coton premium"],
    images: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80",
    ],
    featured: true,
    nouveaute: false,
  },
  {
    id: "6",
    slug: "robe-soiree-brodee",
    titre: "Robe Soirée Brodée",
    categorie: "Robes",
    categorieSlug: "robes",
    description: "Robe de soirée longue avec broderies florales à la main. Élégance absolue pour vos soirées.",
    prix: "65 000 FCFA",
    delai: "10 à 12 jours",
    tissus: ["Soie de coton", "Fil broderie"],
    images: [
      "https://images.unsplash.com/photo-1566479179817-0b4853c9149e?w=600&q=80",
    ],
    featured: false,
    nouveaute: true,
  },
];

export const avis: Avis[] = [
  {
    id: "1",
    nom: "Fatou D.",
    ville: "Dakar",
    note: 5,
    commentaire: "Je suis ravie ! Mon boubou était exactement comme je l'imaginais. Le travail est soigné et le délai respecté.",
    tenue: "Grand Boubou Broderie Or",
    avatar: "FD",
  },
  {
    id: "2",
    nom: "Mamadou S.",
    ville: "Thiès",
    note: 5,
    commentaire: "Costume de mariage parfait. Tout le monde m'a complimenté. Je recommande sans hésitation.",
    tenue: "Costume 3 Pièces Anthracite",
    avatar: "MS",
  },
  {
    id: "3",
    nom: "Aïssatou B.",
    ville: "Saint-Louis",
    note: 5,
    commentaire: "Très professionnel et à l'écoute. Ma robe était magnifique pour le baptême de mon fils.",
    tenue: "Robe Pagne Wax Festive",
    avatar: "AB",
  },
];

export const getFeatured = () => creations.filter((c) => c.featured);
export const getByCategorie = (slug: string) =>
  creations.filter((c) => c.categorieSlug === slug);
export const getBySlug = (slug: string) =>
  creations.find((c) => c.slug === slug);
