import { Instagram, Youtube, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-20 pb-10 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-sm border border-gold/60 flex items-center justify-center text-gold font-display font-bold">L</div>
              <div>
                <div className="font-display font-bold tracking-wide uppercase">Lagoinha</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Natal · Zona Sul</div>
              </div>
            </div>
            <p className="mt-6 font-display text-3xl lg:text-4xl font-bold leading-tight max-w-md">
              Amamos, <span className="text-gradient-gold italic">Vivemos</span> e Servimos.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Navegue</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              {["Início", "Sobre", "Cultos", "Pastor", "Ministérios", "Contato"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-gold transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Visite-nos</div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Rua Delmiro Gouveia, 17<br/>
              Neópolis, Natal — RN
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-sm border border-border flex items-center justify-center text-foreground/70 hover:border-gold hover:text-gold transition-colors"
                  aria-label="Rede social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px gold-hairline opacity-30" />

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Lagoinha Natal Zona Sul. Todos os direitos reservados.</div>
          <div className="uppercase tracking-[0.25em]">Feito com fé · Natal/RN</div>
        </div>
      </div>
    </footer>
  );
}
