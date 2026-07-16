
-- Drop the interim view approach
DROP VIEW IF EXISTS public.leaders_public;

-- Restore a public SELECT policy on leaders (RLS gates rows; column grants gate the phone field)
DROP POLICY IF EXISTS "public read leaders non-sensitive" ON public.leaders;
CREATE POLICY "public read leaders non-sensitive"
ON public.leaders
FOR SELECT
TO anon, authenticated
USING (true);

-- Reset anon privileges then grant only non-sensitive columns (excludes phone)
REVOKE ALL ON public.leaders FROM anon;
GRANT SELECT (id, ministry_id, name, role, photo_url, display_order, active, created_at, updated_at)
  ON public.leaders TO anon;

-- Keep drop-in access for signed-in users so the app can show phone to logged-in members if needed
DROP POLICY IF EXISTS "authenticated read leaders" ON public.leaders;
