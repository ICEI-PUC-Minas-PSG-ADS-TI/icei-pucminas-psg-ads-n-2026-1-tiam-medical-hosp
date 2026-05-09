import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Padrao, PadraoDTO } from "@/types/padrao";

const collection_name: string = "padroes";
const padroesRef = collection(db, collection_name);

export async function getPadroes(): Promise<Padrao[]> {
    const snapshot = await getDocs(padroesRef);

    const padroes: Padrao[] = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<Padrao, "id">)
    }));

    return padroes;
}

export async function getPadraoById(id: string) {
    const padraoRef = doc(db, collection_name, id);
    const snapshot = await getDoc(padraoRef);

    const padrao: Padrao = {
        id: snapshot.id,
        ...(snapshot.data() as Omit<Padrao, "id">)
    }

    return padrao;
}

export async function createPadrao(novoPadrao: PadraoDTO): Promise<PadraoDTO> {
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
    const padraoRef = doc(db, collection_name, id);
    const padraoData = toPadraoData(padraoAtualizado);

    await updateDoc(padraoRef, padraoData);

    return padraoAtualizado;
}

export async function deletePadrao(id: string) {
    const padraoRef = doc(db, collection_name, id);

    await deleteDoc(padraoRef);
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