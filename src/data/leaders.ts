export type LeaderPerson = {
  name: string;
  phone: string;
};

export type LeaderCardData = {
  id: string;
  ministries: string[];
  people: LeaderPerson[];
};

// Cards já unificados:
// - Ministério com 2 líderes  → 1 card com ambos.
// - Mesma pessoa em 2 ministérios → 1 card com os dois ministérios.
export const LEADER_CARDS: LeaderCardData[] = [
  {
    id: "pastor-senior",
    ministries: ["Pastor Sênior"],
    people: [{ name: "Paulo Barreto", phone: "558487470020" }],
  },
  {
    id: "shine",
    ministries: ["Shine"],
    people: [{ name: "Pra. Auri Barreto", phone: "5584991202056" }],
  },
  {
    id: "voluntariado",
    ministries: ["Voluntariado"],
    people: [
      { name: "Junior", phone: "5584998795576" },
      { name: "Sol", phone: "558491335775" },
    ],
  },
  {
    id: "intercessao",
    ministries: ["Intercessão"],
    people: [{ name: "Cristiana", phone: "5584991903834" }],
  },
  {
    id: "geracoes",
    ministries: ["Gerações"],
    people: [
      { name: "Anderson", phone: "5584999681650" },
      { name: "Dani", phone: "558494128396" },
    ],
  },
  {
    id: "grupo-crescimento",
    ministries: ["Grupo de Crescimento"],
    people: [{ name: "Amélia Rodrigues", phone: "5584988600242" }],
  },
  {
    id: "follow",
    ministries: ["Follow"],
    people: [
      { name: "Lívia", phone: "558499023155" },
      { name: "Gustavo", phone: "558499140330" },
    ],
  },
  {
    id: "music",
    ministries: ["Music"],
    people: [{ name: "Ronaldy", phone: "558491926404" }],
  },
  {
    id: "legacy",
    ministries: ["Legacy"],
    people: [
      { name: "Mizael", phone: "5569992022235" },
      { name: "Ellen", phone: "5584992038001" },
    ],
  },
  {
    id: "link",
    ministries: ["Link"],
    people: [{ name: "Kdja Laurentina", phone: "5584999296408" }],
  },
  {
    id: "kids",
    ministries: ["Kids"],
    people: [
      { name: "Mylla", phone: "5584999322890" },
      { name: "Erika", phone: "5584994097650" },
    ],
  },
  {
    id: "crie-adm",
    ministries: ["Crie", "Administrador Operacional"],
    people: [{ name: "Gerson Gonçalves", phone: "5511998759720" }],
  },
  {
    id: "hero",
    ministries: ["Hero"],
    people: [{ name: "Marcio Bueno", phone: "5584981277292" }],
  },
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
