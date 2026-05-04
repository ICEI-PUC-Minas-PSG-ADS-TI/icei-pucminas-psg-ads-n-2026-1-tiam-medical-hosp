import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por TAG, Nome ou ID Patrimônio"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  input: {
    height: 40
  }
});