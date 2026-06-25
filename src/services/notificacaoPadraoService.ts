import { send } from "@emailjs/react-native";

import { getCalibracaoById } from "@/services/calibracoesService";
import { getPadroes } from "@/services/padraoService";
import { Calibracao } from "@/types/calibracao";
import { Padrao } from "@/types/padrao";

const UM_DIA_EM_MS = 1000 * 60 * 60 * 24;

function calibracaoVenceEm30Dias(calibracao: Calibracao): boolean {
    const vencimento = calcularDataVencimento(
        calibracao.dataCalibracao,
        calibracao.periodicidade
    );
    const hoje = new Date();
    const diasRestantes = calcularDiasRestantes(hoje, vencimento);

    return diasRestantes >= 0 && diasRestantes <= 30;
}

function calcularDiasRestantes(hoje: Date, vencimento: Date): number {
    const diferencaMs = vencimento.getTime() - hoje.getTime();

    return Math.ceil(diferencaMs / UM_DIA_EM_MS);
}

function calcularDataVencimento(dataCalibracao: Date, periodicidade: number): Date {
    const vencimento = new Date(dataCalibracao);

    vencimento.setMonth(vencimento.getMonth() + periodicidade);

    return vencimento;
}

async function buscarPadroesVencendoEm30Dias(): Promise<Padrao[]> {
    const padroes = await getPadroes();
    const padroesVencendo: Padrao[] = [];

    for (const padrao of padroes) {
        if (!padrao.ultimaCalibracaoId) continue;

        const calibracao = await getCalibracaoById(padrao.ultimaCalibracaoId);

        if (!calibracao) continue;
        if (!calibracaoVenceEm30Dias(calibracao)) continue;

        padroesVencendo.push({
            ...padrao,
            calibracao,
        });
    }

    return padroesVencendo;
}

function montarMensagemPadroesVencendo(padroes: Padrao[]): string {
    if (padroes.length === 0) {
        return "";
    }

    const linhas = padroes.map((padrao) => criarLinha(padrao));

    return `
        <p>Os seguintes padrões vencem em até 30 dias:</p>
        <ul>
            ${linhas.join("")}
        </ul>
    `;
}

function criarLinha(padrao: Padrao): string {
    const calibracao = padrao.calibracao;

    if (!calibracao) {
        return `<li>${padrao.nome} - ${padrao.tag}</li>`;
    }

    const dataVencimento = calcularDataVencimento(
        calibracao.dataCalibracao,
        calibracao.periodicidade
    );

    return `<li>${padrao.nome} - ${padrao.tag} - ${formatarData(dataVencimento)}</li>`;
}

function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
}

export async function enviarEmailPadroesVencendo(destinatario: string): Promise<boolean> {
    const padroes = await buscarPadroesVencendoEm30Dias();
    const mensagem = montarMensagemPadroesVencendo(padroes);

    if (!mensagem) return false;
    if (destinatario.trim().length === 0) return false;

    const serviceId = process.env.EXPO_PUBLIC_SERVICE_ID;
    const templateId = process.env.EXPO_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.EXPO_PUBLIC_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.log("Configuração do EmailJS não encontrada.");
        return false;
    }

    try {
        await send(
            serviceId,
            templateId,
            {
                to_email: destinatario,
                email: destinatario,
                subject: "Padrões próximos do vencimento",
                message: mensagem,
            },
            {
                publicKey,
            }
        );

        return true;
    } catch (error) {
        console.log("Erro ao enviar email pelo EmailJS:", error);
        return false;
    }
}
