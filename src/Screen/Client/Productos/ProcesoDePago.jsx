import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Avatar, Button, Input, ListItem, Text } from "react-native-elements";
// import TimePicker from "../../../Components/DateTimePiker";
import { convertirFecha, showToast } from "../../../Components/funciones";
import { reservarAreas } from "../../../Services/AuthService";

const ProcesoDePago = ({ navigation, route }) => {
  // const { area } = route.params;
  const [expanded, setExpanded] = React.useState(false);
  const [FechaReserva, setFechaReserva] = useState("");
  const [HoraInicial, setHoraInicial] = useState("");
  const [HoraFinal, setHoraFinal] = useState("");

  const [formContacto, setFormContacto] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    ciudad: "",
    sexo: "",
    telefono: "",
  });

  const handleChange = (key, value) => {
    setFormContacto({ ...formContacto, [key]: value });
  };


  async function  EnviarReserva (){
    console.log("data",);
    let data = {
      ...formContacto,
      fecha_reserva: convertirFecha(FechaReserva),
      hora_inicio: HoraInicial.toLocaleTimeString(),
      hora_fin: HoraFinal.toLocaleTimeString(),
      // id_area: area.id,
    }
    if (data.ciudad && data.fecha_reserva && data.hora_fin && data.hora_inicio && data.materno && data.nombre && data.paterno && data.sexo && data.telefono) {

      const resp = await reservarAreas(data);
      console.log("from AREAS RESER ", resp);
       if(resp.status==="Success"){
        showToast("Se registro correctamente", "#2ecc71")
        navigation.navigate("InicioArea");
       }

    } else {
      showToast("Todos los campos son obligatorios", "#e74c3c")
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <ScrollView contentContainerStyle={styles.container}>

        <Text h4 style={styles.columnTitle}>
          {/* Reservar {area.nombre} */}
        </Text>

        {/* <TimePicker tittle="Fecha de reserva" isMode="date" onTimeSelect={setFechaReserva} /> */}

        <View
          style={[
            styles.column,
            { flexDirection: "row", justifyContent: "center", top: 15 },
          ]}>
          {/* <TimePicker tittle="Hora inicial" isMode="time" onTimeSelect={setHoraInicial} /> */}
          <Text>{"\n"}</Text>
          {/* <TimePicker tittle="Hora Final" isMode="time" onTimeSelect={setHoraFinal} /> */}
        </View>

        <View style={styles.column}>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title>Contacto</ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}>
            <View>
              <ListItem>
                <ListItem.Content>
                  <Text style={{ textAlign: "left" }}>Nombre: </Text>
                  <Input
                    placeholder="Nombre"
                    value={formContacto.nombre}
                    onChangeText={text => handleChange("nombre", text)}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <Text style={{ textAlign: "left" }}>Apellido Paterno:</Text>
                  <Input
                    placeholder="Apellido Paterno"
                    value={formContacto.paterno}
                    onChangeText={text => handleChange("paterno", text)}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <Text style={{ textAlign: "left" }}>Apellido Materno: </Text>
                  <Input
                    placeholder="Materno"
                    value={formContacto.materno}
                    onChangeText={text => handleChange("materno", text)}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <Text style={{ textAlign: "left" }}>Ciudad</Text>
                  <Input
                    placeholder="Ciudad"
                    value={formContacto.ciudad}
                    onChangeText={text => handleChange("ciudad", text)}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <Text style={{ textAlign: "left" }}>Sexo:</Text>
                  <Input
                    placeholder="Sexo"
                    value={formContacto.sexo}
                    onChangeText={text => handleChange("sexo", text)}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <Text style={{ textAlign: "left" }}>Telefono:</Text>
                  <Input
                    placeholder="Telefono"
                    inputMode="numeric"
                    value={formContacto.telefono}
                    onChangeText={text => handleChange("telefono", text)}
                  />
                </ListItem.Content>
              </ListItem>
            </View>
          </ListItem.Accordion>
          <View style={{ top: 25 }}>
            <Button title="Enviar" onPress={() => EnviarReserva()} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 50,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  columnTitle: {
    marginBottom: 10,
  },
});

export default ProcesoDePago;
