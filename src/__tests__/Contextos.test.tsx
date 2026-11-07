import React, { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { CalibracoesProvider, useCalibracoes } from "@/contexts/calibracoesContext";
import { FornecedoresProvider, useFornecedores } from "@/contexts/fornecedorContext";
import { PadroesProvider, usePadroes } from "@/contexts/padraoContext";
import { PerfilProvider, usePerfil } from "@/contexts/perfilContext";

import * as calibracoesService from "@/services/calibracoesService";
import * as fornecedorService from "@/services/fornecedorService";
import * as padraoService from "@/services/padraoService";
import * as perfilService from "@/services/perfilService";
import { auth } from "@/config/firebase";

jest.mock("@/services/calibracoesService", () => ({
    getCalibracoes: jest.fn(),
    getCalibracaoById: jest.fn(),
    createCalibracao: jest.fn(),
    updateCalibracao: jest.fn(),
    deleteCalibracao: jest.fn(),
}));
jest.mock("@/services/fornecedorService", () => ({
    getFornecedores: jest.fn(),
    getFornecedorByID: jest.fn(),
    createFornecedor: jest.fn(),
    updateFornecedor: jest.fn(),
    deleteFornecedor: jest.fn(),
}));
jest.mock("@/services/padraoService", () => ({
    getPadroes: jest.fn(),
    getPadraoById: jest.fn(),
    createPadrao: jest.fn(),
    updatePadrao: jest.fn(),
    deletePadrao: jest.fn(),
}));
jest.mock("@/services/perfilService", () => ({
    getPerfil: jest.fn(),
    savePerfil: jest.fn(),
    getPerfilErrorMessage: jest.fn(),
}));
jest.mock("@/config/firebase", () => ({
    auth: { currentUser: { uid: "user-1" } },
    db: {},
}));

const authMock = auth as unknown as { currentUser: unknown };

const calibracaoDTO = {
    padraoId: "p-1",
    userId: "u-1",
    fornecedorId: "f-1",
    dataCalibracao: new Date("2026-01-10"),
    numeroCertificado: "CERT-1",
    periodicidade: 12,
    custo: 100,
};
const calibracao = { id: "c-1", ...calibracaoDTO };

const padraoDTO = {
    nome: "Multímetro",
    fabricante: "Fab",
    modelo: "Mod",
    tag: "TAG-1",
    numSerie: "1",
    patrimonio: "PAT-1",
    setor: "Setor",
};
const padrao = { id: "p-1", ...padraoDTO };

const fornecedorDTO = {
    nome: "Lab",
    razaoSocial: "Lab LTDA",
    cnpj: "00.000.000/0001-00",
    responsavel: "Carlos",
    telefone: "3100000000",
    email: "lab@lab.com",
};
const fornecedor = { id: "f-1", ...fornecedorDTO };

const perfil = { uid: "user-1", nome: "Ana", email: "ana@empresa.com", cargo: "Gestora", telefone: "3100000000", isGestor: true };

const wrapperDe = (Provider: React.ComponentType<{ children: ReactNode }>) =>
    function Wrapper({ children }: { children: ReactNode }) {
        return <Provider>{children}</Provider>;
    };

beforeEach(() => {
    jest.resetAllMocks();
    authMock.currentUser = { uid: "user-1" };
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("CalibracoesContext", () => {
    const wrapper = wrapperDe(CalibracoesProvider);

    test("Deve lançar erro quando o hook é usado fora do Provider", () => {
        expect(() => renderHook(() => useCalibracoes())).toThrow(
            "useCalibracoes deve ser usado dentro de CalibracoesProvider"
        );
    });

    test("Deve carregar a lista de calibrações", async () => {
        (calibracoesService.getCalibracoes as jest.Mock).mockResolvedValue([calibracao]);
        const { result } = renderHook(() => useCalibracoes(), { wrapper });

        await act(async () => { await result.current.loadCalibracoes(); });

        expect(result.current.calibracoes).toEqual([calibracao]);
        expect(result.current.loading).toBe(false);
    });

    test("Deve manter a lista vazia quando o carregamento falha", async () => {
        (calibracoesService.getCalibracoes as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => useCalibracoes(), { wrapper });

        await act(async () => { await result.current.loadCalibracoes(); });

        expect(result.current.calibracoes).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    test("Deve selecionar e limpar uma calibração por id", async () => {
        (calibracoesService.getCalibracaoById as jest.Mock).mockResolvedValue(calibracao);
        const { result } = renderHook(() => useCalibracoes(), { wrapper });

        await act(async () => { await result.current.loadCalibracaoById("c-1"); });
        expect(result.current.selectedCalibracao).toEqual(calibracao);

        act(() => { result.current.clearSelectedCalibracao(); });
        expect(result.current.selectedCalibracao).toBeNull();
    });

    test("Deve retornar null quando a busca por id falha", async () => {
        (calibracoesService.getCalibracaoById as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => useCalibracoes(), { wrapper });

        let retorno: unknown;
        await act(async () => { retorno = await result.current.loadCalibracaoById("c-1"); });

        expect(retorno).toBeNull();
    });

    test("Deve adicionar, editar e remover calibrações recarregando a lista", async () => {
        (calibracoesService.getCalibracoes as jest.Mock).mockResolvedValue([calibracao]);
        const { result } = renderHook(() => useCalibracoes(), { wrapper });

        let ok: boolean[] = [];
        await act(async () => {
            ok = [
                await result.current.addCalibracao(calibracaoDTO),
                await result.current.editCalibracao(calibracaoDTO, "c-1"),
                await result.current.removeCalibracao("c-1"),
            ];
        });

        expect(ok).toEqual([true, true, true]);
        expect(calibracoesService.createCalibracao).toHaveBeenCalledWith(calibracaoDTO);
        expect(calibracoesService.updateCalibracao).toHaveBeenCalledWith("c-1", calibracaoDTO);
        expect(calibracoesService.deleteCalibracao).toHaveBeenCalledWith("c-1");
        expect(calibracoesService.getCalibracoes).toHaveBeenCalledTimes(3);
    });

    test("Deve retornar false quando adicionar, editar ou remover falha", async () => {
        (calibracoesService.createCalibracao as jest.Mock).mockRejectedValue(new Error("erro"));
        (calibracoesService.updateCalibracao as jest.Mock).mockRejectedValue(new Error("erro"));
        (calibracoesService.deleteCalibracao as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => useCalibracoes(), { wrapper });

        let ok: boolean[] = [];
        await act(async () => {
            ok = [
                await result.current.addCalibracao(calibracaoDTO),
                await result.current.editCalibracao(calibracaoDTO, "c-1"),
                await result.current.removeCalibracao("c-1"),
            ];
        });

        expect(ok).toEqual([false, false, false]);
    });
});

describe("PadroesContext", () => {
    const wrapper = wrapperDe(PadroesProvider);

    test("Deve lançar erro quando o hook é usado fora do Provider", () => {
        expect(() => renderHook(() => usePadroes())).toThrow(
            "usePadroes deve ser usado dentro de PadroesProvider"
        );
    });

    test("Deve carregar a lista de padrões", async () => {
        (padraoService.getPadroes as jest.Mock).mockResolvedValue([padrao]);
        const { result } = renderHook(() => usePadroes(), { wrapper });

        await act(async () => { await result.current.loadPadroes(); });

        expect(result.current.padroes).toEqual([padrao]);
    });

    test("Deve selecionar e limpar um padrão por id", async () => {
        (padraoService.getPadraoById as jest.Mock).mockResolvedValue(padrao);
        const { result } = renderHook(() => usePadroes(), { wrapper });

        await act(async () => { await result.current.loadPadraoById("p-1"); });
        expect(result.current.selectedPadrao).toEqual(padrao);

        act(() => { result.current.clearSelectedPadrao(); });
        expect(result.current.selectedPadrao).toBeNull();
    });

    test("Deve retornar null quando a busca por id falha", async () => {
        (padraoService.getPadraoById as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => usePadroes(), { wrapper });

        let retorno: unknown;
        await act(async () => { retorno = await result.current.loadPadraoById("p-1"); });

        expect(retorno).toBeNull();
    });

    test("Deve adicionar, editar e remover padrões recarregando a lista", async () => {
        (padraoService.getPadroes as jest.Mock).mockResolvedValue([padrao]);
        const { result } = renderHook(() => usePadroes(), { wrapper });

        let ok: boolean[] = [];
        await act(async () => {
            ok = [
                await result.current.addPadrao(padraoDTO),
                await result.current.editPadrao("p-1", padraoDTO),
                await result.current.removePadrao("p-1"),
            ];
        });

        expect(ok).toEqual([true, true, true]);
        expect(padraoService.createPadrao).toHaveBeenCalledWith(padraoDTO);
        expect(padraoService.updatePadrao).toHaveBeenCalledWith("p-1", padraoDTO);
        expect(padraoService.deletePadrao).toHaveBeenCalledWith("p-1");
    });

    test("Deve retornar false quando adicionar, editar ou remover falha", async () => {
        (padraoService.createPadrao as jest.Mock).mockRejectedValue(new Error("erro"));
        (padraoService.updatePadrao as jest.Mock).mockRejectedValue(new Error("erro"));
        (padraoService.deletePadrao as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => usePadroes(), { wrapper });

        let ok: boolean[] = [];
        await act(async () => {
            ok = [
                await result.current.addPadrao(padraoDTO),
                await result.current.editPadrao("p-1", padraoDTO),
                await result.current.removePadrao("p-1"),
            ];
        });

        expect(ok).toEqual([false, false, false]);
    });
});

describe("FornecedoresContext", () => {
    const wrapper = wrapperDe(FornecedoresProvider);

    test("Deve lançar erro quando o hook é usado fora do Provider", () => {
        expect(() => renderHook(() => useFornecedores())).toThrow(
            "useFornecedores deve ser usado dentro de FornecedoresProvider"
        );
    });

    test("Deve carregar os fornecedores automaticamente quando há usuário autenticado", async () => {
        (fornecedorService.getFornecedores as jest.Mock).mockResolvedValue([fornecedor]);
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        await waitFor(() => expect(result.current.fornecedores).toEqual([fornecedor]));
        expect(result.current.error).toBeNull();
    });

    test("Deve informar erro e não carregar quando não há usuário autenticado", async () => {
        authMock.currentUser = null;
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        await waitFor(() => expect(result.current.error).toBe("Usuário não autenticado."));
        expect(fornecedorService.getFornecedores).not.toHaveBeenCalled();
    });

    test("Deve registrar erro quando o carregamento falha", async () => {
        (fornecedorService.getFornecedores as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        await waitFor(() => expect(result.current.error).toBe("Erro ao carregar fornecedores."));
    });

    test("Deve selecionar e limpar um fornecedor por id", async () => {
        (fornecedorService.getFornecedores as jest.Mock).mockResolvedValue([]);
        (fornecedorService.getFornecedorByID as jest.Mock).mockResolvedValue(fornecedor);
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        await act(async () => { await result.current.loadFornecedorByID("f-1"); });
        expect(result.current.selectedFornecedor).toEqual(fornecedor);

        act(() => { result.current.clearSelectedFornecedor(); });
        expect(result.current.selectedFornecedor).toBeNull();
    });

    test("Deve registrar a mensagem do erro quando a busca por id falha", async () => {
        (fornecedorService.getFornecedores as jest.Mock).mockResolvedValue([]);
        (fornecedorService.getFornecedorByID as jest.Mock).mockRejectedValue(new Error("não encontrado"));
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        let retorno: unknown;
        await act(async () => { retorno = await result.current.loadFornecedorByID("x"); });

        expect(retorno).toBeNull();
        expect(result.current.error).toBe("não encontrado");
    });

    test("Deve adicionar, editar e remover fornecedores recarregando a lista", async () => {
        (fornecedorService.getFornecedores as jest.Mock).mockResolvedValue([fornecedor]);
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        await act(async () => {
            await result.current.addFornecedor(fornecedorDTO);
            await result.current.editFornecedor("f-1", fornecedorDTO);
            await result.current.removeFornecedor("f-1");
        });

        expect(fornecedorService.createFornecedor).toHaveBeenCalledWith(fornecedorDTO);
        expect(fornecedorService.updateFornecedor).toHaveBeenCalledWith("f-1", fornecedorDTO);
        expect(fornecedorService.deleteFornecedor).toHaveBeenCalledWith("f-1");
    });

    test("Deve registrar erro quando adicionar, editar ou remover falha", async () => {
        (fornecedorService.getFornecedores as jest.Mock).mockResolvedValue([]);
        (fornecedorService.createFornecedor as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => useFornecedores(), { wrapper });

        await act(async () => { await result.current.addFornecedor(fornecedorDTO); });

        expect(result.current.error).toBe("Erro ao adicionar fornecedor.");
    });
});

describe("PerfilContext", () => {
    const wrapper = wrapperDe(PerfilProvider);

    beforeEach(() => {
        (perfilService.getPerfilErrorMessage as jest.Mock).mockReturnValue("mensagem de erro");
    });

    test("Deve lançar erro quando o hook é usado fora do Provider", () => {
        expect(() => renderHook(() => usePerfil())).toThrow(
            "usePerfil deve ser usado dentro de PerfilProvider"
        );
    });

    test("Deve carregar o perfil do usuário", async () => {
        (perfilService.getPerfil as jest.Mock).mockResolvedValue(perfil);
        const { result } = renderHook(() => usePerfil(), { wrapper });

        await act(async () => { await result.current.loadPerfil(); });

        expect(result.current.perfil).toEqual(perfil);
        expect(result.current.errorMessage).toBeNull();
    });

    test("Deve expor a mensagem de erro quando o carregamento falha e permitir limpá-la", async () => {
        (perfilService.getPerfil as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => usePerfil(), { wrapper });

        await act(async () => { await result.current.loadPerfil(); });
        expect(result.current.errorMessage).toBe("mensagem de erro");

        act(() => { result.current.clearError(); });
        expect(result.current.errorMessage).toBeNull();
    });

    test("Deve salvar o perfil, recarregar os dados e retornar true", async () => {
        (perfilService.getPerfil as jest.Mock).mockResolvedValue(perfil);
        const { result } = renderHook(() => usePerfil(), { wrapper });
        const dto = { nome: "Ana", cargo: "Gestora", telefone: "3100000000", isGestor: true };

        let ok = false;
        await act(async () => { ok = await result.current.updatePerfil(dto); });

        expect(ok).toBe(true);
        expect(perfilService.savePerfil).toHaveBeenCalledWith(dto);
        expect(perfilService.getPerfil).toHaveBeenCalled();
    });

    test("Deve retornar false e expor a mensagem quando salvar o perfil falha", async () => {
        (perfilService.savePerfil as jest.Mock).mockRejectedValue(new Error("erro"));
        const { result } = renderHook(() => usePerfil(), { wrapper });

        let ok = true;
        await act(async () => {
            ok = await result.current.updatePerfil({ nome: "Ana", cargo: "x", telefone: "1", isGestor: false });
        });

        expect(ok).toBe(false);
        expect(result.current.errorMessage).toBe("mensagem de erro");
    });
});