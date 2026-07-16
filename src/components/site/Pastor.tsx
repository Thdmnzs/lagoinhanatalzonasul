import { motion } from "motion/react";
import pastorImg from "@/assets/pastor.webp";
import { FadeIn, SectionLabel } from "./Section";

export function Pastor() {
  return (
    <section id="pastor" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-16 items-center">
        <FadeIn className="lg:col-span-5 relative">
          <div className="relative overflow-hidden rounded-md shadow-elegant">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.5 }}
              src={pastorImg}
              alt="Pastor Paulo Barreto"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-[640px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Pastor Sênior</div>
              <div className="font-display text-3xl font-bold mt-1">Paulo Barreto</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 h-32 w-32 border-t border-r border-gold/40 hidden lg:block" />
        </FadeIn>

        <div className="lg:col-span-7">
          <FadeIn>
            <SectionLabel>Nossa Liderança</SectionLabel>
            <h2 className="mt-6 font-display text-5xl lg:text-6xl font-bold leading-[1]">
              Um coração <span className="text-gradient-gold font-medium">pastoral</span> para servir esta geração.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-8 text-foreground/75 leading-relaxed">
              Pastor Paulo Barreto lidera a Lagoinha Natal Zona Sul com uma visão clara de discipulado,
              comunhão e impacto. Reconhecido pelo seu coração pastoral e pelo zelo na entrega da palavra,
              tem dedicado sua vida a formar discípulos, cuidar de famílias e levantar uma nova geração comprometida com o Reino.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl lg:text-3xl leading-snug">
                “A igreja é o lugar onde pessoas comuns vivem o extraordinário de Deus. Você foi feito para mais.”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                — Pr. Paulo Barreto
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
