import { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Switch, Text, TouchableOpacity } from "react-native";
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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGestor, setIsGestor] = useState(false);

  async function handleRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nome,
        email,
        createdAt: new Date(),
        isGestor,
      });

      navigation.replace("Home");
    } catch (error: any) {
      if (error.code === "") {
        Alert.alert("Erro", "Não foi possivel criar a conta, email já em uso!");
        console.error("Erro ao criar conta:", error);
      } else if (error.code === "") {
        Alert.alert("Erro", "Não foi possível criar a conta, a senha deve possuir no mínimo 6 caracteres")
        console.error("Erro ao criar conta:", error);
      } else {
        Alert.alert("Erro", "Não foi possivel criar a conta");
        console.error("Erro ao criar conta:", error);
      }
    }
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Cadastre-se para acessar os recursos de controle dos padrões da Medical Hosp."
      assetTitle="Imagem futura da tela de cadastro"
      assetPath={MedicalAssets.register}
    >
      <View style={styles.roleSelector}>
        <Text style={styles.roleLabel}>Cadastrar como</Text>

        <View style={styles.roleOptions}>
          <TouchableOpacity
            style={[styles.roleButton, !isGestor && styles.roleButtonActive]}
            onPress={() => setIsGestor(false)}
          >
            <Text style={[styles.roleButtonText, !isGestor && styles.roleButtonTextActive]}>
              Técnico
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, isGestor && styles.roleButtonActive]}
            onPress={() => setIsGestor(true)}
          >
            <Text style={[styles.roleButtonText, isGestor && styles.roleButtonTextActive]}>
              Gestor
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fields}>
        <TextInput
          placeholder="Nome"
          placeholderTextColor={MedicalColors.muted}
          value={nome}
          onChangeText={setNome}
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
          placeholder="Senha, deve conter no mínimo 6 caracteres"
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
  roleSelector: {
    gap: MedicalSpacing.sm,
  },
  roleLabel: {
    color: MedicalColors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  roleOptions: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: MedicalColors.borderStrong,
    borderRadius: 8,
    overflow: "hidden",
  },
  roleButton: {
    flex: 1,
    paddingVertical: MedicalSpacing.md,
    alignItems: "center",
    backgroundColor: MedicalColors.surface,
  },
  roleButtonActive: {
    backgroundColor: MedicalColors.primary,
  },
  roleButtonText: {
    color: MedicalColors.muted,
    fontWeight: "700",
    fontSize: 14,
  },
  roleButtonTextActive: {
    color: "#ffffff",
  },
});
