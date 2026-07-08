export type Leader = {
  name: string;
  ministry: string;
  phone: string;
};

// Chave: nome exibido no card de ministério (Ministerios.tsx)
// Valor: lista de líderes daquele ministério
export const LEADERS_BY_MINISTRY: Record<string, Leader[]> = {
  "Rocket Link": [
    { name: "Kdja Laurentina", ministry: "Link", phone: "5584999296408" },
  ],
  Legacy: [
    { name: "Mizael", ministry: "Legacy", phone: "5569992022235" },
    { name: "Ellen", ministry: "Legacy", phone: "5584992038001" },
  ],
  Voluntariado: [
    { name: "Junior", ministry: "Voluntariado", phone: "5584998795576" },
    { name: "Sol", ministry: "Voluntariado", phone: "558491335775" },
  ],
  Kids: [
    { name: "Mylla", ministry: "Kids", phone: "5584999322890" },
    { name: "Erika", ministry: "Kids", phone: "5584994097650" },
  ],
  Plug: [],
  Follow: [
    { name: "Lívia", ministry: "Follow", phone: "558499023155" },
    { name: "Gustavo", ministry: "Follow", phone: "558499140330" },
  ],
  Music: [
    { name: "Ronaldy", ministry: "Music", phone: "558491926404" },
  ],
  Shine: [
    { name: "Pra. Auri Barreto", ministry: "Shine", phone: "" },
  ],
  Hero: [
    { name: "Marcio Bueno", ministry: "Hero", phone: "5584981277292" },
  ],
  Gerações: [
    { name: "Anderson", ministry: "Gerações", phone: "5584999681650" },
    { name: "Dani", ministry: "Gerações", phone: "558494128396" },
  ],
};

// Líderes extras (não vinculados aos cards visíveis de Ministérios,
// mantidos aqui para futura exibição/consulta)
export const OTHER_LEADERS: Leader[] = [
  { name: "Paulo Barreto", ministry: "Pastor Sênior", phone: "558487470020" },
  { name: "Cristiana", ministry: "Intercessão", phone: "5584991903834" },
  { name: "Amélia Rodrigues", ministry: "Grupo de Crescimento", phone: "5584988600242" },
  { name: "Gerson Gonçalves", ministry: "Crie", phone: "5511998759720" },
  { name: "Gerson Gonçalves", ministry: "Administrador Operacional", phone: "5511998759720" },
];

export function getInitials(name: string): string {
  const parts = name
    .replace(/^(Pr\.?|Pra\.?|Pastor|Pastora|Kdja)\s+/i, "")
    .trim()
    .split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
