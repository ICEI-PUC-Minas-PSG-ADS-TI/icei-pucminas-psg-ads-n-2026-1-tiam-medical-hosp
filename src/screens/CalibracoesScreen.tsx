import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TextInput, Keyboard, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { useCalibracoes } from "@/contexts/calibracoesContext";
import { useFornecedores } from "@/contexts/fornecedorContext";
import { usePadroes } from "@/contexts/padraoContext";
import { usePerfil } from "@/contexts/perfilContext";
import { RootStackParamList } from "@/routes/AppRoutes";
import { Calibracao, CalibracaoDTO } from "@/types/calibracao";
import { Fornecedor } from "@/types/fornecedor";
import { Padrao } from "@/types/padrao";

type CalibracoesScreenProps = NativeStackScreenProps<RootStackParamList, "Calibracoes">;

interface CalibracoesHeaderProps {
    form: CalibracaoDTO;
    dataCalibracaoInput: string;
    periodicidadeInput: string;
    custoInput: string;
    isFormOpen: boolean;
    isEditing: boolean;
    loading: boolean;
    canManage: boolean;
    hasPadraoContext: boolean;
    busca: string;
    selectedPadrao?: Padrao;
    fornecedores: Fornecedor[];
    onBuscaChange: (value: string) => void;
    onChange: (field: keyof CalibracaoDTO, value: CalibracaoDTO[keyof CalibracaoDTO]) => void;
    onDataCalibracaoInputChange: (value: string) => void;
    onPeriodicidadeInputChange: (value: string) => void;
    onCustoInputChange: (value: string) => void;
    onSubmit: () => void;
    onCancelEdit: () => void;
    onToggleForm: () => void;
}

