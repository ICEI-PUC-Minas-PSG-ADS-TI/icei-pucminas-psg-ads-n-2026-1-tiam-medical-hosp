import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";
import { Padrao, PadraoDTO } from "@/types/padrao";

const collectionName = "padroes";
const padroesRef = collection(db, collectionName);

export async function getPadroes(): Promise<Padrao[]> {
  ensureAuthenticated();

  const snapshot = await getDocs(padroesRef);

  const padroes: Padrao[] = snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Padrao, "id">),
  }));

  return padroes;
}

export async function getPadraoById(id: string): Promise<Padrao | null> {
  ensureAuthenticated();

  const padraoRef = doc(db, collectionName, id);
  const snapshot = await getDoc(padraoRef);

  if (!snapshot.exists()) {
    return null;
  }

  const padrao: Padrao = {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Padrao, "id">),
  };

  return padrao;
}

export async function createPadrao(novoPadrao: PadraoDTO): Promise<PadraoDTO> {
  ensureAuthenticated();

  await addDoc(padroesRef, toPadraoData(novoPadrao));

  return novoPadrao;
}

export async function updatePadrao(
  id: string,
  padraoAtualizado: PadraoDTO
): Promise<PadraoDTO> {
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

function toPadraoData(padrao: PadraoDTO) {
  return {
    nome: padrao.nome,
    fabricante: padrao.fabricante,
    modelo: padrao.modelo,
    tag: padrao.tag,
    numSerie: padrao.numSerie,
    patrimonio: padrao.patrimonio,
    setor: padrao.setor,

    imagemUrl: padrao.imagemUrl ?? "",

    calibracao: padrao.calibracao
      ? {
        padraoId: padrao.calibracao.padraoId,
        userId: padrao.calibracao.userId,
        fornecedorId: padrao.calibracao.fornecedorId,
        dataCalibracao: padrao.calibracao.dataCalibracao,
        numeroCertificado: padrao.calibracao.numeroCertificado,
        periodicidade: padrao.calibracao.periodicidade,
        certificadoUrl: padrao.calibracao.certificadoUrl ?? "",
        custo: padrao.calibracao.custo,
      }
      : null,
  };
}

function ensureAuthenticated() {
  if (!auth.currentUser) {
    throw new Error("auth-required");
  }
}