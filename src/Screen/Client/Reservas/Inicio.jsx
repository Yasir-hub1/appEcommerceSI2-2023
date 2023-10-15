import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import { listarAreasReservadas } from '../../../Services/AuthService'
import { showToast } from '../../../Components/funciones'




const Inicio = () => {

    const [AreasReservadas, setAreasReservadas] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    async function listaDeAreaReservadas() {
        try {
            const resp = await listarAreasReservadas();
            setAreasReservadas(resp);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        listaDeAreaReservadas();
        console.log("ini")
    }, [])




    function obtenerNombreMes(fechaString) {
        // Dividir la fecha en partes (año, mes y día) usando el carácter '-'
        const [year, month, day] = fechaString.split('-');

        // Crear una instancia de fecha usando los valores obtenidos
        const fecha = new Date(year, month - 1, day);

        // Obtener el nombre del mes
        const nombreMes = fecha.toLocaleString('default', { month: 'long' });

        return nombreMes;
    }


    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const resp = await listarAreasReservadas();
            setAreasReservadas(resp);
            showToast("cargando...", "#2ecc71")
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };


    return (
        <View style={styles.container}>

            <FlatList
                enableEmptySections={true}
                style={styles.eventList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={AreasReservadas}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity >
                            <View style={styles.eventBox}>
                                <View style={styles.eventDate}>
                                    <Text style={styles.eventDay}>{obtenerNombreMes(item.fecha_reserva)}</Text>
                                    <Text style={styles.eventMonth}>{item.fecha_reserva}</Text>
                                </View>
                                <View style={styles.eventContent}>
                                    <Text style={styles.eventTime}>{item.hora_inicio} - {item.hora_fin}</Text>
                                    <Text style={styles.userName}>{item.estado}</Text>
                                    <Text style={styles.description}>
                                        {item.nombre}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Inicio

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        
    },
    eventList: {
        marginTop: 20,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        fontSize: 30,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventMonth: {
        fontSize: 14,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#DCDCDC',
        padding: 10,
        borderRadius: 10,
    },
    description: {
        fontSize: 15,
        color: '#646464',
    },
    eventTime: {
        fontSize: 18,
        color: '#151515',
    },
    userName: {
        fontSize: 16,
        color: '#151515',
    },
})