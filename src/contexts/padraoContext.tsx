import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { Padrao, PadraoDTO } from "@/types/padrao";

import {
    getPadroes,
    getPadraoById,
    createPadrao,
    updatePadrao,
    deletePadrao
} from "@/services/padraoService"

interface PadroesContextData {
    padroes: Padrao[];
    selectedPadrao: Padrao | null;
    loading: boolean;
    error: string | null;

    loadPadroes: () => Promise<void>;
    loadPadraoById: (id: string) => Promise<Padrao | null>;
    addPadrao: (novoPadrao: PadraoDTO) => Promise<void>;
    editPadrao: (id: string, padraoAtualizado: PadraoDTO) => Promise<void>;
    removePadrao: (id: string) => Promise<void>;
    clearSelectedPadrao: () => void;
}

interface PadroesProviderProps {
    children: ReactNode;
}

const PadroesContext = createContext<PadroesContextData | undefined>(
    undefined
);

export function PadroesProvider({ children }: PadroesProviderProps) {
    const [padroes, setPadroes] = useState<Padrao[]>([]);
    const [selectedPadrao, setSelectedPadrao] = useState<Padrao | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadPadroes() {
        try {
            setLoading(true);

            const data = await getPadroes();

            setPadroes(data);
        } catch (error) {
            console.error(error);
            setError("Erro ao carregar padrões.");
        } finally {
            setLoading(false);
        }
    }

    async function loadPadraoById(id: string): Promise<Padrao | null> {
        try {
            setLoading(true);

            const padrao = await getPadraoById(id);

            setSelectedPadrao(padrao);

            return padrao;
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro ao carregar padrão.");
            }

            return null;
        } finally {
            setLoading(false);
        }
    }

    async function addPadrao(novoPadrao: PadraoDTO) {
        try {
            setLoading(true);

            await createPadrao(novoPadrao);

            await loadPadroes();
        } catch (error) {
            console.error(error);
            setError("Erro ao cadastrar padrão.");
        } finally {
            setLoading(false);
        }
    }

    async function editPadrao(id: string, padraoAtualizado: PadraoDTO) {
        try {
            setLoading(true);

            await updatePadrao(id, padraoAtualizado);

            await loadPadroes();
        } catch (error) {
            console.error(error);
            setError("Erro ao atualizar padrão.");
        } finally {
            setLoading(false);
        }
    }

    async function removePadrao(id: string) {
        try {
            setLoading(true);

            await deletePadrao(id);

            await loadPadroes();
        } catch (error) {
            console.error(error);
            setError("Erro ao excluir padrão.");
        } finally {
            setLoading(false);
        }
    }

    function clearSelectedPadrao() {
        setSelectedPadrao(null);
    }

    useEffect(() => {
        loadPadroes();
    }, []);

    return (
        <PadroesContext.Provider
            value={{
                padroes,
                selectedPadrao,
                loading,
                error,
                loadPadroes,
                loadPadraoById,
                addPadrao,
                editPadrao,
                removePadrao,
                clearSelectedPadrao,
            }}
        >
            {children}
        </PadroesContext.Provider>
    );
}

export function usePadroes() {
    const context = useContext(PadroesContext);

    if (!context) {
        throw new Error("usePadroes deve ser usado dentro de PadroesProvider");
    }

    return context;
}