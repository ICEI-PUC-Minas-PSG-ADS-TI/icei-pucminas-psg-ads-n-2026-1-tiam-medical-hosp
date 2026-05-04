import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatusCard({ cor, numero, label, icon }) {
  return (
    <View style={[styles.card, { backgroundColor: cor }]}>
      <Ionicons name={icon} size={28} color="#fff" />

      <Text style={styles.numero}>{numero}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  numero: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 6,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
  },
});