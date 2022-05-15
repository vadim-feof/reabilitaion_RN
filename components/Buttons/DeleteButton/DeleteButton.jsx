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
                <Text style={{...styles.text, color: color}}>Удалить</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold'
    }
})

export default DeleteButton;