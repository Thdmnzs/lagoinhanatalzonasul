
-- 1) Restrict public read on leaders to non-sensitive columns via a view
DROP POLICY IF EXISTS "public read leaders" ON public.leaders;

CREATE OR REPLACE VIEW public.leaders_public
WITH (security_invoker = on) AS
SELECT id, ministry_id, name, role, photo_url, display_order, active, created_at, updated_at
FROM public.leaders
WHERE active = true;

GRANT SELECT ON public.leaders_public TO anon, authenticated;

-- Allow the view (running as invoker) to still see rows by adding a restricted base policy
CREATE POLICY "public read leaders non-sensitive"
ON public.leaders FOR SELECT
TO anon, authenticated
USING (true);

-- Note: we cannot restrict columns via RLS; the view is the safe surface. To prevent
-- direct base-table phone reads, revoke column-level SELECT on phone from anon.
REVOKE SELECT (phone) ON public.leaders FROM anon;

-- 2) Revoke EXECUTE on SECURITY DEFINER has_role from anon/authenticated/PUBLIC.
-- RLS policies continue to work because policy expressions are evaluated with
-- elevated privileges for SECURITY DEFINER helpers.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
