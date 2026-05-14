import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MedicalSpacing } from "@/constants/medical-ui";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface StatusCardProps {
  cor: string;
  numero: number;
  label: string;
  icon: IoniconName;
}

export function StatusCard({ cor, numero, label, icon }: StatusCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: cor }]}>
      <Ionicons name={icon} size={28} color="#ffffff" />

      <Text style={styles.numero}>{numero}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
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
});
