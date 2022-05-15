import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EditButton = ({color, navigate}) => {
    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <View style={styles.container}>
                <AntDesign name="edit" size={30} color={color} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 5
    },
})

export default EditButton;