import { Calibracao, CalibracaoDTO } from "@/types/calibracao";
import { Fornecedor } from "@/types/fornecedor";
import { Padrao } from "@/types/padrao";

export function createInitialCalibracaoForm(padraoId: string): CalibracaoDTO {
    return {
        padraoId,
        userId: "",
        fornecedorId: "",
        dataCalibracao: new Date(),
        numeroCertificado: "",
        periodicidade: 0,
        certificadoUrl: "",
        custo: 0,
    };
}

export function getCalibracaoFormFromItem(calibracao: Calibracao): CalibracaoDTO {
    return {
        padraoId: calibracao.padraoId,
        userId: calibracao.userId,
        fornecedorId: calibracao.fornecedorId,
        dataCalibracao: calibracao.dataCalibracao,
        numeroCertificado: calibracao.numeroCertificado,
        periodicidade: calibracao.periodicidade,
        certificadoUrl: calibracao.certificadoUrl ?? "",
        custo: calibracao.custo,
    };
}

export function trimCalibracaoForm(form: CalibracaoDTO): CalibracaoDTO {
    return {
        padraoId: form.padraoId.trim(),
        userId: form.userId.trim(),
        fornecedorId: form.fornecedorId.trim(),
        dataCalibracao: form.dataCalibracao,
        numeroCertificado: form.numeroCertificado.trim(),
        periodicidade: form.periodicidade,
        certificadoUrl: form.certificadoUrl?.trim() ?? "",
        custo: form.custo,
    };
}

export function isCalibracaoFormValid(
    form: CalibracaoDTO,
    dataCalibracaoInput: string,
    periodicidadeInput: string,
    custoInput: string
) {
    return (
        form.padraoId.length > 0 &&
        form.userId.length > 0 &&
        form.fornecedorId.length > 0 &&
        dataCalibracaoInput.trim().length > 0 &&
        isDateInputValid(dataCalibracaoInput) &&
        isDateValid(form.dataCalibracao) &&
        form.numeroCertificado.length > 0 &&
        periodicidadeInput.trim().length > 0 &&
        Number.isFinite(form.periodicidade) &&
        form.periodicidade > 0 &&
        custoInput.trim().length > 0 &&
        Number.isFinite(form.custo) &&
        form.custo >= 0
    );
}

export function getHeaderSubtitle(selectedPadrao: Padrao | undefined, hasPadraoContext: boolean) {
    if (selectedPadrao) {
        return `${selectedPadrao.nome} - ${selectedPadrao.tag}`;
    }

    if (hasPadraoContext) {
        return "Padrão não encontrado.";
    }

    return "Abra esta tela a partir de um card de padrão.";
}

export function getFornecedorLabel(fornecedorId: string, fornecedores: Fornecedor[]) {
    const fornecedor = fornecedores.find((item) => item.id === fornecedorId);

    return fornecedor?.nome ?? "Fornecedor não encontrado";
}

export function parseDateInput(value: string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());

    if (!match) {
        return new Date(Number.NaN);
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return new Date(Number.NaN);
    }

    return date;
}

export function formatDateInput(date: Date) {
    if (!isDateValid(date)) {
        return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function formatDate(date: Date) {
    if (!isDateValid(date)) {
        return "Data inválida";
    }

    return date.toLocaleDateString("pt-BR");
}

export function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function getDateTime(date: Date) {
    return isDateValid(date) ? date.getTime() : 0;
}

export function isDateValid(date: Date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
}

export function isDateInputValid(value: string) {
    return isDateValid(parseDateInput(value));
}