import React from 'react';

import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = ({color, navigate}) => {
    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <Ionicons name={'ios-arrow-back'} color={color} size={26}/>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    icon: {
        fontSize: 44,
        color: '#fff'
    }
})

export default BackButton;
