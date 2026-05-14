import { ReactNode } from "react";
import {
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { AssetPlaceholder } from "@/components/medical/AssetPlaceholder";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  assetTitle: string;
  assetPath: string;
  assetSource?: ImageSourcePropType;
  assetHeight?: number;
  assetWidth?: number | string;
  children: ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  assetTitle,
  assetPath,
  assetSource,
  assetHeight,
  assetWidth,
  children,
}: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brand}>
          <Text style={styles.brandName}>Medical Hosp</Text>
          <Text style={styles.brandCaption}>Gestao de padroes de calibracao</Text>
        </View>

        <AssetPlaceholder
          title={assetTitle}
          assetPath={assetPath}
          assetSource={assetSource}
          height={assetHeight}
          width={assetWidth}
        />

        <View style={styles.formSurface}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MedicalColors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    gap: MedicalSpacing.lg,
    padding: MedicalSpacing.xl,
  },
  brand: {
    gap: MedicalSpacing.xs,
  },
  brandName: {
    color: MedicalColors.primaryDark,
    fontSize: 30,
    fontWeight: "800",
  },
  brandCaption: {
    color: MedicalColors.muted,
    fontSize: 14,
  },
  formSurface: {
    gap: MedicalSpacing.md,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surface,
  },
  title: {
    color: MedicalColors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: MedicalColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
