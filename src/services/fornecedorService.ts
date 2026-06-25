import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Fornecedor, FornecedorDTO } from "@/types/fornecedor";

const collection_name: string = "fornecedores";
const fornecedoresRef = collection(db, collection_name);

export async function getFornecedores(): Promise<Fornecedor[]> {
    const snapshot = await getDocs(fornecedoresRef);
    const fornecedores: Fornecedor[] = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<Fornecedor, "id">)
    }));

    return fornecedores;
}

export async function getFornecedorByID(id: string) {
    const fornecedorRef = doc(db, collection_name, id);
    const snapshot = await getDoc(fornecedorRef);

     if (!snapshot.exists()) {
        return null;
    }

    const fornecedor: Fornecedor = {
        id: snapshot.id,
        ...(snapshot.data() as Omit<Fornecedor, "id">)
    }

    return fornecedor;
}

export async function createFornecedor(novoFornecedor: FornecedorDTO): Promise<FornecedorDTO> {
    await addDoc(fornecedoresRef, {
        nome: novoFornecedor.nome,
        razaoSocial: novoFornecedor.razaoSocial,
        cnpj: novoFornecedor.cnpj,
        responsavel: novoFornecedor.responsavel,
        telefone: novoFornecedor.telefone,
        email: novoFornecedor.email,
        linkPortal: novoFornecedor.linkPortal,
        usuarioPortal: novoFornecedor.usuarioPortal,
        senhaPortal: novoFornecedor.senhaPortal
    });

    return novoFornecedor;
}

export async function updateFornecedor(id: string, fornecedorAtualizado: FornecedorDTO): Promise<FornecedorDTO> {
    const fornecedorRef = doc(db, collection_name, id);
    const fornecedorData = toFornecedorData(fornecedorAtualizado);

    await updateDoc(fornecedorRef, fornecedorData);

    return fornecedorAtualizado;
}

export async function deleteFornecedor(id: string) {
    const fornecedorRef = doc(db, collection_name, id);

    await deleteDoc(fornecedorRef);
}

function toFornecedorData(fornecedor: FornecedorDTO) {
    return {
        nome: fornecedor.nome,
        razaoSocial: fornecedor.razaoSocial,
        cnpj: fornecedor.cnpj,
        responsavel: fornecedor.responsavel,
        telefone: fornecedor.telefone,
        email: fornecedor.email,
        linkPortal: fornecedor.linkPortal,
        usuarioPortal: fornecedor.usuarioPortal,
        senhaPortal: fornecedor.senhaPortal
    }
}