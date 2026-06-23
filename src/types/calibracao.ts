export interface Calibracao {
    id: string;
    padraoId: string;
    userId: string;
    fornecedorId: string;
    dataCalibracao: Date;
    numeroCertificado: string;
    periodicidade: number;
    certificadoUrl?: string;
    custo: number;
};

export type CalibracaoDTO = Omit<Calibracao, 'id'>;