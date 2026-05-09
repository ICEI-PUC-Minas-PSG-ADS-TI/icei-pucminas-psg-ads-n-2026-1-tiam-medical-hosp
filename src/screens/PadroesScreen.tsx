import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { usePadroes } from "@/contexts/padraoContext";

export default function PadroesScreen() {
  const { padroes, loading, error, addPadrao, removePadrao } = usePadroes();

  async function handleCreatePadrao() {
    await addPadrao({
      nome: "Termômetro",
      fabricante: "Fabricante Teste",
      modelo: "Modelo Teste",
      tag: "TAG-001",
      numSerie: "NS-001",
      patrimonio: "PAT-001",
      setor: "Laboratório",
    });
  }

  async function handleDeletePadrao(id: string) {
    Alert.alert("Excluir", "Deseja excluir este padrão?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await removePadrao(id);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Padrões</Text>

      {loading && <Text>Carregando...</Text>}

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Cadastrar padrão de teste" onPress={handleCreatePadrao} />

      <FlatList
        data={padroes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text>Fabricante: {item.fabricante}</Text>
            <Text>Modelo: {item.modelo}</Text>
            <Text>Tag: {item.tag}</Text>
            <Text>Nº série: {item.numSerie}</Text>
            <Text>Patrimônio: {item.patrimonio}</Text>
            <Text>Setor: {item.setor}</Text>

            <View style={styles.buttonWrapper}>
              <Button
                title="Excluir"
                color="#dc2626"
                onPress={() => handleDeletePadrao(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: "#111827",
  },
  error: {
    color: "#dc2626",
    marginBottom: 12,
  },
  list: {
    paddingTop: 16,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonWrapper: {
    marginTop: 12,
  },
});