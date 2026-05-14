import { ActivityItem, DashboardSummary } from "@/types/dashboard";

export async function getDashboard(): Promise<DashboardSummary> {
  return {
    validos: 47,
    atencao: 7,
    vencidos: 3,
  };
}

export async function getAtividades(): Promise<ActivityItem[]> {
  return [
    {
      id: 1,
      nome: "Ventilador PB840",
      tag: "VNT-2341",
      status: "concluida",
      tempo: "Há 10 horas",
    },
    {
      id: 2,
      nome: "Bomba de Infusão",
      tag: "DEF-8821",
      status: "breve",
      tempo: "Há 21 horas",
    },
    {
      id: 3,
      nome: "Desfibrilador Zoll X",
      tag: "VSM-0012",
      status: "vencida",
      tempo: "Há 1 dia",
    },
  ];
}
