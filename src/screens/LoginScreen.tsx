import { useState } from "react";
import {
  TextInput,
  Alert,
  StyleSheet,
  View,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { auth } from "@/config/firebase";
import { RootStackParamList } from "@/routes/AppRoutes";
import { MedicalAssets, MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { AuthLayout } from "@/components/medical/AuthLayout";
import { MedicalButton } from "@/components/medical/MedicalButton";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch {
      Alert.alert("Erro", "E-mail ou senha invalidos.");
    }
  }

  return (
    <AuthLayout
      title="Acesse sua conta"
      subtitle="Entre para acompanhar os padroes de calibracao e manter o inventario em dia."
      assetTitle="Imagem futura da tela de login"
      assetPath={MedicalAssets.login}
      assetSource={require("../assets/images/interface-login.png")}
      assetHeight={108}
      assetWidth={190}
    >
      <View style={styles.fields}>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={MedicalColors.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor={MedicalColors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <MedicalButton title="Entrar" onPress={handleLogin} />
      <MedicalButton
        title="Criar conta"
        variant="secondary"
        onPress={() => navigation.navigate("Register")}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: MedicalSpacing.md,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: MedicalColors.borderStrong,
    borderRadius: 8,
    padding: MedicalSpacing.md,
    backgroundColor: MedicalColors.surface,
    color: MedicalColors.text,
  },
});
