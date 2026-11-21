import { Text, TextInput, View } from "react-native";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { MedicalColors } from "@/constants/medical-ui";
import { CalibracaoDTO } from "@/types/calibracao";
import { Fornecedor } from "@/types/fornecedor";
import { Padrao } from "@/types/padrao";
import { getHeaderSubtitle } from "@/utils/calibracaoForm";

import { CalibracaoForm } from "./CalibracaoForm";
import { styles } from "./calibracoesStyles";

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

export function CalibracoesHeader({
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