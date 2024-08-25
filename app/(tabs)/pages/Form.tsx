import React, { useState, useEffect } from "react"; 
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
import { Picker } from '@react-native-picker/picker';
import RadioBtn from "./component/RadioBtn";
import CheckboxBtn from "./component/CheckboxBtn";



type SlotsState = {
    first: boolean;
    second: boolean;
    third: boolean;
    fourth: boolean;
};


const Form =({navigation})=>{
    const [taskName, setTaskName] = useState("");
    const [pay, setPay] = useState<string>("Payable");
    const [slots, setSlots] = useState<SlotsState>({
        first: false,
        second: false,
        third: false,
        fourth: false,
    });
    const [consideration, setConsideration] = useState<string>('High');
    const [selectedSlots, setSelectedSlots] = useState([]);


    const radioButtonsData = [
        { id: '1', label: 'Payable', value: 'Payable' },
        { id: '2', label: 'Non-payable', value: 'Non-payable' },
    ];

    const checkBoxsData = ['1st-slot', '2nd-slot', '3rd-slot', '4th-slot'];

    const handleSelectionChange = (selectedOptions) => {
        setSelectedSlots(selectedOptions);
    };


    const submitFunc =async()=>{
        // console.log(" ");
        // console.log("Name:- " + taskName);
        // console.log("Pay:- " + pay);
        // console.log("Consideration:- " + consideration);
        // console.log("Slots:- " + selectedSlots.length);
        // console.log("String Type Slots:- " + selectedSlots.join(","));

        if(taskName==="" || pay==="" || consideration==="" || selectedSlots.length == 0){
            Alert.alert("Error", "Please enter every fields!");
            return false;
        }else{
            const sendData={
                taskName:taskName,
                payable:pay,
                consider:consideration,
                slots:selectedSlots.join(",")
            };

            await axios({
                method:"POST",
                url:"http://192.168.43.238:3000/postData",
                data:sendData,
                headers: {
                    'Content-Type': 'application/json',  
                }
            }).then((result)=>{

                switch(result.data.code){
                    case 200:
                        Alert.alert("Success!",result.data.message);
                        break;
                    case 500:
                        Alert.alert("Error",result.data.message);
                        break;
                    default:
                        Alert.alert("Error",result.data.message);
                        break;
                }
            }).catch((err)=>{
                Alert.alert("Error","Internal Server Error!");
                console.error(err);
            });
        }
    }


    return(
        <View style={Styles.mainContainer}>
            <Text style={Styles.hdrTxt}>To Do Form</Text>
            <View style={Styles.formContainer}>
                <View style={Styles.formElement}>
                    <Text>Task Name:</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder="Enter Task Name"
                        value={taskName}
                        onChangeText={setTaskName}
                    />
                </View>

                <View style={Styles.formElement}>
                    <Text>Pay:</Text>
                    <RadioBtn
                        options={radioButtonsData}
                        selectedValue={pay}
                        onValueChange={setPay}
                    />
                </View>

                <View style={Styles.formElement}>
                    <Text>Slot:</Text>
                    <CheckboxBtn 
                        options={checkBoxsData}
                        onChange={handleSelectionChange}
                    />
                </View>

                <View style={Styles.formElement}>
                    <Text>Consideration:</Text>
                    <Picker
                        selectedValue={consideration}
                        onValueChange={(itemValue) => setConsideration(itemValue as string)}
                    >
                        <Picker.Item label="High" value="High" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="Low" value="Low" />
                    </Picker>
                </View>

                <View style={Styles.submitBtnContainer}>
                    <Pressable style={Styles.subBtn} onPress={submitFunc}>
                        <Text style={Styles.BtnTxt}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


const Styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        marginTop:10
    },
    hdrTxt:{
        textAlign:"center",
        fontSize:15,
        color:"White",
        fontWeight:"bold"
    },
    formContainer:{
        flex:1,
        paddingHorizontal:5
    },
    input:{
        paddingVertical:2,
        paddingHorizontal:4,
        borderColor:"#1f1f1f",
        borderWidth:1,
        borderRadius:2,
        fontSize:16
    },
    formElement:{
        marginTop:8
    },
    submitBtnContainer:{
        marginTop:12
    },
    subBtn:{
        backgroundColor:"#1a53ff",
        padding:10,
        borderRadius:2
    },
    BtnTxt:{
        color:"white",
        textAlign:"center",
        fontSize:17
    }
});


export default Form;