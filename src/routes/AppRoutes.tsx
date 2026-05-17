import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import HomeScreen from "@/screens/HomeScreen";
import PadroesScreen from "@/screens/PadroesScreen";
import PerfilScreen from "@/screens/PerfilScreen";
import FornecedoresScreen from "@/screens/FornecedoresScreen";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Padroes: undefined;
    Perfil: undefined;
    Fornecedores: undefined;
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
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Iní­cio" }}
                />

                <Stack.Screen
                    name="Padroes"
                    component={PadroesScreen}
                    options={{ title: "Padrões" }}
                />

                <Stack.Screen
                    name="Fornecedores"
                    component={FornecedoresScreen}
                    options={{ title: "Fornecedores" }}
                />

                <Stack.Screen
                    name="Perfil"
                    component={PerfilScreen}
                    options={{ title: "Perfil" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}