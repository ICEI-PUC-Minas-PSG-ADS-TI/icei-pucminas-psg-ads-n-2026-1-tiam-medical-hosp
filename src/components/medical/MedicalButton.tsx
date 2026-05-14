import { Pressable, StyleSheet, Text } from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";

type MedicalButtonVariant = "primary" | "secondary" | "danger";

interface MedicalButtonProps {
  title: string;
  onPress: () => void;
  variant?: MedicalButtonVariant;
  disabled?: boolean;
}

export function MedicalButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: MedicalButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.text, variant !== "primary" && styles.textSecondary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: MedicalSpacing.lg,
    paddingVertical: MedicalSpacing.md,
  },
  primary: {
    borderColor: MedicalColors.primary,
    backgroundColor: MedicalColors.primary,
  },
  secondary: {
    borderColor: MedicalColors.primary,
    backgroundColor: MedicalColors.surface,
  },
  danger: {
    borderColor: MedicalColors.danger,
    backgroundColor: MedicalColors.surface,
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.86,
  },
  text: {
    color: MedicalColors.surface,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  textSecondary: {
    color: MedicalColors.primaryDark,
  },
});
