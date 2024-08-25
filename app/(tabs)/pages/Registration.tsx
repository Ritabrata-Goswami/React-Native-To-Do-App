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
  Pressable,
  Dimensions,
  Alert   
} from "react-native"; 
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { Link, Router, router } from 'expo-router';



interface FileResult {
    name: string;
    size: number;
    uri: string;
    type: string
}


const Registration =({navigation})=>{
    const [getUserName,setUserName] = useState("");
    const [getUserId, setUserId]=useState("");
    const [getUserPassword, setUserPassword]=useState("");
    const [getFile, setFile] =  useState<FileResult | null>(null);


    const uploadProfilePhoto =async()=>{
        const picker = await DocumentPicker.getDocumentAsync({
            type:["image/jpeg", "image/jpg", "image/png"],
            copyToCacheDirectory:true
        }).then((response)=>{
            // console.log(response);
            if(response.canceled===false){
                console.log(response.assets[0]);
                let { name, size, uri, mimeType } = response.assets[0];

                var fileObj = {
                    name: name,
                    size: size || 0,
                    uri: uri,
                    type: mimeType || ""
                };
                setFile(fileObj);
            }
        })
    }


    const submitFunc =async()=>{
        if(getUserName==="" || getUserId==="" || getUserPassword==="" || getFile===null){
            Alert.alert("Error","All fields are mandatory!");
            return false;
        }

        const photoName = getFile?.name;
        const photoUri = getFile?.uri;
        const photoType = getFile?.type;
        const photoSize = getFile?.size;

        const formdata = new FormData();

        if(photoName !==  undefined && photoUri !== undefined && photoType !== undefined){
            formdata.append("name",getUserName);
            formdata.append("userId",getUserId);
            formdata.append("password",getUserPassword);
            formdata.append("photo",{
                uri: photoUri,
                type: photoType,
                name: photoName 
            });
        }

        // console.log(formdata);

        await axios({
            method:"POST",
            url:"http://192.168.43.238:3000/registration",
            data:formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response)=>{
            console.log(response.data);

            switch(response.data.code){
                case 200:
                    Alert.alert("Success",response.data.message);
                    break;
                case 500:
                    Alert.alert("Failed",response.data.message);
                    break;
            }

        }).catch((err)=>{
            console.log("Error:- "+err);
            Alert.alert("Error",err);
        });
    }


    const refreshFunc = ()=>{
        setUserName("");
        setUserId("");
        setUserPassword("");
        setFile(null);
    }

    return(
        <View style={styleReg.container}>
            <Pressable style={styleReg.loginBtn} onPress={()=>navigation.navigate("Login")}>
                <Text style={styleReg.loginBtnTxt}>Login</Text>
            </Pressable>
            <Text style={styleReg.headerTxt1}>User Registration</Text>
            <Text style={styleReg.headerTxt2}>* Every fields are mandatory</Text>
            <View style={styleReg.regContainer}>
                <Text style={styleReg.indicator}>*</Text>
                <TextInput 
                        style={styleReg.inputbox} 
                        placeholder="Enter Name" 
                        onChangeText={(Name)=>{setUserName(Name)}}
                        value={getUserName}
                >
                </TextInput>
                <Text style={styleReg.indicator}>*</Text>
                <TextInput 
                        style={styleReg.inputbox} 
                        placeholder="Enter User Id" 
                        onChangeText={(Id)=>{setUserId(Id)}}
                        value={getUserId}
                ></TextInput>
                <Text style={styleReg.indicator}>*</Text>
                <TextInput 
                        style={styleReg.inputbox} 
                        placeholder="Enter User Password" 
                        onChangeText={(Pass)=>{setUserPassword(Pass)}}
                        value={getUserPassword}
                ></TextInput>
                <Text style={styleReg.indicator}>*</Text>
                <View style={styleReg.uploadBtnContainer}>
                    <Button title="Upload Photo" onPress={uploadProfilePhoto} />
                </View>
                <Pressable style={styleReg.Btn} onPress={submitFunc}>
                    <Text style={styleReg.BtnTxt}>Submit</Text>
                </Pressable>
                <Pressable style={styleReg.refrBtn} onPress={refreshFunc}>
                    <Text style={styleReg.BtnTxt}>Refresh</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styleReg = StyleSheet.create({
    container:{
        flex:1
    },
    headerTxt1:{
        marginTop:25,
        fontWeight:"bold",
        fontSize:21,
        textAlign:"center"
    },
    headerTxt2:{
        fontSize:13,
        color:"#ff0010",
        textAlign:"center",
        marginTop:5,
        fontStyle:"italic"
    },
    regContainer:{
        paddingTop:10,
        paddingHorizontal:7,
        marginTop:13
    },
    indicator:{
        color:"red",
        marginBottom:-10,
        marginTop:4
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
    uploadBtnContainer:{
        marginTop:10
    },
    Btn:{
        marginTop:20,
        backgroundColor:"#00802b",
        padding:11,
        borderRadius:2,
        
    },
    BtnTxt:{
        color:"white",
        textAlign:"center",
        fontSize:18
    },
    refrBtn:{
        width:100,
        backgroundColor:"#ff001b",
        marginTop:40,
        marginLeft:"auto",
        marginRight:"auto",
        padding:5
    },
    loginBtn:{
        backgroundColor:"#1f1f1f",
        padding:11,
        width:100,
        marginTop:50,
        marginLeft:5,
        marginBottom:13
    },
    loginBtnTxt:{
        color:"white",
        fontSize:18,
        textAlign:"center"
    },
});


export default Registration;