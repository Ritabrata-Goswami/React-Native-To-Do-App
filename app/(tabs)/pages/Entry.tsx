import React, { useState, useEffect } from "react"; 
import { 
  View, 
  SafeAreaView,
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  StyleSheet, 
  Image, 
  Button,
  Dimensions,
  Pressable,
  Alert
} from "react-native"; 
import { Link, Router, router } from 'expo-router';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dashboard from "./Dashboard";



const Entry =({navigation})=>{
    

    return(
        <>
            <View style={Styles.entryContainer}>
                {/* <Dashboard navigation={navigation}/> */}
            </View>
            <View style={Styles.entryFormContainer}>

            </View>
        </>
    );
}


const Styles = StyleSheet.create({
    entryContainer:{
        flex:1,    //Mandatory to render <Dashboard />
        // height:250
    },
    entryFormContainer:{

    }
});


export default Entry;