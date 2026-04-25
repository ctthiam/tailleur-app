export type StatutCommande = "nouveau" | "en_cours" | "pret" | "livre" | "annule";

export type Commande = {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  typeTenue: string;
  tissu: string;
  mesures: string;
  datelivraison: string;
  message: string;
  statut: StatutCommande;
  dateCommande: string;
};

export const commandes: Commande[] = [
  {
    id: "1",
    nom: "Fatou Diallo",
    telephone: "+221 77 234 56 78",
    email: "fatou@example.com",
    typeTenue: "Boubou",
    tissu: "Bazin riche brodé",
    mesures: "Poitrine 92cm, Taille 74cm",
    datelivraison: "2026-05-10",
    message: "Je veux une couleur vert foncé avec des broderies dorées",
    statut: "nouveau",
    dateCommande: "2026-04-24",
  },
  {
    id: "2",
    nom: "Ibrahima Sow",
    telephone: "+221 76 543 21 09",
    email: "",
    typeTenue: "Costume 3 pièces",
    tissu: "Laine anthracite",
    mesures: "Poitrine 104cm, Tour de taille 88cm",
    datelivraison: "2026-05-05",
    message: "Pour mon mariage, je veux quelque chose d'élégant",
    statut: "en_cours",
    dateCommande: "2026-04-22",
  },
  {
    id: "3",
    nom: "Aïcha Mbaye",
    telephone: "+221 78 987 65 43",
    email: "aicha@example.com",
    typeTenue: "Robe",
    tissu: "Wax africain",
    mesures: "",
    datelivraison: "2026-04-30",
    message: "Robe longue pour un baptême",
    statut: "pret",
    dateCommande: "2026-04-18",
  },
  {
    id: "4",
    nom: "Modou Fall",
    telephone: "+221 70 111 22 33",
    email: "",
    typeTenue: "Boubou enfant",
    tissu: "Bazin léger coloré",
    mesures: "Taille 10 ans",
    datelivraison: "2026-04-28",
    message: "Pour le baptême de mon fils",
    statut: "livre",
    dateCommande: "2026-04-14",
  },
  {
    id: "5",
    nom: "Rokhaya Ndiaye",
    telephone: "+221 77 444 55 66",
    email: "rokhaya@example.com",
    typeTenue: "Tenue de fête",
    tissu: "Bogolan",
    mesures: "Poitrine 96cm",
    datelivraison: "2026-05-20",
    message: "Tenue traditionnelle pour un mariage",
    statut: "nouveau",
    dateCommande: "2026-04-24",
  },
];

export const STATUTS: Record<StatutCommande, { label: string; color: string; bg: string }> = {
  nouveau:   { label: "Nouveau",   color: "text-terra-600",  bg: "bg-terra-100"  },
  en_cours:  { label: "En cours",  color: "text-or-600",     bg: "bg-or-100"     },
  pret:      { label: "Prêt",      color: "text-foret-600",  bg: "bg-foret-100"  },
  livre:     { label: "Livré",     color: "text-brun-500",   bg: "bg-creme-200"  },
  annule:    { label: "Annulé",    color: "text-red-500",    bg: "bg-red-50"     },
};
