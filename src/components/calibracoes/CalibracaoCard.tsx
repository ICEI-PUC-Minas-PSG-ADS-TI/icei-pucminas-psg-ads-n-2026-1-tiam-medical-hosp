import { Text, View } from "react-native";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { Calibracao } from "@/types/calibracao";
import { Fornecedor } from "@/types/fornecedor";
import { formatCurrency, formatDate, getFornecedorLabel } from "@/utils/calibracaoForm";

import { styles } from "./calibracoesStyles";

interface CalibracaoCardProps {
    item: Calibracao;
    fornecedores: Fornecedor[];
    onEdit: (calibracao: Calibracao) => void;
    onDelete: (id: string) => void;
    isGestor: boolean;
}

export function CalibracaoCard({ item, fornecedores, onEdit, onDelete, isGestor }: CalibracaoCardProps) {
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

export function EmptyState() {
    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhuma calibração cadastrada para este padrão</Text>
        </View>
    );
}