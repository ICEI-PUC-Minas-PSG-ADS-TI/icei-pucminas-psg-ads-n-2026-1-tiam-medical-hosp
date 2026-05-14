import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { BottomTab } from "@/components/dashboard/BottomTab";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { auth } from "@/config/firebase";
import { RootStackParamList } from "@/routes/AppRoutes";
import { getAtividades, getDashboard } from "@/services/api";
import { ActivityItem, DashboardSummary } from "@/types/dashboard";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const initialDashboard: DashboardSummary = {
  validos: 0,
  atencao: 0,
  vencidos: 0,
};

export default function HomeScreen({ navigation }: Props) {
  const [dashboard, setDashboard] = useState<DashboardSummary>(initialDashboard);
  const [atividades, setAtividades] = useState<ActivityItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function carregar() {
      const [dashboardData, atividadesData] = await Promise.all([
        getDashboard(),
        getAtividades(),
      ]);

      setDashboard(dashboardData);
      setAtividades(atividadesData);
    }

    carregar();
  }, []);

  const filteredAtividades = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return atividades;
    }

    return atividades.filter((atividade) => {
      const searchableText = [
        atividade.nome,
        atividade.tag,
        atividade.status,
      ].join(" ").toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [atividades, search]);

  async function handleLogout() {
    await signOut(auth);
    navigation.replace("Login");
  }

  function handleNavigatePadroes() {
    navigation.navigate("Padroes");
  }

  function renderActivity({ item }: { item: ActivityItem }) {
    return <ActivityCard item={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredAtividades}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.topRow}>
              <View style={styles.titleGroup}>
                <Text style={styles.titulo}>Painel</Text>
                <Text style={styles.subtitulo}>
                  Status de calibração dos equipamentos
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={handleLogout}
                style={({ pressed }) => [
                  styles.logoutButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.logoutText}>Sair</Text>
              </Pressable>
            </View>

            <View style={styles.cards}>
              <StatusCard
                cor="#16a34a"
                numero={dashboard.validos}
                label="Válidos"
                icon="checkmark-circle"
              />

              <StatusCard
                cor="#d97706"
                numero={dashboard.atencao}
                label="Atenção"
                icon="warning"
              />

              <StatusCard
                cor={MedicalColors.primary}
                numero={dashboard.vencidos}
                label="Vencidos"
                icon="close-circle"
              />
            </View>

            <SearchBar value={search} onChangeText={setSearch} />

            <Text style={styles.section}>Atividades Recentes</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhuma atividade encontrada</Text>
            <Text style={styles.emptyText}>
              Ajuste a busca para consultar as atividades de apresentação.
            </Text>
          </View>
        }
        renderItem={renderActivity}
      />

      <BottomTab activeKey="home" onPressPadroes={handleNavigatePadroes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MedicalColors.background,
  },
  content: {
    gap: MedicalSpacing.md,
    padding: MedicalSpacing.xl,
  },
  header: {
    gap: MedicalSpacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: MedicalSpacing.lg,
  },
  titleGroup: {
    flex: 1,
    gap: MedicalSpacing.xs,
  },
  titulo: {
    color: MedicalColors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitulo: {
    color: MedicalColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: MedicalColors.primary,
    borderRadius: 8,
    paddingHorizontal: MedicalSpacing.lg,
    paddingVertical: MedicalSpacing.sm,
    backgroundColor: MedicalColors.surface,
  },
  logoutText: {
    color: MedicalColors.primaryDark,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.82,
  },
  cards: {
    flexDirection: "row",
    gap: MedicalSpacing.sm,
  },
  section: {
    color: MedicalColors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  emptyState: {
    gap: MedicalSpacing.xs,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surface,
  },
  emptyTitle: {
    color: MedicalColors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: MedicalColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
