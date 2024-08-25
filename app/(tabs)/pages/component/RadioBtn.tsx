import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';



const RadioBtn = ({ options, selectedValue, onValueChange }) => {
    return (
        <View style={styles.radioContainer}>
            {options.map((option) => (
                <Pressable
                    key={option.id}
                    onPress={() => onValueChange(option.value)}
                    style={styles.radioButton}
                >
                    <View style={[
                        styles.radioCircle,
                        { borderColor: selectedValue === option.value ? '#00802b' : '#1f1f1f' }
                    ]}>
                        {selectedValue === option.value && <View style={styles.selectedRb} />}
                    </View>
                    <Text style={styles.radioLabel}>{option.label}</Text>
                </Pressable>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    radioContainer:{
        flexDirection: "row",
        alignItems: "center",
    },
    radioButton:{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    radioCircle:{
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedRb:{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#00802b",
    },
    radioLabel:{
        marginLeft: 3,
    },
});



export default RadioBtn;