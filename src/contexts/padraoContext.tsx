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
} from "@/services/padraoService";

interface PadroesContextData {
    padroes: Padrao[];
    selectedPadrao: Padrao | null;
    loading: boolean;

    loadPadroes: () => Promise<void>;
    loadPadraoById: (id: string) => Promise<Padrao | null>;
    addPadrao: (novoPadrao: PadraoDTO) => Promise<boolean>;
    editPadrao: (id: string, padraoAtualizado: PadraoDTO) => Promise<boolean>;
    removePadrao: (id: string) => Promise<boolean>;
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
    const [loading, setLoading] = useState<boolean>(false);

    async function loadPadroes(): Promise<void> {
        try {
            setLoading(true);
            const data = await getPadroes();

            setPadroes(data);
        } catch (error) {
            console.log(error);
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
            console.log(error);
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

            return true;
        } catch (error) {
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

            return true;
        } catch (error) {
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

            return true;
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    }

    function clearSelectedPadrao() {
        setSelectedPadrao(null);
    }

    return (
        <PadroesContext.Provider
            value={{
                padroes,
                selectedPadrao,
                loading,
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
