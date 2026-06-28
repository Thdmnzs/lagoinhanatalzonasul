import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useLeadersByMinistry, type Leader } from "@/hooks/useLeaders";
import { MessageCircle, User as UserIcon } from "lucide-react";
import { useState } from "react";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
}

function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/55${digits}`;
}

function LeaderCard({ leader }: { leader: Leader }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const showImg = leader.photo_url && !imgError;

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <div className="relative h-40 w-40 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.25)]">
        {showImg ? (
          <img
            src={leader.photo_url!}
            alt={leader.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gold/10 text-gold font-display text-3xl">
            {initials(leader.name) || <UserIcon size={40} />}
          </div>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold">{leader.name}</h3>
      {leader.role && <p className="mt-1 text-sm text-gold uppercase tracking-wider">{leader.role}</p>}
      {leader.phone && (
        <Button asChild className="mt-5 bg-gold text-gold-foreground hover:bg-gold/90">
          <a href={whatsappLink(leader.phone)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2" size={16} />
            Falar com {leader.name.split(" ")[0]}
          </a>
        </Button>
      )}
    </div>
  );
}

export function LeadersModal({
  ministryId,
  ministryName,
  open,
  onOpenChange,
}: {
  ministryId: string | null;
  ministryName: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { data: leaders, isLoading } = useLeadersByMinistry(open ? ministryId : null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass border-gold/20">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">
            Líderes · <span className="text-gradient-gold">{ministryName}</span>
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">Carregando...</div>
        ) : !leaders || leaders.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Nenhum líder cadastrado para este ministério ainda.
          </div>
        ) : (
          <Carousel opts={{ loop: leaders.length > 1 }} className="w-full">
            <CarouselContent>
              {leaders.map((l) => (
                <CarouselItem key={l.id}><LeaderCard leader={l} /></CarouselItem>
              ))}
            </CarouselContent>
            {leaders.length > 1 && (
              <>
                <CarouselPrevious className="border-gold/30 text-gold" />
                <CarouselNext className="border-gold/30 text-gold" />
              </>
            )}
          </Carousel>
        )}
      </DialogContent>
    </Dialog>
  );
}
