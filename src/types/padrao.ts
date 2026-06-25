import { Calibracao } from "./calibracao";

export type StatusCalibracao = "valido" | "atencao" | "vencido";

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
    ultimaCalibracaoId?: string;
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
    ultimaCalibracaoId?: string;
    calibracao?: Calibracao;
}
