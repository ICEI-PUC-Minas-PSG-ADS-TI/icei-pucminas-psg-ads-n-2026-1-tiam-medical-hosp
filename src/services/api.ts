import { getPadroes } from "@/services/padraoService";
import { ActivityItem, DashboardSummary } from "@/types/dashboard";
import { Padrao, StatusCalibracao } from "@/types/padrao";

const DIAS_PARA_ATENCAO = 30;

export async function getDashboard(): Promise<DashboardSummary> {
    const padroes = await getPadroes();

    const dashboard: DashboardSummary = {
        validos: 0,
        atencao: 0,
        vencidos: 0,
    };

    padroes.forEach((padrao) => {
        const status = calcularStatusPadrao(padrao);

        if (status === "valido") {
            dashboard.validos++;
        }

        if (status === "atencao") {
            dashboard.atencao++;
        }

        if (status === "vencido") {
            dashboard.vencidos++;
        }
    });

    return dashboard;
}

export async function getAtividades(): Promise<ActivityItem[]> {
    const padroes = await getPadroes();

    return padroes
        .map((padrao, index) => {
            const status = calcularStatusPadrao(padrao);

            return {
                id: index + 1,
                nome: padrao.nome,
                tag: padrao.tag,
                status: converterStatusParaAtividade(status),
                tempo: gerarTextoTempo(padrao),
            };
        })
        .sort((a, b) => prioridadeStatus(a.status) - prioridadeStatus(b.status))
        .slice(0, 5);
}

function calcularStatusPadrao(padrao: Padrao): StatusCalibracao {
    if (padrao.calibracao?.status) {
        return padrao.calibracao.status;
    }

    if (!padrao.calibracao?.proximoVencimento) {
        return "atencao";
    }

    const hoje = new Date();
    const vencimento = converterData(padrao.calibracao.proximoVencimento);

    if (!vencimento) {
        return "atencao";
    }

    const diferencaMs = vencimento.getTime() - hoje.getTime();
    const diasRestantes = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    if (diasRestantes < 0) {
        return "vencido";
    }

    if (diasRestantes <= DIAS_PARA_ATENCAO) {
        return "atencao";
    }

    return "valido";
}

function converterStatusParaAtividade(status: StatusCalibracao): ActivityItem["status"] {
    if (status === "valido") {
        return "concluida";
    }

    if (status === "atencao") {
        return "breve";
    }

    return "vencida";
}

function gerarTextoTempo(padrao: Padrao): string {
    const vencimentoTexto = padrao.calibracao?.proximoVencimento;

    if (!vencimentoTexto) {
        return "Sem calibração";
    }

    const vencimento = converterData(vencimentoTexto);

    if (!vencimento) {
        return "Data inválida";
    }

    const hoje = new Date();
    const diferencaMs = vencimento.getTime() - hoje.getTime();
    const dias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    if (dias < 0) {
        return `Venceu há ${Math.abs(dias)} dia(s)`;
    }

    if (dias === 0) {
        return "Vence hoje";
    }

    return `Vence em ${dias} dia(s)`;
}

function converterData(data: string): Date | null {
    if (data.includes("/")) {
        const [dia, mes, ano] = data.split("/").map(Number);

        if (!dia || !mes || !ano) {
            return null;
        }

        return new Date(ano, mes - 1, dia);
    }

    const dataConvertida = new Date(data);

    if (isNaN(dataConvertida.getTime())) {
        return null;
    }

    return dataConvertida;
}

function prioridadeStatus(status: ActivityItem["status"]) {
    if (status === "vencida") {
        return 1;
    }

    if (status === "breve") {
        return 2;
    }

    return 3;
}