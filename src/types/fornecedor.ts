export interface Fornecedor {
    id: string;
    nome: string;
    razaoSocial: string;
    cnpj: string;
    responsavel: string;
    telefone: string;
    email: string;
    linkPortal?: string;
    usuarioPortal?: string;
    senhaPortal?: string;
}

export type FornecedorDTO = Omit<Fornecedor, "id">;