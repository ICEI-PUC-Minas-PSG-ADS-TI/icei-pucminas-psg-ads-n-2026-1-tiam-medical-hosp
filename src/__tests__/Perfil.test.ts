import { FirebaseError } from "firebase/app";
import { getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import {
    getPerfil,
    getPerfilErrorMessage,
    isPerfilPermissionError,
    savePerfil,
} from "@/services/perfilService";
import { auth } from "@/config/firebase";

jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
    updateProfile: jest.fn(),
}));

jest.mock("@/config/firebase", () => ({
    auth: { currentUser: null },
    db: {},
}));

const authMock = auth as unknown as { currentUser: unknown };

const usuarioLogado = {
    uid: "user-1",
    email: "ana@empresa.com",
    displayName: "Ana",
    photoURL: "https://foto.com/ana.png",
};

beforeEach(() => {
    authMock.currentUser = usuarioLogado;
    (getDoc as jest.Mock).mockReset();
    (setDoc as jest.Mock).mockReset();
    (updateProfile as jest.Mock).mockReset();
});

describe("getPerfil", () => {
    test("Deve lançar erro quando não há usuário autenticado", async () => {
        authMock.currentUser = null;

        await expect(getPerfil()).rejects.toThrow("auth-required");
    });

    test("Deve retornar dados básicos da conta quando o perfil ainda não existe", async () => {
        (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

        const perfil = await getPerfil();

        expect(perfil).toMatchObject({
            uid: "user-1",
            nome: "Ana",
            email: "ana@empresa.com",
            cargo: "",
            telefone: "",
            photoURL: "https://foto.com/ana.png",
        });
    });

    test("Deve combinar os dados da conta com o perfil salvo no Firestore", async () => {
        (getDoc as jest.Mock).mockResolvedValue({
            exists: () => true,
            data: () => ({ nome: "Ana Souza", cargo: "Técnica", telefone: "3199999-0000", isGestor: false }),
        });

        const perfil = await getPerfil();

        expect(perfil).toMatchObject({
            uid: "user-1",
            email: "ana@empresa.com",
            nome: "Ana Souza",
            cargo: "Técnica",
            isGestor: false,
        });
    });
});

describe("savePerfil", () => {
    const dto = { nome: "Ana Souza", cargo: "Gestora", telefone: "3188888-0000", isGestor: true };

    test("Deve lançar erro quando não há usuário autenticado", async () => {
        authMock.currentUser = null;

        await expect(savePerfil(dto)).rejects.toThrow("auth-required");
        expect(setDoc).not.toHaveBeenCalled();
    });

    test("Deve atualizar o nome de exibição e gravar o perfil com merge", async () => {
        const resultado = await savePerfil(dto);

        expect(updateProfile).toHaveBeenCalledWith(usuarioLogado, { displayName: "Ana Souza" });
        expect(setDoc).toHaveBeenCalledWith(
            undefined,
            { nome: "Ana Souza", cargo: "Gestora", telefone: "3188888-0000" },
            { merge: true }
        );
        expect(resultado).toEqual(dto);
    });

    test("Não deve gravar o campo isGestor ao salvar o perfil", async () => {
        await savePerfil(dto);

        const dadosGravados = (setDoc as jest.Mock).mock.calls[0][1];

        expect(dadosGravados).not.toHaveProperty("isGestor");
    });
});

describe("mensagens de erro do perfil", () => {
    test("Deve pedir novo login quando o erro é de autenticação", () => {
        expect(getPerfilErrorMessage(new Error("auth-required"))).toBe(
            "Entre novamente para acessar o perfil."
        );
    });

    test("Deve indicar problema de permissão quando o Firebase nega o acesso", () => {
        const erro = new FirebaseError("permission-denied", "negado");

        expect(isPerfilPermissionError(erro)).toBe(true);
        expect(getPerfilErrorMessage(erro)).toContain("Não foi possível acessar o perfil");
    });

    test("Deve retornar mensagem genérica para erros desconhecidos", () => {
        expect(isPerfilPermissionError(new Error("outro"))).toBe(false);
        expect(getPerfilErrorMessage(new Error("outro"))).toBe(
            "Não foi possível concluir a operação. Tente novamente em instantes."
        );
    });
});