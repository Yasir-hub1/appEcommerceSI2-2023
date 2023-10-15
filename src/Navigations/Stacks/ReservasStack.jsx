import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioAreasDeportivas from "../../Screen/Client/Productos/InicioProductos";
import ReservarArea from "../../Screen/Client/Productos/ProcesoDePago";
import Inicio from "../../Screen/Client/Reservas/Inicio";


const Stack = createNativeStackNavigator();

const AreasReservadas = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: true,headerStyle:{backgroundColor:"#fff"} }}
            initialRouteName="InicioAreaReservadas"
            
            >
            <Stack.Screen
                name="InicioAreaReservadas"
                component={Inicio}
                options={{ headerShown: true, headerTitleAlign: "left", title: "Reservas"}}
			/>


        </Stack.Navigator>
    );
};
export default AreasReservadas;
