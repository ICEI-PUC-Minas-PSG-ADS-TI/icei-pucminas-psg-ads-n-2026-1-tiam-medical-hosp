import { StyleSheet, Text, View } from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";

interface AssetPlaceholderProps {
  title: string;
  assetPath: string;
  height?: number;
  compact?: boolean;
}

export function AssetPlaceholder({
  title,
  assetPath,
  height = 148,
  compact = false,
}: AssetPlaceholderProps) {
  return (
    <View
      style={[
        styles.container,
        compact && styles.compact,
        { minHeight: compact ? Math.min(height, 96) : height },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.path}>{assetPath}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: MedicalColors.borderStrong,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surfaceMuted,
  },
  compact: {
    padding: MedicalSpacing.md,
  },
  title: {
    color: MedicalColors.text,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  path: {
    marginTop: MedicalSpacing.sm,
    color: MedicalColors.muted,
    fontSize: 12,
    textAlign: "center",
  },
});
