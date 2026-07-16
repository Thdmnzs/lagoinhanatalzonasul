import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Image } from "@unpic/react";
import heroImg from "@/assets/hero-bg.webp";
import logo from "@/assets/logo-lagoinha.png";


export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} id="inicio" className="relative min-h-screen w-full overflow-hidden grain">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={heroImg}
          alt="Culto cinematográfico"
          layout="fullWidth"
          width={1920}
          height={1080}
          priority
          background="auto"
          className="h-full w-full object-cover"
        />
      </motion.div>


      {/* Overlays — escuro para contraste */}
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />


      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-background/40 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90">
            Natal · Rio Grande do Norte
          </span>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          src={logo}
          alt="Lagoinha Natal Zona Sul"
          width={112}
          height={112}
          decoding="async"
          className="mb-6 h-24 w-24 sm:h-28 sm:w-28 object-contain opacity-90"
        />


        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          style={{ fontFamily: "var(--font-brand)" }}
          className="font-bold uppercase leading-[0.95] tracking-[0.02em] text-4xl sm:text-6xl lg:text-8xl xl:text-[7rem]"
        >
          LAGOINHA NATAL
          <br />
          <span className="text-gradient-gold">ZONA SUL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-foreground/80 font-light leading-relaxed"
        >
          Grande para servir, pequena para se importar.
          <span className="block mt-2 text-sm uppercase tracking-[0.25em] text-gold/80">
            Bem vindo
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://www.google.com/maps/place/R.+Delmiro+Gouveia,+17+-+Ne%C3%B3polis,+Natal+-+RN,+59086-010/@-5.8623741,-35.205896,17z/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-foreground shadow-glow hover:shadow-[0_0_80px_-5px_var(--gold-glow)] transition-all"
          >
            Visite-nos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/5584994551786"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground backdrop-blur-sm hover:bg-foreground/10 transition-all"
          >
            Fale Conosco
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Deslize</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
