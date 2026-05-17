import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Fornecedor, FornecedorDTO } from "@/types/fornecedor";
import { getFornecedores, getFornecedorByID, createFornecedor, updateFornecedor, deleteFornecedor } from "@/services/fornecedorService";
import { auth } from "@/config/firebase";

interface FornecedoresContextData {
    fornecedores: Fornecedor[];
    selectedFornecedor: Fornecedor | null;
    loading: boolean;
    error: string | null;

    loadFornecedores: () => Promise<void>;
    loadFornecedorByID: (id: string) => Promise<Fornecedor | null>;
    addFornecedor: (novoFornecedor: FornecedorDTO) => Promise<void>;
    editFornecedor: (id: string, fornecedorAtualizado: FornecedorDTO) => Promise<void>;
    removeFornecedor: (id: string) => Promise<void>;
    clearSelectedFornecedor: () => void;
}

interface FornecedoresProviderProps {
    children: ReactNode;
}

const FornecedoresContext = createContext<FornecedoresContextData | undefined>(undefined);

export function FornecedoresProvider({ children }: FornecedoresProviderProps) {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadFornecedores() {
        try {
            setLoading(true);
            const data = await getFornecedores();
            setFornecedores(data);
        } catch (error) {
            console.error(error);
            setError("Erro ao carregar fornecedores.");
        } finally {
            setLoading(false);
        }
    }

    async function loadFornecedorByID(id: string): Promise<Fornecedor | null> {
        try {
            setLoading(true);

            const fornecedor = await getFornecedorByID(id);

            setSelectedFornecedor(fornecedor);

            return fornecedor;
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro ao carregar fornecedor.");
            }

            return null;
        } finally {
            setLoading(false);
        }
    }

    async function addFornecedor(novoFornecedor: FornecedorDTO) {
        try {
            setLoading(true);
            await createFornecedor(novoFornecedor);
            await loadFornecedores();
        } catch (error) {
            console.error(error);
            setError("Erro ao adicionar fornecedor.");
        } finally {
            setLoading(false);
        }
    }

    async function editFornecedor(id: string, fornecedorAtualizado: FornecedorDTO) {
        try {
            setLoading(true);
            await updateFornecedor(id, fornecedorAtualizado);
            await loadFornecedores();
        } catch (error) {
            console.error(error);
            setError("Erro ao atualizar fornecedor.");
        } finally {
            setLoading(false);
        }
    }

    async function removeFornecedor(id: string) {
        try {
            setLoading(true);
            await deleteFornecedor(id);
            await loadFornecedores();
        } catch (error) {
            console.error(error);
            setError("Erro ao remover fornecedor.");
        } finally {
            setLoading(false);
        }
    }

    function clearSelectedFornecedor() {
        setSelectedFornecedor(null);
    }

    useEffect(() => {
        if(!auth.currentUser) {
            setError("Usuário não autenticado.");
            return;
        }
        loadFornecedores();
    }, []);

    return (<FornecedoresContext.Provider
        value={{
            fornecedores,
            selectedFornecedor,
            loading,
            error,
            loadFornecedores,
            loadFornecedorByID,
            addFornecedor,
            editFornecedor,
            removeFornecedor,
            clearSelectedFornecedor
        }}    >
        {children}
    </FornecedoresContext.Provider>);
}

export function useFornecedores() {
    const context = useContext(FornecedoresContext);

    if (!context) {
        throw new Error("useFornecedores deve ser usado dentro de FornecedoresProvider");
    }

    return context;
}