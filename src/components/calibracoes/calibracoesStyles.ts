import { StyleSheet } from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";

export const styles = StyleSheet.create({
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