import { createFornecedor, deleteFornecedor, getFornecedorByID, getFornecedores, updateFornecedor } from "@/services/fornecedorService";
import { FornecedorDTO } from "@/types/fornecedor";
import { addDoc, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
}));

jest.mock("@/config/firebase", () => ({
    auth: {
        currentUser: {
            uid: "user-test",
        },
    },
    db: {},
}));

const mockFornecedor: FornecedorDTO = {
    nome: "MedCal Services",
    razaoSocial: "MedCal Services Ltda",
    cnpj: "12.345.678/0001-90",
    responsavel: "João Silva",
    telefone: "31991234567",
    email: "joao@medcal.com",
    linkPortal: "https://portal.medcal.com",
    usuarioPortal: "joao.silva",
    senhaPortal: "senha123",
};

(getDocs as jest.Mock).mockResolvedValue({
    docs: [
        {
            id: "1",
            data: () => mockFornecedor,
        },
    ],
});

(getDoc as jest.Mock).mockResolvedValue({
    id: "1",
    exists: () => true,
    data: () => mockFornecedor,
});

describe("createFornecedor", () => {
    test("Deve criar um fornecedor com sucesso", async () => {
        const result = await createFornecedor(mockFornecedor);
        expect(addDoc).toHaveBeenCalled();
        expect(result).toEqual(mockFornecedor);
    });
});

describe("getFornecedores", () => {
    test("Deve retornar os fornecedores cadastrados", async () => {
        const result = await getFornecedores();
        expect(getDocs).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: "1",
                ...mockFornecedor,
            },
        ]);
    });
});

describe("getFornecedorByID", () => {
    test("Deve retornar o fornecedor com o id correspondente", async () => {
        const id = "1";
        const result = await getFornecedorByID(id);
        expect(getDoc).toHaveBeenCalled();
        expect(result).toEqual({
            id: "1",
            ...mockFornecedor,
        });
    });

    test("Deve retornar null quando o fornecedor não existe", async () => {
        (getDoc as jest.Mock).mockResolvedValueOnce({
            id: "999",
            exists: () => false,
            data: () => null,
        });

        const result = await getFornecedorByID("999");
        expect(result).toBeNull();
    });
});

describe("updateFornecedor", () => {
    test("Deve atualizar um fornecedor com sucesso", async () => {
        const id = "1";

        const fornecedorAtualizado: FornecedorDTO = {
            nome: "Cal-Tech Medical",
            razaoSocial: "Cal-Tech Medical Ltda",
            cnpj: "98.765.432/0001-10",
            responsavel: "Maria Rodrigues",
            telefone: "31995831090",
            email: "maria@caltech.com",
            linkPortal: "https://portal.caltech.com",
            usuarioPortal: "maria.rodrigues",
            senhaPortal: "novasenha456",
        };

        const result = await updateFornecedor(id, fornecedorAtualizado);
        expect(updateDoc).toHaveBeenCalled();
        expect(result).toEqual(fornecedorAtualizado);
    });
});

describe("deleteFornecedor", () => {
    test("Deve remover um fornecedor com sucesso", async () => {
        const id = "1";
        await deleteFornecedor(id);
        expect(deleteDoc).toHaveBeenCalled();
    });
});