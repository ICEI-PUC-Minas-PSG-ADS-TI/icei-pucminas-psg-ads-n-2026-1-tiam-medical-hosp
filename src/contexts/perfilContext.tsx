import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { Perfil, PerfilDTO } from "@/types/perfil";
import {
    getPerfil,
    savePerfil,
    getPerfilErrorMessage,
} from "@/services/perfilService";

interface PerfilContextData {
    perfil: Perfil | null;
    loading: boolean;
    errorMessage: string | null;

    loadPerfil: () => Promise<void>;
    updatePerfil: (dto: PerfilDTO) => Promise<boolean>;
    clearError: () => void;
}

interface PerfilProviderProps {
    children: ReactNode;
}

const PerfilContext = createContext<PerfilContextData | undefined>(undefined);

export function PerfilProvider({ children }: PerfilProviderProps) {
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function loadPerfil(): Promise<void> {
        try {
            setLoading(true);
            const data = await getPerfil();
            setPerfil(data);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(getPerfilErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }

    async function updatePerfil(dto: PerfilDTO): Promise<boolean> {
        try {
            setLoading(true);
            await savePerfil(dto);
            await loadPerfil();
            setErrorMessage(null);
            return true;
        } catch (error) {
            setErrorMessage(getPerfilErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    }

    function clearError(): void {
        setErrorMessage(null);
    }

    return (
        <PerfilContext.Provider
            value={{
                perfil,
                loading,
                errorMessage,
                loadPerfil,
                updatePerfil,
                clearError,
            }}
        >
            {children}
        </PerfilContext.Provider>
    );
}

export function usePerfil(): PerfilContextData {
    const context = useContext(PerfilContext);

    if (!context) {
        throw new Error("usePerfil deve ser usado dentro de PerfilProvider");
    }

    return context;
}