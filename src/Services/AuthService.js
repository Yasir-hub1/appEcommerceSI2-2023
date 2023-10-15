// import axios from "../Util/Axios";
import { Platform } from "react-native";
import { setItemAsync, deleteItemAsync } from "expo-secure-store";
import { USER_TOKEN_KEY, USER_KEY } from "../Providers/AuthProvider";
import * as SecureStore from "expo-secure-store";

import errorHandler from "../Util/AxiosErrorHandler";
import { showToast } from "../Components/funciones";
import axiosInstance from "../Util/Axios";
import axios from "axios";

/* FUNCION PARA INICIAR SESION CON DATOS DE LA API */
export async function login(data) {
	try {
		data.device_name = Platform.OS;
		/* peticion a la API */
		let res = await axios.post(
			"http://192.168.100.254:8000/api/users/login_ecommerce",
			data,
			{
				headers: {
					"Content-Type": "application/json",
					accept: "application/json",
				},
			}
		);

		console.log("DESDE LOGIN FUNCTION " + res.data);
		await setItemAsync(USER_TOKEN_KEY, JSON.stringify(res.data.access_token));
		await setItemAsync(USER_KEY, JSON.stringify(res.data.user));
		console.log("desde login", res.data);
		return res.data;
	} catch (e) {
		console.log("desde err", e);
		throw errorHandler(e);
	}
}
/* function para crear la cuenta */
export async function signup1(data) {
	// console.log(data);
	try {
		// console.log("entrando");
		let res = await axios.post("users/register", {
			...data,
			type_user: 1,
			surname: data.name,
			role_id: 2,
		});
		console.log("desde crear", res.data);
		return res.data.message;
	} catch (e) {
		console.log(e);
		throw errorHandler(e);
	}
}

/* ELIMINA EL TOKEN DE USUARIO AL CERRAR SESION */
export async function logout() {
	try {
		let res = await axios.post("logout");
		await deleteItemAsync(USER_TOKEN_KEY);
		await deleteItemAsync(USER_KEY);
		return res.data;
	} catch (e) {
		throw errorHandler(e);
	}
}

export async function listarProductos() {
	try {
		/* await deleteItemAsync(USER_TOKEN_KEY);
		await deleteItemAsync(USER_KEY); */
		const accessToken = JSON.parse(
			await SecureStore.getItemAsync(USER_TOKEN_KEY)
		);
		console.log("access_token ", accessToken);
		let resp = await axios.get("http://192.168.100.254:8000/api/products/all", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		// console.log("prod back ",resp.data.products.data)
		return resp.data.products.data;
	} catch (error) {
		console.log("error prod ", error);
		throw errorHandler(error);
	}
}
