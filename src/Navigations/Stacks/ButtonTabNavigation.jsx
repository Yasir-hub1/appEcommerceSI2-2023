import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import InicioAreasDeportivasStack from "./AreasDeportivasStack";
import InicioPerfil from "../../Screen/Client/Perfil/InicioPerfil";
import AreasReservadas from "./ReservasStack";
import InicioProductos from "./AreasDeportivasStack";

const btnTabs = createBottomTabNavigator();

const TabBar = ({ appName }) => {
	const navigation = useNavigation();
	return (
		<btnTabs.Navigator
			initialRouteName="TabProductos"
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ focused }) => verIcon(route, focused),
				tabBarStyle: {
					alignItems: "center",
					backgroundColor: "#ffffff",
					paddingTop: 5,
					position: "absolute",
					overflow: "hidden",
				},
				
			})}>
			<btnTabs.Screen
				name="TabProductos"
				component={InicioProductos}
				options={{
					headerShown: false,
					title: "Productos",
					
					
				}}

			/>

			<btnTabs.Screen
				name="AreasReservadas"
				component={AreasReservadas}
				options={{
					headerShown: false,
					title: "Reservas",
					tabBarHideOnKeyboard: true
				}}
			/>


			<btnTabs.Screen
				name="Perfil"
				component={InicioPerfil}
				options={{
					// headerTitle: "Contratos",
					// headerTitleAlign: "center",
					headerShown: true,
				}}
			/>
		</btnTabs.Navigator>
	);
};
export default TabBar;

const verIcon = (route, focused) => {
	let icon = "";
	switch (route.name) {
		case "TabProductos": {
			icon = "basket";
			break;
		}
		case "AreasReservadas": {
			icon = "archive";
			break;
		}
		case "Perfil": {
			icon = "person-sharp";
			break;
		}
	}
	return (
		<Icon
			name={icon}
			type="ionicon"
			color={focused ? "#4169e1" : "#2f3542"}
			style={{ marginTop: 2 }}
		/>
	);
};

/* const menuIcon=(navigation)=>{
  return(
	<Icon
	name="menu"
	type="ionicon"
	size={30}
	color="black"
	style={{marginTop:2,marginRight:10}}
	onPress={()=>navigation.toggleDrawer()}

	/>
  );

} */
