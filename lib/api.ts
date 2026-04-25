const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Erreur ${res.status}`);
  }
  return res.json();
}

function authHeader(): { Authorization: string } {
  if (typeof window === 'undefined') return { Authorization: '' };
  const token = localStorage.getItem('token') ?? '';
  return { Authorization: `Bearer ${token}` };
}

/* ─── Auth ─── */
export const authApi = {
  login: (email: string, password: string) =>
    fetcher<{ access_token: string; admin: { id: string; email: string; nom: string } }>(
      '/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) },
    ),
  me: () => fetcher('/auth/me', { headers: authHeader() }),
};

/* ─── Catégories ─── */
export const categoriesApi = {
  getAll: () => fetcher<ApiCategorie[]>('/categories'),
  create: (data: unknown) =>
    fetcher('/categories', { method: 'POST', body: JSON.stringify(data), headers: authHeader() }),
  update: (id: string, data: unknown) =>
    fetcher(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: authHeader() }),
  remove: (id: string) =>
    fetcher(`/categories/${id}`, { method: 'DELETE', headers: authHeader() }),
};

/* ─── Créations ─── */
export const creationsApi = {
  getAll:       (cat?: string) => fetcher<ApiCreation[]>(`/creations${cat ? `?categorie=${cat}` : ''}`),
  getFeatured:  ()             => fetcher<ApiCreation[]>('/creations/featured'),
  getOne:       (slug: string) => fetcher<ApiCreation>(`/creations/${slug}`),
  getAllAdmin:   ()             => fetcher<ApiCreation[]>('/creations/admin/all', { headers: authHeader() }),
  create: (data: unknown) =>
    fetcher('/creations', { method: 'POST', body: JSON.stringify(data), headers: authHeader() }),
  update: (id: string, data: unknown) =>
    fetcher(`/creations/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: authHeader() }),
  remove: (id: string) =>
    fetcher(`/creations/${id}`, { method: 'DELETE', headers: authHeader() }),

  uploadMedias: (creationId: string, files: File[], couv = false) => {
    const form = new FormData();
    files.forEach((f) => form.append('files', f));
    return fetch(`${API}/creations/${creationId}/medias?couv=${couv}`, {
      method: 'POST', body: form, headers: authHeader(),
    }).then((r) => r.json());
  },
  removeMedia: (mediaId: string) =>
    fetcher(`/creations/medias/${mediaId}`, { method: 'DELETE', headers: authHeader() }),
};

/* ─── Commandes ─── */
export const commandesApi = {
  create: (data: unknown) =>
    fetcher('/commandes', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (statut?: string) =>
    fetcher<ApiCommande[]>(`/commandes${statut ? `?statut=${statut}` : ''}`, { headers: authHeader() }),
  getOne: (id: string) =>
    fetcher<ApiCommande>(`/commandes/${id}`, { headers: authHeader() }),
  updateStatut: (id: string, statut: string) =>
    fetcher(`/commandes/${id}/statut`, { method: 'PUT', body: JSON.stringify({ statut }), headers: authHeader() }),
  stats: () => fetcher('/commandes/stats', { headers: authHeader() }),
};

/* ─── Avis ─── */
export const avisApi = {
  getPublies:  ()             => fetcher<ApiAvis[]>('/avis'),
  getAllAdmin:  ()             => fetcher<ApiAvis[]>('/avis/admin/all', { headers: authHeader() }),
  create: (data: unknown) =>
    fetcher('/avis', { method: 'POST', body: JSON.stringify(data) }),
  toggle: (id: string) =>
    fetcher(`/avis/${id}/publier`, { method: 'PUT', headers: authHeader() }),
  remove: (id: string) =>
    fetcher(`/avis/${id}`, { method: 'DELETE', headers: authHeader() }),
};

/* ─── Types ─── */
export type ApiCategorie = {
  id: string; nom: string; slug: string; emoji: string; ordre: number;
  _count?: { creations: number };
};

export type ApiMedia = {
  id: string; url: string; publicId: string; estCouv: boolean; ordre: number;
};

export type ApiCreation = {
  id: string; slug: string; titre: string; description: string;
  prix: string; delai: string; featured: boolean; nouveaute: boolean;
  publiee: boolean; vues: number; tissus: string[];
  categorie: ApiCategorie; medias: ApiMedia[];
  createdAt: string;
};

export type ApiCommande = {
  id: string; nom: string; telephone: string; email?: string;
  typeTenue: string; tissu?: string; mesures?: string;
  dateLivraison: string; message?: string;
  statut: 'NOUVEAU' | 'EN_COURS' | 'PRET' | 'LIVRE' | 'ANNULE';
  createdAt: string;
};

export type ApiAvis = {
  id: string; nom: string; ville?: string; note: number;
  commentaire: string; tenue?: string; publie: boolean; createdAt: string;
};
