import React, { createContext, ReactNode, useContext, useState } from "react";

import { Calibracao, CalibracaoDTO } from "@/types/calibracao";
import { getCalibracoes, getCalibracaoById, createCalibracao, updateCalibracao, deleteCalibracao } from "@/services/calibracoesService";

interface CalibracoesContextData {
    calibracoes: Calibracao[];
    selectedCalibracao: Calibracao | null;
    loading: boolean;

    loadCalibracoes: () => Promise<void>;
    loadCalibracaoById: (id: string) => Promise<Calibracao | null>;
    addCalibracao: (novaCalibracao: CalibracaoDTO) => Promise<boolean>;
    editCalibracao: (calibracaoAtualizada: CalibracaoDTO, id: string) => Promise<boolean>;
    removeCalibracao: (id: string) => Promise<boolean>;
    clearSelectedCalibracao: () => void;
}

interface CalibracoesProviderProps {
    children: ReactNode;
}

const CalibracoesContext = createContext<CalibracoesContextData | undefined>(undefined);

export function CalibracoesProvider({ children }: CalibracoesProviderProps) {
    const [calibracoes, setCalibracoes] = useState<Calibracao[]>([]);
    const [selectedCalibracao, setSelectedCalibracao] = useState<Calibracao | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function loadCalibracoes(): Promise<void> {
        try {
            setLoading(true);
            const calibracoes = await getCalibracoes();

            setCalibracoes(calibracoes);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function loadCalibracaoById(id: string): Promise<Calibracao | null> {
        try {
            setLoading(true);
            const calibracao = await getCalibracaoById(id);
            setSelectedCalibracao(calibracao);
            return calibracao;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function addCalibracao(novaCalibracao: CalibracaoDTO): Promise<boolean> {
        try {
            setLoading(true);

            await createCalibracao(novaCalibracao);
            await loadCalibracoes();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function editCalibracao(calibracaoAtualizada: CalibracaoDTO, id: string): Promise<boolean> {
        try {
            setLoading(true);

            await updateCalibracao(id, calibracaoAtualizada);
            await loadCalibracoes();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function removeCalibracao(id: string): Promise<boolean> {
        try {
            setLoading(true);

            await deleteCalibracao(id);
            await loadCalibracoes();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    function clearSelectedCalibracao() {
        setSelectedCalibracao(null);
    }

    return (
        <CalibracoesContext.Provider value={{
            calibracoes,
            selectedCalibracao,
            loading,
            loadCalibracoes,
            loadCalibracaoById,
            addCalibracao,
            editCalibracao,
            removeCalibracao,
            clearSelectedCalibracao,
        }}>
            {children}
        </CalibracoesContext.Provider>
    );
}

export function useCalibracoes() {
    const context = useContext(CalibracoesContext);

    if(!context) {
        throw new Error("useCalibracoes deve ser usado dentro de CalibracoesProvider");
    }

    return context;
}