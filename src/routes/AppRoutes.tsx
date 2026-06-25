import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import ForgotPasswordScreen from "@/screens/ForgotPasswordScreen";
import HomeScreen from "@/screens/HomeScreen";
import PadroesScreen from "@/screens/PadroesScreen";
import PerfilScreen from "@/screens/PerfilScreen";
import FornecedoresScreen from "@/screens/FornecedoresScreen";
import CalibracoesScreen from "@/screens/CalibracoesScreen";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Home: undefined;
    Padroes: undefined;
    Perfil: undefined;
    Fornecedores: undefined;
    Calibracoes: { padraoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Login" }}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: "Criar conta" }}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ title: "Recuperar senha" }}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Padroes"
                    component={PadroesScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Fornecedores"
                    component={FornecedoresScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Calibracoes"
                    component={CalibracoesScreen}
                    options={{ title: "Calibrações" }}
                />

                <Stack.Screen
                    name="Perfil"
                    component={PerfilScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
