import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Acesso Restrito · Lagoinha Natal" }] }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error("Credenciais inválidas");
      toast.success("Bem-vindo!");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Conta criada! Faça login.");
      setMode("login");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm glass rounded-lg p-8 space-y-5">
        <div>
          <h1 className="font-display text-3xl font-bold">Painel Administrativo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Acesso restrito à liderança." : "Crie a primeira conta admin."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
        </Button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-xs text-muted-foreground hover:text-gold transition-colors"
        >
          {mode === "login" ? "Primeiro acesso? Criar conta admin" : "Já tenho conta · Entrar"}
        </button>
      </form>
    </main>
  );
}
