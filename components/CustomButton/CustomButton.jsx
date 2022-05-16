import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const CustomButton = (props) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            {...props}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>
                {props.text}
            </Text>
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
    text: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 15
    },
})

export default CustomButton;