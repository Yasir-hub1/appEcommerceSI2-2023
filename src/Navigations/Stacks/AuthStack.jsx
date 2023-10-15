
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  Constants  from 'expo-constants'
import Login from '../../Screen/Auth/Login'
import Signup from "../../Screen/Auth/Signup" 
import { StyleSheet } from 'react-native'
const Stack=createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='Login'
    screenOptions={{
        headerBackTitle:"",
        headerShown:true,
        headerTitle:"Comercio Karen",
        headerStyle:[styles.headerStyle],
        headerShadowVisible:true,
        headerTitleAlign:"center",
      
      
       

    }}
    >
        <Stack.Screen name='Login' component={Login}  options={{headerShown:false}} />
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}} />

    </Stack.Navigator>
  )
}






const styles = StyleSheet.create({
    headerStyle:{
        backgroundColor: "#ffff",

    },
    header:{
        fontSize:28,
        color:'#2570e3',
        
    },
});
export default AuthStack