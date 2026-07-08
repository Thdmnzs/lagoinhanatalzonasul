import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Cultos } from "@/components/site/Cultos";
import { Ministerios } from "@/components/site/Ministerios";
import { LeadersSection } from "@/components/site/LeadersSection";
import { MinistrySelectionProvider } from "@/components/site/ministrySelection";

import { Pastor } from "@/components/site/Pastor";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";
import { WhatsappButton } from "@/components/site/WhatsappButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lagoinha Natal Zona Sul — Uma igreja para pertencer, crescer e viver." },
      { name: "description", content: "Lagoinha Natal Zona Sul: cultos, ministérios e comunidade na zona sul de Natal/RN. Bem-vindo para casa." },
      { property: "og:title", content: "Lagoinha Natal Zona Sul" },
      { property: "og:description", content: "Uma igreja para pertencer, crescer e viver o propósito de Deus." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Cultos />
      <Ministerios />
      <Pastor />
      <Contato />
      <Footer />
      <WhatsappButton />
      <Toaster theme="dark" position="top-center" />
    </main>
  );
}
