export interface Perfil {
    uid: string;
    nome: string;
    email: string;
    empresa: string;
    cargo: string;
    telefone: string;
    isGestor: boolean;
    photoURL?: string;
}

export interface PerfilDTO {
    nome: string;
    empresa: string;
    cargo: string;
    telefone: string;
    isGestor: boolean;
}