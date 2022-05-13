import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const DeleteButton = ({color, navigate}) => {

    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <>
                <AntDesign name="delete" size={30} color={color} />
                <Text style={{...styles.text, color: color}}>Удалить</Text>
            </>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold'
    }
})

export default DeleteButton;