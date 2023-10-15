import AuthNavigation from "./AuthNavigation";
import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import ButtonTabNavigation from "./Stacks/ButtonTabNavigation";
import AuthStack from "./Stacks/AuthStack";

export default function Wrapper({ access_token }) {
	// console.log("tokeNavigation ",access_token)
	return (
		<NavigationContainer>
			<AppNavigation access_token={access_token} />
		</NavigationContainer>
	);
}

const AppNavigation = ({ access_token }) => {
	let user = true;
	// console.log("NavigationApp ",access_token)

	return <>{access_token ? <AuthStack /> : <ButtonTabNavigation />}</>;
};
