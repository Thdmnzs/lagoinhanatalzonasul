import { motion } from "motion/react";
import { FadeIn, SectionLabel } from "./Section";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import hero from "@/assets/hero.jpg";

const CULTOS = [
  { day: "Quinta-feira", name: "Culto Fé", time: "20h00" },
  { day: "Domingo", name: "Culto Celebração", time: "10h00" },
  { day: "Domingo", name: "Culto Celebração", time: "17h00" },
];

const GALLERY = [
  { src: g2, label: "Adoração", span: "md:row-span-2" },
  { src: g1, label: "Louvor", span: "" },
  { src: g3, label: "Comunhão", span: "" },
  { src: g5, label: "Celebração", span: "md:col-span-2" },
  { src: hero, label: "Jovens", span: "" },
  { src: g4, label: "Kids", span: "" },
];

export function Cultos() {
  return (
    <section id="cultos" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center"><SectionLabel>Nossos Cultos</SectionLabel></div>
          <h2 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95]">
            Uma experiência que <span className="text-gradient-gold italic font-medium">transforma</span>.
          </h2>
          <p className="mt-6 text-foreground/70">
            Encontros marcantes de adoração, palavra e comunhão. Venha viver a presença de Deus conosco.
          </p>
        </FadeIn>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {CULTOS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative overflow-hidden rounded-md border border-border bg-card p-10 h-full"
              >
                <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{c.day}</div>
                  <div className="mt-6 font-display text-3xl font-bold">{c.name}</div>
                  <div className="mt-10 flex items-end justify-between">
                    <div className="font-display text-6xl font-bold text-gradient-gold">{c.time}</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Presencial</div>
                  </div>
                  <div className="mt-8 h-px gold-hairline opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Gallery */}
        <FadeIn className="mt-32 text-center">
          <SectionLabel>Momentos</SectionLabel>
          <h3 className="mt-4 font-display text-3xl lg:text-5xl font-bold">
            A vida da nossa <span className="text-gradient-gold italic">comunidade</span>
          </h3>
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
          {GALLERY.map((g, i) => (
            <FadeIn key={i} delay={i * 0.06} className={g.span}>
              <div className="group relative h-full w-full overflow-hidden rounded-sm">
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.25em] text-gold">
                  {g.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
