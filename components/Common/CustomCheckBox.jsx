import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import CheckBox from "expo-checkbox";

const CustomCheckBox = ({value, setValue, text}) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                value={value}
                onValueChange={checkValue => setValue(checkValue)}
                style={styles.checkbox}
            />
            <Text style={styles.label}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexShrink: 1,
        flexDirection: "row",
        margin: 15
    },
    checkbox: {
        width: 25,
        height: 25
    },
    label: {
        fontSize: 17,
        height: 45,
        marginLeft: 5
    }
})

export default CustomCheckBox;
