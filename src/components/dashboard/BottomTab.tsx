import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";

type IoniconName = ComponentProps<typeof Ionicons>["name"];
type BottomTabKey = "home" | "padroes" | "fornecedores" | "perfil";

interface BottomTabItem {
  key: BottomTabKey;
  label: string;
  icon: IoniconName;
  onPress?: () => void;
}

interface BottomTabProps {
  activeKey?: BottomTabKey;
  onPressPadroes: () => void;
}

export function BottomTab({ activeKey = "home", onPressPadroes }: BottomTabProps) {
  const items: BottomTabItem[] = [
    { key: "home", label: "Início", icon: "home" },
    { key: "padroes", label: "Padrões", icon: "construct", onPress: onPressPadroes },
    { key: "fornecedores", label: "Fornecedores", icon: "business" },
    { key: "perfil", label: "Perfil", icon: "person" },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            disabled={!item.onPress}
            onPress={item.onPress}
            style={({ pressed }) => [
              styles.item,
              isActive && styles.activeItem,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name={item.icon} size={23} color="#ffffff" />
            <Text style={styles.text}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: MedicalSpacing.md,
    backgroundColor: MedicalColors.primary,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 68,
    minHeight: 48,
    opacity: 0.72,
  },
  activeItem: {
    opacity: 1,
  },
  pressed: {
    opacity: 0.86,
  },
  text: {
    marginTop: MedicalSpacing.xs,
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
