import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

import StatusCard from "../components/StatusCard";
import SearchBar from "../components/SearchBar";
import ActivityCard from "../components/ActivityCard";
import BottomTab from "../components/BottomTab";

import colors from "../styles/colors";
import { getDashboard, getAtividades } from "../services/api";

export default function HomeScreen() {
  const [dashboard, setDashboard] = useState({});
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    async function carregar() {
      setDashboard(await getDashboard());
      setAtividades(await getAtividades());
    }

    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel</Text>

      <Text style={styles.subtitulo}>
        Status de calibração dos equipamentos
      </Text>

      <View style={styles.cards}>
        <StatusCard
          cor={colors.green}
          numero={dashboard.validos}
          label="Válidos"
          icon="checkmark-circle"
        />

        <StatusCard
          cor={colors.yellow}
          numero={dashboard.atencao}
          label="Atenção"
          icon="warning"
        />

        <StatusCard
          cor={colors.red}
          numero={dashboard.vencidos}
          label="Vencidos"
          icon="close-circle"
        />
      </View>

      <SearchBar />

      <Text style={styles.section}>Atividades Recentes</Text>

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ActivityCard item={item} />}
      />

      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.lightGray,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitulo: {
    color: colors.gray,
    marginBottom: 10,
  },
  cards: {
    flexDirection: "row",
    marginVertical: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});