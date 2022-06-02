import React from 'react';
import {StyleSheet, TextInput} from "react-native";

const CustomInput = (props) => {
    return (
        <TextInput
            style={styles.input}
            {...props}
            selectionColor={'#D58B40'}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        marginTop: 15,
        padding: 15,
        borderColor: 'silver',
        borderRadius: 5,
        marginHorizontal: 12,
        marginVertical: 10,
        backgroundColor: '#fff'
    },
})

export default CustomInput;