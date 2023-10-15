import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Productos from "../../Screen/Client/Productos/InicioProductos";
import ProcesoDePago from "../../Screen/Client/Productos/ProcesoDePago";
import InfoProductos from "../../Screen/Client/Productos/InfoProductos";


const Stack = createNativeStackNavigator();

const InicioProductos = ({ navigation }) => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: true }}
			>
			<Stack.Screen
				name="Productos"
				component={Productos}
				options={{ headerShown:false, headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="ProcesoDePago"
				component={ProcesoDePago}
				options={{ headerShown:false, headerTitleAlign: "center" }}
			/>

			<Stack.Screen
				name="InfoProductos"
				component={InfoProductos}
				options={{ headerShown:false, headerTitleAlign: "center" }}
			/>
			
		</Stack.Navigator>
	);
};
export default InicioProductos;
