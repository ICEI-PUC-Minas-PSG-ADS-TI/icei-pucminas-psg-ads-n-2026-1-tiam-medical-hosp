import { useEffect, useState } from "react";
import {
    View, Text, FlatList, StyleSheet,
    Alert, TextInput, Linking, Keyboard,
    Modal, Pressable, TouchableOpacity
} from "react-native";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { useFornecedores } from "@/contexts/fornecedorContext";
import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { Fornecedor, FornecedorDTO } from "@/types/fornecedor";
import { BottomTab } from "@/components/dashboard/BottomTab";
import { usePerfil } from "@/contexts/perfilContext";

const initialFornecedorForm: FornecedorDTO = {
    nome: "",
    razaoSocial: "",
    cnpj: "",
    responsavel: "",
    telefone: "",
    email: "",
    linkPortal: "",
    usuarioPortal: "",
    senhaPortal: "",
};

const formFields: { key: keyof FornecedorDTO; placeholder: string }[] = [
    { key: "nome", placeholder: "Nome" },
    { key: "razaoSocial", placeholder: "Razão Social" },
    { key: "cnpj", placeholder: "CNPJ" },
    { key: "responsavel", placeholder: "Responsável" },
    { key: "telefone", placeholder: "Telefone" },
    { key: "email", placeholder: "E-mail" },
    { key: "linkPortal", placeholder: "Link do Portal (opcional)" },
    { key: "usuarioPortal", placeholder: "Usuário do Portal (opcional)" },
    { key: "senhaPortal", placeholder: "Senha do Portal (opcional)" },
];

interface FornecedorCardProps {
    item: Fornecedor;
    onEdit: (fornecedor: Fornecedor) => void;
    onDelete: (id: string) => void;
    onPress: (fornecedor: Fornecedor) => void;
    isGestor: boolean;
}

interface FornecedorFormProps {
    form: FornecedorDTO;
    loading: boolean;
    submitTitle: string;
    showCancel: boolean;
    formError: string | null;
    onChange: (field: keyof FornecedorDTO, value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

interface FornecedoresHeaderProps {
    form: FornecedorDTO;
    isFormOpen: boolean;
    isEditing: boolean;
    loading: boolean;
    busca: string;
    formError: string | null;
    onBuscaChange: (value: string) => void;
    onChange: (field: keyof FornecedorDTO, value: string) => void;
    onSubmit: () => void;
    onCancelEdit: () => void;
    onToggleForm: () => void;
    isGestor: boolean;
}

export default function FornecedoresScreen() {
    const { perfil } = usePerfil();
    const isGestor = perfil?.isGestor ?? false;
    
    const {
        fornecedores,
        loading,
        loadFornecedores,
        addFornecedor,
        editFornecedor,
        removeFornecedor,
    } = useFornecedores();

    const [form, setForm] = useState<FornecedorDTO>(initialFornecedorForm);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [busca, setBusca] = useState("");
    const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const isEditing = editingId !== null;

    const fornecedoresFiltrados = fornecedores.filter((f) =>
        f.nome.toLowerCase().includes(busca.toLowerCase())
    );

    useEffect(() => {
        loadFornecedores();
    }, []);

    function handleChange(field: keyof FornecedorDTO, value: string) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function resetForm() {
        setForm(initialFornecedorForm);
        setEditingId(null);
        setIsFormOpen(false);
    }

    function handleStartEdit(fornecedor: Fornecedor) {
        setIsDetailModalOpen(false);
        setForm({
            nome: fornecedor.nome,
            razaoSocial: fornecedor.razaoSocial,
            cnpj: fornecedor.cnpj,
            responsavel: fornecedor.responsavel,
            telefone: fornecedor.telefone,
            email: fornecedor.email,
            linkPortal: fornecedor.linkPortal ?? "",
            usuarioPortal: fornecedor.usuarioPortal ?? "",
            senhaPortal: fornecedor.senhaPortal ?? "",
        });
        setEditingId(fornecedor.id);
        setIsFormOpen(true);
    }

    function handleToggleForm() {
        if (isFormOpen) {
            resetForm();
            return;
        }
        setIsFormOpen(true);
    }

    function handleOpenDetail(fornecedor: Fornecedor) {
        setSelectedFornecedor(fornecedor);
        setIsDetailModalOpen(true);
    }

    function handleCloseDetail() {
        setIsDetailModalOpen(false);
        setSelectedFornecedor(null);
    }

    async function handleSubmit() {
        if (loading) return;

        const obrigatorios: (keyof FornecedorDTO)[] = [
            "nome", "razaoSocial", "cnpj", "responsavel", "telefone", "email",
        ];
        const valido = obrigatorios.every((k) => (form[k] ?? "").trim().length > 0);

        if (!valido) {
            setFormError("Preencha todos os campos obrigatórios.");
            return;
        }

        if (editingId) {
            await editFornecedor(editingId, form);
        } else {
            await addFornecedor(form);
        }

        resetForm();
    }

    function handleDelete(id: string) {
        setDeleteTargetId(id);
    }

    async function handleConfirmDelete() {
        if (!deleteTargetId) return;
        await removeFornecedor(deleteTargetId);
        setDeleteTargetId(null);
    }

    function handleCancelDelete() {
        setDeleteTargetId(null);
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={styles.container}
                data={fornecedoresFiltrados}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <FornecedoresHeader
                        form={form}
                        isFormOpen={isFormOpen}
                        isEditing={isEditing}
                        loading={loading}
                        busca={busca}
                        onBuscaChange={setBusca}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCancelEdit={resetForm}
                        onToggleForm={handleToggleForm}
                        formError={formError}
                        isGestor={isGestor}
                    />
                }
                ListEmptyComponent={!loading ? <EmptyState /> : null}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <FornecedorCard
                        item={item}
                        onEdit={handleStartEdit}
                        onDelete={handleDelete}
                        onPress={handleOpenDetail}
                        isGestor={isGestor}
                    />
                )}
            />

