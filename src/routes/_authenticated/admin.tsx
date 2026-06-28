import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useIsAdmin } from "@/hooks/useAuth";
import { useMinistries, useCreateMinistry, useUpdateMinistry, useDeleteMinistry } from "@/hooks/useMinistries";
import { useAllLeaders, useCreateLeader, useUpdateLeader, useDeleteLeader, uploadLeaderPhoto, type Leader } from "@/hooks/useLeaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ICON_NAMES, getIcon } from "@/lib/iconMap";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut, ArrowUp, ArrowDown } from "lucide-react";
import type { TablesInsert } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin · Lagoinha Natal" }] }),
});

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin(user?.id);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-3xl font-bold">Acesso negado</h1>
          <p className="mt-3 text-muted-foreground">Sua conta não tem permissão de administrador.</p>
          <Button className="mt-6" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}>Sair</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}>
            <LogOut size={16} className="mr-2" /> Sair
          </Button>
        </header>

        <Tabs defaultValue="leaders">
          <TabsList>
            <TabsTrigger value="leaders">Líderes</TabsTrigger>
            <TabsTrigger value="ministries">Ministérios</TabsTrigger>
          </TabsList>
          <TabsContent value="leaders" className="mt-6"><LeadersAdmin /></TabsContent>
          <TabsContent value="ministries" className="mt-6"><MinistriesAdmin /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

/* ====================== MINISTÉRIOS ====================== */
function MinistriesAdmin() {
  const { data: ministries } = useMinistries();
  const create = useCreateMinistry();
  const update = useUpdateMinistry();
  const del = useDeleteMinistry();
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  function openNew() { setEditing(null); setOpen(true); }
  function openEdit(m: any) { setEditing(m); setOpen(true); }

  async function move(id: string, dir: -1 | 1) {
    if (!ministries) return;
    const idx = ministries.findIndex((m) => m.id === id);
    const swap = ministries[idx + dir];
    if (!swap) return;
    await update.mutateAsync({ id, patch: { order_index: swap.order_index } });
    await update.mutateAsync({ id: swap.id, patch: { order_index: ministries[idx].order_index } });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openNew}><Plus size={16} className="mr-2" /> Novo ministério</Button>
      </div>
      <div className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ordem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Ícone</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ministries?.map((m) => {
              const Icon = getIcon(m.icon);
              return (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="w-6">{m.order_index}</span>
                      <Button size="icon" variant="ghost" onClick={() => move(m.id, -1)}><ArrowUp size={14} /></Button>
                      <Button size="icon" variant="ghost" onClick={() => move(m.id, 1)}><ArrowDown size={14} /></Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell><Icon size={18} className="text-gold" /></TableCell>
                  <TableCell>
                    <Switch checked={m.active} onCheckedChange={(v) => update.mutate({ id: m.id, patch: { active: v } })} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Pencil size={14} /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Excluir "${m.name}"?`)) del.mutate(m.id); }}>
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <MinistryDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        onSubmit={async (values) => {
          if (editing) await update.mutateAsync({ id: editing.id, patch: values });
          else await create.mutateAsync({ ...values, order_index: (ministries?.length ?? 0) + 1 });
          toast.success("Salvo!");
          setOpen(false);
        }}
      />
    </div>
  );
}

function MinistryDialog({ open, onOpenChange, initial, onSubmit }: any) {
  const [form, setForm] = useState({ name: "", description: "", icon: "Church", active: true });
  useEffect(() => {
    if (open) setForm(initial ? { name: initial.name, description: initial.description ?? "", icon: initial.icon ?? "Church", active: initial.active }
                              : { name: "", description: "", icon: "Church", active: true });
  }, [open, initial]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>{initial ? "Editar" : "Novo"} ministério</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div>
            <Label>Ícone</Label>
            <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ICON_NAMES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3"><Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} /><Label>Ativo</Label></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => onSubmit(form)} disabled={!form.name}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ====================== LÍDERES ====================== */
function LeadersAdmin() {
  const { data: leaders } = useAllLeaders();
  const { data: ministries } = useMinistries();
  const create = useCreateLeader();
  const update = useUpdateLeader();
  const del = useDeleteLeader();
  const [editing, setEditing] = useState<Leader | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setOpen(true); }}>
          <Plus size={16} className="mr-2" /> Novo líder
        </Button>
      </div>
      <div className="glass rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Ministério</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaders?.map((l) => (
              <TableRow key={l.id}>
                <TableCell>
                  {l.photo_url ? (
                    <img src={l.photo_url} alt={l.name} className="h-10 w-10 rounded-full object-cover border border-gold/40" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs font-semibold border border-gold/40">
                      {l.name.split(" ").slice(0, 2).map((s) => s[0]).join("")}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{l.name}</TableCell>
                <TableCell>{l.role}</TableCell>
                <TableCell>{l.ministries?.name ?? "-"}</TableCell>
                <TableCell>{l.phone}</TableCell>
                <TableCell>{l.display_order}</TableCell>
                <TableCell>
                  <Switch checked={l.active} onCheckedChange={(v) => update.mutate({ id: l.id, patch: { active: v } })} />
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => { setEditing(l); setOpen(true); }}><Pencil size={14} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Excluir "${l.name}"?`)) del.mutate(l.id); }}>
                    <Trash2 size={14} className="text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!leaders || leaders.length === 0) && (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Nenhum líder cadastrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <LeaderDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        ministries={ministries ?? []}
        onSubmit={async (values: TablesInsert<"leaders">) => {
          if (editing) await update.mutateAsync({ id: editing.id, patch: values });
          else await create.mutateAsync(values);
          toast.success("Salvo!");
          setOpen(false);
        }}
      />
    </div>
  );
}

function LeaderDialog({ open, onOpenChange, initial, ministries, onSubmit }: any) {
  const [form, setForm] = useState<any>({ name: "", role: "", phone: "", ministry_id: "", photo_url: "", display_order: 0, active: true });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initial ?? { name: "", role: "", phone: "", ministry_id: ministries[0]?.id ?? "", photo_url: "", display_order: 0, active: true });
    }
  }, [open, initial, ministries]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadLeaderPhoto(file);
      setForm((f: any) => ({ ...f, photo_url: url }));
      toast.success("Foto enviada!");
    } catch (err: any) {
      toast.error("Erro no upload: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{initial ? "Editar" : "Novo"} líder</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {form.photo_url ? (
              <img src={form.photo_url} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-gold" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-gold text-xs">Sem foto</div>
            )}
            <div className="flex-1">
              <Label>Foto</Label>
              <Input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Enviando...</p>}
            </div>
          </div>
          <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Cargo</Label><Input value={form.role ?? ""} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Líder, Co-líder..." /></div>
          <div><Label>Telefone (com DDD)</Label><Input value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="84994551786" /></div>
          <div>
            <Label>Ministério</Label>
            <Select value={form.ministry_id} onValueChange={(v) => setForm({ ...form, ministry_id: v })}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>{ministries.map((m: any) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Ordem de exibição</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <div className="flex items-end gap-3"><Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} /><Label>Ativo</Label></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => onSubmit(form)} disabled={!form.name || !form.ministry_id || uploading}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
