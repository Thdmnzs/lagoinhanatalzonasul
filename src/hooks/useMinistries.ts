import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Ministry = Tables<"ministries">;

export function useMinistries(opts: { activeOnly?: boolean } = {}) {
  return useQuery({
    queryKey: ["ministries", opts.activeOnly ?? false],
    queryFn: async () => {
      let q = supabase.from("ministries").select("*").order("order_index", { ascending: true });
      if (opts.activeOnly) q = q.eq("active", true);
      const { data, error } = await q;
      if (error) throw error;
      return data as Ministry[];
    },
  });
}

export function useCreateMinistry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TablesInsert<"ministries">) => {
      const { data, error } = await supabase.from("ministries").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ministries"] }),
  });
}

export function useUpdateMinistry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: TablesUpdate<"ministries"> }) => {
      const { data, error } = await supabase.from("ministries").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ministries"] }),
  });
}

export function useDeleteMinistry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ministries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ministries"] }),
  });
}
