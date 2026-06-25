import { Calibracao } from "./calibracao";

export type StatusCalibracao = "valido" | "atencao" | "vencido";

// export interface CalibracaoPadrao {
//     dataCalibracao: string;
//     proximoVencimento: string;
//     numeroCertificado: string;
//     frequencia: string;
//     fornecedor: string;
//     certificadoPdfUrl?: string;
//     status?: StatusCalibracao;
//     atualizadoEm?: string;
// }



export interface Padrao {
    id: string;
    nome: string;
    fabricante: string;
    modelo: string;
    tag: string;
    numSerie: string;
    patrimonio: string;
    setor: string;
    imagemUrl?: string;
    calibracao?: Calibracao;
}

export interface PadraoDTO {
    nome: string;
    fabricante: string;
    modelo: string;
    tag: string;
    numSerie: string;
    patrimonio: string;
    setor: string;
    imagemUrl?: string;
    calibracao?: Calibracao;
}