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