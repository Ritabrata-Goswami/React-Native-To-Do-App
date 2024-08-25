import React, { useState, useEffect } from "react"; 
import { 
  ScrollView,
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
import Form from "./Form";
import Display from "./Display";




interface StorageData {
    [key: string]: string | null;
}

const Dashboard =({navigation})=>{

    const [data, setData] = useState<StorageData | null>(null);
    const [selectedNav, setSelectedNav] = useState('Display');

    useEffect(() => {
        const getData = async () => {
            try {
                const keys = ['Name', 'Photo', 'profilePicPath'];
                const result = await AsyncStorage.multiGet(keys);
                
                const fetchedData: StorageData = {};
                result.forEach(([key, value]) => {
                    if (value !== null) {
                        fetchedData[key] = value;
                    }
                });

                setData(fetchedData);
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        getData();
    }, []);


    const navBtnCall =(arg1)=>{
        setSelectedNav(arg1);
    }

    const logout=()=>{
        AsyncStorage.clear().then(()=>{
            navigation.navigate("Login");
        }).catch((err)=>{
            Alert.alert("Error","Error in Logout.");
        });
    }
    return(
        <ScrollView style={Styles.mainContainer}>
            <View style={Styles.dashboardContainer}>
                <View style={Styles.buttonContainer}>
                    <Pressable style={Styles.logoutBtn} onPress={logout}>
                        <Text style={Styles.loginBtnTxt}>logout</Text>
                    </Pressable>
                </View>
                <Text style={Styles.hdrTxt}>Welcome to ToDo Dashboard</Text>
                <View style={Styles.ProfileContainer}>
                    {data ? (
                            <View>
                                <View style={Styles.imgContainer}>
                                    <Image
                                        source={{uri:`http://192.168.43.238:3000/${data.profilePicPath}${data.Photo}`}}
                                        style={Styles.PhotoBlock} 
                                        resizeMode="cover"
                                    ></Image>
                                </View>
                                <Text style={Styles.nameTxt}>{`${data.Name}`}</Text>
                            </View>
                        ) : (
                            <Text style={Styles.noDataFound}>No data available!</Text>
                    )}
                </View>
                <View style={Styles.navOptions}>
                    <Pressable onPress={()=>navBtnCall("Form")}>
                        <Text style={[Styles.navOption, selectedNav==="Form" && Styles.selectedNavOption]}>Form</Text>
                    </Pressable>
                    <Pressable onPress={()=>navBtnCall("Display")}>
                        <Text style={[Styles.navOption, selectedNav==="Display" && Styles.selectedNavOption]}>Display</Text>
                    </Pressable>
                </View>
            </View>
            <View style={Styles.formContainer}>
                {selectedNav==="Form" && <Form navigation={navigation}/>}
                {selectedNav==="Display" && <Display navigation={navigation}/>}
            </View>
        </ScrollView>
    );
}

const Styles=StyleSheet.create({
    mainContainer:{
        flex:1
    },
    dashboardContainer:{
        flex:1,
        paddingTop:3,
        paddingHorizontal:7,
        backgroundColor:"#1a1a1a",
        paddingBottom:2
    },
    noDataFound:{
        textAlign:"center",
        fontSize:20,
        color:"#ff001b"
    },
    hdrTxt:{
        fontSize:19,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:10,
        color:"white"
    },
    buttonContainer:{
        alignItems: 'flex-end'
    },
    logoutBtn:{
        marginTop:40,
        padding:3,
        backgroundColor:"#ff001b",
        width:60
    },
    loginBtnTxt:{
        fontSize:16,
        color:"white",
        textAlign:"center"
    },
    imgContainer:{
        alignItems: 'center',
        marginBottom: 5,
    },
    PhotoBlock:{
        width:100,
        height:100,
        borderRadius:100,
        // overflow: 'hidden'
    },
    nameTxt:{
        fontSize:16,
        textAlign:"center",
        color:"white"
    },
    ProfileContainer:{
        marginTop:10
    },
    navOptions:{
        flexDirection:"row",
        marginTop:17
    },
    navOption:{
        fontSize:14,
        color:"white",
        marginRight:15,
        paddingBottom:5
    },
    selectedNavOption:{
        fontWeight:"bold",
        borderBottomWidth:3,
        borderBottomColor:"#d9d9d9",
    },
    formContainer:{
        flex:1,
        marginBottom:15
    }
});


export default Dashboard;