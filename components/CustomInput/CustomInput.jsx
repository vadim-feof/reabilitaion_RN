import React from 'react';
import {StyleSheet, TextInput} from "react-native";

const CustomInput = (props) => {
    return (
        <TextInput style={styles.input} {...props} />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginTop: 15,
        padding: 15,
        borderColor: 'silver',
        borderRadius: 5,
        marginHorizontal: 12
    },
})

export default CustomInput;