import React, { useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

import { Text, Button, Image } from "react-native-elements";
import LottieView from "lottie-react-native";
import { useForm } from "react-hook-form";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityLoader, ErrorText } from "../../Components/Shared";
import Toast from "react-native-root-toast";
import { EmailInput, PasswordInput, TextInput } from "../../Components/Inputs";
/* importando metodo de Autenticacion para el registro de usuario */
import { signup1 } from "../../Services/AuthService";

const Signup = ({ navigation }) => {
	const [Error, setError] = useState(null);
	const [loading, setloading] = useState(false);
	// proteccion de contraseña
	const [secureEntry, setSecureEntry] = useState(true);
	const [secureConfirmationEntry, setSecureConfirmationEntry] = useState(true);
	/* Errores de formulario */
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	//TODO: REGISTRAR USUARIO
	const _Signup = async data => {
		console.log("DESDE DATA ", data);
		try {
			setloading(true);
			const message = await signup1(data);

			await navigation.navigate("Login");
			Toast.show(message, {});
		} catch (e) {
			setError(e.message);
		} finally {
			setloading(false);
		}
		console.log("Enviando datos");
	};

	/* proteccion de contrasenia */
	const toggleSecureEntry = () => {
		setSecureEntry(!secureEntry);
	};
	const toggleSecureConfirmationEntry = () => {
		setSecureConfirmationEntry(!secureConfirmationEntry);
	};

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center",backgroundColor:"#fff" }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ paddingHorizontal: 25 }}>
				<View style={{ alignItems: "center" }}>
					<LottieView
						resizeMode={"contain"}
						style={{ width: 300, height: 300 }}
						source={require("../../Image/lottie/login.json")}
						autoPlay
					/>
				</View>

				<Text
					style={{
						// fontFamily: 'Roboto-Medium',
						fontSize: 28,
						fontWeight: "500",
						color: "#333",
						marginBottom: 10,
					}}>
					Regístrate
				</Text>
				<ErrorText error={Error} />
				

				<TextInput
					placeholder="Nombre de usuario"
					name="name"
					minLength={2}
					maxLength={20}
					iconName="person-outline"
					control={control}
					errors={errors}
					errValiStyle={styles.errorValidacion}
					inputStyle={styles.input}
				/>

				<EmailInput
					placeholder="Ingrese su correo"
					name="email"
					control={control}
					errors={errors}
					errValiStyle={styles.errorValidacion}
					inputStyle={styles.input}
				/>

				<PasswordInput
					placeholder="Contraseña"
					name="password"
					control={control}
					errors={errors}
					errValiStyle={styles.errorValidacion}
					inputStyle={styles.input}
					secureEntry={secureEntry}
					toggleSecureEntry={toggleSecureEntry}
				/>

				{/* CONFIRMACION DE PASSWORD */}
				<PasswordInput
					name="passwordConfirmation"
					placeholder="Confirmar contraseña"
					control={control}
					errors={errors}
					errValiStyle={styles.errorValidacion}
					inputStyle={styles.input}
					secureEntry={setSecureConfirmationEntry}
					toggleSecureEntry={toggleSecureConfirmationEntry}
				/>

				<Button
					title="Registar"
					type="outline"
					onPress={handleSubmit(_Signup)}
					titleStyle={{ color: "#ff7f50" }}
				/>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: 30,
					}}>
					<Text>Tienes una cuenta?</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text style={{ color: "#ff7f50", fontWeight: "700" }}> Login</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffff",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "#2570e3",
		// fontFamily:'$400Regular',
		fontWeight: "600",
		fontSize: 24,
	},
	errorValidacion: {
		color: "#dd3333",
		fontSize: 12,
	},
	input: {
		color: "#000000",
	},
});
export default Signup;
