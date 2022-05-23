import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';

const CustomCollapseHeader = (props) => {

    return (
        <View style={styles.header}>
            <Text style={styles.text}>{props.children}</Text>
            <AntDesign name="down" size={24} color="black"/>
        </View>
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