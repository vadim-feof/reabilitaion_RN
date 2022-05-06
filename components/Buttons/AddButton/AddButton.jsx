import React from 'react';

import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

const AddButton = ({color, navigate}) => {
    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <Ionicons name={'add'} color={color} size={40}/>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    icon: {
        fontSize: 44,
        color: '#fff'
    }
})

export default AddButton;
