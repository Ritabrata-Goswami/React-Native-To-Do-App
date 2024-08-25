import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';



const CheckboxBtn = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <View>
      {options.map((option) => (
        <Pressable
          key={option}
          style={styles.checkBoxContainer}
          onPress={() => toggleOption(option)}
        >
          <View
            style={[
              styles.checkBox,
              selectedOptions.includes(option) && styles.checkedBox,
            ]}
          >
            {selectedOptions.includes(option) && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#00802b",
  },
  checkMark: {
    color: "white",
    fontSize: 18,
  },
  optionText: {
    fontSize: 16,
  },
});

export default CheckboxBtn;
