import { useState } from "react";
import {
  TextInput,
  Alert,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { auth } from "@/config/firebase";
import { RootStackParamList } from "@/routes/AppRoutes";
import { MedicalAssets, MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { AuthLayout } from "@/components/medical/AuthLayout";
import { MedicalButton } from "@/components/medical/MedicalButton";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  async function handleSendResetEmail() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Digite seu e-mail para recuperar a senha.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      setEmailEnviado(true);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erro", "Não existe conta cadastrada com esse e-mail.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "Digite um e-mail válido.");
      } else {
        Alert.alert("Erro", "Não foi possível enviar o e-mail de recuperação.");
      }
      console.error("Erro ao enviar e-mail de recuperação:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle={
        emailEnviado
          ? "Verifique sua caixa de entrada (e a pasta de spam) para redefinir sua senha."
          : "Informe o e-mail cadastrado para receber o link de redefinição de senha."
      }
    >
      {!emailEnviado ? (
        <>
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
          </View>

          <MedicalButton
            title={loading ? "Enviando..." : "Enviar link de recuperação"}
            onPress={handleSendResetEmail}
            disabled={loading}
          />
        </>
      ) : (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            E-mail enviado para {email}
          </Text>
        </View>
      )}

      <MedicalButton
        title="Voltar para o login"
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
  successBox: {
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surface,
  },
  successText: {
    color: MedicalColors.text,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});