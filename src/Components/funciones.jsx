import Toast from "react-native-root-toast";

export const showToast = (titulo, bgColor) => {
	Toast.show(titulo, {
		duration: Toast.durations.LONG,
		position: 70,
        backgroundColor:bgColor,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
	});
};


export function convertirFecha(fecha) {
    if(fecha!=null){
        const fechaObjeto = new Date(fecha);
    
        const dia = fechaObjeto.getDate().toString().padStart(2, "0");
        const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
        const año = fechaObjeto.getFullYear().toString();
        // console.log("DESDE LA FN FECHA ", `${año}-${mes}-${dia}`);
        return `${año}-${mes}-${dia}`;

    }
}
