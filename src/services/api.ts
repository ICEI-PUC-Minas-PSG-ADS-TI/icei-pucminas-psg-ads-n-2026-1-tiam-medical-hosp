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
      tempo: "Ha 10 horas",
    },
    {
      id: 2,
      nome: "Bomba de Infusao",
      tag: "DEF-8821",
      status: "breve",
      tempo: "Ha 21 horas",
    },
    {
      id: 3,
      nome: "Desfibrilador Zoll X",
      tag: "VSM-0012",
      status: "vencida",
      tempo: "Ha 1 dia",
    },
  ];
}
