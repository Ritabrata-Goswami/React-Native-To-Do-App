import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import Entry from "./pages/Entry";
import Form from "./pages/Form";
import Display from "./pages/Display";

import AsyncStorage from "@react-native-async-storage/async-storage";



const Stack = createStackNavigator();

const Routes=()=>{
  const [getAuthentication, setAuthentication] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(()=>{
    const RouteAuthenticate =async()=>{
  
      try{
        const token = await AsyncStorage.multiGet(['Id', 'Name', 'Photo', 'profilePicPath']);
        
        const userId = token[0][1];
        const userName = token[1][1];
        const userPhoto = token[2][1];
        const profilePicPath = token[3][1];
  
        if(userId && userName && userPhoto && profilePicPath){
          setAuthentication(true);
        }else{
          setAuthentication(false);
        }
      }catch(exce){
        Alert.alert("Authentication process failed!");
        console.log(exce);
        setAuthentication(false);
      }finally{
        setLoading(false);
      }
    }
  
    RouteAuthenticate();
  },[]);


  if (loading === true){
                      // Render a loading screen or nothing while authentication is being checked
    return <Text style={{textAlign:"center", marginTop:60, fontSize:20, fontWeight:"bold"}}>Loading...</Text>;
  }


  return(
      <Stack.Navigator initialRouteName={getAuthentication ? "Dashboard" : "Login"}>
        <Stack.Screen name="Registration" component={Registration} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}></Stack.Screen>

        {getAuthentication && (
          <>
            <Stack.Screen name="Form" component={Form} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Display" component={Display} options={{headerShown:false}}></Stack.Screen>
          </>
        )}
        
      </Stack.Navigator>
  );
}


const styles=StyleSheet.create({
  navBtnContainer:{
    display:"flex",
    flexDirection:"row",
    // justifyContent: 'space-between',
    // padding:3
  },
  navBtn:{
    backgroundColor:"#1f1f1f",
    padding:10,
    marginTop:50,
    width:100,
    marginLeft:2
  },
  navBtnTxt:{
    color:"white",
    textAlign:"center"
  }
});


export default Routes;
