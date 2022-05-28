import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";

const ModalAddQuestions = ({setVisibleModal, addQuestion, idCategory}) => {

    const [questionText, setQuestionText] = useState({
        question: '', answer: ''
    })
    return (
        <View style={styles.modal}>
            <CustomInput
                placeholder={'Введите вопрос'}
                value={questionText.question}
                onChangeText={newText => setQuestionText({...questionText,question: newText })}
            />
            <CustomInput
                placeholder={'Введите ответ'}
                value={questionText.answer}
                onChangeText={newText => setQuestionText({...questionText,answer: newText})}
            />
            <CustomButton
                text={'Добавить'}
                onPress={() =>  {addQuestion(idCategory, questionText)
                    setQuestionText( {...questionText, name: '', answer: ''})
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
        height: 400,
        marginHorizontal: 10,
        backgroundColor: '#e0e0e0',
        paddingTop: 30,
        marginTop: 250,
        borderRadius: 10
    }
})

export default ModalAddQuestions;