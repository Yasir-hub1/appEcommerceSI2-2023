import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimePicker = ({ onTimeSelect, tittle, isMode }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {

    setSelectedTime(time);
    hideTimePicker();
    onTimeSelect(time);
  };


  function obtenerFecha(fechaString) {
    const fecha = new Date(fechaString);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  


  return (
    <View>
      <Button title={tittle} onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode={isMode}
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      {selectedTime && tittle != "Fecha de reserva" ?(
        <View>
          <Text>{tittle}:{selectedTime.toLocaleTimeString()}</Text>
        </View>
      ):null}

      {selectedTime && tittle ==="Fecha de reserva" ?(
        <View>
          <Text>{tittle}: {obtenerFecha(selectedTime)}</Text>
        </View>
      ):null}
    </View>
  );
};

export default TimePicker;
