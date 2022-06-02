import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import CustomInput from "../Common/CustomInput/CustomInput";
import CustomButton from "../Common/CustomButton/CustomButton";
import {Formik} from 'formik'
import * as yup from 'yup'

const ModalAddQuestions = ({setVisibleModal, addQuestion, idCategory}) => {

    const validationSchema = yup.object().shape(
        {
            question: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
            answer: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
        }
    )

    return (
        <View style={styles.modal}>
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
                          <CustomButton
                              text={'Отмена'}
                              onPress={() => setVisibleModal(isVisible => !isVisible)}
                          />
                      </View>
                    )}
            </Formik>

        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        height: 420,
        marginHorizontal: 10,
        backgroundColor: '#e0e0e0',
        paddingTop: 30,
        marginTop: 250,
        borderRadius: 10
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    }
})

export default ModalAddQuestions;