import React from 'react';
import {Text, StyleSheet} from "react-native";

const ErrorText = (props) => {
    return (
        <Text style={styles.error} {...props}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 18,
    },
})

export default ErrorText;
