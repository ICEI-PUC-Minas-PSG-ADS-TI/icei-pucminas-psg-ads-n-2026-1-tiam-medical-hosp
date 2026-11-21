import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CalibracaoCard, EmptyState } from "@/components/calibracoes/CalibracaoCard";
import { CalibracoesHeader } from "@/components/calibracoes/CalibracoesHeader";
import { styles } from "@/components/calibracoes/calibracoesStyles";
import { useCalibracoes } from "@/contexts/calibracoesContext";
import { useFornecedores } from "@/contexts/fornecedorContext";
import { usePadroes } from "@/contexts/padraoContext";
import { usePerfil } from "@/contexts/perfilContext";
import { RootStackParamList } from "@/routes/AppRoutes";
import { Calibracao, CalibracaoDTO } from "@/types/calibracao";
import {
    createInitialCalibracaoForm,
    formatDateInput,
    getCalibracaoFormFromItem,
    getDateTime,
    getFornecedorLabel,
    isCalibracaoFormValid,
    parseDateInput,
    trimCalibracaoForm,
} from "@/utils/calibracaoForm";

type CalibracoesScreenProps = NativeStackScreenProps<RootStackParamList, "Calibracoes">;

export default function CalibracoesScreen({ route }: CalibracoesScreenProps) {
    const padraoId = route.params?.padraoId ?? "";
    const hasPadraoContext = padraoId.trim().length > 0;

    const { perfil } = usePerfil();
    const isGestor = perfil?.isGestor ?? false;

    const { calibracoes, loading, loadCalibracoes, addCalibracao, editCalibracao, removeCalibracao } = useCalibracoes();
    const { padroes, loadPadroes } = usePadroes();
    const { fornecedores, loadFornecedores } = useFornecedores();

    const selectedPadrao = padroes.find((padrao) => padrao.id === padraoId);
    const hasValidPadrao = hasPadraoContext && Boolean(selectedPadrao);
    const canManage = isGestor && hasValidPadrao;

    const [form, setForm] = useState<CalibracaoDTO>(() => createInitialCalibracaoForm(padraoId));
    const [dataCalibracaoInput, setDataCalibracaoInput] = useState(() =>
        formatDateInput(createInitialCalibracaoForm(padraoId).dataCalibracao)
    );
    const [periodicidadeInput, setPeriodicidadeInput] = useState("");
    const [custoInput, setCustoInput] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [hasOpenedFormAutomatically, setHasOpenedFormAutomatically] = useState(false);
    const [editingCalibracaoId, setEditingCalibracaoId] = useState<string | null>(null);
    const [busca, setBusca] = useState("");
    const isEditing = editingCalibracaoId !== null;

    const buscaNormalizada = busca.trim().toLowerCase();
    const calibracoesDoPadrao = calibracoes
        .filter((calibracao) => calibracao.padraoId === padraoId)
        .sort((left, right) => getDateTime(right.dataCalibracao) - getDateTime(left.dataCalibracao));

    const calibracoesFiltradas = calibracoesDoPadrao.filter((calibracao) => {
        if (buscaNormalizada.length === 0) {
            return true;
        }

        const fornecedorLabel = getFornecedorLabel(calibracao.fornecedorId, fornecedores).toLowerCase();

        return (
            calibracao.numeroCertificado.toLowerCase().includes(buscaNormalizada) ||
            fornecedorLabel.includes(buscaNormalizada)
        );
    });

    useEffect(() => {
        loadCalibracoes();
        loadPadroes();
        loadFornecedores();
    }, []);

    useEffect(() => {
        if (canManage && !hasOpenedFormAutomatically) {
            setIsFormOpen(true);
            setHasOpenedFormAutomatically(true);
        }
    }, [canManage, hasOpenedFormAutomatically]);

    function handleChange(field: keyof CalibracaoDTO, value: CalibracaoDTO[keyof CalibracaoDTO]) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function resetFormState() {
        const nextForm = createInitialCalibracaoForm(padraoId);

        setForm(nextForm);
        setDataCalibracaoInput(formatDateInput(nextForm.dataCalibracao));
        setPeriodicidadeInput("");
        setCustoInput("");
        setEditingCalibracaoId(null);
        setIsFormOpen(false);
    }

    function handleStartEdit(calibracao: Calibracao) {
        setForm({
            ...getCalibracaoFormFromItem(calibracao),
            padraoId,
        });
        setDataCalibracaoInput(formatDateInput(calibracao.dataCalibracao));
        setPeriodicidadeInput(String(calibracao.periodicidade));
        setCustoInput(String(calibracao.custo));
        setEditingCalibracaoId(calibracao.id);
        setIsFormOpen(true);
    }

    function handleCancelEdit() {
        resetFormState();
    }

    function handleToggleForm() {
        if (isFormOpen) {
            if (isEditing) {
                handleCancelEdit();
                return;
            }

            setIsFormOpen(false);
            return;
        }

        setIsFormOpen(true);
    }

    async function handleSubmitForm() {
        if (loading) {
            return;
        }

        if (!hasValidPadrao) {
            Alert.alert("Erro", "Padrão inválido para calibração.");
            return;
        }

        const trimmedForm = trimCalibracaoForm({
            ...form,
            padraoId,
            userId: perfil?.uid ?? form.userId,
            dataCalibracao: parseDateInput(dataCalibracaoInput),
            periodicidade: Number(periodicidadeInput),
            custo: Number(custoInput),
        });

        if (!isCalibracaoFormValid(trimmedForm, dataCalibracaoInput, periodicidadeInput, custoInput)) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        const saved = editingCalibracaoId
            ? await editCalibracao(trimmedForm, editingCalibracaoId)
            : await addCalibracao(trimmedForm);

        if (saved) {
            resetFormState();
        }
    }

    async function handleDeleteCalibracao(id: string) {
        Alert.alert("Excluir", "Deseja excluir esta calibração?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    await removeCalibracao(id);
                },
            },
        ]);
    }

    return (
        <FlatList
            style={styles.container}
            data={calibracoesFiltradas}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <CalibracoesHeader
                    form={form}
                    dataCalibracaoInput={dataCalibracaoInput}
                    periodicidadeInput={periodicidadeInput}
                    custoInput={custoInput}
                    isFormOpen={isFormOpen}
                    isEditing={isEditing}
                    loading={loading}
                    canManage={canManage}
                    hasPadraoContext={hasPadraoContext}
                    busca={busca}
                    selectedPadrao={selectedPadrao}
                    fornecedores={fornecedores}
                    onBuscaChange={setBusca}
                    onChange={handleChange}
                    onDataCalibracaoInputChange={setDataCalibracaoInput}
                    onPeriodicidadeInputChange={setPeriodicidadeInput}
                    onCustoInputChange={setCustoInput}
                    onSubmit={handleSubmitForm}
                    onCancelEdit={handleCancelEdit}
                    onToggleForm={handleToggleForm}
                />
            }
            ListEmptyComponent={!loading ? <EmptyState /> : null}
            contentContainerStyle={styles.content}
            renderItem={({ item }) => (
                <CalibracaoCard
                    item={item}
                    fornecedores={fornecedores}
                    onEdit={handleStartEdit}
                    onDelete={handleDeleteCalibracao}
                    isGestor={isGestor}
                />
            )}
        />
    );
}