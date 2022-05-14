import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.btn} {...props}>
            {props.children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '80%',
        height: 50,
        marginHorizontal: '10%',
        backgroundColor: '#D58B40',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 15
    },
})

export default CustomButton;