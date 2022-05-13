import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EditButton = ({color, navigate}) => {
    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <View>
                <AntDesign name="edit" size={30} color={color} />
                <Text style={{...styles.text, color: color}}>Редактировать</Text>
            </View>
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

export default EditButton;