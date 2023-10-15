import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioPerfil from "../../Screen/Client/Perfil/InicioPerfil";


const Stack = createNativeStackNavigator();

const PerfilStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: true }}
            initialRouteName="InicioPerfil">
            <Stack.Screen
                name="InicioPerfil"
                component={InicioPerfil}
                options={{ headerTitle: "Perfil", headerTitleAlign: "center" }}
            />

        </Stack.Navigator>
    );
};
export default PerfilStack;
