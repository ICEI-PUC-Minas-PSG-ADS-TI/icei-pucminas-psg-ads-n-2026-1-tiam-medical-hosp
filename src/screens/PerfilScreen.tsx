import { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Alert,
    Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { usePerfil } from "@/contexts/perfilContext";
import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { PerfilDTO } from "@/types/perfil";
import { BottomTab } from "@/components/dashboard/BottomTab";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface FormField {
    key: Exclude<keyof PerfilDTO, "isGestor">;
    placeholder: string;
    icon: IoniconName;
    keyboardType?: "default" | "phone-pad" | "email-address";
}

interface InfoRowProps {
    icon: IoniconName;
    label: string;
    value: string;
}

const initialPerfilForm: PerfilDTO = {
    nome: "",
    cargo: "",
    telefone: "",
    isGestor: false,
};

const formFields: FormField[] = [
    { key: "nome", placeholder: "Nome completo", icon: "person-outline" },
    { key: "cargo", placeholder: "Cargo / Função", icon: "briefcase-outline" },
    { key: "telefone", placeholder: "Telefone", icon: "call-outline", keyboardType: "phone-pad" },
];

export default function PerfilScreen() {
    const { perfil, loading, errorMessage, loadPerfil, updatePerfil } = usePerfil();
    const [form, setForm] = useState<PerfilDTO>(initialPerfilForm);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        loadPerfil();
    }, []);

    useEffect(() => {
        if (perfil) {
            setForm({
                nome: perfil.nome,
                cargo: perfil.cargo,
                telefone: perfil.telefone,
                isGestor: perfil.isGestor,
            });
        }
    }, [perfil]);

    function handleChange(field: keyof PerfilDTO, value: string): void {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function handleStartEdit(): void {
        setIsEditing(true);
    }

    function handleCancelEdit(): void {
        if (perfil) {
            setForm({
                nome: perfil.nome,
                cargo: perfil.cargo,
                telefone: perfil.telefone,
                isGestor: perfil.isGestor,
            });
        }
        setIsEditing(false);
    }

    async function handleSave(): Promise<void> {
        if (loading) return;

        const trimmed: PerfilDTO = {
            nome: form.nome.trim(),
            cargo: form.cargo.trim(),
            telefone: form.telefone.trim(),
            isGestor: form.isGestor,
        };

        if (!trimmed.nome) {
            Alert.alert("Erro", "O nome é obrigatório.");
            return;
        }

        const saved = await updatePerfil(trimmed);

        if (saved) {
            setIsEditing(false);
            Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: MedicalColors.background }}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                <View style={styles.heading}>
                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.subtitle}>
                        Visualize e gerencie os seus dados cadastrais.
                    </Text>
                </View>

                {loading && <Text style={styles.status}>Carregando...</Text>}

                {errorMessage && (
                    <Text style={styles.error}>{errorMessage}</Text>
                )}

                <View style={styles.avatarCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={48} color={MedicalColors.primary} />
                    </View>
                    <View style={styles.avatarInfo}>
                        <Text style={styles.avatarName}>
                            {perfil?.nome || "—"}
                        </Text>
                        <Text style={styles.avatarEmail}>
                            {perfil?.email || "—"}
                        </Text>
                        {perfil?.cargo ? (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{perfil.cargo}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderText}>
                            <Text style={styles.cardTitle}>
                                {isEditing ? "Editar dados" : "Dados cadastrais"}
                            </Text>
                            <Text style={styles.cardSubtitle}>
                                {isEditing
                                    ? "Atualize suas informações abaixo."
                                    : "Informações associadas à sua conta."}
                            </Text>
                        </View>
                        {!isEditing && (
                            <MedicalButton
                                title="Editar"
                                variant="secondary"
                                onPress={handleStartEdit}
                            />
                        )}
                    </View>

                    {isEditing ? (
                        <View style={styles.form}>
                            {formFields.map((field) => (
                                <View key={field.key} style={styles.inputWrapper}>
                                    <Ionicons
                                        name={field.icon}
                                        size={18}
                                        color={MedicalColors.muted}
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        placeholder={field.placeholder}
                                        placeholderTextColor={MedicalColors.muted}
                                        value={form[field.key]}
                                        onChangeText={(value) => handleChange(field.key, value)}
                                        onSubmitEditing={Keyboard.dismiss}
                                        keyboardType={field.keyboardType ?? "default"}
                                        returnKeyType="done"
                                        submitBehavior="blurAndSubmit"
                                        style={styles.input}
                                    />
                                </View>
                            ))}

                            <MedicalButton
                                title={loading ? "Salvando..." : "Salvar alterações"}
                                onPress={handleSave}
                                disabled={loading}
                            />
                            <MedicalButton
                                title="Cancelar"
                                variant="secondary"
                                onPress={handleCancelEdit}
                                disabled={loading}
                            />
                        </View>
                    ) : (
                        <View style={styles.infoList}>
                            <InfoRow icon="person-outline" label="Nome" value={perfil?.nome || "—"} />
                            <InfoRow icon="mail-outline" label="E-mail" value={perfil?.email || "—"} />
                            <InfoRow icon="briefcase-outline" label="Cargo" value={perfil?.cargo || "—"} />
                            <InfoRow icon="call-outline" label="Telefone" value={perfil?.telefone || "—"} />
                        </View>
                    )}
                </View>
            </ScrollView>
            <BottomTab activeKey="perfil" />
        </View>
    );
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
                <Ionicons name={icon} size={16} color={MedicalColors.primary} />
            </View>
            <View style={styles.infoTextWrap}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
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
    error: {
        color: MedicalColors.danger,
    },
    avatarCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: MedicalSpacing.lg,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.lg,
        backgroundColor: MedicalColors.surface,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: MedicalColors.primarySoft,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarInfo: {
        flex: 1,
        gap: MedicalSpacing.xs,
    },
    avatarName: {
        color: MedicalColors.text,
        fontSize: 18,
        fontWeight: "800",
    },
    avatarEmail: {
        color: MedicalColors.muted,
        fontSize: 13,
    },
    badge: {
        alignSelf: "flex-start",
        borderRadius: 8,
        paddingHorizontal: MedicalSpacing.md,
        paddingVertical: MedicalSpacing.xs,
        backgroundColor: MedicalColors.primarySoft,
    },
    badgeText: {
        color: MedicalColors.primaryDark,
        fontSize: 12,
        fontWeight: "800",
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
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: MedicalSpacing.md,
    },
    cardHeaderText: {
        flex: 1,
        gap: MedicalSpacing.xs,
    },
    cardTitle: {
        color: MedicalColors.text,
        fontSize: 18,
        fontWeight: "800",
    },
    cardSubtitle: {
        color: MedicalColors.muted,
        fontSize: 13,
        lineHeight: 18,
    },
    form: {
        gap: MedicalSpacing.md,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: MedicalColors.borderStrong,
        borderRadius: 8,
        backgroundColor: MedicalColors.surface,
        paddingHorizontal: MedicalSpacing.md,
    },
    inputIcon: {
        marginRight: MedicalSpacing.sm,
    },
    input: {
        flex: 1,
        minHeight: 48,
        color: MedicalColors.text,
    },
    infoList: {
        gap: MedicalSpacing.sm,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: MedicalSpacing.md,
        borderWidth: 1,
        borderColor: MedicalColors.border,
        borderRadius: 8,
        padding: MedicalSpacing.md,
        backgroundColor: MedicalColors.background,
    },
    infoIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: MedicalColors.primarySoft,
        alignItems: "center",
        justifyContent: "center",
    },
    infoTextWrap: {
        flex: 1,
        gap: 2,
    },
    infoLabel: {
        color: MedicalColors.muted,
        fontSize: 12,
        fontWeight: "700",
    },
    infoValue: {
        color: MedicalColors.text,
        fontSize: 14,
        fontWeight: "700",
    },
});