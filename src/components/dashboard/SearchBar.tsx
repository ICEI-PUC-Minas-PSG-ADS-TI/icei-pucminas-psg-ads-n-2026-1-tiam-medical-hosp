import { StyleSheet, TextInput, View } from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por TAG, nome ou ID patrimônio"
        placeholderTextColor={MedicalColors.muted}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    paddingHorizontal: MedicalSpacing.md,
    backgroundColor: MedicalColors.surface,
  },
  input: {
    minHeight: 44,
    color: MedicalColors.text,
  },
});
