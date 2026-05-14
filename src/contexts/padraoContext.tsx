import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { Padrao, PadraoDTO } from "@/types/padrao";

import {
    getPadroes,
    getPadraoById,
    createPadrao,
    updatePadrao,
    deletePadrao,
    getPadraoErrorMessage,
} from "@/services/padraoService";

interface PadroesContextData {
    padroes: Padrao[];
    selectedPadrao: Padrao | null;
    loading: boolean;
    errorMessage: string | null;

    loadPadroes: () => Promise<void>;
    loadPadraoById: (id: string) => Promise<Padrao | null>;
    addPadrao: (novoPadrao: PadraoDTO) => Promise<boolean>;
    editPadrao: (id: string, padraoAtualizado: PadraoDTO) => Promise<boolean>;
    removePadrao: (id: string) => Promise<boolean>;
    clearSelectedPadrao: () => void;
    clearError: () => void;
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
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function loadPadroes(): Promise<void> {
        try {
            setLoading(true);
            const data = await getPadroes();

            setPadroes(data);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(getPadraoErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }

    async function loadPadraoById(id: string): Promise<Padrao | null> {
        try {
            setLoading(true);

            const padrao = await getPadraoById(id);
            setSelectedPadrao(padrao);
            setErrorMessage(null);

            return padrao;
        } catch (error) {
            setErrorMessage(getPadraoErrorMessage(error));
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function addPadrao(novoPadrao: PadraoDTO): Promise<boolean> {
        try {
            setLoading(true);

            await createPadrao(novoPadrao);
            await loadPadroes();
            setErrorMessage(null);

            return true;
        } catch (error) {
            setErrorMessage(getPadraoErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function editPadrao(id: string, padraoAtualizado: PadraoDTO): Promise<boolean> {
        try {
            setLoading(true);

            await updatePadrao(id, padraoAtualizado);
            await loadPadroes();
            setErrorMessage(null);

            return true;
        } catch (error) {
            setErrorMessage(getPadraoErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function removePadrao(id: string): Promise<boolean> {
        try {
            setLoading(true);

            await deletePadrao(id);
            await loadPadroes();
            setErrorMessage(null);

            return true;
        } catch (error) {
            setErrorMessage(getPadraoErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    }

    function clearSelectedPadrao() {
        setSelectedPadrao(null);
    }

    function clearError() {
        setErrorMessage(null);
    }

    return (
        <PadroesContext.Provider
            value={{
                padroes,
                selectedPadrao,
                loading,
                errorMessage,
                loadPadroes,
                loadPadraoById,
                addPadrao,
                editPadrao,
                removePadrao,
                clearSelectedPadrao,
                clearError,
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