            <Modal
                visible={isDetailModalOpen}
                transparent
                animationType="fade"
                onRequestClose={handleCloseDetail}
            >
                <Pressable style={styles.modalOverlay} onPress={handleCloseDetail}>
                    <Pressable style={styles.modalBox} onPress={() => { }}>
                        {selectedFornecedor && (
                            <FornecedorDetailModal
                                fornecedor={selectedFornecedor}
                                onClose={handleCloseDetail}
                                onEdit={handleStartEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal
                visible={deleteTargetId !== null}
                transparent
                animationType="fade"
                onRequestClose={handleCancelDelete}
            >
                <Pressable style={styles.modalOverlay} onPress={handleCancelDelete}>
                    <Pressable style={styles.modalBox} onPress={() => { }}>
                        <View style={styles.confirmModal}>
                            <Text style={styles.confirmTitle}>Excluir fornecedor</Text>
                            <Text style={styles.confirmText}>
                                Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita.
                            </Text>
                            <View style={styles.confirmButtons}>
                                <MedicalButton
                                    title="Cancelar"
                                    variant="secondary"
                                    onPress={handleCancelDelete}
                                />
                                <MedicalButton
                                    title={loading ? "Excluindo..." : "Excluir"}
                                    variant="danger"
                                    onPress={handleConfirmDelete}
                                    disabled={loading}
                                />
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
            <BottomTab activeKey="fornecedores" />
        </View>
    );
}

function FornecedoresHeader({
    form, isFormOpen, isEditing, loading, busca, formError, isGestor,
    onBuscaChange, onChange, onSubmit, onCancelEdit, onToggleForm,
}: FornecedoresHeaderProps) {
    const formTitle = isEditing ? "Editar fornecedor" : "Cadastrar fornecedor";
    const formSubtitle = isEditing
        ? "Atualize os dados do fornecedor selecionado."
        : "Informe os dados do fornecedor para cadastrá-lo.";
    const submitTitle = isEditing ? "Salvar alterações" : "Cadastrar fornecedor";

    return (
        <View style={styles.header}>
            <View style={styles.heading}>
                <Text style={styles.title}>Fornecedores</Text>
                <Text style={styles.subtitle}>Prestadores de serviço de calibração</Text>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar fornecedores..."
                placeholderTextColor={MedicalColors.muted}
                value={busca}
                onChangeText={onBuscaChange}
            />

            {loading && <Text style={styles.status}>Carregando...</Text>}

            {isGestor && (
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
                        <FornecedorForm
                            form={form}
                            loading={loading}
                            submitTitle={submitTitle}
                            showCancel={isEditing}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            onCancel={onCancelEdit}
                            formError={formError}
                        />
                    )}
                </View>
            )}
        </View>
    );
}

const camposObrigatorios: (keyof FornecedorDTO)[] = [
    "nome", "razaoSocial", "cnpj", "responsavel", "telefone", "email",
];