interface CalibracaoFormProps {
    form: CalibracaoDTO;
    dataCalibracaoInput: string;
    periodicidadeInput: string;
    custoInput: string;
    loading: boolean;
    submitTitle: string;
    showCancel: boolean;
    fornecedores: Fornecedor[];
    onChange: (field: keyof CalibracaoDTO, value: CalibracaoDTO[keyof CalibracaoDTO]) => void;
    onDataCalibracaoInputChange: (value: string) => void;
    onPeriodicidadeInputChange: (value: string) => void;
    onCustoInputChange: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

interface EntitySelectorProps {
    label: string;
    selectedId: string;
    options: { id: string; label: string }[];
    emptyText: string;
    onSelect: (id: string) => void;
}

interface CalibracaoCardProps {
    item: Calibracao;
    fornecedores: Fornecedor[];
    onEdit: (calibracao: Calibracao) => void;
    onDelete: (id: string) => void;
    isGestor: boolean;
}

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

function CalibracoesHeader({
    form,
    dataCalibracaoInput,
    periodicidadeInput,
    custoInput,
    isFormOpen,
    isEditing,
    loading,
    canManage,
    hasPadraoContext,
    busca,
    selectedPadrao,
    fornecedores,
    onBuscaChange,
    onChange,
    onDataCalibracaoInputChange,
    onPeriodicidadeInputChange,
    onCustoInputChange,
    onSubmit,
    onCancelEdit,
    onToggleForm,
}: CalibracoesHeaderProps) {
    const formTitle = isEditing ? "Editar calibração" : "Cadastrar calibração";
    const formSubtitle = isEditing
        ? "Atualize os dados da calibração selecionada."
        : "Informe os dados da calibração realizada.";
    const submitTitle = isEditing ? "Salvar alterações" : "Cadastrar calibração";
    const subtitle = getHeaderSubtitle(selectedPadrao, hasPadraoContext);

    return (
        <View style={styles.header}>
            <View style={styles.heading}>
                <Text style={styles.title}>Calibrações do padrão</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por certificado ou fornecedor..."
                placeholderTextColor={MedicalColors.muted}
                value={busca}
                onChangeText={onBuscaChange}
            />

            {loading && <Text style={styles.status}>Carregando...</Text>}

            {canManage && (
                <View style={styles.formCard}>
                    <View style={styles.formHeader}>
                        <View style={styles.formHeaderText}>
                            <Text style={styles.formTitle}>{formTitle}</Text>
                            <Text style={styles.formSubtitle}>{formSubtitle}</Text>
                        </View>
                        <MedicalButton
                            title={isFormOpen ? "Fechar" : "Abrir"}
                            variant="secondary"
                            onPress={onToggleForm}
                        />
                    </View>

                    {isFormOpen && (
                        <CalibracaoForm
                            form={form}
                            dataCalibracaoInput={dataCalibracaoInput}
                            periodicidadeInput={periodicidadeInput}
                            custoInput={custoInput}
                            loading={loading}
                            submitTitle={submitTitle}
                            showCancel={isEditing}
                            fornecedores={fornecedores}
                            onChange={onChange}
                            onDataCalibracaoInputChange={onDataCalibracaoInputChange}
                            onPeriodicidadeInputChange={onPeriodicidadeInputChange}
                            onCustoInputChange={onCustoInputChange}
                            onSubmit={onSubmit}
                            onCancel={onCancelEdit}
                        />
                    )}
                </View>
            )}
        </View>
    );
}

function CalibracaoForm({
    form,
    dataCalibracaoInput,
    periodicidadeInput,
    custoInput,
    loading,
    submitTitle,
    showCancel,
    fornecedores,
    onChange,
    onDataCalibracaoInputChange,
    onPeriodicidadeInputChange,
    onCustoInputChange,
    onSubmit,
    onCancel,
}: CalibracaoFormProps) {
    const fornecedorOptions = fornecedores.map((fornecedor) => ({
        id: fornecedor.id,
        label: fornecedor.nome,
    }));

    return (
        <View style={styles.form}>
            <EntitySelector
                label="Fornecedor"
                selectedId={form.fornecedorId}
                options={fornecedorOptions}
                emptyText="Nenhum fornecedor cadastrado"
                onSelect={(id) => onChange("fornecedorId", id)}
            />

            <TextInput
                placeholder="Data da calibração (AAAA-MM-DD)"
                placeholderTextColor={MedicalColors.muted}
                value={dataCalibracaoInput}
                onChangeText={onDataCalibracaoInputChange}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                style={styles.input}
            />

            <TextInput
                placeholder="Número do certificado"
                placeholderTextColor={MedicalColors.muted}
                value={form.numeroCertificado}
                onChangeText={(value) => onChange("numeroCertificado", value)}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                style={styles.input}
            />

            <TextInput
                placeholder="Periodicidade em meses"
                placeholderTextColor={MedicalColors.muted}
                value={periodicidadeInput}
                onChangeText={onPeriodicidadeInputChange}
                keyboardType="numeric"
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                style={styles.input}
            />

            <TextInput
                placeholder="URL do certificado (opcional)"
                placeholderTextColor={MedicalColors.muted}
                value={form.certificadoUrl ?? ""}
                onChangeText={(value) => onChange("certificadoUrl", value)}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                style={styles.input}
            />

            <TextInput
                placeholder="Custo"
                placeholderTextColor={MedicalColors.muted}
                value={custoInput}
                onChangeText={onCustoInputChange}
                keyboardType="numeric"
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                style={styles.input}
            />

            <MedicalButton
                title={loading ? "Salvando..." : submitTitle}
                onPress={onSubmit}
                disabled={loading}
            />

            {showCancel && (
                <MedicalButton
                    title="Cancelar edição"
                    variant="secondary"
                    onPress={onCancel}
                    disabled={loading}
                />
            )}
        </View>
    );
}

function EntitySelector({ label, selectedId, options, emptyText, onSelect }: EntitySelectorProps) {
    const selectedOption = options.find((option) => option.id === selectedId);

    return (
        <View style={styles.selector}>
            <Text style={styles.selectorLabel}>{label}</Text>
            <Text style={styles.selectorValue}>
                {selectedOption ? selectedOption.label : "Selecione uma opção"}
            </Text>

            <View style={styles.selectorOptions}>
                {options.length === 0 ? (
                    <Text style={styles.selectorEmpty}>{emptyText}</Text>
                ) : (
                    options.map((option) => {
                        const isSelected = option.id === selectedId;

                        return (
                            <Pressable
                                key={option.id}
                                onPress={() => onSelect(option.id)}
                                style={({ pressed }) => [
                                    styles.selectorOption,
                                    isSelected && styles.selectorOptionSelected,
                                    pressed && styles.selectorOptionPressed,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.selectorOptionText,
                                        isSelected && styles.selectorOptionTextSelected,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </Pressable>
                        );
                    })
                )}
            </View>
        </View>
    );
}

function CalibracaoCard({ item, fornecedores, onEdit, onDelete, isGestor }: CalibracaoCardProps) {
    const certificadoUrl = item.certificadoUrl?.trim();

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.name}>Certificado {item.numeroCertificado}</Text>
                <Text style={styles.tag}>{formatDate(item.dataCalibracao)}</Text>
            </View>

            <View style={styles.metaGrid}>
                <InfoBlock label="Data" value={formatDate(item.dataCalibracao)} />
                <InfoBlock label="Fornecedor" value={getFornecedorLabel(item.fornecedorId, fornecedores)} />
                <InfoBlock label="Periodicidade" value={`${item.periodicidade} meses`} />
                <InfoBlock label="Custo" value={formatCurrency(item.custo)} />
            </View>

            <View style={styles.cardFooter}>
                {certificadoUrl && (
                    <Text style={styles.certificado}>Certificado: {certificadoUrl}</Text>
                )}
                {isGestor && (
                    <>
                        <MedicalButton
                            title="Editar"
                            variant="secondary"
                            onPress={() => onEdit(item)}
                        />
                        <MedicalButton
                            title="Excluir"
                            variant="danger"
                            onPress={() => onDelete(item.id)}
                        />
                    </>
                )}
            </View>
        </View>
    );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

function EmptyState() {
    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhuma calibração cadastrada para este padrão</Text>
        </View>
    );
}

function createInitialCalibracaoForm(padraoId: string): CalibracaoDTO {
    return {
        padraoId,
        userId: "",
        fornecedorId: "",
        dataCalibracao: new Date(),
        numeroCertificado: "",
        periodicidade: 0,
        certificadoUrl: "",
        custo: 0,
    };
}

function getCalibracaoFormFromItem(calibracao: Calibracao): CalibracaoDTO {
    return {
        padraoId: calibracao.padraoId,
        userId: calibracao.userId,
        fornecedorId: calibracao.fornecedorId,
        dataCalibracao: calibracao.dataCalibracao,
        numeroCertificado: calibracao.numeroCertificado,
        periodicidade: calibracao.periodicidade,
        certificadoUrl: calibracao.certificadoUrl ?? "",
        custo: calibracao.custo,
    };
}

function trimCalibracaoForm(form: CalibracaoDTO): CalibracaoDTO {
    return {
        padraoId: form.padraoId.trim(),
        userId: form.userId.trim(),
        fornecedorId: form.fornecedorId.trim(),
        dataCalibracao: form.dataCalibracao,
        numeroCertificado: form.numeroCertificado.trim(),
        periodicidade: form.periodicidade,
        certificadoUrl: form.certificadoUrl?.trim() ?? "",
        custo: form.custo,
    };
}

function isCalibracaoFormValid(
    form: CalibracaoDTO,
    dataCalibracaoInput: string,
    periodicidadeInput: string,
    custoInput: string
) {
    return (
        form.padraoId.length > 0 &&
        form.userId.length > 0 &&
        form.fornecedorId.length > 0 &&
        dataCalibracaoInput.trim().length > 0 &&
        isDateInputValid(dataCalibracaoInput) &&
        isDateValid(form.dataCalibracao) &&
        form.numeroCertificado.length > 0 &&
        periodicidadeInput.trim().length > 0 &&
        Number.isFinite(form.periodicidade) &&
        form.periodicidade > 0 &&
        custoInput.trim().length > 0 &&
        Number.isFinite(form.custo) &&
        form.custo >= 0
    );
}

function getHeaderSubtitle(selectedPadrao: Padrao | undefined, hasPadraoContext: boolean) {
    if (selectedPadrao) {
        return `${selectedPadrao.nome} - ${selectedPadrao.tag}`;
    }

    if (hasPadraoContext) {
        return "Padrão não encontrado.";
    }

    return "Abra esta tela a partir de um card de padrão.";
}

function getFornecedorLabel(fornecedorId: string, fornecedores: Fornecedor[]) {
    const fornecedor = fornecedores.find((item) => item.id === fornecedorId);

    return fornecedor?.nome ?? "Fornecedor não encontrado";
}

function parseDateInput(value: string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());

