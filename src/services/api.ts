import { getPadroes } from "@/services/padraoService";
import { ActivityItem, DashboardSummary } from "@/types/dashboard";
import { Calibracao } from "@/types/calibracao";

const DIAS_PARA_ATENCAO = 30;

export async function getDashboard(): Promise<DashboardSummary> {
    const padroes = await getPadroes();

    const dashboard: DashboardSummary = {
        validos: 0,
        atencao: 0,
        vencidos: 0,
    };

    padroes.forEach((padrao) => {
        const status = calcularStatus(padrao.calibracao);
        if (status === "valido") dashboard.validos++;
        if (status === "atencao") dashboard.atencao++;
        if (status === "vencido") dashboard.vencidos++;
    });

    return dashboard;
}

export async function getAtividades(): Promise<ActivityItem[]> {
    const padroes = await getPadroes();

    return padroes
        .map((padrao, index) => ({
            id: index + 1,
            nome: padrao.nome,
            tag: padrao.tag,
            status: converterStatus(calcularStatus(padrao.calibracao)),
            tempo: gerarTextoTempo(padrao.calibracao),
        }))
        .sort((a, b) => prioridadeStatus(a.status) - prioridadeStatus(b.status))
        .slice(0, 5);
}

function calcularStatus(calibracao: Calibracao | undefined): "valido" | "atencao" | "vencido" {
    if (!calibracao) return "atencao";

    const vencimento = new Date(calibracao.dataCalibracao);
    vencimento.setMonth(vencimento.getMonth() + calibracao.periodicidade);

    const hoje = new Date();
    const diasRestantes = Math.ceil(
        (vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) return "vencido";
    if (diasRestantes <= DIAS_PARA_ATENCAO) return "atencao";
    return "valido";
}

function gerarTextoTempo(calibracao: Calibracao | undefined): string {
    if (!calibracao) return "Sem calibração";

    const vencimento = new Date(calibracao.dataCalibracao);
    vencimento.setMonth(vencimento.getMonth() + calibracao.periodicidade);

    const hoje = new Date();
    const dias = Math.ceil(
        (vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (dias < 0) return `Venceu há ${Math.abs(dias)} dia(s)`;
    if (dias === 0) return "Vence hoje";
    return `Vence em ${dias} dia(s)`;
}

function converterStatus(status: "valido" | "atencao" | "vencido"): ActivityItem["status"] {
    if (status === "valido") return "concluida";
    if (status === "atencao") return "breve";
    return "vencida";
}

function prioridadeStatus(status: ActivityItem["status"]) {
    if (status === "vencida") return 1;
    if (status === "breve") return 2;
    return 3;
}