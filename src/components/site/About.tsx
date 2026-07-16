import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import { Image } from "@unpic/react";
import communityImg from "@/assets/community.webp";
import { FadeIn, SectionLabel } from "./Section";

const PILLARS = [
  "Discipulado",
  "Comunhão",
  "Evangelismo",
  "Impacto Social",
  "Cultura de Honra",
  "Crescimento Espiritual",
  "Cuidado com Famílias",
  "Nova Geração",
];

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {suffix}
      {n.toLocaleString("pt-BR")}
    </span>
  );
}

export function About() {
  return (
    <section id="sobre" className="relative py-32 px-6">
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <FadeIn className="lg:col-span-5">
            <SectionLabel>Quem Somos</SectionLabel>
            <h2 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95]">
              Uma igreja viva, <span className="text-gradient-gold font-medium">avivada</span> e cheia de propósito.
            </h2>
            <p className="mt-8 text-foreground/70 leading-relaxed">
              A Lagoinha Natal Zona Sul é uma comunidade cristã evangélica localizada em Natal, Rio Grande do Norte.
              Atuamos de forma dinâmica em evangelismo, ensino bíblico e impacto social na zona sul da capital potiguar.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {PILLARS.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 text-sm text-foreground/80"
                >
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  {p}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-7 relative">
            <div className="relative overflow-hidden rounded-md shadow-elegant">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 1.2 }} className="h-[560px] w-full">
                <Image
                  src={communityImg}
                  alt="Templo Lagoinha Zona Sul"
                  layout="constrained"
                  width={1280}
                  height={1024}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  background="auto"
                  className="h-[560px] w-full object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-8 glass rounded-md p-5 hidden md:block">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Desde</div>
              <div className="font-display text-3xl font-bold">2024</div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
