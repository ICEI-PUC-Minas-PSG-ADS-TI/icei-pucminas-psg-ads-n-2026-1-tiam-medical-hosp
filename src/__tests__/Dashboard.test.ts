import { getAtividades, getDashboard } from "@/services/api";
import { getPadroes } from "@/services/padraoService";
import { Calibracao } from "@/types/calibracao";
import { Padrao } from "@/types/padrao";

jest.mock("@/services/padraoService", () => ({
    getPadroes: jest.fn(),
}));

const HOJE = new Date(2026, 10, 10, 12, 0, 0);

function calibracaoComVencimentoEm(dias: number): Calibracao {
    const vencimento = new Date(HOJE);
    vencimento.setDate(vencimento.getDate() + dias);

    const dataCalibracao = new Date(vencimento);
    dataCalibracao.setMonth(dataCalibracao.getMonth() - 12);

    return {
        id: "cal",
        padraoId: "p",
        userId: "u",
        fornecedorId: "f",
        dataCalibracao,
        numeroCertificado: "CERT",
        periodicidade: 12,
        custo: 100,
    };
}

function criarPadrao(nome: string, tag: string, calibracao?: Calibracao): Padrao {
    return {
        id: tag,
        nome,
        fabricante: "Fab",
        modelo: "Mod",
        tag,
        numSerie: "1",
        patrimonio: "PAT",
        setor: "Setor",
        calibracao,
    };
}

beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(HOJE);
    (getPadroes as jest.Mock).mockReset();
});

afterEach(() => {
    jest.useRealTimers();
});

describe("getDashboard (cálculo de status)", () => {
    test("Deve retornar zeros quando não há padrões", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([]);

        expect(await getDashboard()).toEqual({ validos: 0, atencao: 0, vencidos: 0 });
    });

    test("Deve classificar como válido o padrão que vence em mais de 30 dias", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("A", "T1", calibracaoComVencimentoEm(120)),
        ]);

        expect(await getDashboard()).toEqual({ validos: 1, atencao: 0, vencidos: 0 });
    });

    test("Deve classificar como atenção o padrão que vence em exatamente 30 dias", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("A", "T1", calibracaoComVencimentoEm(30)),
        ]);

        expect(await getDashboard()).toEqual({ validos: 0, atencao: 1, vencidos: 0 });
    });

    test("Deve classificar como válido o padrão que vence em 31 dias", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("A", "T1", calibracaoComVencimentoEm(31)),
        ]);

        expect(await getDashboard()).toEqual({ validos: 1, atencao: 0, vencidos: 0 });
    });

    test("Deve classificar como vencido o padrão cuja calibração expirou", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("A", "T1", calibracaoComVencimentoEm(-10)),
        ]);

        expect(await getDashboard()).toEqual({ validos: 0, atencao: 0, vencidos: 1 });
    });

    test("Deve classificar como atenção o padrão sem calibração", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([criarPadrao("A", "T1")]);

        expect(await getDashboard()).toEqual({ validos: 0, atencao: 1, vencidos: 0 });
    });

    test("Deve contar corretamente uma lista mista de padrões", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("A", "T1", calibracaoComVencimentoEm(200)),
            criarPadrao("B", "T2", calibracaoComVencimentoEm(15)),
            criarPadrao("C", "T3", calibracaoComVencimentoEm(-5)),
            criarPadrao("D", "T4", calibracaoComVencimentoEm(-60)),
        ]);

        expect(await getDashboard()).toEqual({ validos: 1, atencao: 1, vencidos: 2 });
    });
});

describe("getAtividades", () => {
    test("Deve ordenar por prioridade: vencida, depois breve, depois concluída", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("Válido", "T1", calibracaoComVencimentoEm(200)),
            criarPadrao("Vencido", "T2", calibracaoComVencimentoEm(-5)),
            criarPadrao("Atenção", "T3", calibracaoComVencimentoEm(10)),
        ]);

        const atividades = await getAtividades();

        expect(atividades.map((a) => a.status)).toEqual(["vencida", "breve", "concluida"]);
        expect(atividades.map((a) => a.tag)).toEqual(["T2", "T3", "T1"]);
    });

    test("Deve retornar no máximo 5 atividades", async () => {
        const padroes = Array.from({ length: 8 }, (_, i) =>
            criarPadrao(`P${i}`, `T${i}`, calibracaoComVencimentoEm(100 + i))
        );
        (getPadroes as jest.Mock).mockResolvedValue(padroes);

        expect(await getAtividades()).toHaveLength(5);
    });

    test("Deve gerar o texto de tempo conforme a situação da calibração", async () => {
        (getPadroes as jest.Mock).mockResolvedValue([
            criarPadrao("Sem", "T1"),
            criarPadrao("Vencido", "T2", calibracaoComVencimentoEm(-3)),
            criarPadrao("Hoje", "T3", calibracaoComVencimentoEm(0)),
            criarPadrao("Futuro", "T4", calibracaoComVencimentoEm(20)),
        ]);

        const atividades = await getAtividades();
        const porTag = (tag: string) => atividades.find((a) => a.tag === tag)!.tempo;

        expect(porTag("T1")).toBe("Sem calibração");
        expect(porTag("T2")).toBe("Venceu há 3 dia(s)");
        expect(porTag("T3")).toBe("Vence hoje");
        expect(porTag("T4")).toBe("Vence em 20 dia(s)");
    });
});