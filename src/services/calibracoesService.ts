import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { Calibracao, CalibracaoDTO } from "@/types/calibracao";

const collectionName = "calibracoes";
const calibracoesRef = collection(db, collectionName);

export async function getCalibracoes(): Promise<Calibracao[]> {
    ensureAuthenticated();

    const snapshot = await getDocs(calibracoesRef);

    const calibracoes: Calibracao[] = snapshot.docs.map((document) => {
        const data = document.data() as Omit<Calibracao, "id"> & { dataCalibracao: Timestamp };

        return {
            id: document.id,
            ...data,
            dataCalibracao: data.dataCalibracao.toDate()
        };
    });

    return calibracoes;
}

export async function getCalibracaoById(id: string): Promise<Calibracao | null> {
    ensureAuthenticated();

    const calibracaoRef = doc(db, collectionName, id);
    const snapshot = await getDoc(calibracaoRef);

    if (!snapshot.exists()) {
        return null;
    }

    const data = snapshot.data() as Omit<Calibracao, "id"> & { dataCalibracao: Timestamp };

    const calibracao: Calibracao = {
        id: snapshot.id,
        ...data,
        dataCalibracao: data.dataCalibracao.toDate()
    };

    return calibracao;
}

export async function createCalibracao(novaCalibracao: CalibracaoDTO): Promise<CalibracaoDTO> {
    ensureAuthenticated();

    const calibracaoData = toCalibracaoData(novaCalibracao);

    await addDoc(calibracoesRef, calibracaoData);

    return novaCalibracao;
}

export async function updateCalibracao(id: string, calibracaoAtualizada: CalibracaoDTO): Promise<CalibracaoDTO> {
    ensureAuthenticated();
    
    const calibracaoRef = doc(db, collectionName, id);
    const calibracaoData = toCalibracaoData(calibracaoAtualizada);

    await updateDoc(calibracaoRef, calibracaoData);

    return calibracaoAtualizada;
}

export async function deleteCalibracao(id: string) {
    ensureAuthenticated();

    const calibracaoRef = doc(db, collectionName, id);

    await deleteDoc(calibracaoRef);
}

function toCalibracaoData(calibracao: CalibracaoDTO) {
    return {
        padraoId: calibracao.padraoId,
        userId: calibracao.userId,
        fornecedorId: calibracao.fornecedorId,
        dataCalibracao: Timestamp.fromDate(calibracao.dataCalibracao),
        numeroCertificado: calibracao.numeroCertificado,
        periodicidade: calibracao.periodicidade,
        certificadoUrl: calibracao.certificadoUrl,
        custo: calibracao.custo
    }
}

function ensureAuthenticated() {
    if(!auth.currentUser) {
        throw new Error("auth-required");
    }
}
