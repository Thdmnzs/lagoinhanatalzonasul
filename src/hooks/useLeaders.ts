import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Leader = Tables<"leaders">;

export function useLeadersByMinistry(ministryId: string | null) {
  return useQuery({
    queryKey: ["leaders", "by-ministry", ministryId],
    enabled: !!ministryId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaders")
        .select("*")
        .eq("ministry_id", ministryId!)
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Leader[];
    },
  });
}

export function useAllLeaders() {
  return useQuery({
    queryKey: ["leaders", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaders")
        .select("*, ministries(name)")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as (Leader & { ministries: { name: string } | null })[];
    },
  });
}

export function useCreateLeader() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TablesInsert<"leaders">) => {
      const { data, error } = await supabase.from("leaders").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaders"] }),
  });
}

export function useUpdateLeader() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: TablesUpdate<"leaders"> }) => {
      const { data, error } = await supabase.from("leaders").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaders"] }),
  });
}

export function useDeleteLeader() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leaders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaders"] }),
  });
}

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadLeaderPhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from("leaders").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (upErr) throw upErr;
  const { data, error } = await supabase.storage.from("leaders").createSignedUrl(path, TEN_YEARS);
  if (error) throw error;
  return data.signedUrl;
}
