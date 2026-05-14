import { useState } from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { auth, db } from "@/config/firebase";
import { RootStackParamList } from "@/routes/AppRoutes";
import { MedicalAssets, MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { AuthLayout } from "@/components/medical/AuthLayout";
import { MedicalButton } from "@/components/medical/MedicalButton";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      navigation.replace("Home");
    } catch {
      Alert.alert("Erro", "Não foi possivel criar a conta.");
    }
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Cadastre-se para acessar os recursos de controle dos padrões da Medical Hosp."
      assetTitle="Imagem futura da tela de cadastro"
      assetPath={MedicalAssets.register}
    >
      <View style={styles.fields}>
        <TextInput
          placeholder="Nome"
          placeholderTextColor={MedicalColors.muted}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

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

      <MedicalButton title="Cadastrar" onPress={handleRegister} />
      <MedicalButton
        title="Já tenho conta"
        variant="secondary"
        onPress={() => navigation.navigate("Login")}
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
