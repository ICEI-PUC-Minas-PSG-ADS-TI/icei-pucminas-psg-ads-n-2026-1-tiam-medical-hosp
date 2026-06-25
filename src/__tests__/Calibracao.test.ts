import { createCalibracao, deleteCalibracao, getCalibracaoById, getCalibracoes, updateCalibracao } from "@/services/calibracoesService";
import { CalibracaoDTO } from "@/types/calibracao";
import { addDoc, deleteDoc, getDoc, getDocs, updateDoc, Timestamp } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
    Timestamp: {
        fromDate: jest.fn((date: Date) => ({ toDate: () => date })),
    },
}));

jest.mock("@/config/firebase", () => ({
    auth: {
        currentUser: {
            uid: "user-test",
        },
    },
    db: {},
}));

const mockDataCalibracao = new Date("2024-01-15");

const mockCalibracao: CalibracaoDTO = {
    padraoId: "padrao-1",
    userId: "user-test",
    fornecedorId: "fornecedor-1",
    dataCalibracao: mockDataCalibracao,
    numeroCertificado: "CERT-001",
    periodicidade: 12,
    certificadoUrl: "https://storage.firebase.com/cert001.pdf",
    custo: 350.00,
};

(getDocs as jest.Mock).mockResolvedValue({
    docs: [
        {
            id: "1",
            data: () => ({
                ...mockCalibracao,
                dataCalibracao: { toDate: () => mockDataCalibracao },
            }),
        },
    ],
});

(getDoc as jest.Mock).mockResolvedValue({
    id: "1",
    exists: () => true,
    data: () => ({
        ...mockCalibracao,
        dataCalibracao: { toDate: () => mockDataCalibracao },
    }),
});

describe("createCalibracao", () => {
    test("Deve criar uma calibração com sucesso", async () => {
        const result = await createCalibracao(mockCalibracao);
        expect(addDoc).toHaveBeenCalled();
        expect(result).toEqual(mockCalibracao);
    });
});

describe("getCalibracoes", () => {
    test("Deve retornar as calibrações cadastradas", async () => {
        const result = await getCalibracoes();
        expect(getDocs).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: "1",
                ...mockCalibracao,
                dataCalibracao: mockDataCalibracao,
            },
        ]);
    });
});

describe("getCalibracaoById", () => {
    test("Deve retornar a calibração com o id correspondente", async () => {
        const id = "1";
        const result = await getCalibracaoById(id);
        expect(getDoc).toHaveBeenCalled();
        expect(result).toEqual({
            id: "1",
            ...mockCalibracao,
            dataCalibracao: mockDataCalibracao,
        });
    });

    test("Deve retornar null quando a calibração não existe", async () => {
        (getDoc as jest.Mock).mockResolvedValueOnce({
            id: "999",
            exists: () => false,
            data: () => null,
        });

        const result = await getCalibracaoById("999");
        expect(result).toBeNull();
    });
});

describe("updateCalibracao", () => {
    test("Deve atualizar uma calibração com sucesso", async () => {
        const id = "1";

        const calibracaoAtualizada: CalibracaoDTO = {
            padraoId: "padrao-2",
            userId: "user-test",
            fornecedorId: "fornecedor-2",
            dataCalibracao: new Date("2024-06-01"),
            numeroCertificado: "CERT-002",
            periodicidade: 6,
            certificadoUrl: "https://storage.firebase.com/cert002.pdf",
            custo: 500.00,
        };

        const result = await updateCalibracao(id, calibracaoAtualizada);
        expect(updateDoc).toHaveBeenCalled();
        expect(result).toEqual(calibracaoAtualizada);
    });
});

describe("deleteCalibracao", () => {
    test("Deve remover uma calibração com sucesso", async () => {
        const id = "1";
        await deleteCalibracao(id);
        expect(deleteDoc).toHaveBeenCalled();
    });
});