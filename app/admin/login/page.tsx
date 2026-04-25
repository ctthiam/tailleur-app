"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Scissors, Eye, EyeOff, AlertCircle } from "lucide-react";
import { authApi } from "@/lib/api";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [form, setForm]                 = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { access_token } = await authApi.login(form.email, form.password);
      localStorage.setItem("token", access_token);
      // cookie lisible par le middleware Next.js pour la protection des routes
      document.cookie = `token=${access_token}; path=/; max-age=${7 * 24 * 3600}; SameSite=Strict`;
      window.location.href = "/admin/dashboard";
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brun-900 flex flex-col px-5 pt-12 pb-10">
      <Link
        href="/"
        className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mb-16 self-start"
      >
        <ArrowLeft size={18} className="text-white" />
      </Link>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-terra-500 rounded-2xl flex items-center justify-center">
            <Scissors size={22} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="font-body text-creme-300 text-xs tracking-widest uppercase mb-0.5">Atelier</p>
            <h1 className="font-display text-white text-xl font-semibold">Espace Admin</h1>
          </div>
        </div>

        <p className="font-body text-creme-400 text-sm mb-8 leading-relaxed">
          Connectez-vous pour gérer vos créations et commandes.
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-2xl px-4 py-3 mb-4">
            <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
            <p className="font-body text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs text-creme-300 font-medium mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="votre@email.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-creme-400 rounded-2xl px-4 py-3.5 font-body text-sm outline-none focus:border-terra-400 transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs text-creme-300 font-medium mb-1.5 block">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-creme-400 rounded-2xl px-4 py-3.5 pr-12 font-body text-sm outline-none focus:border-terra-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-creme-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terra-500 text-white font-body font-semibold py-4 rounded-2xl mt-2 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
