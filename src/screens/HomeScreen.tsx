import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { auth } from "@/config/firebase";
import { RootStackParamList } from "@/routes/AppRoutes";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  async function handleLogout() {
    await signOut(auth);
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        title="Padrões"
        onPress={() => navigation.navigate("Padroes")}
      />

      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
    gap: 12,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: "#111827",
  },
});