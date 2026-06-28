
CREATE POLICY "public read leader photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'leaders');
CREATE POLICY "admins upload leader photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'leaders' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update leader photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'leaders' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete leader photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'leaders' AND public.has_role(auth.uid(),'admin'));
