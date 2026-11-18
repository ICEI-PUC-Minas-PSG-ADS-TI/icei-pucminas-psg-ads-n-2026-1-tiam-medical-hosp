import { enviarEmailPadroesVencendo } from "@/services/notificacaoPadraoService";
import { getCalibracaoById } from "@/services/calibracoesService";
import { getPadroes } from "@/services/padraoService";
import { Calibracao } from "@/types/calibracao";
import { Padrao } from "@/types/padrao";

jest.mock("@emailjs/react-native", () => ({ send: jest.fn() }), { virtual: true });
jest.mock("@/services/calibracoesService", () => ({ getCalibracaoById: jest.fn() }));
jest.mock("@/services/padraoService", () => ({ getPadroes: jest.fn() }));

const { send } = jest.requireMock("@emailjs/react-native") as { send: jest.Mock };

const HOJE = new Date(2026, 10, 10, 12, 0, 0);

function calibracaoComVencimentoEm(dias: number): Calibracao {
    const vencimento = new Date(HOJE);
    vencimento.setDate(vencimento.getDate() + dias);

    const dataCalibracao = new Date(vencimento);
    dataCalibracao.setMonth(dataCalibracao.getMonth() - 12);

    return {
        id: "cal-1",
        padraoId: "p-1",
        userId: "u-1",
        fornecedorId: "f-1",
        dataCalibracao,
        numeroCertificado: "CERT",
        periodicidade: 12,
        custo: 100,
    };
}

const padraoBase: Padrao = {
    id: "p-1",
    nome: "Multímetro",
    fabricante: "Fab",
    modelo: "Mod",
    tag: "TAG-01",
    numSerie: "1",
    patrimonio: "PAT",
    setor: "Setor",
    ultimaCalibracaoId: "cal-1",
};

const envOriginal = { ...process.env };

beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(HOJE);

    send.mockReset().mockResolvedValue({ status: 200 });
    (getPadroes as jest.Mock).mockReset().mockResolvedValue([padraoBase]);
    (getCalibracaoById as jest.Mock).mockReset();

    process.env.EXPO_PUBLIC_SERVICE_ID = "service";
    process.env.EXPO_PUBLIC_TEMPLATE_ID = "template";
    process.env.EXPO_PUBLIC_PUBLIC_KEY = "key";

    jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    process.env = { ...envOriginal };
});

describe("enviarEmailPadroesVencendo (regra de 30 dias)", () => {
    test("Deve enviar e-mail quando o padrão vence em 15 dias", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(15));

        const resultado = await enviarEmailPadroesVencendo("gestor@empresa.com");

        expect(resultado).toBe(true);
        expect(send).toHaveBeenCalledTimes(1);
    });

    test("Deve enviar e-mail quando o padrão vence em exatamente 30 dias", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(30));

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(true);
    });

    test("Não deve enviar e-mail quando o padrão vence em 31 dias", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(31));

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(false);
        expect(send).not.toHaveBeenCalled();
    });

    test("Não deve enviar e-mail quando a calibração já está vencida", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(-10));

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(false);
        expect(send).not.toHaveBeenCalled();
    });

    test("Deve ignorar padrões sem calibração registrada", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([{ ...padraoBase, ultimaCalibracaoId: undefined }]);

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(false);
        expect(getCalibracaoById).not.toHaveBeenCalled();
    });

    test("Deve ignorar padrões cuja calibração não foi encontrada", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(null);

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(false);
    });
});

describe("enviarEmailPadroesVencendo (conteúdo e configuração)", () => {
    test("Deve montar a mensagem com nome, TAG e data de vencimento do padrão", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(10));

        await enviarEmailPadroesVencendo("gestor@empresa.com");

        const [serviceId, templateId, params, opcoes] = send.mock.calls[0];

        expect(serviceId).toBe("service");
        expect(templateId).toBe("template");
        expect(opcoes).toEqual({ publicKey: "key" });
        expect(params.to_email).toBe("gestor@empresa.com");
        expect(params.subject).toBe("Padrões próximos do vencimento");
        expect(params.message).toContain("Multímetro");
        expect(params.message).toContain("TAG-01");
        expect(params.message).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    test("Não deve enviar e-mail quando o destinatário está vazio", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(10));

        expect(await enviarEmailPadroesVencendo("   ")).toBe(false);
        expect(send).not.toHaveBeenCalled();
    });

    test("Não deve enviar e-mail quando a configuração do EmailJS está ausente", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(10));
        delete process.env.EXPO_PUBLIC_PUBLIC_KEY;

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(false);
        expect(send).not.toHaveBeenCalled();
    });

    test("Deve retornar false quando o envio falha", async () => {
        (getCalibracaoById as jest.Mock).mockResolvedValue(calibracaoComVencimentoEm(10));
        send.mockRejectedValue(new Error("falha de rede"));

        expect(await enviarEmailPadroesVencendo("gestor@empresa.com")).toBe(false);
    });
});