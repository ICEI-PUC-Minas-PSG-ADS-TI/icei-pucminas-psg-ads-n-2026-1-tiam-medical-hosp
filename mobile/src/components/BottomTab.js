import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

export default function BottomTab() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="home" size={24} color="#fff" />
        <Text style={styles.text}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="construct" size={24} color="#fff" />
        <Text style={styles.text}>Padrões</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="business" size={24} color="#fff" />
        <Text style={styles.text}>Fornecedores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="person" size={24} color="#fff" />
        <Text style={styles.text}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});