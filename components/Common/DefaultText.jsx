import React from 'react';
import {Text, StyleSheet} from "react-native";

const DefaultText = (props) => {
    return (
        <Text style={styles.error} {...props}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    error: {
        color: '#000',
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
})

export default DefaultText;
