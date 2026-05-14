export type ActivityStatus = "concluida" | "breve" | "vencida";

export interface DashboardSummary {
  validos: number;
  atencao: number;
  vencidos: number;
}

export interface ActivityItem {
  id: number;
  nome: string;
  tag: string;
  status: ActivityStatus;
  tempo: string;
}
