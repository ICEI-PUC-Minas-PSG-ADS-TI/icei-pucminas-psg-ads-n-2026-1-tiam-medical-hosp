import { FirebaseError } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { Padrao, PadraoDTO } from "@/types/padrao";

const AUTH_REQUIRED_ERROR = "auth-required";
const collectionName = "padroes";
const padroesRef = collection(db, collectionName);

export async function getPadroes(): Promise<Padrao[]> {
    ensureAuthenticated();

    const snapshot = await getDocs(padroesRef);

    const padroes: Padrao[] = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<Padrao, "id">)
    }));

    return padroes;
}

export async function getPadraoById(id: string) {
    ensureAuthenticated();

    const padraoRef = doc(db, collectionName, id);
    const snapshot = await getDoc(padraoRef);

    if (!snapshot.exists()) {
        return null;
    }

    const padrao: Padrao = {
        id: snapshot.id,
        ...(snapshot.data() as Omit<Padrao, "id">)
    }

    return padrao;
}

export async function createPadrao(novoPadrao: PadraoDTO): Promise<PadraoDTO> {
    ensureAuthenticated();

    await addDoc(padroesRef, {
        nome: novoPadrao.nome,
        fabricante: novoPadrao.fabricante,
        modelo: novoPadrao.modelo,
        tag: novoPadrao.tag,
        numSerie: novoPadrao.numSerie,
        patrimonio: novoPadrao.patrimonio,
        setor: novoPadrao.setor
    });

    return novoPadrao;
}

export async function updatePadrao(id: string, padraoAtualizado: PadraoDTO): Promise<PadraoDTO> {
    ensureAuthenticated();

    const padraoRef = doc(db, collectionName, id);
    const padraoData = toPadraoData(padraoAtualizado);

    await updateDoc(padraoRef, padraoData);

    return padraoAtualizado;
}

export async function deletePadrao(id: string) {
    ensureAuthenticated();

    const padraoRef = doc(db, collectionName, id);

    await deleteDoc(padraoRef);
}

export function getPadraoErrorMessage(error: unknown) {
    if (isAuthRequiredError(error)) {
        return "Entre novamente para acessar os padroes.";
    }

    if (isPadraoPermissionError(error)) {
        return "Nao foi possivel acessar os padroes. Verifique se sua conta esta autorizada e se as regras do Firebase foram publicadas.";
    }

    return "Nao foi possivel concluir a operacao. Tente novamente em instantes.";
}

export function isPadraoPermissionError(error: unknown) {
    return error instanceof FirebaseError && error.code === "permission-denied";
}

function toPadraoData(padrao: PadraoDTO) {
    return {
        nome: padrao.nome,
        fabricante: padrao.fabricante,
        modelo: padrao.modelo,
        tag: padrao.tag,
        numSerie: padrao.numSerie,
        patrimonio: padrao.patrimonio,
        setor: padrao.setor
    }
}

function ensureAuthenticated() {
    if (!auth.currentUser) {
        throw new Error(AUTH_REQUIRED_ERROR);
    }
}

function isAuthRequiredError(error: unknown) {
    return error instanceof Error && error.message === AUTH_REQUIRED_ERROR;
}
