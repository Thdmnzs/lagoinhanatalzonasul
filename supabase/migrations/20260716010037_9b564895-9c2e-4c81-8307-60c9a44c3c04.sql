
DROP POLICY IF EXISTS "public read leaders non-sensitive" ON public.leaders;
REVOKE SELECT ON public.leaders FROM anon;

DROP POLICY IF EXISTS "authenticated read leaders" ON public.leaders;
CREATE POLICY "authenticated read leaders"
ON public.leaders
FOR SELECT
TO authenticated
USING (true);

DROP VIEW IF EXISTS public.leaders_public;
CREATE VIEW public.leaders_public
WITH (security_invoker = false) AS
SELECT id, ministry_id, name, role, photo_url, display_order, active
FROM public.leaders
WHERE active = true;

GRANT SELECT ON public.leaders_public TO anon, authenticated;

COMMENT ON VIEW public.leaders_public IS
  'Public projection of leaders excluding phone. Phone restricted to authenticated users via leaders table policies.';
