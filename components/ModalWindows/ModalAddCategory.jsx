import React, {useState} from 'react';
import {Modal, StyleSheet} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import {View} from "react-native";

const ModalAddCategory = ({setVisibleModal, createCategory}) => {

    const [text, setText] = useState('')
    return (
        <View style={styles.modal}>
            <CustomInput
                placeholder={'Введите название категории'}
                value={text}
                onChangeText={setText}
            />
            <CustomButton
                text={'Добавить категорию'}
                onPress={() =>  { createCategory(text)
                    setText('')
                    setVisibleModal(isVisible => !isVisible)
                }}
            />
            <CustomButton
                text={'Отмена'}
                onPress={() => setVisibleModal(isVisible => !isVisible)}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    modal: {
        height: 320,
        backgroundColor: '#e0e0e0',
        paddingTop: 30,
        marginTop: 250,
        borderRadius: 20
    }
})

export default ModalAddCategory;