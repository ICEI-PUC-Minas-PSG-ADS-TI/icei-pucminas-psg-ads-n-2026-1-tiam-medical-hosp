import { Keyboard, Pressable, Text, TextInput, View } from "react-native";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { MedicalColors } from "@/constants/medical-ui";
import { CalibracaoDTO } from "@/types/calibracao";
import { Fornecedor } from "@/types/fornecedor";

import { styles } from "./calibracoesStyles";

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

export function CalibracaoForm({
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