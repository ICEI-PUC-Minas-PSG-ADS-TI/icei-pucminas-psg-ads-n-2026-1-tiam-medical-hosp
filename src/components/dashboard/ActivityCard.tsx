import { StyleSheet, Text, View } from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { ActivityItem, ActivityStatus } from "@/types/dashboard";

interface ActivityCardProps {
  item: ActivityItem;
}

const statusTextByStatus: Record<ActivityStatus, string> = {
  concluida: "Calibração concluída",
  breve: "Calibração vence em breve",
  vencida: "Calibração vencida",
};

export function ActivityCard({ item }: ActivityCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.tempo}>{item.tempo}</Text>
      </View>

      <Text style={styles.tag}>{item.tag}</Text>
      <Text style={styles.status}>{statusTextByStatus[item.status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: MedicalSpacing.xs,
    borderWidth: 1,
    borderColor: MedicalColors.primary,
    borderRadius: 8,
    padding: MedicalSpacing.md,
    backgroundColor: MedicalColors.surface,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: MedicalSpacing.md,
  },
  nome: {
    flex: 1,
    color: MedicalColors.text,
    fontWeight: "800",
  },
  tempo: {
    color: MedicalColors.muted,
    fontSize: 12,
  },
  tag: {
    color: MedicalColors.muted,
  },
  status: {
    color: MedicalColors.text,
  },
});