    if (!match) {
        return new Date(Number.NaN);
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return new Date(Number.NaN);
    }

    return date;
}

function formatDateInput(date: Date) {
    if (!isDateValid(date)) {
        return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDate(date: Date) {
    if (!isDateValid(date)) {
        return "Data inválida";
    }

    return date.toLocaleDateString("pt-BR");
}

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function getDateTime(date: Date) {
    return isDateValid(date) ? date.getTime() : 0;
}

function isDateValid(date: Date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
}

function isDateInputValid(value: string) {
    return isDateValid(parseDateInput(value));
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MedicalColors.background,
    },
    content: {
        gap: MedicalSpacing.md,
        padding: MedicalSpacing.xl,
    },
    header: {
        gap: MedicalSpacing.lg,
    },
    heading: {
        gap: MedicalSpacing.xs,
    },
    title: {
        color: MedicalColors.text,
        fontSize: 30,
        fontWeight: "800",
    },
    subtitle: {
        color: MedicalColors.muted,
        fontSize: 14,
        lineHeight: 20,
    },
    status: {
        color: MedicalColors.muted,
    },
    searchInput: {
        minHeight: 48,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        paddingHorizontal: MedicalSpacing.md,
        backgroundColor: MedicalColors.surface,
        color: MedicalColors.text,
    },
    formCard: {
        gap: MedicalSpacing.md,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.lg,
        backgroundColor: MedicalColors.surface,
    },
    formHeader: {
        gap: MedicalSpacing.md,
    },
    formHeaderText: {
        gap: MedicalSpacing.xs,
    },
    formTitle: {
        color: MedicalColors.text,
        fontSize: 18,
        fontWeight: "800",
    },
    formSubtitle: {
        color: MedicalColors.muted,
        fontSize: 13,
        lineHeight: 18,
    },
    form: {
        gap: MedicalSpacing.md,
    },
    input: {
        minHeight: 48,
        borderWidth: 1,
        borderColor: MedicalColors.borderStrong,
        borderRadius: 8,
        padding: MedicalSpacing.md,
        backgroundColor: MedicalColors.surface,
        color: MedicalColors.text,
    },
    selector: {
        gap: MedicalSpacing.sm,
        borderWidth: 1,
        borderColor: MedicalColors.borderStrong,
        borderRadius: 8,
        padding: MedicalSpacing.md,
        backgroundColor: MedicalColors.surface,
    },
    selectorLabel: {
        color: MedicalColors.muted,
        fontSize: 12,
        fontWeight: "700",
    },
    selectorValue: {
        color: MedicalColors.text,
        fontSize: 14,
        fontWeight: "700",
    },
    selectorOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: MedicalSpacing.sm,
    },
    selectorOption: {
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        paddingHorizontal: MedicalSpacing.md,
        paddingVertical: MedicalSpacing.sm,
        backgroundColor: MedicalColors.background,
    },
    selectorOptionSelected: {
        borderColor: MedicalColors.primary,
        backgroundColor: MedicalColors.primarySoft,
    },
    selectorOptionPressed: {
        opacity: 0.8,
    },
    selectorOptionText: {
        color: MedicalColors.text,
        fontSize: 13,
        fontWeight: "700",
    },
    selectorOptionTextSelected: {
        color: MedicalColors.primaryDark,
    },
    selectorEmpty: {
        color: MedicalColors.muted,
        fontSize: 13,
    },
    card: {
        gap: MedicalSpacing.md,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.lg,
        backgroundColor: MedicalColors.surface,
    },
    cardHeader: {
        gap: MedicalSpacing.sm,
    },
    name: {
        color: MedicalColors.text,
        fontSize: 18,
        fontWeight: "800",
    },
    tag: {
        alignSelf: "flex-start",
        borderRadius: 8,
        paddingHorizontal: MedicalSpacing.md,
        paddingVertical: MedicalSpacing.xs,
        backgroundColor: MedicalColors.primarySoft,
        color: MedicalColors.primaryDark,
        fontSize: 12,
        fontWeight: "800",
    },
    metaGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: MedicalSpacing.sm,
    },
    infoBlock: {
        minWidth: "46%",
        flexGrow: 1,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.md,
        backgroundColor: MedicalColors.background,
    },
    infoLabel: {
        color: MedicalColors.muted,
        fontSize: 12,
        fontWeight: "700",
    },
    infoValue: {
        marginTop: MedicalSpacing.xs,
        color: MedicalColors.text,
        fontSize: 14,
        fontWeight: "700",
    },
    cardFooter: {
        gap: MedicalSpacing.md,
    },
    certificado: {
        color: MedicalColors.muted,
        fontSize: 14,
    },
    emptyState: {
        gap: MedicalSpacing.sm,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.lg,
        backgroundColor: MedicalColors.surface,
    },
    emptyTitle: {
        color: MedicalColors.text,
        fontSize: 16,
        fontWeight: "800",
    },
});
