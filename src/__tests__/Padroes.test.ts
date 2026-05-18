import { createPadrao, deletePadrao, getPadraoById, getPadroes, updatePadrao } from "@/services/padraoService";
import { PadraoDTO } from "@/types/padrao";
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

const mockPadrao: PadraoDTO = {
    nome: "Padrao",
    fabricante: "Fabricante X",
    modelo: "Modelo X",
    tag: "123CZA",
    numSerie: "1234",
    patrimonio: "PAT157",
    setor: "Cardiovasculares"
};

(getDocs as jest.Mock).mockResolvedValue({
    docs: [
        {
            id: "1",
            data: () => mockPadrao,
        },
    ],
});

(getDoc as jest.Mock).mockResolvedValue({
    id: "1",
    exists: () => true,
    data: () => mockPadrao, 
});

describe("createPadrao", () => {
    test("Deve criar um padrão com sucesso", async () => {
        const result = await createPadrao(mockPadrao);
        expect(addDoc).toHaveBeenCalled();
        expect(result).toEqual(mockPadrao);
    });
});

describe("getPadroes", () => {
    test("Deve retornar os padrões criados", async () => {
        const result = await getPadroes();
        expect(getDocs).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: "1",
                ...mockPadrao
            }
        ]);
    });
});

describe("getPadraoById", () => {
    test("Deve retornar o padrão com o id correspondente", async () => {
        const id = "1";
        const result = await getPadraoById(id);
        expect(getDoc).toHaveBeenCalled();
        expect(result).toEqual({
            id: "1",
            ...mockPadrao
        });
    });
});

describe("updatePadrao", () => {
    test("Deve atualizar um padrão com sucesso", async () => {
        const id = "1";

        const padraoAtualizado = {
            nome: "Padrao Atualizado",
            fabricante: "Fabricante Y",
            modelo: "Modelo Y",
            tag: "34536",
            numSerie: "53045",
            patrimonio: "PAT244",
            setor: "Cardiovasculares"
        };

        const result = await updatePadrao(id, padraoAtualizado);

        expect(updateDoc).toHaveBeenCalled();
        expect(result).toEqual(padraoAtualizado);
    });
});

describe("deletePadrao", () => {
    test("Deve remover um padrão com sucesso", async () => {
        const id = "1";

        await deletePadrao(id);

        expect(deleteDoc).toHaveBeenCalled();
    });
});