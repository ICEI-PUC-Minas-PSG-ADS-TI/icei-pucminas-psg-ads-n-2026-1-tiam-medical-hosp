import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { auth } from "../config/firebase";

export default function HomeScreen() {
  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 28 }}>Home</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}