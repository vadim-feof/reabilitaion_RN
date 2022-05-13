import React from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";

const FormAddNews = ({navigation, edit, editingNews}) => {

    const validationSchema = yup.object().shape(
        {
            title: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            content: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        }
    )

    const submit = (news) => {
        if (edit)
            navigation.navigate('News', {
                editedNews: {
                    ...news,
                    _id: editingNews._id},
                edit: edit
            })
        else
            navigation.navigate('News', {newNews: news})
    }

    return (
        <View>
            <Formik
                initialValues={{
                    title: edit ? editingNews.title : '',
                    content: edit ? editingNews.content : '',
                }}
                validateOnBlur
                onSubmit={(values, action) => {
                    submit(values)
                }}
                validationSchema={validationSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit,
                  }) => (
                    <View>
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('title')}
                                     onBlur={handleBlur('title')}
                                     value={values.title}
                                     placeholder={'Введите заголовок новости'}
                                     multiline

                        />
                        {touched.title && errors.title && <Text style={styles.error}> {errors.title}</Text>}
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('content')}
                                     onBlur={handleBlur('content')}
                                     value={values.content}
                                     placeholder={'Введите описание новости'}
                                     multiline

                        />
                        {touched.content && errors.content && <Text style={styles.error}>{errors.content}</Text>}

                        <Text style={styles.textAdd}>Добавить картинку</Text>
                            <CustomButton onPress={handleSubmit}>
                                <Text style={styles.text}>{edit ? 'Изменить' : 'Добавить'}</Text>
                            </CustomButton>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: '#E0FFFF',
        paddingTop: 15
    },
    textAdd: {
        margin: 10
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    }
})

export default FormAddNews;