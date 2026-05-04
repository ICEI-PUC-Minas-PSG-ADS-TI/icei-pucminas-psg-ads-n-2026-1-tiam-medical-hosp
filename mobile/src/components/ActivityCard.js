import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

export default function ActivityCard({ item }) {
  const getStatusText = () => {
    if (item.status === "concluida") return "Calibração concluída";
    if (item.status === "breve") return "Calibração vence em breve";
    return "Calibração vencida";
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.tempo}>{item.tempo}</Text>
      </View>

      <Text style={styles.tag}>{item.tag}</Text>
      <Text>{getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nome: {
    fontWeight: "bold"
  },
  tempo: {
    fontSize: 12
  },
  tag: {
    color: colors.gray
  }
});