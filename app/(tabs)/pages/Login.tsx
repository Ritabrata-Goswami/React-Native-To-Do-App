import React, { useState } from "react"; 
import { 
  View, 
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
import Registration from "./Registration";



const Login =({navigation})=>{
  const [getUserId,setUserId]=useState("");
  const [getUserPass,setUserPass]=useState("");

  const attemptLogin = async()=>{
    if(getUserId=="" || getUserPass==""){
      Alert.alert("Login not valid","Enter every field");
      return false;
    }else{
      const sendObj = {
        userId:getUserId,
        password:getUserPass
      }

      await axios({
        method:"post",
        data:sendObj,
        url:"http://192.168.43.238:3000/login",
        headers: {
          'Content-Type': 'application/json',  
        }
      }).then((result)=>{
        console.log(result.data);

        switch(result.data.code){
          case 200:
              const dataStore: [string, string][] = [
                ["Id",result.data.Id.toString().trim()],
                ["Name",result.data.Name.toString().trim()],
                ["Photo",result.data.UserPhoto.toString().trim()],
                ["profilePicPath",result.data.filePath.toString().trim()]
              ];
              AsyncStorage.multiSet(dataStore);

              navigation.navigate("Dashboard");   //Send to dashboard screen.
            break;
          case 400:
            Alert.alert("Login failed",result.data.message);
            break;
          case 500:
            Alert.alert("Login failed",result.data.message);
            break;
        }

      }).catch((err)=>{
        console.log("Error Exception:- " + err);
      });
    }
  }

  return(
        <View style={styles.container}>
            <Text style={styles.headertext1}>Welcome to ToDo App</Text>
            <Text style={styles.headertext2}>Login</Text>
            <View style={styles.loginContainer}>
                <TextInput 
                  style={styles.inputbox} 
                  placeholder="Enter User Id" 
                  onChangeText={(Uid)=>setUserId(Uid)}
                ></TextInput>
                <TextInput 
                  style={styles.inputbox} 
                  placeholder="Enter User Password" 
                  secureTextEntry={true} 
                  onChangeText={(Pass)=>setUserPass(Pass)}
                ></TextInput>
                <Pressable style={styles.loginBtn} onPress={attemptLogin}>
                    <Text style={styles.loginBtnTxt}>Login</Text>
                </Pressable>
                <Pressable style={styles.regBtn} onPress={()=>navigation.navigate("Registration")}>
                    <Text style={styles.regBtnTxt}>Registration</Text>
                </Pressable>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:50
    // padding:5,
    // backgroundColor:"#f2f2f2"
  },
  headertext1:{
    fontSize:21,
    fontWeight:"bold",
    textAlign:"center",
    marginTop:25
  },
  headertext2:{
    fontSize:18,
    textAlign:"center",
    marginTop:8
  },
  loginContainer:{
    paddingTop:10,
    paddingHorizontal:7,
    marginTop:30
  },
  inputbox:{
    paddingLeft:8,
    paddingRight:8,
    paddingTop:3,
    paddingBottom:3,
    borderColor:"#1f1f1f",
    borderWidth:1,
    borderRadius:2,
    fontSize:15,
    marginTop:10
  },
  loginBtn:{
    marginTop:20,
    backgroundColor:"#1a66ff",
    padding:11,
    borderRadius:2
  },
  regBtn:{
    marginTop:8,
    backgroundColor:"#1f1f1f",
    padding:11,
    borderRadius:2
  },
  loginBtnTxt:{
    color:"white",
    textAlign:"center",
    fontSize:18
  },
  regBtnTxt:{
    color:"white",
    textAlign:"center",
    fontSize:18
  }
});



export default Login;