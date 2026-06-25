import { ComponentProps } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MedicalSpacing } from "@/constants/medical-ui";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface StatusCardProps {
  cor: string;
  numero: number;
  label: string;
  icon: IoniconName;
  ativo?: boolean;
  onPress?: () => void;
}

export function StatusCard({ cor, numero, label, icon, ativo, onPress }: StatusCardProps) {
  return (
    <TouchableOpacity // ALTERADO: era View
      style={[
        styles.card,
        { backgroundColor: cor },
        ativo && styles.cardAtivo, // ALTERADO: adicionou
      ]}
      onPress={onPress} // ALTERADO: adicionou
      activeOpacity={0.8} // ALTERADO: adicionou
    >
      <Ionicons name={icon} size={28} color="#ffffff" />
      <Text style={styles.numero}>{numero}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity> // ALTERADO: era View
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 116,
    borderRadius: 8,
    padding: MedicalSpacing.md,
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  numero: {
    marginTop: MedicalSpacing.sm,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },
  label: {
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
  cardAtivo: {
    borderWidth: 3,
    borderColor: "#ffffff",
  },
});
