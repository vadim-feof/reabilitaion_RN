import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";

const FormAddNews = ({navigation, isEdit, editingNews}) => {

    const validationSchema = yup.object().shape(
        {
            title: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            content: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        }
    )

    const submit = (news) => {
        if (isEdit)
            navigation.navigate('News', {
                type: 'edit',
                editedNews: {
                    ...news,
                    _id: editingNews._id
                },
            })
        else
            navigation.navigate('News', {
                type: 'add',
                newNews: news
            })
    }

    return (
        <View>
            <Formik
                initialValues={{
                    title: isEdit ? editingNews.title : '',
                    content: isEdit ? editingNews.content : '',
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
                                <Text style={styles.text}>{isEdit ? 'Изменить' : 'Добавить'}</Text>
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