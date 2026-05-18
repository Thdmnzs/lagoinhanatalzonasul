import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import communityImg from "@/assets/community.jpg";
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
              Uma igreja viva, <span className="text-gradient-gold italic font-medium">contemporânea</span> e cheia de propósito.
            </h2>
            <p className="mt-8 text-foreground/70 leading-relaxed">
              A Lagoinha Natal Zona Sul é uma comunidade cristã evangélica localizada em Natal, Rio Grande do Norte —
              uma das sedes regionais da Igreja Batista da Lagoinha, uma das maiores redes de igrejas batistas do país.
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
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2 }}
                src={communityImg}
                alt="Templo Lagoinha Zona Sul"
                loading="lazy"
                width={1280}
                height={1024}
                className="h-[560px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-8 glass rounded-md p-5 hidden md:block">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Desde</div>
              <div className="font-display text-3xl font-bold">2010</div>
            </div>
          </FadeIn>
        </div>

        {/* Stats */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
          {[
            { n: 3500, label: "Famílias alcançadas" },
            { n: 8000, label: "Pessoas conectadas" },
            { n: 24, label: "Ministérios ativos" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.15} className="bg-card p-10 lg:p-14">
              <div className="font-display text-5xl lg:text-6xl font-bold text-gradient-gold">
                <Counter to={s.n} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
