import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from "react-native";
import CustomInput from "../Common/CustomInput/CustomInput";
import CustomButton from "../Common/CustomButton/CustomButton";
import {Formik} from 'formik'
import * as yup from 'yup'
import CustomToast from "../CustomToast";
import CloseButton from "../Common/Buttons/CloseButton";

const ModalAddQuestions = ({setVisibleModal, addQuestion, idCategory, visible}) => {

    const validationSchema = yup.object().shape(
        {
            question: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
            answer: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
        }
    )

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisibleModal(false)}
            animationType={'fade'}
        >
            <View style={styles.container}>
                <CustomToast/>
                <View style={styles.wrapper}>
                    <CloseButton color={'#393939'} onPress={() => setVisibleModal(false)}/>
                    <Formik
                        initialValues={{
                            question: '', answer: ''
                        }}
                        validateOnBlur
                        onSubmit={(values, action) => {
                            addQuestion(idCategory, values)
                            action.resetForm() /*чистка формы*/
                            setVisibleModal(isVisible => !isVisible)
                        }}
                        validationSchema={validationSchema}
                    >
                        {({
                              values, errors, touched, dirty,
                              handleChange, handleBlur,
                              handleSubmit,
                          }) => (
                            <View>
                                <CustomInput
                                    placeholder={'Введите вопрос'}
                                    value={values.question}
                                    onChangeText={handleChange('question')}
                                    onBlur={handleBlur('question')}
                                />
                                {touched.question && errors.question && <Text style={styles.error}> {errors.question}</Text>}
                                <CustomInput
                                    placeholder={'Введите ответ'}
                                    value={values.answer}
                                    onChangeText={handleChange('answer')}
                                    onBlur={handleBlur('answer')}
                                />
                                {touched.answer && errors.answer && <Text style={styles.error}> {errors.answer}</Text>}
                                <CustomButton
                                    text={'Добавить'}
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    wrapper: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 5
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    }
})

export default ModalAddQuestions;