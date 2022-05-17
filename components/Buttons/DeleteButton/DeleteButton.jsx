import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const DeleteButton = ({color, navigate}) => {

    const onPress = () => {
        Alert.alert(
            'Действительно удалить?',
            '',
            [
                {
                    text: 'Удалить',
                    onPress: navigate
                },
                {
                    text: 'Отмена'
                }
            ]
        )
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <AntDesign name="delete" size={30} color={color} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 25
    },
})

export default DeleteButton;