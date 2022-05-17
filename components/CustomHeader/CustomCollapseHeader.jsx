import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {AntDesign} from '@expo/vector-icons';

const CustomCollapseHeader = (props) => {

    return (
        <TouchableOpacity style={styles.header}>
            <Text style={styles.text}>{props.children}</Text>
            <AntDesign name="down" size={24} color="black"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        backgroundColor: '#F3F3F3',
        height: 70,
        alignItems: "center",
        justifyContent: "space-between"

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    down: {}

})

export default CustomCollapseHeader;