function FornecedorForm({ form, loading, submitTitle, showCancel, onChange, onSubmit, onCancel, formError }: FornecedorFormProps) {
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    return (
        <View style={styles.form}>
            {formFields.map((field) => {
                const isSenha = field.key === "senhaPortal";
                const isObrigatorio = camposObrigatorios.includes(field.key);
                const placeholder = isObrigatorio
                    ? `${field.placeholder} *`
                    : field.placeholder;

                return (
                    <View key={field.key}>
                        {isSenha ? (
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    placeholder={placeholder}
                                    placeholderTextColor={MedicalColors.muted}
                                    value={form[field.key] ?? ""}
                                    onChangeText={(value) => onChange(field.key, value)}
                                    secureTextEntry={!senhaVisivel}
                                    onSubmitEditing={Keyboard.dismiss}
                                    returnKeyType="done"
                                    submitBehavior="blurAndSubmit"
                                    style={[styles.input, { paddingRight: 60 }]}
                                />
                                <TouchableOpacity
                                    onPress={() => setSenhaVisivel(prev => !prev)}
                                    style={styles.senhaToggle}
                                >
                                    <Text style={styles.senhaToggleText}>
                                        {senhaVisivel ? "Ocultar" : "Ver"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TextInput
                                placeholder={placeholder}
                                placeholderTextColor={MedicalColors.muted}
                                value={form[field.key] ?? ""}
                                onChangeText={(value) => onChange(field.key, value)}
                                onSubmitEditing={Keyboard.dismiss}
                                returnKeyType="done"
                                submitBehavior="blurAndSubmit"
                                style={styles.input}
                            />
                        )}
                    </View>
                );
            })}

            {formError && (
                <Text style={styles.formError}>{formError}</Text>
            )}

            <MedicalButton title={loading ? "Salvando..." : submitTitle} onPress={onSubmit} disabled={loading} />
            {showCancel && (
                <MedicalButton title="Cancelar edição" variant="secondary" onPress={onCancel} disabled={loading} />
            )}
        </View>
    );
}

function FornecedorCard({ item, onEdit, onDelete, onPress, isGestor }: FornecedorCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleContatar() {
        await Linking.openURL(`mailto:${item.email}`);
    }

    async function handleAcessarPortal() {
        if (!item.linkPortal) return;
        await Linking.openURL(item.linkPortal);
    }

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(item)}
            activeOpacity={0.85}
        >
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderText}>
                    <Text style={styles.cardNome}>{item.nome}</Text>
                    <Text style={styles.cardResponsavel}>{item.responsavel}</Text>
                </View>

                {isGestor && (
                    <TouchableOpacity
                        onPress={() => {
                            setMenuOpen((prev) => !prev);
                        }}
                        style={styles.menuButton}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Text style={styles.menuDots}>•••</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isGestor && menuOpen && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={(e) => {
                            setMenuOpen(false);
                            onEdit(item);
                        }}
                    >
                        <Text style={styles.dropdownText}>Editar</Text>
                    </TouchableOpacity>

                    <View style={styles.dropdownDivider} />

                    <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={(e) => {
                            setMenuOpen(false);
                            onDelete(item.id);
                        }}
                    >
                        <Text style={[styles.dropdownText, styles.dropdownDanger]}>
                            Excluir
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.divider} />

            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>📞  {item.telefone}</Text>
                <Text style={styles.cardInfoText}>✉️  {item.email}</Text>
            </View>

            <View style={styles.cardFooter}>
                <MedicalButton
                    title="Contatar"
                    variant="secondary"
                    onPress={() => handleContatar()}
                />
                {item.linkPortal ? (
                    <MedicalButton
                        title="Acessar Portal"
                        onPress={() => handleAcessarPortal()}
                    />
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

interface FornecedorDetailModalProps {
    fornecedor: Fornecedor;
    onClose: () => void;
    onEdit: (fornecedor: Fornecedor) => void;
    onDelete: (id: string) => void;
}

function FornecedorDetailModal({ fornecedor, onClose, onEdit, onDelete }: FornecedorDetailModalProps) {
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    async function handleContatar() {
        await Linking.openURL(`mailto:${fornecedor.email}`);
    }

    async function handleAcessarPortal() {
        if (!fornecedor.linkPortal) return;
        await Linking.openURL(fornecedor.linkPortal);
    }

    return (
        <View>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{fornecedor.nome}</Text>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.modalInfo}>
                <DetailRow label="Razão Social" value={fornecedor.razaoSocial} />
                <DetailRow label="CNPJ" value={fornecedor.cnpj} />
                <DetailRow label="Responsável" value={fornecedor.responsavel} />
                <DetailRow label="Telefone" value={fornecedor.telefone} />
                <DetailRow label="E-mail" value={fornecedor.email} />
                {fornecedor.linkPortal && <DetailRow label="Portal" value={fornecedor.linkPortal} />}
                {fornecedor.usuarioPortal && <DetailRow label="Usuário" value={fornecedor.usuarioPortal} />}
                {fornecedor.senhaPortal && (
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Senha</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: MedicalSpacing.sm }}>
                            <Text style={styles.detailValue}>
                                {senhaVisivel ? fornecedor.senhaPortal : "••••••••"}
                            </Text>
                            <TouchableOpacity onPress={() => setSenhaVisivel(prev => !prev)}>
                                <Text style={styles.senhaToggleText}>
                                    {senhaVisivel ? "Ocultar" : "Ver"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>

            <View style={styles.divider} />

            <View style={styles.modalFooter}>
                <MedicalButton title="Contatar" variant="secondary" onPress={handleContatar} />
                {fornecedor.linkPortal && (
                    <MedicalButton title="Acessar Portal" onPress={handleAcessarPortal} />
                )}
            </View>
        </View>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}

function EmptyState() {
    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum fornecedor cadastrado</Text>
            <Text style={styles.emptyText}>
                Abra o formulário acima para adicionar o primeiro fornecedor.
            </Text>
        </View>
    );
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
    searchInput: {
        minHeight: 48,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        paddingHorizontal: MedicalSpacing.md,
        backgroundColor: MedicalColors.surface,
        color: MedicalColors.text,
    },
    status: {
        color: MedicalColors.muted,
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: MedicalSpacing.md,
    },
    formHeaderText: {
        flex: 1,
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
    formError: {
        color: MedicalColors.primary,
        fontSize: 13,
        fontWeight: "600",
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
    senhaToggle: {
        position: "absolute",
        right: MedicalSpacing.md,
        top: 0,
        bottom: 0,
        justifyContent: "center",
    },
    senhaToggleText: {
        color: MedicalColors.primary,
        fontSize: 13,
        fontWeight: "700",
    },

    // card
    card: {
        gap: MedicalSpacing.md,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.lg,
        backgroundColor: MedicalColors.surface,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cardHeaderText: {
        flex: 1,
        gap: MedicalSpacing.xs,
    },
    cardNome: {
        color: MedicalColors.text,
        fontSize: 16,
        fontWeight: "800",
    },
    cardResponsavel: {
        color: MedicalColors.muted,
        fontSize: 14,
    },
    menuButton: {
        paddingLeft: MedicalSpacing.md,
    },
    menuDots: {
        color: MedicalColors.muted,
        fontSize: 16,
        letterSpacing: 1,
    },
    dropdown: {
        position: "absolute",
        top: 36,
        right: MedicalSpacing.lg,
        backgroundColor: MedicalColors.surface,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        zIndex: 10,
        minWidth: 140,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    dropdownItem: {
        paddingVertical: MedicalSpacing.md,
        paddingHorizontal: MedicalSpacing.lg,
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: MedicalColors.border,
    },
    dropdownText: {
        color: MedicalColors.text,
        fontSize: 14,
        fontWeight: "600",
    },
    dropdownDanger: {
        color: MedicalColors.primary,
    },
    divider: {
        height: 1,
        backgroundColor: MedicalColors.border,
    },
    cardInfo: {
        gap: MedicalSpacing.xs,
    },
    cardInfoText: {
        color: MedicalColors.text,
        fontSize: 14,
    },
    cardFooter: {
        flexDirection: "row",
        gap: MedicalSpacing.md,
    },

    // modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: MedicalSpacing.xl,
    },
    modalBox: {
        backgroundColor: MedicalColors.surface,
        borderRadius: 12,
        padding: MedicalSpacing.lg,
        gap: MedicalSpacing.md,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalTitle: {
        color: MedicalColors.text,
        fontSize: 20,
        fontWeight: "800",
        flex: 1,
    },
    modalClose: {
        color: MedicalColors.muted,
        fontSize: 18,
        paddingLeft: MedicalSpacing.md,
    },
    modalInfo: {
        gap: MedicalSpacing.sm,
    },
    modalFooter: {
        flexDirection: "row",
        gap: MedicalSpacing.md,
        paddingTop: MedicalSpacing.xs,
    },
    detailRow: {
        gap: 2,
    },
    detailLabel: {
        color: MedicalColors.muted,
        fontSize: 12,
        fontWeight: "700",
    },
    detailValue: {
        color: MedicalColors.text,
        fontSize: 14,
    },
    confirmModal: {
        gap: MedicalSpacing.lg,
    },
    confirmTitle: {
        color: MedicalColors.text,
        fontSize: 18,
        fontWeight: "800",
    },
    confirmText: {
        color: MedicalColors.muted,
        fontSize: 14,
        lineHeight: 20,
    },
    confirmButtons: {
        flexDirection: "row",
        gap: MedicalSpacing.md,
    },
    // empty state
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
    emptyText: {
        color: MedicalColors.muted,
        fontSize: 14,
        lineHeight: 20,
    },
});