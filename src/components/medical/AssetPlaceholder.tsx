import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";

interface AssetPlaceholderProps {
  title: string;
  assetPath: string;
  assetSource?: ImageSourcePropType;
  height?: number;
  width?: number | string;
  compact?: boolean;
}

export function AssetPlaceholder({
  title,
  assetPath,
  assetSource,
  height = 148,
  width = "100%",
  compact = false,
}: AssetPlaceholderProps) {
  const resolvedHeight = compact ? Math.min(height, 96) : height;

  return (
    <View
      style={[
        styles.container,
        compact && styles.compact,
        assetSource && styles.imageContainer,
        { minHeight: resolvedHeight, width },
      ]}
    >
      {assetSource ? (
        <Image
          source={assetSource}
          resizeMode="contain"
          accessibilityLabel={title}
          style={[styles.image, { height: resolvedHeight }]}
        />
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.path}>{assetPath}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
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
  imageContainer: {
    borderStyle: "solid",
    padding: 0,
    overflow: "hidden",
  },
  image: {
    width: "100%",
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
